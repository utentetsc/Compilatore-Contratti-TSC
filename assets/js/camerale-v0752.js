console.info("Modulo camerale: v0.7.5.2 OCR isolato attivo");

// Questa estensione sostituisce soltanto il lettore camerale.
// Non modifica parser-native-v075.js, matching, DB, cinema, lavorazioni, importi o Word.
window.findDm37Letters = function(text){
  const t=String(text||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ").toUpperCase();
  const letters=new Set();
  const add=block=>{ for(const x of String(block||"").match(/[A-G]/g)||[]) letters.add(x); };
  const anchors=[...t.matchAll(/(?:D\.?\s*M\.?\s*37\s*\/\s*2008|DECRETO\s+37\s*\/\s*2008|ABILITAZIONI|RESPONSABILE\s+TECNICO)/g)].map(m=>m.index);
  const zones=anchors.length?anchors.map(i=>t.slice(Math.max(0,i-1400),i+7000)):[t];
  for(const zone of zones){
    let m;
    const plural=/(?:LETTERE|LETT\.?|ABILITAZIONI)[^A-G]{0,140}((?:[A-G]\s*[)\].,;:/\-]*\s*){1,7})(?=[^A-Z]{0,100}(?:D\.?\s*M\.?\s*37|ART\.?\s*1|IMPIANT))/g;
    while((m=plural.exec(zone))) add(m[1]);
    const direct=/(?:LETTERA|LETTERE|LETT\.?|CATEGORIA)\s*[:.\-]?\s*([A-G])\b/g;
    while((m=direct.exec(zone))) letters.add(m[1]);
    const item=/\b([A-G])\s*[)\].\-:]\s*(?=(?:IMPIANT|PROTEZION|ANTINCEND|ELETTRIC|ELETTRONIC|RISCALD|CLIMAT|IDRIC|SANITAR|GAS|SOLLEVAMENT|ASCENSOR))/g;
    while((m=item.exec(zone))) letters.add(m[1]);
    const recognition=/(?:ATTIVITA|REQUISITI|ABILITAT[AOI])[^.]{0,400}?(?:LETTERA|LETTERE)\s+((?:[A-G]\s*[)\].,;:/\-]*\s*){1,7})/g;
    while((m=recognition.exec(zone))) add(m[1]);
  }
  return [...letters].sort();
};

window.extractComplianceText = async function(files){
  const chunks=[];
  const camerali=(files||[]).filter(file=>/(?:CCIAA|VISURA|CAMERALE|CAMERA DI COMMERCIO|CERTIFICATO DI ISCRIZIONE)/i.test(file.name||""));
  for(const file of camerali){
    try{
      if(!/\.pdf$/i.test(file.name)||typeof pdfjsLib==="undefined") continue;
      const pdf=await pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise;
      for(let i=1;i<=pdf.numPages;i++){
        const page=await pdf.getPage(i),content=await page.getTextContent();
        let pageText=content.items.map(x=>x.str).join(" ");
        const nativeSignal=/(?:D\.?\s*M\.?\s*37\s*\/\s*2008|LETTERE?\s+[A-G]|ATECO|ABILITAZION|RESPONSABILE\s+TECNICO)/i.test(pageText);
        if(window.Tesseract&&(!nativeSignal||pageText.replace(/\s/g,"").length<500)){
          const viewport=page.getViewport({scale:2}),canvas=document.createElement("canvas");
          const ctx=canvas.getContext("2d",{willReadFrequently:true});
          canvas.width=Math.ceil(viewport.width); canvas.height=Math.ceil(viewport.height);
          await page.render({canvasContext:ctx,viewport}).promise;
          try{
            const result=await Tesseract.recognize(canvas,"eng",{logger:m=>{
              if(m.status==="recognizing text"&&typeof showStatus==="function")
                showStatus(`Verifica camerale ${i}/${pdf.numPages}: ${Math.round((m.progress||0)*100)}%`);
            }});
            pageText+="\n"+(result.data?.text||"");
          }catch(err){ console.warn("OCR camerale isolato non riuscito",file.name,"pagina",i,err); }
        }
        chunks.push(pageText);
      }
    }catch(err){ console.warn("Verifica camerale: documento non leggibile",file.name,err); }
  }
  return chunks.join("\n");
};
