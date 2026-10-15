let setup = StorageService.load();
const embeddedContracts = Array.isArray(window.DEFAULT_CONTRACT_DATABASE) ? window.DEFAULT_CONTRACT_DATABASE : (typeof DEFAULT_CONTRACT_DATABASE!=="undefined" ? DEFAULT_CONTRACT_DATABASE : []);
const embeddedWorkTypes = Array.isArray(window.DEFAULT_WORK_TYPES) ? window.DEFAULT_WORK_TYPES : (typeof DEFAULT_WORK_TYPES!=="undefined" ? DEFAULT_WORK_TYPES : []);
if(!Array.isArray(setup.cinemas)) setup.cinemas=[];
if(!Array.isArray(setup.contracts) || setup.contracts.length<10) setup.contracts=[...embeddedContracts];
if(!Array.isArray(setup.workTypes) || setup.workTypes.length<2) setup.workTypes=[...embeddedWorkTypes];
function cinemaKey(v){return String(v||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/^tsc\s+/,"").replace(/\s*\([a-z]{2}\)\s*$/i,"").replace(/[^a-z0-9]+/g," ").trim()}
function syncCinemasFromContracts(){
  const names=[...new Set((setup.contracts||[]).map(x=>x.cinema).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"it"));
  for(const dbName of names){
    const existing=setup.cinemas.find(x=>cinemaKey(x.name)===cinemaKey(dbName));
    if(existing){existing.dbName=dbName;if(!existing.name)existing.name=dbName}
    else setup.cinemas.push({id:`db-${cinemaKey(dbName).replace(/ /g,"-")}`,name:dbName,address:"",city:"",dbName});
  }
  setup.cinemas=setup.cinemas.filter((x,i,a)=>x.name&&a.findIndex(y=>cinemaKey(y.name)===cinemaKey(x.name))===i);
  return names.length;
}
const syncedCinemaCount=syncCinemasFromContracts();
StorageService.save(setup);
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
bindDrop("docsDrop","docsFiles",async files=>{
  supportFiles=files;
  $("docsCount").textContent=`${files.length} documenti`;
  $("docsList").innerHTML=files.map(f=>`<li>${esc(f.name)}</li>`).join("");
  const excelFiles=files.filter(f=>/\.(xlsx|xls|csv)$/i.test(f.name));
  for(const file of excelFiles){
    try{
      const contracts=await ContractDbImporter.read(file);
      setup.contracts=contracts;
      setup.workTypes=ContractDbImporter.workTypes(contracts);
      syncCinemasFromContracts();
      StorageService.save(setup);
      renderSetup();
      showStatus(`DB Contratti caricato: ${contracts.length} abbinamenti, ${setup.workTypes.length} tipologie e cinema sincronizzati.`,"ok");
    }catch(err){
      console.error(err);
      showStatus(`${file.name}: non riconosciuto come DB Contratti. ${err.message||""}`,"error");
    }
  }
});
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
function cinemaMatches(dbName,selected){
  const a=ContractDbImporter.norm(dbName).replace(/^tsc /,""), b=ContractDbImporter.norm(selected).replace(/^tsc /,"");
  const core=x=>x.replace(/\b[a-z]{2}\b$/," ").replace(/\s+/g," ").trim();
  return core(a)===core(b) || core(a).includes(core(b)) || core(b).includes(core(a));
}
function applyContractSuggestion(){
  const cinema=setup.cinemas.find(x=>x.id===$("cinemaSelect").value); const work=setup.workTypes.find(x=>x.id===$("workSelect").value);
  if(!cinema||!work)return;
  const matches=(setup.contracts||[]).filter(x=>ContractDbImporter.norm(x.workType)===ContractDbImporter.norm(work.name)&&(cinema.dbName ? x.cinema===cinema.dbName : cinemaMatches(x.cinema,cinema.name)));
  if(matches.length===1){const x=matches[0];$("supplier").value=x.supplier||"";$("frequency").value=x.frequency||"";$("contractAmount").value=x.amount==null?"":Number(x.amount).toLocaleString("it-IT",{minimumFractionDigits:2,maximumFractionDigits:2});showStatus("Dati della lavorazione precompilati dal database.","ok")}
  else if(matches.length>1){showStatus(`Trovati ${matches.length} abbinamenti per cinema e lavorazione. Verifica ditta, frequenza e importo.`,"ok")}
}
$("cinemaSelect").addEventListener("change",applyContractSuggestion);
$("workSelect").addEventListener("change",applyContractSuggestion);
$("contractDbFile").onchange=async e=>{const file=e.target.files?.[0];if(!file)return;const status=$("contractDbStatus");try{status.textContent="Importazione in corso...";status.className="status";const contracts=await ContractDbImporter.read(file);setup.contracts=contracts;setup.workTypes=ContractDbImporter.workTypes(contracts);syncCinemasFromContracts();StorageService.save(setup);renderSetup();status.textContent=`Database importato: ${contracts.length} abbinamenti e ${setup.workTypes.length} tipologie.`;status.className="status ok"}catch(err){console.error(err);status.textContent=err.message||"Errore durante l'importazione.";status.className="status error"}finally{e.target.value=""}};

$("extractBtn").onclick=async()=>{
  if(!supportFiles.length){showStatus("Carica prima almeno un documento.","error");return}
  showStatus("Lettura documenti in corso... I file scansionati possono richiedere più tempo.");
  const documentFiles=supportFiles.filter(f=>!/\.(xlsx|xls|csv)$/i.test(f.name));
  if(!documentFiles.length){showStatus("Database Excel importato. Aggiungi visura, polizza o DURC per recuperare altri dati.","ok");return}
  const result=await DocumentParser.extract(documentFiles,(name,n,total)=>showStatus(`Lettura ${n}/${total}: ${name}`));
  Object.entries(result.values).forEach(([k,v])=>{if($(k)&&v)$(k).value=v});
  renderReview(result);
  const found=Object.keys(result.values).length;
  showStatus(`Recupero completato: ${found} campi trovati, ${result.conflicts.length} conflitti da verificare.`,found?"ok":"error");
};
function renderReview(result){
 const panel=$("reviewPanel"),list=$("reviewList");panel.hidden=false;
 const rows=result.evidence.map(x=>{const pct=Math.round(x.confidence*100),level=pct>=90?"high":"medium";return `<div class="review-item"><div><b>${esc(x.label)}</b><br><span>${esc(x.value)}</span></div><div class="review-source">Fonte: ${esc(x.source)}</div><div class="confidence ${level}">${pct}%</div></div>`});
 const conflicts=result.conflicts.map(c=>`<div class="conflict"><b>Conflitto: ${esc(c.label)}</b><br>${c.values.map(v=>`${esc(v.value)} (${esc(v.source)})`).join("<br>")}</div>`);
 const errors=result.errors.map(e=>`<div class="conflict"><b>${esc(e.source)}</b>: ${esc(e.message)}</div>`);
 list.innerHTML=[...conflicts,...rows,...errors].join("")||"Nessun dato riconosciuto.";
}
function value(id){return $(id).value.trim()}
function formatDate(v){if(!v)return "";const [y,m,d]=v.split("-");return `${d}/${m}/${y}`}
function buildData(){const c=setup.cinemas.find(x=>x.id===$("cinemaSelect").value)||{};const w=setup.workTypes.find(x=>x.id===$("workSelect").value)||{};return {
  NUMERO_CONTRATTO:value("contractNumber"),DATA_CONTRATTO:formatDate(value("contractDate")),RAGIONE_SOCIALE:value("companyName"),PARTITA_IVA:value("vatNumber"),CODICE_FISCALE:value("fiscalCode"),REA:value("rea"),SEDE_LEGALE:value("registeredOffice"),PEC:value("pec"),LEGALE_RAPPRESENTANTE:value("legalRepresentative"),COMPAGNIA_ASSICURATIVA:value("insuranceCompany"),NUMERO_POLIZZA:value("policyNumber"),SCADENZA_POLIZZA:formatDate(value("policyExpiry")),MASSIMALE:value("policyLimit"),DITTA:value("supplier"),FREQUENZA:value("frequency"),IMPORTO_CONTRATTO:value("contractAmount"),PROTOCOLLO_DURC:value("durcProtocol"),SCADENZA_DURC:formatDate(value("durcExpiry")),ESITO_DURC:value("durcStatus"),NOME_CINEMA:c.name||"",INDIRIZZO_CINEMA:c.address||"",CITTA_CINEMA:c.city||"",TIPO_LAVORAZIONE:w.name||"",DESCRIZIONE_LAVORAZIONE:w.description||"",DATA_INIZIO:formatDate(value("startDate")),DATA_FINE:formatDate(value("endDate"))
}}
function showStatus(t,type=""){const s=$("status");s.textContent=t;s.className=`status ${type}`}
$("generateBtn").onclick=async()=>{try{if(!masterFile)throw new Error("Carica prima un contratto master in formato DOCX.");await DocumentGenerator.generate(masterFile,buildData());showStatus("Contratto generato correttamente.","ok")}catch(e){console.error(e);showStatus(e.message||"Errore durante la generazione.","error")}};
$("contractDate").value=new Date().toISOString().slice(0,10);renderSetup();
showStatus(`Database pronto: ${setup.cinemas.length} cinema, ${setup.workTypes.length} tipologie, ${setup.contracts.length} abbinamenti.`,"ok");