const DocumentGenerator = (() => {
  function safeName(value){ return (value||"contratto").replace(/[^a-z0-9àèéìòù_-]+/gi,"_").replace(/^_+|_+$/g,""); }
  async function generate(file, data){
    if(!window.PizZip || !window.docxtemplater) throw new Error("Librerie DOCX non disponibili. Apri la webapp con connessione internet oppure salva le librerie nella cartella vendor.");
    const content = await file.arrayBuffer();
    const zip = new PizZip(content);
    const doc = new window.docxtemplater(zip, {
      paragraphLoop:true,
      linebreaks:true,
      delimiters:{start:"{",end:"}"},
      nullGetter:() => ""
    });
    doc.render(data);
    const blob = doc.getZip().generate({type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",compression:"DEFLATE"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${safeName(data.NUMERO_CONTRATTO || "Contratto")}_${safeName(data.NOME_CINEMA || data.RAGIONE_SOCIALE)}.docx`;
    a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  }
  return {generate};
})();