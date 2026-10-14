const DocumentParser = (() => {
  // Punto di estensione: in una fase successiva qui verranno letti PDF/DOCX
  // e riconosciuti ragione sociale, P.IVA, PEC, polizza, scadenze, ecc.
  async function extract(files){
    const txt = [...files].find(f => f.name.toLowerCase().endsWith(".txt"));
    if(!txt) return {};
    const text = await txt.text();
    const find = re => (text.match(re)||[])[1]?.trim() || "";
    return {
      companyName: find(/ragione sociale\s*[:\-]\s*(.+)/i),
      vatNumber: find(/partita iva\s*[:\-]\s*([A-Z0-9]+)/i),
      fiscalCode: find(/codice fiscale\s*[:\-]\s*([A-Z0-9]+)/i),
      pec: find(/pec\s*[:\-]\s*([^\s]+)/i),
      policyNumber: find(/(?:numero )?polizza\s*[:\-]\s*(.+)/i)
    };
  }
  return {extract};
})();