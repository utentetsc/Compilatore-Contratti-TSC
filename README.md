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


### Versione 0.4.9 - Selezione DB diretta
- il matching usa esclusivamente il DB incorporato aggiornato;
- dopo il riconoscimento ricostruisce direttamente gli elenchi con i soli cinema e lavori della ditta;
- supportati sia nomi completi sia alias brevi ABC/ALPHA;
- OCR limitato alle sole visure indicate nel nome file come CCIAA o VISURA.


### Versione 0.5.0 - Ragione sociale e fallback DB
- indirizzi e intestazioni non possono più essere scelti come ragione sociale;
- i candidati non validi vengono eliminati prima dell'applicazione delle priorità documentali;
- estrazione rafforzata della ragione sociale dai modelli DUVRI;
- fallback matching tramite dominio e-mail/PEC per alias brevi come ABC;
- recupero congiunto delle due posizioni INPS.


### Versione 0.5.1 - REA generalizzato
- riconoscimento REA da CCIA, CCIAA, Camera di Commercio, Registro Imprese e Numero REA;
- supporto dei formati LE 221975, LE-221975 e LE/221975;
- esclusione di valori numerici privi della sigla provinciale;
- regola valida per tutte le ditte, senza associazioni dedicate ad ALPHA.


### Versione 0.5.2 - Denominazioni, REA e PEC
- il DB usa esattamente le denominazioni presenti nel nuovo Excel;
- indirizzi e intestazioni non possono essere ragioni sociali;
- se la ragione sociale documentale non è valida, viene usata la denominazione completa del DB, mai un alias inventato;
- REA generalizzato per CCIA/CCIAA e Numero REA;
- PEC riconosciuta anche quando il testo estratto contiene l'indirizzo senza etichetta separata.


### Versione 0.5.3 - Alias DB e denominazioni visualizzate
- gli alias DB composti da una sola parola, come ABC, restano utilizzati internamente per il matching;
- nei tre campi visibili viene mostrata la denominazione ufficiale completa recuperata dai documenti;
- le denominazioni DB già complete restano visualizzate senza modifiche;
- mantenute le correzioni generali per REA e PEC.


### Versione 0.5.4 - Matching univoco e verifica camerale OCR
- selezione automatica quando il primo candidato DB distacca nettamente gli altri;
- esclusione delle ditte con compatibilità bassa dall'elenco manuale;
- OCR delle visure/camerali prive di testo anche nella verifica D.M. 37/2008;
- riconoscimento lettere A-G in elenchi, diciture di abilitazione e sezioni art. 1 D.M. 37/2008.


### Versione 0.5.5 - Verifica camerale completa
- OCR di tutte le pagine dei file camerali/visure, anche se il PDF contiene testo parziale;
- riconoscimento delle lettere D.M. 37/2008 da “lettera X”, elenchi A-G e righe A) ... G);
- ricerca limitata alle sezioni collegate al D.M. 37/2008 per evitare falsi positivi.


#### Versione 0.5.8 - Elenchi tariffari definitivi
- diritto di chiamata unico: terzo punto principale;
- diritti diversi per cinema: intestazione principale e sottoelenco;
- creazione automatica dei paragrafi aggiuntivi senza sovrascrivere il disclaimer successivo;
- rimozione dei pallini vuoti e dei residui storici;
- nessuna modifica a parser, DB, controllo camerale o altre aree Word.
