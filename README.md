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


### Versione integrata 0.3.1
- Cinema e tipologie restano vuoti prima del riconoscimento della ditta.
- Il recupero dal DB parte soltanto dopo il completamento effettivo della lettura documentale.
- Dopo il matching vengono caricati esclusivamente cinema e lavorazioni della ditta riconosciuta.
- Ditta, frequenze e importo complessivo vengono compilati dal DB.

### Correzione Word v12
Il master incluso nella cartella `templates` contiene 17 marcatori nominativi reali, ciascuno in un singolo run Word evidenziato in giallo. La generazione non tenta più di interpretare come marcatori i vecchi testi racchiusi tra parentesi graffe.


### Versione 0.4.1 Aree Gialle
Corrette tipologie in titolo, premessa ed elenco; anagrafica DUVRI; costo sicurezza predefinito; recapiti e firma.


### Versione 0.4.2 - Priorità fonti parser
- ragione sociale, sede legale, P. IVA, C.F., REA, PEC e legale rappresentante: priorità visura camerale;
- telefono, e-mail, INPS e INAIL: priorità DUVRI;
- polizza: priorità documento assicurativo;
- DURC: priorità documento DURC;
- normalizzazione di nomi e indirizzi con iniziali maiuscole, mantenendo sigle e codici.


### Versione 0.4.3 - Firma ripulita
- eliminazione completa dei frammenti del vecchio appaltatore nella cella firma;
- ragione sociale completa nella cella destra;
- linea, nominativo e dicitura del legale rappresentante allineati verticalmente al blocco della firma del committente;
- nominativo con sole iniziali maiuscole.


### Versione 0.4.8 - Matching esatto e classificazione documenti
- matching DB esatto prioritario per denominazioni complete;
- supporto nomi brevi come ABC e ALPHA tramite copertura dei token;
- DUVRI classificato prima della visura per evitare nomi ricavati dal nome file;
- fallback del nome file usato solo per file che contengono CCIAA o VISURA;
- rimosso il vecchio DB inline duplicato.
