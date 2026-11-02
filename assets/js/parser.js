const DocumentParser = (() => {
  const FIELD_LABELS={companyName:"Ragione sociale",vatNumber:"Partita IVA",fiscalCode:"Codice fiscale",rea:"REA",registeredOffice:"Sede legale",pec:"PEC",legalRepresentative:"Legale rappresentante",insuranceCompany:"Compagnia assicurativa",policyNumber:"Numero polizza",policyExpiry:"Scadenza polizza",policyLimit:"Massimale",durcProtocol:"Protocollo DURC",durcExpiry:"Scadenza DURC",durcStatus:"Esito DURC",phone:"Telefono",email:"E-mail",inpsPosition:"Posizione INPS",inailPosition:"Posizione INAIL"};
  const clean=v=>String(v||"").replace(/\s+/g," ").trim().replace(/[;,.]+$/g,"");
  const dateISO=v=>{const m=String(v||"").match(/\b(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})\b/);return m?`${m[3]}-${m[2].padStart(2,"0")}-${m[1].padStart(2,"0")}`:""};
  async function pdfText(file){
    if(!window.pdfjsLib)throw new Error("Libreria PDF non disponibile");
    pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
    const pdf=await pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise;let text="";
    const forceOcr=/(?:polizza|assicurazione|cciaa|camerale|visura)/i.test(file.name||"");
    for(let i=1;i<=pdf.numPages;i++){
      const page=await pdf.getPage(i),content=await page.getTextContent();
      let pageText=content.items.map(x=>x.str).join(" ");
      if((forceOcr||pageText.replace(/\s/g,"").length<250)&&window.Tesseract){
        const viewport=page.getViewport({scale:2}),canvas=document.createElement("canvas"),ctx=canvas.getContext("2d");
        canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);
        await page.render({canvasContext:ctx,viewport}).promise;
        let ocr="";
        try{ocr=(await Tesseract.recognize(canvas,"ita")).data.text}catch(errIta){
          console.warn("OCR italiano non disponibile, provo inglese",errIta);
          try{ocr=(await Tesseract.recognize(canvas,"eng")).data.text}catch(errEng){console.warn("OCR PDF non riuscito, pagina",i,errEng)}
        }
        if(ocr)pageText+="\n"+ocr;
      }
      text+="\n"+pageText;
    }
    return text;
  }
  async function docxText(file){if(!window.mammoth)throw new Error("Libreria DOCX non disponibile");return (await mammoth.extractRawText({arrayBuffer:await file.arrayBuffer()})).value}
  async function imageText(file){if(!window.Tesseract)throw new Error("Libreria OCR non disponibile");return (await Tesseract.recognize(file,"ita")).data.text}
  async function fileText(file){const n=file.name.toLowerCase();if(n.endsWith(".txt"))return file.text();if(n.endsWith(".pdf"))return pdfText(file);if(n.endsWith(".docx"))return docxText(file);if(/\.(png|jpe?g)$/.test(n))return imageText(file);return ""}
  function first(text,res){for(const re of res){const m=text.match(re);if(m?.[1])return clean(m[1])}return ""}
  function documentType(text,file){
    const hay=`${file?.name||""} ${String(text||"").slice(0,5000)}`.toLowerCase();
    if(/cert(?:ificato)?(?:\s+di)?\s+(?:iscrizione|vigenza)|cert\.?\s+uso|uso gare|certificato camerale/.test(hay))return "certificato";
    if(/duvri|ditta aggiudicataria|appaltatore\s*-\s*esecutori|anagrafica aziendale/.test(hay))return "duvri";
    if(/visura|camera di commercio|registro imprese|cciaa/.test(hay))return "visura";
    if(/documento unico di regolarit|durc|inps_|inail_/.test(hay))return "durc";
    if(/polizza|assicurazione|assicurativa|massimale/.test(hay))return "polizza";
    return "altro";
  }
  function titleWords(value){
    const keepUpper=new Set(["ABC","IVA","REA","INPS","INAIL","DURC","PEC"]), companyForms=new Map([["SRL","Srl"],["SPA","Spa"],["SNC","Snc"],["SAS","Sas"],["SAPA","Sapa"]]);
    return clean(value).split(/(\s+|-|\/)/).map(token=>{
      const u=token.toLocaleUpperCase("it-IT");
      if(keepUpper.has(u))return u;if(companyForms.has(u))return companyForms.get(u);
      if(/^\d|^[A-Z]{2}$/.test(token))return token;
      return token.toLocaleLowerCase("it-IT").replace(/^[a-zà-ÿ]/,c=>c.toLocaleUpperCase("it-IT"));
    }).join("");
  }
  function normalizeAddress(value){
    let v=clean(value).replace(/appaltatore\s*-\s*esecutori[\s\S]*$/i,"").replace(/([a-zà-ÿ])([A-ZÀ-Ü])/g,"$1 $2").replace(/\bint\.?\s*(\d+)/i,"int. $1");
    v=v.replace(/\s*,\s*/g,", ").replace(/\s{2,}/g," ").replace(/[•]+/g,"").replace(/[.,;]+$/g,"");
    return titleWords(v).replace(/\bInt\.\s*/g,"int. ");
  }
  function normalizeField(field,value){
    value=clean(value);
    if(field==="companyName"){
      if(/^(via|viale|corso|piazza|strada|localita|sede legale|codice fiscale|numero d.iscrizione|registro imprese|partita iva|dati per duvri|attivit[aà]|stato attivit[aà]|data inizio attivit[aà]|dati anagrafici|l.impresa in cifre|forma giuridica|sede)\b/i.test(value))return "";
      return titleWords(value);
    }
    if(field==="registeredOffice")return normalizeAddress(value);
    if(field==="legalRepresentative")return titleWords(value.replace(/^sig\.?\s*/i,"").replace(/[•]+/g,""));
    if(field==="email"||field==="pec")return value.toLocaleLowerCase("it-IT");
    if(field==="rea")return value.toLocaleUpperCase("it-IT").replace(/\s*-\s*/g,"-");
    return value;
  }
  function evidence(field,value,file,confidence,sourceType){return {field,label:FIELD_LABELS[field]||field,value:normalizeField(field,value),source:file.name,sourceType,confidence}}
  function officialRegisteredOffice(text){
    const flat=String(text||"").replace(/\s+/g," ").trim();
    const found=/indirizzo\s+sede\s+legale/i.exec(flat);if(!found)return "";
    let block=flat.slice(found.index+found[0].length,found.index+found[0].length+600);
    block=block.split(/stradario|domicilio\s+digitale(?:\s*\/\s*pec)?|indirizzo\s+pec|\bpec\b|partita\s+iva|numero\s+repertorio|repertorio\s+economico|\brea\b|codice\s+fiscale|forma\s+giuridica/i)[0];
    let m=block.match(/([A-ZÀ-Ü][A-ZÀ-Ü' .-]{1,60}?)\s*\(([A-Z]{2})\)[\s,;:\-]*((?:VIA|VIALE|CORSO|PIAZZA|STRADA|LARGO|VICOLO|LOCALIT[AÀ]|S\.S\.)\s+.+?)\s+CAP\s*(\d{5})/i);
    if(m)return `${m[3].trim()}, ${m[4]} ${m[1].trim()} (${m[2].toUpperCase()})`;
    m=block.match(/((?:VIA|VIALE|CORSO|PIAZZA|STRADA|LARGO|VICOLO|LOCALIT[AÀ]|S\.S\.)\s+.+?)\s+CAP\s*(\d{5})\s+([A-ZÀ-Ü][A-ZÀ-Ü' .-]{1,60}?)\s*\(([A-Z]{2})\)/i);
    return m?`${m[1].trim()}, ${m[2]} ${m[3].trim()} (${m[4].toUpperCase()})`:"";
  }
  function extractFromText(text,file){
    const sourceType=documentType(text,file);
    const out=[], add=(field,value,confidence=0.82)=>{value=clean(value).replace(/^[/\\|:;,-]+\s*/,"");if(value)out.push(evidence(field,value,file,confidence,sourceType))};
    const officialOffice=officialRegisteredOffice(text);
    if(officialOffice)out.push(evidence("registeredOffice",officialOffice,file,1.0,"sede_ufficiale"));    const stop="(?=\\s+(?:partita\\s+iva|codice\\s+fiscale|sede\\s+legale|pec|rea|legale\\s+rappresentante|compagnia|polizza|massimale|decorrenza|scadenza|protocollo|inail|inps)\\b|$)";
    for(const re of [/(?:n[°º.]?\s*iscrizione\s+cciaa?)\s*[:;\-]?\s*([A-Z]{2})\s*[-–/]?\s*(\d{4,10})/i,/(?:numero\s+rea|r\.?e\.?a\.?)\s*[:;\-]?\s*([A-Z]{2})\s*[-–/]?\s*(\d{4,10})/i]){const m=text.match(re);if(m){add("rea",`${m[1].toUpperCase()}-${m[2]}`,.999);break}}
    // Registro Imprese / REA: supporta CCIA, CCIAA, Numero REA e formati con spazi o trattini.
    const reaPatterns=[
      /(?:n[°º.]?\s*(?:di\s*)?iscrizione\s+(?:cciaa?|camera\s+di\s+commercio)|numero\s+rea|r\.?e\.?a\.?)\s*[:;\-]?\s*([A-Z]{2})\s*[-–/]?\s*(\d{4,10})/i,
      /(?:registro\s+imprese)[\s\S]{0,100}?(?:rea|r\.?e\.?a\.?)\s*[:;\-]?\s*([A-Z]{2})\s*[-–/]?\s*(\d{4,10})/i
    ];
    for(const re of reaPatterns){const m=text.match(re);if(m){add("rea",`${m[1].toUpperCase()}-${m[2]}`,.995);break}}

    if(sourceType==="certificato"){
      add("companyName",first(text,[/(?:^|\s)denominazione\s*:\s*([A-Z0-9À-Ü][A-Z0-9À-Ü&'.\- ]{1,100}?)(?=\s+(?:forma\s+giuridica|sede|codice\s+fiscale|rea|domicilio\s+digitale|pec)|$)/i]),1.0);
      add("rea",first(text,[/(?:repertorio\s+economico\s+amministrativo|numero\s+rea|rea)\s*[:\-]?\s*([A-Z]{2}\s*[-–/]?\s*\d{4,10})/i]),1.0);
      add("registeredOffice",first(text,[/(?:^|\s)sede\s*:\s*([A-ZÀ-Ü][A-ZÀ-Ü0-9 ,'\.\/-]{5,150}?)(?=\s+(?:domicilio\s+digitale|pec|costituita|codice\s+fiscale|rea)|$)/i]),.995);
      add("pec",first(text,[/(?:domicilio\s+digitale\s*\/\s*pec|pec)\s*:\s*([A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,})/i]),1.0);
    }
    add("companyName",first(text,[new RegExp("(?:denominazione|ragione\\s+sociale)\\s*[:\\-]?\\s*([A-Z0-9À-Ü&'. /-]{3,100}?)"+stop,"i"),/(?:impresa)\s*[:\-]?\s*([A-Z0-9À-Ü&'. /-]{3,80})/i]),.86);
    add("vatNumber",first(text,[/(?:partita\s+iva|p\.?\s*iva)\s*[:\-]?\s*(?:IT\s*)?([0-9]{11})/i]),.96);
    add("fiscalCode",first(text,[/(?:codice\s+fiscale|c\.?f\.?)\s*[:\-]?\s*([A-Z0-9]{11,16})/i]),.94);
    add("rea",first(text,[/(?:numero\s+rea|r\.?e\.?a\.?)\s*[:\-]?\s*([A-Z]{0,2}\s*[-/]?\s*[0-9]{3,10})/i]),.88);
    add("registeredOffice",first(text,[new RegExp("(?:sede\\s+legale|indirizzo\\s+sede)\\s*[:\\-]?\\s*(.{5,150}?)"+stop,"i")]),.82);
    if(sourceType!=="polizza")add("pec",first(text,[/(?:domicilio\s+digitale(?:\s*\/\s*pec)?|pec|posta elettronica certificata)\s*[:\-]?\s*([A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,})/i,/\b([A-Z0-9._%+\-]*@[A-Z0-9.\-]*pec[A-Z0-9.\-]*\.[A-Z]{2,})\b/i,/\b([A-Z0-9._%+\-]*pec[A-Z0-9._%+\-]*@[A-Z0-9.\-]+\.[A-Z]{2,})\b/i]),.98);
    add("legalRepresentative",first(text,[new RegExp("(?:legale\\s+rappresentante|rappresentante\\s+legale)\\s*[:\\-]?\\s*(.{3,90}?)"+stop,"i")]),.82);
    // Modello DUVRI e schede anagrafiche: fonte prioritaria per dati operativi.
    add("companyName",first(text,[/(?:ragione\s+sociale|denominazione\s+ditta)\s*[:;]?\s*([A-ZÀ-Ü][A-ZÀ-Ü0-9 &'\.\-]{4,120}?)(?=\s+(?:forma\s+giuridica|indirizzo|sede\s+legale|P\.?\s*IVA|C\.?F\.?)|\n|$)/i,/(?:ditta\s+aggiudicataria)\s*[:;]?\s*([A-ZÀ-Ü][A-ZÀ-Ü0-9 &'\.\-]{4,120}?)(?=\s+P\.?\s*IVA|\n|$)/i]),.995);
    add("inpsPosition",first(text,[/(?:n[°º]\s*iscrizione\s+inps|posizione\s+inps)\s*[:;\-]?\s*(metal(?:meccanico)?\s*[:;]?\s*\d{6,15}\s+(?:edile|e)\s*[:;]?\s*\d{6,15})/i,/(Metalmeccanico\s*:\s*\d{6,15}\s+edile\s*:\s*\d{6,15})/i]),.995);
    add("companyName",first(text,[/(?:ditta\s+aggiudicataria[^:]*|denominazione\s+ditta|ragione\s+sociale)\s*:\s*([^\n]{3,100}?)(?=\s+(?:P\.?\s*IVA|C\.?F\.?|forma\s+giuridica|legale\s+rappresentante)|$)/i]),.98);
    add("registeredOffice",first(text,[/(?:sede\s+legale|indirizzo)\s*:\s*([^\n]{5,150}?)(?=\s+(?:appaltatore\s*-\s*esecutori|recapiti|@?email|n[°º]\s*iscrizione)|$)/i]),.97);
    add("legalRepresentative",first(text,[/(?:legale\s+rappresentante)\s*:\s*(?:sig\.?\s*)?([A-ZÀ-Ü][A-ZÀ-Ü' -]{3,80}?)(?=\s+(?:sede\s+legale|denominazione|ragione\s+sociale|forma\s+giuridica|indirizzo|recapiti)|$)/i]),.98);
    add("phone",first(text,[/(?:recapiti|tel(?:efono)?)[\s:]*([+\d][\d\s./-]{6,25})/i]),.95);
    add("email",first(text,[/(?:@?email|e-mail|mail)\s*:\s*([A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,})/i]),.98);
    add("inpsPosition",first(text,[/(?:n[°º]\s*iscrizione\s+inps|matricola\s+inps|posizione\s+inps)\s*[:;\-]?\s*([A-Z0-9./-]{5,30})/i]),.98);
    add("inailPosition",first(text,[/(?:n[°º]\s*iscrizione\s+inail|posizione\s+inail)\s*[:;\-]?\s*([A-Z0-9./-]{5,40}(?:\s*[-–]\s*pat\.?\s*[A-Z0-9./-]+)?)/i]),.96);

    // Assicurazione: OCR tollerante per intestazione, date in tabella e massimale RCT.
    let insurer=first(text,[
      /\b((?:SOCIET[ÀA-Z]*\s+)?REALE\s+MUTUA(?:\s+DI\s+ASSICURAZIONI)?)/i,
      /\b(UNIPOL(?:\s+ASSICURAZIONI)?(?:\s+S\.?P\.?A\.?)?)/i,
      /\b(ALLIANZ|GENERALI|UNIPOLSAI|AXA|ZURICH|REALE MUTUA|VITTORIA ASSICURAZIONI|HELVETIA|GROUPAMA|HDI|ITALIANA ASSICURAZIONI)\b/i
    ]);
    add("insuranceCompany",insurer,.999);
    let policy=first(text,[
      /(?:numero\s+di\s+polizza|numero\s+polizza|polizza\s*n[.:°º]*)\s*[:\-]?\s*([0-9]{3,5}\s*\/\s*[0-9]{2}\s*\/\s*[0-9]{6,10})/i,
      /\b(20\d{2}\s*\/\s*\d{2}\s*\/\s*\d{6,10})\b/i,
      /(?:n(?:umero)?[.°º\s]*\s*(?:di\s+)?polizza|numero\s+polizza)\s*[:\-]?\s*([A-Z0-9][A-Z0-9\-/.]{2,49})/i
    ]).replace(/\s+/g,"");
    add("policyNumber",policy,.99);
    let expiry="";
    const direct=first(text,[
      /scadenza\s+(?:del\s+)?contratto\s*[:\-]?\s*(\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{4})/i,
      /scadenza\s+(?:della\s+)?polizza\s*[:\-]?\s*(\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{4})/i
    ]);
    if(direct)expiry=dateISO(direct);
    if(!expiry){
      const header=(text.match(/DECORRENZA\s+CONTRATTO[\s\S]{0,500}/i)||[])[0]||"";
      const candidates=[];
      for(const m of header.matchAll(/\b(\d{1,2})\D{1,12}(\d{1,2})\D{1,12}(20\d{2})\b/g)){
        const d=Number(m[1]),mo=Number(m[2]),y=Number(m[3]);
        if(d>=1&&d<=31&&mo>=1&&mo<=12)candidates.push({d,mo,y});
      }
      candidates.sort((a,b)=>a.y-b.y||a.mo-b.mo||a.d-b.d);
      const last=candidates.at(-1);if(last)expiry=`${last.y}-${String(last.mo).padStart(2,"0")}-${String(last.d).padStart(2,"0")}`;
    }
    add("policyExpiry",expiry,.999);
    const rct=text.match(/massimale\s+per\s+sinistro\s+euro[\s\S]{0,260}?(5(?:[.\s]000){2}(?:,00)?)/i);
    const generic=first(text,[/(?:massimale|somma\s+assicurata)\s*[:\-]?\s*(?:€|euro)?\s*([0-9. ,]{3,30})/i]);
    add("policyLimit",rct?.[1]||generic,.999);

    // DURC: evita di scambiare il nome dell'ente INAIL per il protocollo.
    add("durcProtocol",first(text,[/(?:numero\s+protocollo|protocollo)\s*[:\-]?\s*((?=[A-Z0-9\-/.]*\d)[A-Z0-9][A-Z0-9\-/.]{4,49})/i,/\b(INPS_[A-Z0-9_\-]{6,50}|INAIL_[A-Z0-9_\-]{6,50})\b/i]),.90);
    const de=first(text,[/(?:scadenza\s+validit[aà]|valido\s+fino\s+al)\s*[:\-]?\s*(\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{4})/i]);add("durcExpiry",dateISO(de),.87);
    if(/risulta\s+regolare|regolare\s+nei\s+confronti/i.test(text))add("durcStatus","Regolare",.94);
    return out;
  }
  async function extract(files,onProgress){const all=[];for(let i=0;i<files.length;i++){const f=files[i];onProgress?.(f.name,i+1,files.length);try{const text=await fileText(f);all.push(...extractFromText(text,f))}catch(err){all.push({error:true,source:f.name,message:err.message})}}return merge(all)}
  function sourcePriority(field,type){
    const rules={
      companyName:{certificato:700,visura:500,duvri:300,altro:100,polizza:50,durc:50},
      registeredOffice:{sede_ufficiale:1000,certificato:700,visura:500,duvri:300,altro:100,polizza:50,durc:50},
      legalRepresentative:{certificato:650,visura:500,duvri:350,altro:100,polizza:40,durc:40},
      vatNumber:{certificato:700,visura:500,duvri:300,durc:150,altro:100},fiscalCode:{certificato:700,visura:500,duvri:300,durc:150,altro:100},rea:{certificato:700,visura:500,duvri:250,altro:100},pec:{certificato:700,visura:500,duvri:350,altro:100},
      phone:{duvri:500,visura:250,altro:100},email:{duvri:500,visura:250,altro:100},inpsPosition:{duvri:500,durc:400,visura:300,altro:100},inailPosition:{duvri:500,durc:400,visura:300,altro:100},
      insuranceCompany:{polizza:500,duvri:250,altro:100},policyNumber:{polizza:500,altro:100},policyExpiry:{polizza:500,altro:100},policyLimit:{polizza:500,altro:100},
      durcProtocol:{durc:500,altro:100},durcExpiry:{durc:500,altro:100},durcStatus:{durc:500,altro:100}
    };
    return rules[field]?.[type]??100;
  }
  function merge(items){
    const chosen={},conflicts=[];
    for(const raw of items.filter(x=>!x.error)){
      const normalized=normalizeField(raw.field,raw.value);
      if(!normalized)continue;
      const x={...raw,value:normalized},current=chosen[x.field];
      if(!current){chosen[x.field]=x;continue}
      if(current.value===x.value)continue;
      conflicts.push({field:x.field,label:x.label,values:[current,x]});
      const rankX=sourcePriority(x.field,x.sourceType),rankCurrent=sourcePriority(current.field,current.sourceType);
      if(rankX>rankCurrent||(rankX===rankCurrent&&x.confidence>current.confidence))chosen[x.field]=x;
    }
    const values=Object.fromEntries(Object.entries(chosen).map(([k,v])=>[k,v.value]));
    if(!values.vatNumber&&/^\d{11}$/.test(values.fiscalCode||""))values.vatNumber=values.fiscalCode;
    if(!values.fiscalCode&&/^\d{11}$/.test(values.vatNumber||""))values.fiscalCode=values.vatNumber;
    return {values,evidence:Object.values(chosen),conflicts,errors:items.filter(x=>x.error)};
  }
  return {extract,FIELD_LABELS};
})();
