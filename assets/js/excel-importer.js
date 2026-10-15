const ExcelCinemaImporter = (() => {
  const aliases = {
    id:["id","codice","codice cinema","site id"],
    name:["cinema","nome cinema","sito","site"],
    address:["indirizzo","indirizzo cinema","address"],
    contact:["referente","responsabile","contact"],
    phone:["telefono","tel","phone"],
    mobile:["cellulare cinema","cellulare","mobile"],
    email:["@mail","mail","email","e-mail",".@mail"]
  };
  const norm = v => String(v ?? "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9@]+/g," ").trim();
  const clean = v => String(v ?? "").trim();
  function fieldFor(value){
    const n=norm(value);
    return Object.keys(aliases).find(key=>aliases[key].some(a=>norm(a)===n));
  }
  function findHeader(rows){
    for(let i=0;i<Math.min(rows.length,30);i++){
      const map={};
      rows[i].forEach((cell,col)=>{const f=fieldFor(cell);if(f && map[f]===undefined)map[f]=col});
      if(map.name!==undefined && (map.id!==undefined || map.address!==undefined)) return {row:i,map};
    }
    throw new Error("Non trovo una riga intestazioni con le colonne Cinema e ID/Indirizzo.");
  }
  function rowsToCinemas(rows){
    const {row,map}=findHeader(rows);
    const cinemas=[];
    for(let i=row+1;i<rows.length;i++){
      const r=rows[i];
      const name=clean(r[map.name]);
      if(!name) continue;
      const rawId=map.id===undefined?"":clean(r[map.id]);
      cinemas.push({
        id: rawId ? `cin-${rawId}` : `cin-${norm(name).replace(/ /g,"-")}`,
        externalId:rawId,
        name,
        address:map.address===undefined?"":clean(r[map.address]),
        city:"",
        contact:map.contact===undefined?"":clean(r[map.contact]),
        phone:map.phone===undefined?"":clean(r[map.phone]),
        mobile:map.mobile===undefined?"":clean(r[map.mobile]),
        email:map.email===undefined?"":clean(r[map.email])
      });
    }
    if(!cinemas.length) throw new Error("Il file non contiene cinema importabili.");
    return cinemas;
  }
  async function read(file){
    if(!window.XLSX) throw new Error("Libreria Excel non disponibile. Verifica la connessione internet e ricarica la pagina.");
    const data=await file.arrayBuffer();
    const wb=XLSX.read(data,{type:"array",cellDates:false});
    for(const name of wb.SheetNames){
      const rows=XLSX.utils.sheet_to_json(wb.Sheets[name],{header:1,defval:"",raw:false});
      try{return rowsToCinemas(rows)}catch(e){if(name===wb.SheetNames.at(-1))throw e}
    }
    throw new Error("Nessun foglio utilizzabile trovato.");
  }
  function merge(existing,incoming){
    const result=[...existing]; let added=0,updated=0;
    for(const item of incoming){
      const idx=result.findIndex(x=>String(x.externalId||"")===String(item.externalId||"") && item.externalId || x.id===item.id);
      if(idx>=0){result[idx]={...result[idx],...item};updated++}else{result.push(item);added++}
    }
    return {cinemas:result,added,updated,total:incoming.length};
  }
  return {read,merge};
})();
