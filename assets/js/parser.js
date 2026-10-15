const DocumentParser = (() => {
  const FIELD_LABELS={companyName:"Ragione sociale",vatNumber:"Partita IVA",fiscalCode:"Codice fiscale",rea:"REA",registeredOffice:"Sede legale",pec:"PEC",legalRepresentative:"Legale rappresentante",insuranceCompany:"Compagnia assicurativa",policyNumber:"Numero polizza",policyExpiry:"Scadenza polizza",policyLimit:"Massimale",durcProtocol:"Protocollo DURC",durcExpiry:"Scadenza DURC",durcStatus:"Esito DURC"};
  const clean=v=>String(v||"").replace(/\s+/g," ").trim().replace(/[;,.]+$/g,"");
  const dateISO=v=>{const m=String(v||"").match(/\b(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})\b/);return m?`${m[3]}-${m[2].padStart(2,"0")}-${m[1].padStart(2,"0")}`:""};
  async function pdfText(file){
    if(!window.pdfjsLib)throw new Error("Libreria PDF non disponibile");
    pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
    const pdf=await pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise;let text="";
    for(let i=1;i<=pdf.numPages;i++){const page=await pdf.getPage(i),content=await page.getTextContent();text+="\n"+content.items.map(x=>x.str).join(" ")}
    return text;
  }
  async function docxText(file){if(!window.mammoth)throw new Error("Libreria DOCX non disponibile");return (await mammoth.extractRawText({arrayBuffer:await file.arrayBuffer()})).value}
  async function imageText(file){if(!window.Tesseract)throw new Error("Libreria OCR non disponibile");return (await Tesseract.recognize(file,"ita")).data.text}
  async function fileText(file){const n=file.name.toLowerCase();if(n.endsWith(".txt"))return file.text();if(n.endsWith(".pdf"))return pdfText(file);if(n.endsWith(".docx"))return docxText(file);if(/\.(png|jpe?g)$/.test(n))return imageText(file);return ""}
  function first(text,res){for(const re of res){const m=text.match(re);if(m?.[1])return clean(m[1])}return ""}
  function evidence(field,value,file,confidence){return {field,label:FIELD_LABELS[field]||field,value,source:file.name,confidence}}
  function extractFromText(text,file){
    const out=[], add=(field,value,confidence=0.82)=>{if(value)out.push(evidence(field,value,file,confidence))};
    add("companyName",first(text,[/(?:denominazione|ragione sociale|impresa)\s*[:\-]?\s*([^\n]{3,100})/i]),.80);
    add("vatNumber",first(text,[/(?:partita\s+iva|p\.?\s*iva)\s*[:\-]?\s*(?:IT\s*)?([0-9]{11})/i]),.96);
    add("fiscalCode",first(text,[/(?:codice\s+fiscale|c\.?f\.?)\s*[:\-]?\s*([A-Z0-9]{11,16})/i]),.94);
    add("rea",first(text,[/(?:numero\s+rea|r\.?e\.?a\.?)\s*[:\-]?\s*([A-Z]{0,2}\s*[-/]?\s*[0-9]{3,10})/i]),.88);
    add("registeredOffice",first(text,[/(?:sede\s+legale|indirizzo\s+sede)\s*[:\-]?\s*([^\n]{5,140})/i]),.78);
    add("pec",first(text,[/(?:pec|posta elettronica certificata)\s*[:\-]?\s*([A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,})/i]),.98);
    add("legalRepresentative",first(text,[/(?:legale\s+rappresentante|rappresentante\s+legale)\s*[:\-]?\s*([^\n]{3,80})/i]),.78);
    add("insuranceCompany",first(text,[/(?:compagnia|impresa\s+di\s+assicurazione)\s*[:\-]?\s*([^\n]{3,100})/i]),.72);
    add("policyNumber",first(text,[/(?:numero\s+)?polizza\s*(?:n\.?|numero)?\s*[:\-]?\s*([A-Z0-9\-/.]{4,40})/i]),.93);
    const pe=first(text,[/(?:scadenza|validit[aà]\s+fino\s+al)\s*(?:della\s+polizza)?\s*[:\-]?\s*(\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{4})/i]);add("policyExpiry",dateISO(pe),.88);
    add("policyLimit",first(text,[/(?:massimale)\s*[:\-]?\s*(?:€|euro)?\s*([0-9. ,]{3,30})/i]),.89);
    add("durcProtocol",first(text,[/(?:protocollo|numero\s+protocollo)\s*[:\-]?\s*([A-Z0-9\-/.]{4,50})/i]),.83);
    const de=first(text,[/(?:scadenza\s+validit[aà]|valido\s+fino\s+al)\s*[:\-]?\s*(\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{4})/i]);add("durcExpiry",dateISO(de),.87);
    if(/risulta\s+regolare|regolare\s+nei\s+confronti/i.test(text))add("durcStatus","Regolare",.94);
    return out;
  }
  async function extract(files,onProgress){const all=[];for(let i=0;i<files.length;i++){const f=files[i];onProgress?.(f.name,i+1,files.length);try{const text=await fileText(f);all.push(...extractFromText(text,f))}catch(err){all.push({error:true,source:f.name,message:err.message})}}return merge(all)}
  function merge(items){const chosen={},conflicts=[];for(const x of items.filter(x=>!x.error)){if(!chosen[x.field])chosen[x.field]=x;else if(chosen[x.field].value!==x.value){conflicts.push({field:x.field,label:x.label,values:[chosen[x.field],x]});if(x.confidence>chosen[x.field].confidence)chosen[x.field]=x}}return {values:Object.fromEntries(Object.entries(chosen).map(([k,v])=>[k,v.value])),evidence:Object.values(chosen),conflicts,errors:items.filter(x=>x.error)}}
  return {extract,FIELD_LABELS};
})();
