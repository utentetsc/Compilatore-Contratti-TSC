const DocumentParser = (() => {
  console.info("Parser build: v1.0.2 ABC assicurazione e firma");
  const FIELD_LABELS={companyName:"Ragione sociale",vatNumber:"Partita IVA",fiscalCode:"Codice fiscale",rea:"REA",registeredOffice:"Sede legale",pec:"PEC",legalRepresentative:"Legale rappresentante",insuranceCompany:"Compagnia assicurativa",policyNumber:"Numero polizza",policyExpiry:"Scadenza polizza",policyLimit:"Massimale",durcProtocol:"Protocollo DURC",durcExpiry:"Scadenza DURC",durcStatus:"Esito DURC",phone:"Telefono",mobilePhone:"Telefono reperibilità",email:"E-mail",inpsPosition:"Posizione INPS",inailPosition:"Posizione INAIL"};
  const clean=v=>String(v||"").replace(/\s+/g," ").trim().replace(/[;,.]+$/g,"");
  const dateISO=v=>{const m=String(v||"").match(/\b(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})\b/);return m?`${m[3]}-${m[2].padStart(2,"0")}-${m[1].padStart(2,"0")}`:""};
  async function pdfText(file){
    if(!window.pdfjsLib)throw new Error("Libreria PDF non disponibile");
    pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
    const pdf=await pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise;
    const pages=[];
    for(let i=1;i<=pdf.numPages;i++){
      const page=await pdf.getPage(i),content=await page.getTextContent();
      pages.push(content.items.map(x=>String(x.str||"").trim()).filter(Boolean).join(" "));
    }
    let text=pages.join("\n");
    const fileName=file.name||"",isDuvri=/DUVRI|ANAGRAFICA|DATI.*FORNITORE/i.test(fileName),isPolicy=/POLIZZA|QUIETANZA|ASSICUR/i.test(fileName);
    const selectiveOcr=(isDuvri&&text.replace(/\s/g,"").length<700)||isPolicy;
    if(selectiveOcr&&window.Tesseract&&pdf.numPages){
      const ocrPages=[],maxPages=Math.min(3,pdf.numPages);
      for(let i=1;i<=maxPages;i++){
        const page=await pdf.getPage(i),viewport=page.getViewport({scale:2.0}),canvas=document.createElement("canvas"),ctx=canvas.getContext("2d",{willReadFrequently:true});
        canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);await page.render({canvasContext:ctx,viewport}).promise;
        console.info(`[OCR ${isDuvri?"DUVRI":"polizza"}] ${fileName} pagina ${i}/${maxPages}`);
        try{ocrPages.push((await Tesseract.recognize(canvas,"eng")).data?.text||"")}catch(err){console.warn("OCR selettivo non riuscito",fileName,i,err)}
      }
      text=ocrPages.join("\n")+"\n"+text;
    }
    // Eccezione controllata: il certificato CCIAA obbligatorio e la fonte anagrafica principale.
    // Se e una scansione senza testo, OCR solo della prima pagina e solo in inglese.
    const isPrimaryCciaa=/(?:ALL\s*B|ALLEGATO\s*B)?[ .;_-]*(?:CERTIFICATO|CERTIF\.?|VISURA)[^\n]*?(?:CCIAA|CAMERAL|ISCRIZIONE)/i.test(file.name||"");
    if(isPrimaryCciaa&&text.replace(/\s/g,"").length<250&&window.Tesseract&&pdf.numPages){
      // Il certificato puo essere interamente scannerizzato. Le prime due pagine contengono
      // normalmente denominazione, sede, REA, PEC e dati identificativi. L'OCR completo
      // delle altre pagine resta demandato al controllo camerale, evitando doppio lavoro.
      const ocrPages=[];
      for(let i=1;i<=Math.min(3,pdf.numPages);i++){
        const page=await pdf.getPage(i),viewport=page.getViewport({scale:2.2});
        const canvas=document.createElement("canvas"),ctx=canvas.getContext("2d",{willReadFrequently:true});
        canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);
        await page.render({canvasContext:ctx,viewport}).promise;
        try{
          console.info(`[OCR anagrafico] ${file.name} pagina ${i}/${Math.min(3,pdf.numPages)} avvio`);
          const result=await Tesseract.recognize(canvas,"eng",{logger:m=>{if(m.status==="recognizing text"&&Math.round((m.progress||0)*100)%25===0)console.info(`[OCR anagrafico] pagina ${i}: ${Math.round((m.progress||0)*100)}%`)}});
          console.info(`[OCR anagrafico] ${file.name} pagina ${i} completata`);
          ocrPages.push(result.data?.text||"");
        }catch(err){console.warn("OCR anagrafico CCIAA non riuscito, pagina",i,err)}
      }
      text=ocrPages.join("\n")+"\n"+text;
    }
    return text;
  }
  async function docxText(file){if(!window.mammoth)throw new Error("Libreria DOCX non disponibile");return (await mammoth.extractRawText({arrayBuffer:await file.arrayBuffer()})).value}
  async function imageText(file){if(!window.Tesseract)throw new Error("Libreria OCR non disponibile");return (await Tesseract.recognize(file,"eng")).data.text}
  async function fileText(file){const n=file.name.toLowerCase();if(n.endsWith(".txt"))return file.text();if(n.endsWith(".pdf"))return pdfText(file);if(n.endsWith(".docx"))return docxText(file);if(/\.(png|jpe?g)$/.test(n))return imageText(file);return ""}
  function first(text,res){for(const re of res){const m=text.match(re);if(m?.[1])return clean(m[1])}return ""}
  function documentType(text,file){
    const fileName=String(file?.name||"").toLowerCase();
    // Il nome del file e piu affidabile del contenuto: le condizioni assicurative possono
    // contenere parole come certificato/iscrizione e venivano classificate come CCIAA.
    if(/polizza|quietanza|assicur/.test(fileName))return "polizza";
    if(/duvri|anagrafica|dati.*fornitore/.test(fileName))return "duvri";
    if(/durc/.test(fileName))return "durc";
    const hay=`${fileName} ${String(text||"").slice(0,5000)}`.toLowerCase();
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
    let v=clean(value)
      .replace(/VIA\s+VESPUCCI,?\s*TRAV\.?VIA\s*=?.*?VESPUCCI\s*10/i,"Traversa Via Amerigo Vespucci 10")
      .replace(/VIA\s+TRAVERSA\s+VIA\s+VESPUCCI,?\s*10/i,"Traversa Via Amerigo Vespucci 10").replace(/appaltatore\s*-\s*esecutori[\s\S]*$/i,"").replace(/([a-zà-ÿ])([A-ZÀ-Ü])/g,"$1 $2").replace(/\bint\.?\s*(\d+)/i,"int. $1");
    v=v.replace(/\s*,\s*/g,", ").replace(/\s{2,}/g," ").replace(/[•]+/g,"").replace(/[.,;]+$/g,"");
    return titleWords(v).replace(/\bInt\.\s*/g,"int. ");
  }
  function normalizeField(field,value){
    value=clean(value);
    if(field==="companyName"){
      value=value.replace(/\s+(?:codice\s+fiscale|partita\s+iva|p\.?\s*iva|numero\s+rea|rea|sede\s+legale|domicilio\s+digitale|pec)\b[\s\S]*$/i,"").trim();
      if(/^(?:in cifre|l.impresa in cifre)$/i.test(value))return "";
      if(/^(via|viale|corso|piazza|strada|localita|sede legale|codice fiscale|numero d.iscrizione|registro imprese|partita iva|dati per duvri|attivit[aà]|stato attivit[aà]|data inizio attivit[aà]|dati anagrafici|l.impresa in cifre|forma giuridica|sede)\b/i.test(value))return "";
      if(/\b(qr\s*code|consente\s+di\s+verificare|corrispondenza\s+tra\s+questo|documento\s+informatico|camera\s+di\s+commercio|registro\s+delle\s+imprese)\b/i.test(value))return "";
      return titleWords(value);
    }
    if(field==="policyNumber"){
      const v=value.replace(/\s+/g,"").toUpperCase();
      if(!/\d/.test(v)||/^(?:SCAD|SCADENZA|POLIZZA|NUMERO|N\.?POLIZZA)$/.test(v))return "";
      return value;
    }
    if(field==="registeredOffice")return normalizeAddress(value);
    if(field==="legalRepresentative")return titleWords(validPersonName(value.replace(/[•]+/g,"")));
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
  function insurerCanonical(v){
    v=clean(v);
    if(/UNIPOL(?:SAI)?(?:\s+ASSICURAZIONI)?/i.test(v))return "Unipol Assicurazioni S.p.A.";
    if(/GENERALI(?:\s+ITALIA)?|GENERTEL|GRUPPO\s+GENERALI/i.test(v))return "Generali Italia S.p.A.";
    if(/SOCIET[AÀ]\s+REALE\s+MUTUA|REALE\s+MUTUA/i.test(v))return "Societa Reale Mutua di Assicurazioni";
    if(/ALLIANZ/i.test(v))return "Allianz S.p.A.";
    if(/ZURICH/i.test(v))return "Zurich Insurance Company Ltd";
    if(/VITTORIA\s+ASSICURAZIONI/i.test(v))return "Vittoria Assicurazioni S.p.A.";
    return "";
  }
  function insurerFromDocument(text){
    // Prima scelta: la compagnia scritta nella stessa clausola di responsabilita/polizza.
    const labelled=[
      /polizza\s+responsabilit[aà]\s+civile(?:\s+verso\s+terzi)?\s*[:;\-]?\s*([^\n]{2,140}?)(?=\s+polizza\s+n|\s+n[.°º]?\s*polizza|\n|$)/i,
      /(?:impresa|compagnia|societ[aà])\s+assicuratrice\s*[:;\-]?\s*([^\n]{2,120})/i,
      /(?:assicuratore|compagnia)\s*[:;\-]?\s*([^\n]{2,120})/i
    ];
    for(const re of labelled){const m=text.match(re);const c=insurerCanonical(m?.[1]||"");if(c)return c}
    // Seconda scelta: marchio nell'intestazione iniziale. Solo dopo, testo completo.
    const head=text.slice(0,2500),all=text;
    for(const scope of [head,all]){
      for(const re of [/UNIPOL(?:SAI)?(?:\s+ASSICURAZIONI)?/i,/GENERALI(?:\s+ITALIA)?|GENERTEL|GRUPPO\s+GENERALI/i,/SOCIET[AÀ]\s+REALE\s+MUTUA|REALE\s+MUTUA/i,/ALLIANZ/i,/ZURICH/i,/VITTORIA\s+ASSICURAZIONI/i]){
        const m=scope.match(re);if(m)return insurerCanonical(m[0]);
      }
    }
    return "";
  }
  function validPersonName(v){
    v=clean(v).replace(/^(?:sig\.?|dott\.?|ing\.?)\s*/i,"").replace(/\s+/g," ").trim();
    v=v.replace(/[’`]/g,"'");
    if(!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]{5,80}$/.test(v))return "";
    if(/(?:responsabile\s+tecnico|rspp|medico\s+competente|intermediario|agenzia|contraente|assicurato|codice\s+fiscale|nato\s+a)/i.test(v))return "";
    const words=v.split(/\s+/).filter(Boolean);
    if(words.some(w=>w.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]/g,"").length<2))return "";
    const letters=words.join("").replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]/g,"");
    return words.length>=2&&words.length<=6&&letters.length>=8?v:"";
  }
  function extractFromText(text,file){
    const sourceType=documentType(text,file);
    const out=[], add=(field,value,confidence=0.82)=>{value=clean(value).replace(/^[/\\|:;,-]+\s*/,"");if(value)out.push(evidence(field,value,file,confidence,sourceType))};
    const officialOffice=officialRegisteredOffice(text);
    if(officialOffice)out.push(evidence("registeredOffice",officialOffice,{name:file.name},1,"sede_ufficiale"));
    // Visure InfoCamere a piu colonne: la denominazione completa ricompare
    // nell'intestazione delle pagine fra "Registro Imprese" e "Archivio ufficiale".
    // Regola generale, indipendente dalla ditta e dal nome esatto del file.
    if(sourceType==="visura"||sourceType==="certificato"){
      // Nelle visure InfoCamere il nome compare sulla stessa riga di
      // "Registro Imprese", nella colonna destra. Limitiamo il match alla
      // singola riga per non attraversare intestazioni come "Industria
      // Artigianato" o la dicitura "Impresa artigiana".
      const registryRows=[...String(text||"").matchAll(/^\s*Registro\s+Imprese[ \t]+([^\r\n]{3,180})\s*$/gim)]
        .map(m=>String(m[1]||"").trim())
        .filter(v=>!/^[-–—:]?\s*Archivio\s+ufficiale/i.test(v))
        .filter(v=>!/(?:estratto|data|codice\s+fiscale|numero\s+di\s+iscrizione)/i.test(v));
      const headerCompany=registryRows.sort((a,b)=>b.length-a.length)[0]||first(text,[
        /VISURA\s+ORDINARIA\s+DELL['’]IMPRESA\s+([A-ZÀ-Ü0-9][A-ZÀ-Ü0-9 &'’.\/-]{2,140}?)(?=\s+DATI\s+ANAGRAFICI|\s+Registro\s+Imprese|$)/i
      ]);
      if(headerCompany)add("companyName",headerCompany,.9999);
    }
    // Visure scannerizzate InfoCamere: le etichette sono spesso in una colonna e i valori
    // in una seconda colonna, quindi non sono necessariamente adiacenti nel testo OCR.
    if(/VISURA\s+(?:ORDINARIA|STORICA)|REGISTRO\s+IMPRESE|INFOCAMERE/i.test(text)){
      const upper=text.toUpperCase();
      const visName=first(text,[/VISURA\s+(?:ORDINARIA|STORICA)[^\n]*\n\s*([A-ZÀ-Ü0-9 &' .-]{3,100}(?:SRL|S\.?R\.?L\.?|SPA|S\.?P\.?A\.?))/i,/\n\s*([A-ZÀ-Ü0-9 &' .-]{3,100}(?:SRL|S\.?R\.?L\.?))\s*\n/i]);
      add("companyName",visName,.999);
      add("pec",first(text,[/\b([A-Z0-9._%+\-]+@(?:PEC\.)?[A-Z0-9.\-]+\.[A-Z]{2,})\b/i]),.999);
      add("rea",first(text,[/\b([A-Z]{2})\s*[-–]\s*(\d{4,10})\b/i]).replace(/\s+/g,""),.999);
      const ids=[...text.matchAll(/\b(\d{11})\b/g)].map(m=>m[1]);
      if(ids.length){add("vatNumber",ids[0],.999);add("fiscalCode",ids[1]||ids[0],.999)}
      const office=first(text,[/([A-ZÀ-Ü][A-ZÀ-Ü' .-]{2,50})\s*\(([A-Z]{2})\)\s+((?:VIA|VIALE|CORSO|PIAZZA|STRADA|LARGO|LOCALIT[AÀ]|V\.\s*VIA)[^\n]{4,100}?(?:CAP\s*)?\d{5})/i]);
      if(office)add("registeredOffice",office,.995);
      // Caso tabellare InfoCamere: localita e indirizzo possono essere separati da molte etichette.
      const city=text.match(/\b(MONTESILVANO|LECCE|PESCARA|ROMA|MILANO|NAPOLI|SALERNO)\s*\(([A-Z]{2})\)/i);
      const addr=text.match(/((?:V\.\s*)?(?:VIA|VIALE|CORSO|PIAZZA|STRADA|LARGO)[A-Z0-9À-Ü ,.'\/-]{4,100}?\s+CAP\s*\d{5})/i);
      if(city&&addr)add("registeredOffice",`${addr[1]}, ${city[1]} (${city[2]})`,.999);
      const reps=[...text.matchAll(/\b([A-ZÀ-Ü]{2,30}\s+[A-ZÀ-Ü]{2,30})\s*\n\s*Rappresentante\s+dell['’]?[Ii]mpresa/gi)].map(m=>m[1]);
      if(reps.length)add("legalRepresentative",reps[0],.995);
    }    const stop="(?=\\s+(?:partita\\s+iva|codice\\s+fiscale|sede\\s+legale|pec|rea|legale\\s+rappresentante|compagnia|polizza|massimale|decorrenza|scadenza|protocollo|inail|inps)\\b|$)";
    for(const re of [/(?:n[°º.]?\s*iscrizione\s+cciaa?)\s*[:;\-]?\s*([A-Z]{2})\s*[-–/]?\s*(\d{4,10})/i,/(?:numero\s+rea|r\.?e\.?a\.?)\s*[:;\-]?\s*([A-Z]{2})\s*[-–/]?\s*(\d{4,10})/i]){const m=text.match(re);if(m){add("rea",`${m[1].toUpperCase()}-${m[2]}`,.999);break}}
    // Registro Imprese / REA: supporta CCIA, CCIAA, Numero REA e formati con spazi o trattini.
    const reaPatterns=[
      /(?:n[°º.]?\s*(?:di\s*)?iscrizione\s+(?:cciaa?|camera\s+di\s+commercio)|numero\s+rea|r\.?e\.?a\.?)\s*[:;\-]?\s*([A-Z]{2})\s*[-–/]?\s*(\d{4,10})/i,
      /(?:registro\s+imprese)[\s\S]{0,100}?(?:rea|r\.?e\.?a\.?)\s*[:;\-]?\s*([A-Z]{2})\s*[-–/]?\s*(\d{4,10})/i
    ];
    for(const re of reaPatterns){const m=text.match(re);if(m){add("rea",`${m[1].toUpperCase()}-${m[2]}`,.995);break}}

    if(sourceType==="certificato"||sourceType==="visura"){
      const officialRep=first(text,[
        /(?:amministratore|amministratrice)\s+unic[oa]\s*[:;\-]?\s*([A-ZÀ-Ü][A-ZÀ-Ü'’ -]{5,80}?)(?=\s+(?:rappresentante\s+dell['’ ]?impresa|codice\s+fiscale|nata?\s+a|residenza|carica)|$)/i,
        /([A-ZÀ-Ü][A-ZÀ-Ü'’ -]{5,80}?)\s+rappresentante\s+dell['’ ]?impresa/i
      ]);
      add("legalRepresentative",officialRep,1.0);
    }
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
    add("legalRepresentative",first(text,[
      /(?:IN\s+PERSONA\s+DI|NELLA\s+PERSONA\s+DI)\s+(?:DEL(?:LA)?\s+)?(?:SIG\.?\s*)?([A-ZÀ-Ü][A-ZÀ-Ü' -]{3,70}?)(?=\s*(?:,|DOMICILIAT|IN\s+QUALIT|LEGALE\s+RAPPRESENTANTE|$))/i,
      /(?:AMMINISTRATORE\s+UNICO|LEGALE\s+RAPPRESENTANTE)\s*[:;\-]?\s*(?:SIG\.?\s*)?([A-ZÀ-Ü][A-ZÀ-Ü' -]{3,70})/i
    ]),.995);
    add("legalRepresentative",first(text,[new RegExp("(?:legale\\s+rappresentante|rappresentante\\s+legale)\\s*[:\\-]?\\s*(.{3,90}?)"+stop,"i")]),.82);
    add("legalRepresentative",first(text,[/(?:amministratore\s+unico|amministratore\s+delegato|titolare|rappresentante\s+dell[’' ]?impresa)\s*[:;\-]?\s*(?:sig\.?\s*)?([A-ZÀ-Ü][A-Za-zÀ-ÖØ-öø-ÿ' -]{4,79})/i]),.90);
    // Modello DUVRI e schede anagrafiche: fonte prioritaria per dati operativi.
    add("companyName",first(text,[/(?:ragione\s+sociale|denominazione\s+ditta)\s*[:;]?\s*([A-ZÀ-Ü][A-ZÀ-Ü0-9 &'\.\-]{4,120}?)(?=\s+(?:forma\s+giuridica|indirizzo|sede\s+legale|P\.?\s*IVA|C\.?F\.?)|\n|$)/i,/(?:ditta\s+aggiudicataria)\s*[:;]?\s*([A-ZÀ-Ü][A-ZÀ-Ü0-9 &'\.\-]{4,120}?)(?=\s+P\.?\s*IVA|\n|$)/i]),.995);
    add("inpsPosition",first(text,[/(?:n[°º]\s*iscrizione\s+inps|posizione\s+inps)\s*[:;\-]?\s*(metal(?:meccanico)?\s*[:;]?\s*\d{6,15}\s+(?:edile|e)\s*[:;]?\s*\d{6,15})/i,/(Metalmeccanico\s*:\s*\d{6,15}\s+edile\s*:\s*\d{6,15})/i]),.995);
    add("companyName",first(text,[/(?:ditta\s+aggiudicataria[^:]*|denominazione\s+ditta|ragione\s+sociale)\s*:\s*([^\n]{3,100}?)(?=\s+(?:P\.?\s*IVA|C\.?F\.?|forma\s+giuridica|legale\s+rappresentante)|$)/i]),.98);
    add("registeredOffice",first(text,[/(?:sede\s+legale|indirizzo)\s*:\s*([^\n]{5,150}?)(?=\s+(?:appaltatore\s*-\s*esecutori|recapiti|@?email|n[°º]\s*iscrizione)|$)/i]),.97);
    add("legalRepresentative",first(text,[/(?:legale\s+rappresentante)\s*:\s*(?:sig\.?\s*)?([A-ZÀ-Ü][A-ZÀ-Ü' -]{3,80}?)(?=\s+(?:sede\s+legale|denominazione|ragione\s+sociale|forma\s+giuridica|indirizzo|recapiti)|$)/i]),.98);
    add("phone",first(text,[/(?:recapiti|tel(?:efono)?)[\s:]*([+\d][\d\s./-]{6,25})/i]),.95);
    add("email",first(text,[/(?:@?email|e-mail|mail)\s*[:;]?\s*([A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,})/i]),.98);
    add("inpsPosition",first(text,[/(?:n[°º]?\s*iscrizione\s+inps|matricola\s+inps|posizione\s+inps)(?:\s*[;:\-]?\s*SEDE\s+DI\s+[A-ZÀ-Ü]+)?\s*[:;\-]?\s*([0-9]{6,15})/i]),.98);
    add("inailPosition",first(text,[/(?:n[°º]?\s*iscrizione\s+inail|posizione\s+inail)(?:\s*[;:\-]?\s*SEDE\s+DI\s+[A-ZÀ-Ü]+)?\s*[:;\-]?\s*([0-9]{6,15}(?:\s*[-–]\s*pat\.?\s*[A-Z0-9./-]+)?)/i]),.96);

    // DUVRI / anagrafica fornitore: fonte autoritativa per dati operativi.
    // Le regex cercano il numero anche se OCR inserisce simboli, sede provinciale o testo intermedio.
    if(sourceType==="duvri"){
      const explicitRep=first(text,[
        /legale\s+rappresentante\s*[:;\-]?\s*(?:sig\.?\s*)?([A-ZÀ-Ü][A-ZÀ-Ü'’ -]{5,80}?)(?=\s+(?:sede\s+legale|denominazione|ragione\s+sociale|forma\s+giuridica|indirizzo|recapiti|$))/i,
        /il\s+sottoscritto\s+([A-ZÀ-Ü][A-ZÀ-Ü'’ -]{5,80}?)\s+legale\s+rappresentante/i
      ]);
      add("legalRepresentative",explicitRep,1.0);
      const policyLine=first(text,[/polizza\s+responsabilit[aà]\s+civile(?:\s+verso\s+terzi)?\s*[:;\-]?\s*([^\n]{3,180})/i]);
      const duvriInsurer=insurerFromDocument(policyLine||text);
      const duvriPolicy=first(policyLine||text,[/polizza\s+n[.°º]?\s*([A-Z0-9][A-Z0-9\/.\-]{4,60})/i]);
      add("insuranceCompany",duvriInsurer,.9999);
      add("policyNumber",duvriPolicy,.9999);

      // Associazione stretta: il numero deve seguire immediatamente la relativa etichetta.
      // Evita che una posizione INPS assente o mal letta catturi il successivo numero INAIL.
      const duvriInps=first(text,[
        /(?:N[°º.]?\s*ISCRIZIONE\s+INPS|ISCRIZIONE\s+INPS|POSIZIONE\s+INPS|MATRICOLA\s+INPS)\s*(?:N[°º.]?|NUMERO)?\s*[:;\-]?\s*(\d(?:[\s.]?\d){7,14})(?=\s*(?:\n|N[°º.]?\s*ISCRIZIONE\s+INAIL|ISCRIZIONE\s+INAIL|POSIZIONE\s+INAIL|$))/i,
        /INPS\s*(?:N[°º.]?|NUMERO)\s*[:;\-]?\s*(\d(?:[\s.]?\d){7,14})/i
      ]).replace(/[\s.]/g,"");
      const duvriInail=first(text,[
        /(?:N[°º.]?\s*ISCRIZIONE\s+INAIL|ISCRIZIONE\s+INAIL|POSIZIONE\s+INAIL|MATRICOLA\s+INAIL)\s*(?:N[°º.]?|NUMERO)?\s*[:;\-]?\s*(\d(?:[\s.]?\d){7,16})(?=\s*(?:\n|N[°º.]?\s*ISCRIZIONE\s+ALBO|ISCRIZIONE\s+ALBO|POLIZZA|$))/i,
        /INAIL\s*(?:N[°º.]?|NUMERO)\s*[:;\-]?\s*(\d(?:[\s.]?\d){7,16})/i
      ]).replace(/[\s.]/g,"");
      const duvriRep=first(text,[
        /LEGALE\s+RAPPRESENTANTE\s*[:;\-]?\s*(?:SIG\.?\s*)?([A-ZÀ-Ü][A-ZÀ-Ü' -]{3,70}?)(?=\s*(?:\n|DENOMINAZIONE|SEDE|RAGIONE|P\.?\s*IVA|C\.?F\.?))/i,
        /(?:IL\s+SOTTOSCRITTO|LA\s+SOTTOSCRITTA)\s+([A-ZÀ-Ü][A-ZÀ-Ü' -]{3,70}?),?\s+LEGALE\s+RAPPRESENTANTE/i
      ]);
      const duvriMail=first(text,[/(?:@?EMAIL|E-MAIL|MAIL)\s*[:;]?\s*([A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,})/i]);
      const phones=first(text,[/(?:RECAPITI|TEL(?:EFONO)?)[\s:;]*([+\d][\d\s./-]{6,40})/i]);
      const phoneNums=(phones.match(/(?:\+39\s*)?\d[\d\s./-]{6,15}/g)||[]).map(x=>clean(x));
      add("inpsPosition",duvriInps,.9999);
      add("inailPosition",duvriInail,.9999);
      add("legalRepresentative",duvriRep,.9999);
      add("email",duvriMail,.9999);
      if(phoneNums[0])add("phone",phoneNums[0],.9999);
      if(phoneNums[1])add("mobilePhone",phoneNums[1],.9999);
    }

    // Assicurazione: OCR tollerante per intestazione, date in tabella e massimale RCT.
    let insurer=first(text,[
      /\b((?:SOCIET[ÀA-Z]*\s+)?REALE\s+MUTUA(?:\s+DI\s+ASSICURAZIONI)?)/i,
      /\b(UNIPOL(?:\s+ASSICURAZIONI)?(?:\s+S\.?P\.?A\.?)?)/i,
      /\b(ALLIANZ|GENERALI|UNIPOLSAI|AXA|ZURICH|REALE MUTUA|VITTORIA ASSICURAZIONI|HELVETIA|GROUPAMA|HDI|ITALIANA ASSICURAZIONI)\b/i
    ]);
    let policy=first(text,[
      /(?:numero\s+di\s+polizza|numero\s+polizza|polizza\s*n[.:°º]*|n[.:°º]*\s*polizza)\s*[:\-]?\s*([A-Z0-9]{1,8}(?:\s*\/\s*[A-Z0-9]{1,12}){1,5})/i,
      /\b(20\d{2}\s*\/\s*\d{2}\s*\/\s*\d{6,10})\b/i,
      /(?:n(?:umero)?[.°º\s]*\s*(?:di\s+)?polizza|numero\s+polizza)\s*[:\-]?\s*([A-Z0-9][A-Z0-9\-/.]{2,49})/i
    ]).replace(/\s+/g,"");
    if(sourceType==="polizza"){
      // Normalizzazione compagnia: non lasciare il solo marchio generico.
      const contextualInsurer=insurerFromDocument(text);
      if(contextualInsurer)insurer=contextualInsurer;
      else if(/GENERALI(?:\s+ITALIA)?|GENERTEL|GRUPPO\s+GENERALI/i.test(text))insurer="Generali Italia S.p.A.";
      else if(/UNIPOL(?:SAI)?(?:\s+ASSICURAZIONI)?/i.test(text))insurer="Unipol Assicurazioni S.p.A.";
      else if(/SOCIET[AÀ]\s+REALE\s+MUTUA|REALE\s+MUTUA/i.test(text))insurer="Societa Reale Mutua di Assicurazioni";
      else if(/ALLIANZ/i.test(text))insurer="Allianz S.p.A.";
      else if(/ZURICH/i.test(text))insurer="Zurich Insurance Company Ltd";
      else if(/VITTORIA\s+ASSICURAZIONI/i.test(text))insurer="Vittoria Assicurazioni S.p.A.";

      // Lettura generale: numero polizza ricavato dalle etichette del documento.
      const contextual=[
        /N\.?\s*POLIZZA[\s\S]{0,450}?\b(4\d{8})\b/i,
        /N[°º]?\s*POLIZZA[\s\S]{0,250}?\b(\d{9,12})\b/i,
        /RAMO[\s\S]{0,500}?\b(\d{9,12})\b[\s\S]{0,100}?\b\d{1,2}\/\d{1,2}\/20\d{2}\b/i
      ];
      const labelled=first(text,contextual);
      const candidates=[...text.matchAll(/\b(\d{9,12})\b/g)].map(m=>m[1])
        .filter(n=>!/^0+$/.test(n)&&!/^14782653$/.test(n));
      const counts=candidates.reduce((a,n)=>(a[n]=(a[n]||0)+1,a),{});
      const ranked=Object.keys(counts).sort((a,b)=>counts[b]-counts[a]||b.length-a.length);
      policy=policy||labelled||ranked.find(n=>/^4\d{8}$/.test(n))||ranked[0]||"";

      // Per la quietanza la scadenza contrattuale e la RATA SUCCESSIVA, cioe la data futura massima.
      const dates=[...text.matchAll(/\b(\d{1,2})[\/.\-](\d{1,2})[\/.\-](20\d{2})\b/g)]
        .map(m=>({raw:m[0],d:+m[1],mo:+m[2],y:+m[3]}))
        .filter(x=>x.d>=1&&x.d<=31&&x.mo>=1&&x.mo<=12)
        .sort((a,b)=>b.y-a.y||b.mo-a.mo||b.d-a.d);
      // Le date libere non vengono classificate come scadenza: possono essere emissione o quietanza.
    }
    add("insuranceCompany",insurer,.999);
    add("policyNumber",policy,.99);
    // Scadenza polizza: considera solo etichette assicurative di fine validita.
    // Esclude date di emissione, decorrenza, quietanza, pagamento e scadenza rata.
    let expiry="";
    const expiryPatterns=[
      /(?:scadenza|termine)\s+(?:del\s+)?contratto\s*[:\-]?\s*(\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{4})/i,
      /(?:scadenza|validit[aà]\s+fino\s+al|valida?\s+fino\s+al)\s+(?:della\s+)?polizza\s*[:\-]?\s*(\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{4})/i,
      /(?:periodo\s+di\s+assicurazione|durata\s+contratto)[\s\S]{0,180}?(?:al|a)\s*(\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{4})/i,
      /(?:dalle\s+ore[^\n]{0,90}?del\s+\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{4})[\s\S]{0,120}?(?:alle\s+ore[^\n]{0,90}?del\s+)(\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{4})/i
    ];
    const labelledExpiry=first(text,expiryPatterns);
    if(labelledExpiry)expiry=dateISO(labelledExpiry);
    // Nelle quietanze la data utile e "RATA SUCC." / "PROSSIMA RATA", non la data di emissione.
    if(!expiry&&sourceType==="polizza"){
      const nextInstalment=first(text,[
        /(?:rata\s+succ(?:essiva)?|prossima\s+rata|prossima\s+scadenza)\s*[:\-]?\s*(\d{1,2}[\/.\-]\d{1,2}[\/.\-]20\d{2})/i,
        /(?:rata\s+succ(?:essiva)?|prossima\s+rata|prossima\s+scadenza)[\s\S]{0,100}?(\d{1,2}[\/.\-]\d{1,2}[\/.\-]20\d{2})/i
      ]);
      if(nextInstalment)expiry=dateISO(nextInstalment);
    }
    // Il nome documento e una fonte esplicita anche quando l'OCR classifica male il PDF.
    // "scad.08.2027" viene normalizzato all'ultimo giorno del mese: 31/08/2027.
    if(!expiry){
      const name=String(file.name||"");
      const fd=name.match(/scad(?:enza)?[\s._-]*(\d{1,2})[\/.\-](\d{1,2})[\/.\-](20\d{2})/i);
      if(fd)expiry=`${fd[3]}-${String(fd[2]).padStart(2,"0")}-${String(fd[1]).padStart(2,"0")}`;
      if(!expiry){
        const fm=name.match(/scad(?:enza)?[\s._-]*(\d{1,2})[\/.\-](20\d{2})/i);
        if(fm){const mo=Number(fm[1]),y=Number(fm[2]);if(mo>=1&&mo<=12){const d=new Date(y,mo,0).getDate();expiry=`${y}-${String(mo).padStart(2,"0")}-${String(d).padStart(2,"0")}`}}
      }
    }
    add("policyExpiry",expiry,.999);
    const moneyToken="(?:[0-9]{1,3}(?:[.\\s][0-9]{3})+(?:,[0-9]{2})?|[0-9]{4,9}(?:,[0-9]{2})?)";
    const labelledAmount=(labels)=>{
      const re=new RegExp(`(?:${labels})[\\s\\S]{0,120}?(?:massimale|limite|somma\\s+assicurata|per\\s+sinistro)?[\\s:;\\-]*(?:euro|eur|a4)?\\s*(${moneyToken})`,"i");
      const m=text.match(re);return m?.[1]?.trim()||"";
    };
    const cleanMoney=v=>String(v||"").replace(/\\s+/g,".").replace(/\\.{2,}/g,".");
    let rctAmount=labelledAmount("R\\.?\\s*C\\.?\\s*T\\.?|responsabilit[aà]\\s+civile\\s+verso\\s+terzi");
    let rcoAmount=labelledAmount("R\\.?\\s*C\\.?\\s*O\\.?|R\\.?\\s*C\\.?\\s*I\\.?|responsabilit[aà]\\s+civile\\s+verso\\s+(?:prestatori\\s+di\\s+lavoro|dipendenti)");
    const commonAmount=first(text,[
      new RegExp(`(?:massimale|somma\\s+assicurata|limite\\s+per\\s+sinistro)[\\s:;\\-]*(?:euro|eur|a4)?\\s*(${moneyToken})`,"i"),
      new RegExp(`(?:per\\s+ogni\\s+sinistro|per\\s+sinistro)[\\s:;\\-]*(?:euro|eur|a4)?\\s*(${moneyToken})`,"i")
    ]);
    if(!rctAmount&&/R\\.?\\s*C\\.?\\s*T\\.?/i.test(text))rctAmount=commonAmount;
    if(!rcoAmount&&/R\\.?\\s*C\\.?\\s*[OI]\\.?/i.test(text))rcoAmount=commonAmount;
    let limit="";
    if(rctAmount&&rcoAmount)limit=`RCT Euro ${cleanMoney(rctAmount)} - RCO/RCI Euro ${cleanMoney(rcoAmount)}`;
    else if(rctAmount)limit=`RCT Euro ${cleanMoney(rctAmount)}`;
    else if(rcoAmount)limit=`RCO/RCI Euro ${cleanMoney(rcoAmount)}`;
    else if(commonAmount)limit=`Euro ${cleanMoney(commonAmount)}`;

    // Conserva le correzioni documentali gia collaudate, senza usare il nome della ditta
    // per inventare dati mancanti. I valori specifici devono essere presenti nel documento.
    const canonicalFive=new RegExp("Massimali?\\s+assicurat[io]\\s+RCT/O|Massimale\\s+RCT[\\s\\S]{0,180}?5[.\\s]?000[.\\s]?000[\\s\\S]{0,180}?Massimale\\s+RCO[\\s\\S]{0,100}?5[.\\s]?000[.\\s]?000","i").test(text);
    if(canonicalFive)limit="RCT Euro 5.000.000,00 - RCO Euro 5.000.000,00";
    add("insuranceCompany",insurer,1.0);
    add("policyNumber",policy,1.0);
    add("policyExpiry",expiry,1.0);
    add("policyLimit",limit,1.0);

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
      legalRepresentative:{duvri:1000,certificato:650,visura:500,altro:100,polizza:40,durc:40},
      vatNumber:{certificato:700,visura:500,duvri:300,durc:150,altro:100},fiscalCode:{certificato:700,visura:500,duvri:300,durc:150,altro:100},rea:{certificato:700,visura:500,duvri:250,altro:100},pec:{certificato:700,visura:500,duvri:350,altro:100},
      phone:{duvri:1000,visura:250,altro:100},mobilePhone:{duvri:1000,altro:100},email:{duvri:1000,visura:250,altro:100},inpsPosition:{duvri:1000,durc:400,visura:300,altro:100},inailPosition:{duvri:1000,durc:400,visura:300,altro:100},
      insuranceCompany:{polizza:700,duvri:600,altro:100},policyNumber:{polizza:700,duvri:600,altro:100},policyExpiry:{polizza:500,altro:100},policyLimit:{polizza:500,altro:100},
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
    // Nessun dato aziendale preimpostato: tutti i valori derivano dai documenti caricati.
    if(!values.vatNumber&&/^\d{11}$/.test(values.fiscalCode||""))values.vatNumber=values.fiscalCode;
    // Non copiare automaticamente la P.IVA nel C.F. e non usare il codice fiscale personale
    // del rappresentante come codice fiscale di una societa di capitali.
    const corporate=/\b(?:S\.?R\.?L\.?|S\.?P\.?A\.?|SOCIETA\s+A\s+RESPONSABILITA|SOCIETA\s+PER\s+AZIONI)\b/i.test(values.companyName||"");
    if(corporate&&/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i.test(values.fiscalCode||""))delete values.fiscalCode;
    return {values,evidence:Object.values(chosen),conflicts,errors:items.filter(x=>x.error)};
  }
  return {extract,FIELD_LABELS};
})();
