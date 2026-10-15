let setup = StorageService.load();
let masterFile = null;
let supportFiles = [];
const $ = id => document.getElementById(id);
const esc = s => String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

document.querySelectorAll(".nav-btn").forEach(btn=>btn.onclick=()=>{
  document.querySelectorAll(".nav-btn,.view").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active"); $(btn.dataset.view).classList.add("active");
});
function bindDrop(zoneId,inputId,handler){
  const zone=$(zoneId),input=$(inputId);
  input.onchange=()=>handler([...input.files]);
  ["dragenter","dragover"].forEach(e=>zone.addEventListener(e,ev=>{ev.preventDefault();zone.classList.add("drag")}));
  ["dragleave","drop"].forEach(e=>zone.addEventListener(e,ev=>{ev.preventDefault();zone.classList.remove("drag")}));
  zone.addEventListener("drop",ev=>handler([...ev.dataTransfer.files]));
}
bindDrop("masterDrop","masterFile",files=>{masterFile=files.find(f=>f.name.toLowerCase().endsWith(".docx"))||null;$("masterName").textContent=masterFile?.name||"Seleziona un file .docx"});
bindDrop("docsDrop","docsFiles",files=>{supportFiles=files;$("docsCount").textContent=`${files.length} documenti`;$("docsList").innerHTML=files.map(f=>`<li>${esc(f.name)}</li>`).join("")});
function renderSetup(){
  $("cinemaSelect").innerHTML='<option value="">Seleziona...</option>'+setup.cinemas.map(x=>`<option value="${esc(x.id)}">${esc(x.name)}</option>`).join("");
  $("workSelect").innerHTML='<option value="">Seleziona...</option>'+setup.workTypes.map(x=>`<option value="${esc(x.id)}">${esc(x.name)}</option>`).join("");
  $("cinemaList").innerHTML=setup.cinemas.map(x=>`<div class="row"><div class="details"><b>${esc(x.name)}</b><br><small>${esc([x.address,x.city].filter(Boolean).join(", "))}</small>${x.email?`<br><small>${esc(x.email)}</small>`:""}</div><button class="danger" data-del-cinema="${esc(x.id)}">Elimina</button></div>`).join("");
  $("workList").innerHTML=setup.workTypes.map(x=>`<div class="row"><div><b>${esc(x.name)}</b><br><small>${esc(x.description)}</small></div><button class="danger" data-del-work="${esc(x.id)}">Elimina</button></div>`).join("");
}
$("cinemaForm").onsubmit=e=>{e.preventDefault();const d=new FormData(e.target);setup.cinemas.push({id:crypto.randomUUID(),name:d.get("name"),address:d.get("address"),city:d.get("city")});StorageService.save(setup);e.target.reset();renderSetup()};
$("workForm").onsubmit=e=>{e.preventDefault();const d=new FormData(e.target);setup.workTypes.push({id:crypto.randomUUID(),name:d.get("name"),description:d.get("description")});StorageService.save(setup);e.target.reset();renderSetup()};
document.addEventListener("click",e=>{if(e.target.dataset.delCinema){setup.cinemas=setup.cinemas.filter(x=>x.id!==e.target.dataset.delCinema)}else if(e.target.dataset.delWork){setup.workTypes=setup.workTypes.filter(x=>x.id!==e.target.dataset.delWork)}else return;StorageService.save(setup);renderSetup()});

$("cinemaExcelFile").onchange=async e=>{
  const file=e.target.files?.[0]; if(!file)return;
  const status=$("cinemaImportStatus");
  try{
    status.className="status"; status.textContent="Importazione in corso...";
    const incoming=await ExcelCinemaImporter.read(file);
    const result=ExcelCinemaImporter.merge(setup.cinemas,incoming);
    setup.cinemas=result.cinemas; StorageService.save(setup); renderSetup();
    status.className="status ok";
    status.textContent=`Importazione completata: ${result.total} letti, ${result.added} aggiunti, ${result.updated} aggiornati.`;
  }catch(err){
    console.error(err); status.className="status error"; status.textContent=err.message||"Errore durante l'importazione Excel.";
  }finally{e.target.value=""}
};

$("exportSetup").onclick=()=>{const b=new Blob([JSON.stringify(setup,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="configurazione-contratti.json";a.click()};
$("importSetup").onchange=async e=>{try{const d=JSON.parse(await e.target.files[0].text());if(!Array.isArray(d.cinemas)||!Array.isArray(d.workTypes))throw 0;setup=d;StorageService.save(setup);renderSetup()}catch{alert("File di configurazione non valido")}};
$("resetSetup").onclick=()=>{setup=StorageService.reset();renderSetup()};
$("cinemaSelect").onchange=e=>{const c=setup.cinemas.find(x=>x.id===e.target.value);if(c)e.target.dataset.selected=JSON.stringify(c)};
$("extractBtn").onclick=async()=>{const d=await DocumentParser.extract(supportFiles);Object.entries(d).forEach(([k,v])=>{if($(k)&&v)$(k).value=v});showStatus(Object.keys(d).some(k=>d[k])?"Dati trovati e precompilati. Verificali prima di generare.":"Nessun dato riconosciuto. In questa versione il riconoscimento automatico è attivo sui file TXT di prova.","ok")};
function value(id){return $(id).value.trim()}
function formatDate(v){if(!v)return "";const [y,m,d]=v.split("-");return `${d}/${m}/${y}`}
function buildData(){const c=setup.cinemas.find(x=>x.id===$("cinemaSelect").value)||{};const w=setup.workTypes.find(x=>x.id===$("workSelect").value)||{};return {
  NUMERO_CONTRATTO:value("contractNumber"),DATA_CONTRATTO:formatDate(value("contractDate")),RAGIONE_SOCIALE:value("companyName"),PARTITA_IVA:value("vatNumber"),CODICE_FISCALE:value("fiscalCode"),REA:value("rea"),SEDE_LEGALE:value("registeredOffice"),PEC:value("pec"),LEGALE_RAPPRESENTANTE:value("legalRepresentative"),COMPAGNIA_ASSICURATIVA:value("insuranceCompany"),NUMERO_POLIZZA:value("policyNumber"),SCADENZA_POLIZZA:formatDate(value("policyExpiry")),MASSIMALE:value("policyLimit"),NOME_CINEMA:c.name||"",INDIRIZZO_CINEMA:c.address||"",CITTA_CINEMA:c.city||"",TIPO_LAVORAZIONE:w.name||"",DESCRIZIONE_LAVORAZIONE:w.description||"",DATA_INIZIO:formatDate(value("startDate")),DATA_FINE:formatDate(value("endDate"))
}}
function showStatus(t,type=""){const s=$("status");s.textContent=t;s.className=`status ${type}`}
$("generateBtn").onclick=async()=>{try{if(!masterFile)throw new Error("Carica prima un contratto master in formato DOCX.");await DocumentGenerator.generate(masterFile,buildData());showStatus("Contratto generato correttamente.","ok")}catch(e){console.error(e);showStatus(e.message||"Errore durante la generazione.","error")}};
$("contractDate").value=new Date().toISOString().slice(0,10);renderSetup();