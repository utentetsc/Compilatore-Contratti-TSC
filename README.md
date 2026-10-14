# Generatore Contratti

Webapp statica che compila un contratto Word usando dati inseriti o selezionati. Non richiede backend e può essere pubblicata su GitHub Pages.

## Avvio rapido

1. Caricare l'intera cartella in un repository GitHub.
2. In **Settings > Pages**, pubblicare dal branch principale e dalla cartella root.
3. Aprire l'indirizzo GitHub Pages.

È possibile aprire anche `index.html` direttamente, ma le librerie DOCX sono inizialmente caricate da CDN e richiedono una connessione. Per un uso completamente offline, scaricare PizZip e Docxtemplater in `assets/vendor` e aggiornare i relativi tag script.

## Preparazione del master Word

Inserire nel documento i segnaposto elencati in `docs/SEGNAPOSTO.md`, ad esempio:

    Spett.le {RAGIONE_SOCIALE}
    P. IVA {PARTITA_IVA}
    presso {NOME_CINEMA}

Il segnaposto deve essere digitato nello stesso stile e non deve essere composto da frammenti con formattazioni diverse. La sostituzione conserva il documento esistente, ma un testo molto più lungo può cambiare naturalmente ritorni a capo e impaginazione.

## Stato della versione iniziale

- setup cinema e lavorazioni in localStorage;
- import/export configurazione JSON;
- caricamento master DOCX;
- drag and drop dei documenti;
- precompilazione dimostrativa da TXT;
- generazione del contratto DOCX;
- nessun invio dei documenti a server applicativi.

## Passo successivo

Personalizzare il parser con visure, polizze e altri documenti reali, aggiungendo lettura PDF testuale ed eventualmente OCR per scansioni.
