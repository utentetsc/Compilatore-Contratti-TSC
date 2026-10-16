const YellowAreaWordGenerator = (() => {
  const BUILD="yellow-areas-v4-integrated-2026-10-16";
  const W="http://schemas.openxmlformats.org/wordprocessingml/2006/main";
  const XML="http://www.w3.org/XML/1998/namespace";
  const REQUIRED=new Set(["POSIZIONE_INPS","DATI_POLIZZA","MASSIMALE","COSTI_SICUREZZA","TARIFFE_STRAORDINARIE","TELEFONO","EMAIL","TELEFONO_REPERIBILITA"]);
  console.info("Word generator build:",BUILD);
  const clean=v=>String(v??"").trim();
  const els=(root,name)=>[...root.getElementsByTagName("*")].filter(n=>n.localName===name||n.nodeName===`w:${name}`);
  const text=n=>els(n,"t").map(x=>x.textContent||"").join("");
  function yellow(run){
    const xml=new XMLSerializer().serializeToString(run).toLowerCase();
    return /<(?:w:)?highlight\b[^>]*(?:w:)?val=["'](?:yellow|7)["']/.test(xml)||/<(?:w:)?shd\b[^>]*(?:w:)?fill=["'](?:ffff00|fff2cc|yellow)["']/.test(xml);
  }
  function scan(path,xml){
    const doc=new DOMParser().parseFromString(xml,"application/xml");
    if(doc.getElementsByTagName("parsererror").length)throw new Error(`XML non leggibile: ${path}`);
    const raw=[];
    els(doc,"p").forEach((p,pi)=>{
      const runs=els(p,"r").map(r=>({r,text:text(r),y:yellow(r)})).filter(x=>x.text);
      let i=0;
      while(i<runs.length){
        if(!runs[i].y){i++;continue}
        const first=i;let value="";
        while(i<runs.length&&runs[i].y){value+=runs[i].text;i++}
        const last=i-1;
        raw.push({path,doc,p,pi,runs,first,last,text:value,before:runs.slice(0,first).map(x=>x.text).join(""),after:runs.slice(last+1).map(x=>x.text).join("")});
      }
    });
    return {path,doc,raw};
  }
  const area=(field,parts,mode="single")=>({field,parts,mode});
  function profile(raw){
    const main=raw.filter(x=>x.path==="word/document.xml"), byPi=pi=>main.filter(x=>x.pi===pi), range=(a,b)=>main.filter(x=>x.pi>=a&&x.pi<=b);
    const areas=[];
    const add=(field,parts,mode)=>{if(parts.length)areas.push(area(field,parts,mode))};
    add("OGGETTO_CONTRATTO",byPi(0));add("DATA_CONTRATTO",byPi(1));add("ANAGRAFICA_COMPLETA_APPALTATORE",byPi(6));
    add("DESCRIZIONE_LAVORAZIONI",byPi(11));add("POSIZIONE_INPS",byPi(17));add("ELENCO_LAVORAZIONI",range(28,32),"lines");
    add("DATI_POLIZZA",[...byPi(54),...byPi(55).slice(0,1)],"joined");add("MASSIMALE",byPi(55).slice(1));
    add("IMPORTO_CONTRATTO",byPi(122));add("COSTI_SICUREZZA",byPi(125));add("TARIFFE_STRAORDINARIE",range(129,134),"lines");
    const dates=byPi(145);if(dates[0])add("DURATA_CONTRATTO",[dates[0]]);if(dates[1])add("DATA_INIZIO",[dates[1]]);
    add("RAGIONE_SOCIALE",byPi(172));add("SEDE_LEGALE",byPi(173));add("TELEFONO",byPi(174));add("EMAIL",byPi(175));add("PEC",byPi(176));add("TELEFONO_REPERIBILITA",byPi(177));
    add("CITTA_FIRMA",byPi(204));add("RAGIONE_SOCIALE",byPi(207));add("LEGALE_RAPPRESENTANTE",byPi(212),"signature");
    return areas;
  }
  function setRun(run,value){
    [...run.childNodes].filter(n=>n.namespaceURI===W&&["t","br","tab"].includes(n.localName)).forEach(n=>run.removeChild(n));
    String(value).split("\n").forEach((part,i)=>{if(i)run.appendChild(run.ownerDocument.createElementNS(W,"w:br"));const t=run.ownerDocument.createElementNS(W,"w:t");t.setAttributeNS(XML,"xml:space","preserve");t.textContent=part;run.appendChild(t)});
  }
  function clear(part){for(let i=part.first;i<=part.last;i++)setRun(part.runs[i].r,"")}
  function write(part,value){setRun(part.runs[part.first].r,value);for(let i=part.first+1;i<=part.last;i++)setRun(part.runs[i].r,"")}
  function apply(area,value){
    if(area.mode==="lines"){
      const lines=String(value).split("\n");area.parts.forEach((p,i)=>write(p,lines[i]||""));return;
    }
    if(area.mode==="joined"){
      write(area.parts[0],value);area.parts.slice(1).forEach(clear);return;
    }
    if(area.mode==="signature"){
      const part=area.parts[0],doc=part.doc,ps=els(doc,"p"),target=ps[209];
      if(target){let r=els(target,"r")[0];if(!r){r=doc.createElementNS(W,"w:r");target.appendChild(r)}setRun(r,value);clear(part)}else write(part,value);return;
    }
    write(area.parts[0],value);area.parts.slice(1).forEach(clear);
  }
  function money(v){const n=Number(String(v||"").replace(/\./g,"").replace(",","."));return Number.isFinite(n)?n.toLocaleString("it-IT",{minimumFractionDigits:2,maximumFractionDigits:2}):clean(v)}
  function city(v){const t=clean(v);let m=t.match(/\b\d{5}\s+([A-Za-zÀ-ÿ' ]+?)(?:\s*\([A-Z]{2}\)|,|$)/);if(m)return clean(m[1]);m=t.match(/,\s*([A-Za-zÀ-ÿ' ]+?)(?:\s*\([A-Z]{2}\))?(?:,|$)/);return m?clean(m[1]):""}
  function duration(a,b){if(!a||!b)return"";const p=x=>{const q=String(x).split(/[\/-]/).map(Number);return q[0]>31?new Date(q[0],q[1]-1,q[2]):new Date(q[2],q[1]-1,q[0])};const x=p(a),y=p(b);if(isNaN(x)||isNaN(y))return"";const m=(y.getFullYear()-x.getFullYear())*12+y.getMonth()-x.getMonth()+(y.getDate()>=x.getDate()?1:0);return m%12===0?`${m/12} (${m/12===1?"uno":"due"})`: `${m} mesi`}
  function values(data){
    const company=clean(data.RAGIONE_SOCIALE||data.DENOMINAZIONE_DB||data.DITTA),works=clean(data.TIPOLOGIE_LAVORAZIONE).split(/,\s*/).filter(Boolean);
    const list=works.map((x,i)=>`${String.fromCharCode(97+i)}) ${x};`).join("\n");
    const workText=works.join(", ");
    return {
      OGGETTO_CONTRATTO:workText.toUpperCase(),DATA_CONTRATTO:clean(data.DATA_CONTRATTO),
      ANAGRAFICA_COMPLETA_APPALTATORE:company?`${company}, con sede legale in ${clean(data.SEDE_LEGALE)}, P. IVA ${clean(data.PARTITA_IVA)} e C.F. ${clean(data.CODICE_FISCALE)}, R.E.A. n. ${clean(data.REA)}, in persona di ${clean(data.LEGALE_RAPPRESENTANTE)},`:"",
      DESCRIZIONE_LAVORAZIONI:workText?`della conduzione e manutenzione di ${workText}`:"",POSIZIONE_INPS:clean(data.POSIZIONE_INPS),ELENCO_LAVORAZIONI:list,
      DATI_POLIZZA:[clean(data.COMPAGNIA_ASSICURATIVA),clean(data.NUMERO_POLIZZA)&&`polizza assicurativa n. ${clean(data.NUMERO_POLIZZA)}`].filter(Boolean).join(", "),
      MASSIMALE:clean(data.MASSIMALE)?money(data.MASSIMALE):"",IMPORTO_CONTRATTO:clean(data.IMPORTO_CONTRATTO)?`Euro ${money(data.IMPORTO_CONTRATTO)}`:"",
      COSTI_SICUREZZA:clean(data.COSTI_SICUREZZA),TARIFFE_STRAORDINARIE:clean(data.TARIFFE_STRAORDINARIE),DURATA_CONTRATTO:duration(data.DATA_INIZIO,data.DATA_FINE),DATA_INIZIO:clean(data.DATA_INIZIO),
      RAGIONE_SOCIALE:company,SEDE_LEGALE:clean(data.SEDE_LEGALE),TELEFONO:clean(data.TELEFONO),EMAIL:clean(data.EMAIL),PEC:clean(data.PEC),TELEFONO_REPERIBILITA:clean(data.TELEFONO_REPERIBILITA),CITTA_FIRMA:city(data.SEDE_LEGALE),LEGALE_RAPPRESENTANTE:clean(data.LEGALE_RAPPRESENTANTE)
    };
  }
  async function generate(file,data){
    if(typeof PizZip==="undefined")throw new Error("PizZip non disponibile.");
    const zip=new PizZip(await file.arrayBuffer()),paths=Object.keys(zip.files).filter(n=>/^word\/(document|header\d+|footer\d+)\.xml$/.test(n));
    const files=paths.map(path=>scan(path,zip.file(path).asText())),raw=files.flatMap(x=>x.raw).filter(x=>x.text.trim()),areas=profile(raw),map=values(data),missing=[];
    if(!areas.length)throw new Error("Nessuna area evidenziata in giallo riconosciuta nel master originale.");
    for(const a of areas){let value=clean(map[a.field]);if(!value&&REQUIRED.has(a.field)){value="[DA COMPILARE]";missing.push(a.field)}if(value)apply(a,value)}
    files.forEach(f=>zip.file(f.path,new XMLSerializer().serializeToString(f.doc)));
    const blob=zip.generate({type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",compression:"DEFLATE"}),name=`${clean(data.NUMERO_CONTRATTO)||"Contratto_compilato"}.docx`;
    if(typeof saveAs==="function")saveAs(blob,name);else{const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;a.click()}
    return {build:BUILD,replaced:areas.length,missing:[...new Set(missing)],technicalAreas:raw.length};
  }
  return {generate,BUILD};
})();
window.YellowAreaWordGenerator=YellowAreaWordGenerator;
