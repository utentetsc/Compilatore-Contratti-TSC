let setup = StorageService.load();
// Database incorporato direttamente in app.js per evitare file mancanti su GitHub Pages.
const embeddedContracts = [{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Beinasco (TO)","supplier":"LA TORINESE","frequency":"S","amount":2956.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Torino (TO)","supplier":"LA TORINESE","frequency":"S","amount":3460.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Genova (GE)","supplier":"BEI GE","frequency":"S","amount":3200.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Cerro Maggiore (MI)","supplier":"Fiem","frequency":"S","amount":2016.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Montebello (PV)","supplier":"Fiem","frequency":"S","amount":2102.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Rozzano (MI)","supplier":"Fiem","frequency":"S","amount":2550.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Vimercate (MB)","supplier":"Giambelli","frequency":"S","amount":0.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Lugagnano (VR)","supplier":"VIMA","frequency":"S","amount":1361.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Torri di Quartesolo (VI)","supplier":"VIMA","frequency":"S","amount":3082.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Limena (PD)","supplier":"LAMPI","frequency":"S","amount":1592.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Limena (PD)","supplier":"VIMA","frequency":"S","amount":3232.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Silea (TV)","supplier":"LAMPI","frequency":"S","amount":2739.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Silea (TV)","supplier":"VIMA","frequency":"S","amount":2160.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Pradamano  (UD)","supplier":"LAMPI","frequency":"S","amount":963.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Pradamano  (UD)","supplier":"FIREST","frequency":"S","amount":1909.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Trieste (TS)","supplier":"FIREST","frequency":"S","amount":1816.45},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Bologna (BO)","supplier":"LUPI BO","frequency":"S","amount":3300.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Parma Barilla (PR)","supplier":"APA","frequency":"S","amount":1692.08},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Parma Campus (PR)","supplier":"APA","frequency":"S","amount":3161.07},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Firenze (FI)","supplier":"RF","frequency":"S","amount":3724.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Grosseto (GR)","supplier":"LUPI","frequency":"S","amount":2750.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Livorno (LI)","supplier":"LUPI","frequency":"S","amount":2750.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Corciano (PG)","supplier":"SEKURITALIA","frequency":"S","amount":2425.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Terni (TR)","supplier":"SEKURITALIA","frequency":"S","amount":3532.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Montesilvano (PE)","supplier":"FIMA","frequency":"S","amount":1978.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Guidonia (RM)","supplier":"VIMA","frequency":"S","amount":2007.3},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Head Office 1","supplier":"VIMA","frequency":"S","amount":50.43},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Roma Parco de' Medici (RM)","supplier":"VIMA","frequency":"S","amount":3377.44},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Roma Moderno (RM)","supplier":"VIMA","frequency":"S","amount":1940.48},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Napoli (NA)","supplier":"FIMA","frequency":"S","amount":2567.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Nola (NA)","supplier":"FIMA","frequency":"S","amount":3400.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Salerno (SA)","supplier":"FIMA","frequency":"S","amount":2747.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Casamassima (BA)","supplier":"FIMA","frequency":"S","amount":2181.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Surbo (LE)","supplier":"FIMA","frequency":"S","amount":2500.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Catanzaro (CZ)","supplier":"ELLESSE","frequency":"S","amount":1500.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Lamezia (CZ)","supplier":"ELLESSE","frequency":"S","amount":1600.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Belpasso (CT)","supplier":"BELFIRE","frequency":"S","amount":2500.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Sestu (CA)","supplier":"DE GIOANNIS","frequency":"S","amount":2100.0},{"workType":"ESTINTORI: porte-manichette-evacuatori","cinema":"TSC Quartucciu (CA)","supplier":"DE GIOANNIS","frequency":"S","amount":1880.0},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Beinasco (TO)","supplier":"LA TORINESE","frequency":"T","amount":800.0},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Montebello (PV)","supplier":"Fiem","frequency":"T","amount":1300.0},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Vimercate (MB)","supplier":"Giambelli","frequency":"T","amount":0.0},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Lugagnano (VR)","supplier":"VIMA","frequency":"S","amount":1020.0},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Torri di Quartesolo (VI)","supplier":"VIMA","frequency":"T","amount":1600.0},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Limena (PD)","supplier":"BOTTIN","frequency":"T","amount":1700.0},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Silea (TV)","supplier":"BOTTIN","frequency":"T","amount":1700.0},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Pradamano  (UD)","supplier":"BOTTIN","frequency":"T","amount":2500.0},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Bologna (BO)","supplier":"LUPI BO","frequency":"T","amount":2500.0},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Parma Campus (PR)","supplier":"APA","frequency":"T","amount":1529.2},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Firenze (FI)","supplier":"CIESSE","frequency":"S","amount":640.0},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Grosseto (GR)","supplier":"LUPI","frequency":"T","amount":2250.0},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Livorno (LI)","supplier":"LUPI","frequency":"T","amount":2250.0},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Terni (TR)","supplier":"SEKURITALIA","frequency":"T","amount":2393.0},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Montesilvano (PE)","supplier":"VIMA","frequency":"T","amount":2000.0},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Guidonia (RM)","supplier":"VIMA","frequency":"T","amount":1412.17},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Roma Moderno (RM)","supplier":"VIMA","frequency":"T","amount":1412.17},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Napoli (NA)","supplier":"VIMA","frequency":"T","amount":2200.0},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Salerno (SA)","supplier":"VIMA","frequency":"T","amount":1500.0},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Casamassima (BA)","supplier":"VIMA","frequency":"T","amount":1900.0},{"workType":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","cinema":"TSC Surbo (LE)","supplier":"VIMA","frequency":"T","amount":2000.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Beinasco (TO)","supplier":"CLIVET","frequency":"S","amount":4765.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Torino (TO)","supplier":"CLIVET","frequency":"S","amount":4162.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Genova (GE)","supplier":"BEI GE","frequency":"S","amount":1000.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Cerro Maggiore (MI)","supplier":"CLIVET","frequency":"S","amount":5970.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Montebello (PV)","supplier":"CLIVET","frequency":"S","amount":4765.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Rozzano (MI)","supplier":"CLIVET","frequency":"S","amount":7175.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Vimercate (MB)","supplier":"Giambelli","frequency":"S","amount":0.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Lugagnano (VR)","supplier":"STEA","frequency":"T","amount":6000.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Torri di Quartesolo (VI)","supplier":"RENOVIT","frequency":"S","amount":14350.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Limena (PD)","supplier":"RENOVIT","frequency":"S","amount":22650.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Silea (TV)","supplier":"RENOVIT","frequency":"S","amount":20750.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Pradamano  (UD)","supplier":"Airomnia","frequency":"S","amount":6200.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Pradamano  (UD)","supplier":"ALTERNATIVE CALDAIE","frequency":"A","amount":253.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Trieste (TS)","supplier":"Airomnia","frequency":"S","amount":3800.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Bologna (BO)","supplier":"RENOVIT","frequency":"S","amount":14000.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Parma Barilla (PR)","supplier":"TECNODELTA","frequency":"B","amount":12000.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Parma Campus (PR)","supplier":"CLIVET","frequency":"S","amount":6574.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Firenze (FI)","supplier":"VITTORI","frequency":"T","amount":15500.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Grosseto (GR)","supplier":"CLIVET","frequency":"S","amount":3560.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Livorno (LI)","supplier":"RENOVIT","frequency":"S","amount":19000.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Livorno (LI)","supplier":"PATRONE","frequency":"S","amount":700.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Corciano (PG)","supplier":"CEU","frequency":"S","amount":2700.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Corciano (PG)","supplier":"GHERLINDA","frequency":"S","amount":4000.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Terni (TR)","supplier":"CLIVET","frequency":"S","amount":4765.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Montesilvano (PE)","supplier":"CLIVET","frequency":"S","amount":5970.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Guidonia (RM)","supplier":"CLIVET","frequency":"S","amount":5370.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Head Office 1","supplier":"MPOWER","frequency":"B","amount":4000.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Roma Parco de' Medici (RM)","supplier":"IMMOBILIARE AUSONIA","frequency":"T","amount":40500.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Roma Moderno (RM)","supplier":"MPOWER","frequency":"B","amount":5500.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Napoli (NA)","supplier":"SOLLA","frequency":"T","amount":10000.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Nola (NA)","supplier":"SOLLA","frequency":"T","amount":8800.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Salerno (SA)","supplier":"RENOVIT","frequency":"T","amount":21300.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Casamassima (BA)","supplier":"CLIVET","frequency":"S","amount":4765.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Surbo (LE)","supplier":"CLIVET","frequency":"S","amount":4765.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Catanzaro (CZ)","supplier":"AEC","frequency":"S","amount":4400.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Lamezia (CZ)","supplier":"AEC","frequency":"S","amount":4200.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Belpasso (CT)","supplier":"Signorino","frequency":"S","amount":7170.16},{"workType":"MECCANICO E CDZ","cinema":"TSC Sestu (CA)","supplier":"EVOLUTION CLIMA","frequency":"S","amount":14000.0},{"workType":"MECCANICO E CDZ","cinema":"TSC Quartucciu (CA)","supplier":"EVOLUTION CLIMA","frequency":"S","amount":14000.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Beinasco (TO)","supplier":"BEI","frequency":"M\S","amount":8500.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Torino (TO)","supplier":"BEI","frequency":"M\S","amount":7600.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Genova (GE)","supplier":"BEI GE","frequency":"S\M\A","amount":7750.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Cerro Maggiore (MI)","supplier":"ESSER","frequency":"M\S","amount":11000.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Montebello (PV)","supplier":"ELECTRIC BRE-CAST","frequency":"M\S","amount":11000.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Rozzano (MI)","supplier":"ESSER","frequency":"M\S","amount":13000.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Vimercate (MB)","supplier":"Giambelli","frequency":"M\S","amount":0.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Lugagnano (VR)","supplier":"ELETTRO2000","frequency":"M\S","amount":8800.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Torri di Quartesolo (VI)","supplier":"ELETTRO2000","frequency":"M\S","amount":12000.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Limena (PD)","supplier":"FIEL","frequency":"M\S","amount":13967.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Silea (TV)","supplier":"FIEL","frequency":"M\S","amount":10801.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Pradamano  (UD)","supplier":"FIEL","frequency":"M\S","amount":11800.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Trieste (TS)","supplier":"FIEL","frequency":"M\S","amount":8254.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Bologna (BO)","supplier":"SANVIDO","frequency":"M\S","amount":15400.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Parma Barilla (PR)","supplier":"SANVIDO","frequency":"M\S","amount":13000.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Parma Campus (PR)","supplier":"SANVIDO","frequency":"M\S","amount":20750.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Firenze (FI)","supplier":"ABC","frequency":"M\S","amount":9540.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Grosseto (GR)","supplier":"ABC","frequency":"M\S","amount":10800.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Livorno (LI)","supplier":"ABC","frequency":"M\S","amount":11500.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Corciano (PG)","supplier":"CEU","frequency":"M\S","amount":10500.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Terni (TR)","supplier":"CEU","frequency":"M\S","amount":13000.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Montesilvano (PE)","supplier":"Cosmo Appalti","frequency":"M","amount":7000.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Guidonia (RM)","supplier":"MPOWER","frequency":"M","amount":9500.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Head Office 1","supplier":"MPOWER","frequency":"B","amount":3000.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Roma Parco de' Medici (RM)","supplier":"IMMOBILIARE AUSONIA","frequency":"M","amount":17500.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Roma Moderno (RM)","supplier":"MPOWER","frequency":"M","amount":6600.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Napoli (NA)","supplier":"EME","frequency":"M\S","amount":18705.75},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Nola (NA)","supplier":"EME","frequency":"M\S","amount":7707.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Salerno (SA)","supplier":"EME","frequency":"M\S","amount":12999.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Casamassima (BA)","supplier":"EME","frequency":"M\S","amount":7906.5},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Surbo (LE)","supplier":"Alpha Costruzioni E Impianti Srl","frequency":"M\S","amount":8800.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Catanzaro (CZ)","supplier":"ELLESSE","frequency":"M\S","amount":7500.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Lamezia (CZ)","supplier":"ELLESSE","frequency":"M\S","amount":4600.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Belpasso (CT)","supplier":"Signorino","frequency":"M\S","amount":9907.85},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Sestu (CA)","supplier":"OMEGA","frequency":"M\S","amount":11500.0},{"workType":"ELETTRICI - ups ordinaria","cinema":"TSC Quartucciu (CA)","supplier":"OMEGA","frequency":"M\S","amount":9500.0},{"workType":"GRUPPI ELETTROGENI","cinema":"TSC Beinasco (TO)","supplier":"BEI","frequency":"S","amount":1100.0},{"workType":"GRUPPI ELETTROGENI","cinema":"TSC Torino (TO)","supplier":"BEI","frequency":"S","amount":1100.0},{"workType":"GRUPPI ELETTROGENI","cinema":"TSC Silea (TV)","supplier":"FIEL","frequency":"S","amount":814.0},{"workType":"GRUPPI ELETTROGENI","cinema":"TSC Pradamano  (UD)","supplier":"FIEL","frequency":"S","amount":1226.0},{"workType":"GRUPPI ELETTROGENI","cinema":"TSC Parma Campus (PR)","supplier":"SANVIDO","frequency":"S","amount":null},{"workType":"GRUPPI ELETTROGENI","cinema":"TSC Guidonia (RM)","supplier":"MPOWER","frequency":"T","amount":1000.0},{"workType":"GRUPPI ELETTROGENI","cinema":"TSC Roma Moderno (RM)","supplier":"MPOWER","frequency":"T","amount":1000.0},{"workType":"GRUPPI ELETTROGENI","cinema":"TSC Napoli (NA)","supplier":"EME","frequency":"S","amount":840.0},{"workType":"GRUPPI ELETTROGENI","cinema":"TSC Nola (NA)","supplier":"EME","frequency":"S","amount":840.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Beinasco (TO)","supplier":"BEI","frequency":"A","amount":900.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Torino (TO)","supplier":"BEI","frequency":"A","amount":900.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Genova (GE)","supplier":"BEI GE","frequency":"S","amount":900.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Cerro Maggiore (MI)","supplier":"ESSER","frequency":"A","amount":1000.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Montebello (PV)","supplier":"ELECTRIC BRE-CAST","frequency":"A","amount":1000.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Rozzano (MI)","supplier":"ESSER","frequency":"A","amount":1000.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Vimercate (MB)","supplier":"Giambelli","frequency":"A","amount":0.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Lugagnano (VR)","supplier":"EDN","frequency":"T","amount":622.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Torri di Quartesolo (VI)","supplier":"EDN","frequency":"T","amount":700.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Limena (PD)","supplier":"FIEL","frequency":"T","amount":1200.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Silea (TV)","supplier":"FIEL","frequency":"T","amount":1300.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Pradamano  (UD)","supplier":"FIEL","frequency":"T","amount":1200.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Trieste (TS)","supplier":"FIEL","frequency":"T","amount":500.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Bologna (BO)","supplier":"SANVIDO","frequency":"T","amount":1200.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Parma Barilla (PR)","supplier":"SANVIDO","frequency":"T","amount":600.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Parma Campus (PR)","supplier":"SANVIDO","frequency":"T","amount":950.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Firenze (FI)","supplier":"ABC","frequency":"A","amount":1200.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Grosseto (GR)","supplier":"ABC","frequency":"A","amount":600.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Livorno (LI)","supplier":"ABC","frequency":"A","amount":400.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Corciano (PG)","supplier":"CEU","frequency":"T","amount":900.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Terni (TR)","supplier":"CEU","frequency":"T","amount":550.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Montesilvano (PE)","supplier":"Cosmo Appalti","frequency":"A","amount":1000.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Guidonia (RM)","supplier":"MPOWER","frequency":"A","amount":1000.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Head Office 1","supplier":"MPOWER","frequency":"A","amount":0.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Roma Parco de' Medici (RM)","supplier":"IMMOBILIARE AUSONIA","frequency":"M","amount":null},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Roma Moderno (RM)","supplier":"MPOWER","frequency":"A","amount":1000.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Napoli (NA)","supplier":"EME","frequency":"A","amount":1323.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Nola (NA)","supplier":"EME","frequency":"A","amount":1223.25},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Salerno (SA)","supplier":"EME","frequency":"A","amount":1218.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Casamassima (BA)","supplier":"EME","frequency":"A","amount":1018.5},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Surbo (LE)","supplier":"Alpha Costruzioni E Impianti Srl","frequency":"A","amount":1300.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Catanzaro (CZ)","supplier":"ELLESSE","frequency":"T","amount":1300.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Lamezia (CZ)","supplier":"SEA","frequency":"A","amount":780.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Belpasso (CT)","supplier":"Signorino","frequency":"T","amount":651.83},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Sestu (CA)","supplier":"OMEGA","frequency":"T","amount":500.0},{"workType":"TVCC -ANTINTRUSIONE","cinema":"TSC Quartucciu (CA)","supplier":"OMEGA","frequency":"T","amount":500.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Beinasco (TO)","supplier":"BEI","frequency":"M\S","amount":7000.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Torino (TO)","supplier":"BEI","frequency":"M\S","amount":5900.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Genova (GE)","supplier":"BEI GE","frequency":"S","amount":6750.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Cerro Maggiore (MI)","supplier":"ESSER","frequency":"M\S","amount":5600.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Montebello (PV)","supplier":"ELECTRIC BRE-CAST","frequency":"M\S","amount":4000.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Rozzano (MI)","supplier":"ESSER","frequency":"M\S","amount":5600.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Vimercate (MB)","supplier":"Giambelli","frequency":"M\S","amount":0.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Lugagnano (VR)","supplier":"EDN","frequency":"T\S","amount":1773.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Torri di Quartesolo (VI)","supplier":"EDN","frequency":"T\S","amount":2000.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Limena (PD)","supplier":"FIEL","frequency":"M\S","amount":3800.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Silea (TV)","supplier":"FIEL","frequency":"M\S","amount":2600.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Pradamano  (UD)","supplier":"FIEL","frequency":"M\S","amount":3500.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Trieste (TS)","supplier":"FIEL","frequency":"M\S","amount":2900.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Bologna (BO)","supplier":"SANVIDO","frequency":"M\S","amount":2000.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Parma Barilla (PR)","supplier":"SANVIDO","frequency":"M\S","amount":4200.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Parma Campus (PR)","supplier":"SANVIDO","frequency":"M\S","amount":6400.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Firenze (FI)","supplier":"ABC","frequency":"M\S","amount":3000.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Grosseto (GR)","supplier":"ABC","frequency":"M\S","amount":3000.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Livorno (LI)","supplier":"ABC","frequency":"M\S","amount":4100.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Corciano (PG)","supplier":"CEU","frequency":"M\S","amount":3000.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Terni (TR)","supplier":"CEU","frequency":"M\S","amount":3750.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Montesilvano (PE)","supplier":"Cosmo Appalti","frequency":"B\S","amount":4800.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Guidonia (RM)","supplier":"MPOWER","frequency":"S","amount":4000.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Head Office 1","supplier":"MPOWER","frequency":"B","amount":500.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Roma Parco de' Medici (RM)","supplier":"IMMOBILIARE AUSONIA","frequency":"B","amount":0.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Roma Moderno (RM)","supplier":"MPOWER","frequency":"B","amount":4000.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Napoli (NA)","supplier":"EME","frequency":"M\S","amount":14458.5},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Nola (NA)","supplier":"EME","frequency":"M\S","amount":6520.5},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Salerno (SA)","supplier":"EME","frequency":"M\S","amount":6704.25},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Casamassima (BA)","supplier":"EME","frequency":"M\S","amount":5297.25},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Surbo (LE)","supplier":"Alpha Costruzioni E Impianti Srl","frequency":"M\S","amount":5900.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Catanzaro (CZ)","supplier":"ELLESSE","frequency":"B\S","amount":3000.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Lamezia (CZ)","supplier":"SEA","frequency":"B\S","amount":2500.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Belpasso (CT)","supplier":"Signorino","frequency":"B\S","amount":3910.99},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Sestu (CA)","supplier":"OMEGA","frequency":"B\S","amount":4000.0},{"workType":"SICUREZZA:rilevazione fumi--evac","cinema":"TSC Quartucciu (CA)","supplier":"DE GIOANNIS","frequency":"S","amount":1120.0},{"workType":"UPS - Specialistica","cinema":"TSC Beinasco (TO)","supplier":"SICON","frequency":"A","amount":1300.0},{"workType":"UPS - Specialistica","cinema":"TSC Torino (TO)","supplier":"SICON","frequency":"A","amount":2180.0},{"workType":"UPS - Specialistica","cinema":"TSC Genova (GE)","supplier":"SICON","frequency":"A","amount":800.0},{"workType":"UPS - Specialistica","cinema":"TSC Cerro Maggiore (MI)","supplier":"SICON","frequency":"A","amount":3840.0},{"workType":"UPS - Specialistica","cinema":"TSC Montebello (PV)","supplier":"SICON","frequency":"A","amount":2150.0},{"workType":"UPS - Specialistica","cinema":"TSC Rozzano (MI)","supplier":"SICON","frequency":"A","amount":2246.0},{"workType":"UPS - Specialistica","cinema":"TSC Vimercate (MB)","supplier":"Giambelli","frequency":"","amount":0.0},{"workType":"UPS - Specialistica","cinema":"TSC Lugagnano (VR)","supplier":"SICON","frequency":"A","amount":null},{"workType":"UPS - Specialistica","cinema":"TSC Torri di Quartesolo (VI)","supplier":"SICON","frequency":"A","amount":1340.0},{"workType":"UPS - Specialistica","cinema":"TSC Limena (PD)","supplier":"SICON","frequency":"A","amount":2460.0},{"workType":"UPS - Specialistica","cinema":"TSC Silea (TV)","supplier":"SICON","frequency":"A","amount":5710.0},{"workType":"UPS - Specialistica","cinema":"TSC Pradamano  (UD)","supplier":"SICON","frequency":"A","amount":1960.0},{"workType":"UPS - Specialistica","cinema":"TSC Trieste (TS)","supplier":"SICON","frequency":"A","amount":1650.0},{"workType":"UPS - Specialistica","cinema":"TSC Bologna (BO)","supplier":"SICON","frequency":"A","amount":3510.0},{"workType":"UPS - Specialistica","cinema":"TSC Parma Barilla (PR)","supplier":"SICON","frequency":"A","amount":1908.0},{"workType":"UPS - Specialistica","cinema":"TSC Parma Campus (PR)","supplier":"SICON","frequency":"A","amount":2400.0},{"workType":"UPS - Specialistica","cinema":"TSC Firenze (FI)","supplier":"SICON","frequency":"A","amount":1690.0},{"workType":"UPS - Specialistica","cinema":"TSC Grosseto (GR)","supplier":"SICON","frequency":"A","amount":1170.0},{"workType":"UPS - Specialistica","cinema":"TSC Livorno (LI)","supplier":"SICON","frequency":"A","amount":3260.0},{"workType":"UPS - Specialistica","cinema":"TSC Corciano (PG)","supplier":"SICON","frequency":"A","amount":1590.0},{"workType":"UPS - Specialistica","cinema":"TSC Terni (TR)","supplier":"SICON","frequency":"A","amount":710.0},{"workType":"UPS - Specialistica","cinema":"TSC Montesilvano (PE)","supplier":"SICON","frequency":"A","amount":775.0},{"workType":"UPS - Specialistica","cinema":"TSC Guidonia (RM)","supplier":"SICON","frequency":"A","amount":970.0},{"workType":"UPS - Specialistica","cinema":"TSC Roma Parco de' Medici (RM)","supplier":"SICON","frequency":"A","amount":1685.0},{"workType":"UPS - Specialistica","cinema":"TSC Roma Moderno (RM)","supplier":"SICON","frequency":"A","amount":1160.0},{"workType":"UPS - Specialistica","cinema":"TSC Napoli (NA)","supplier":"SICON","frequency":"A","amount":5315.0},{"workType":"UPS - Specialistica","cinema":"TSC Nola (NA)","supplier":"SICON","frequency":"A","amount":1860.0},{"workType":"UPS - Specialistica","cinema":"TSC Salerno (SA)","supplier":"SICON","frequency":"A","amount":1630.0},{"workType":"UPS - Specialistica","cinema":"TSC Casamassima (BA)","supplier":"SICON","frequency":"A","amount":1230.0},{"workType":"UPS - Specialistica","cinema":"TSC Surbo (LE)","supplier":"CDS di GUIDO ANTONIO","frequency":"S","amount":1760.0},{"workType":"UPS - Specialistica","cinema":"TSC Catanzaro (CZ)","supplier":"SICON","frequency":"A","amount":1220.0},{"workType":"UPS - Specialistica","cinema":"TSC Lamezia (CZ)","supplier":"SICON","frequency":"A","amount":1370.0},{"workType":"UPS - Specialistica","cinema":"TSC Belpasso (CT)","supplier":"SICON","frequency":"A","amount":1660.0},{"workType":"UPS - Specialistica","cinema":"TSC Sestu (CA)","supplier":"SICON","frequency":"A","amount":2690.0},{"workType":"UPS - Specialistica","cinema":"TSC Quartucciu (CA)","supplier":"SICON","frequency":"A","amount":1665.0},{"workType":"IDRICO SANITARIO","cinema":"TSC Beinasco (TO)","supplier":"BEI","frequency":"T","amount":0.0},{"workType":"IDRICO SANITARIO","cinema":"TSC Torino (TO)","supplier":"BEI","frequency":"T","amount":0.0},{"workType":"IDRICO SANITARIO","cinema":"TSC Genova (GE)","supplier":"BEI GE","frequency":"T","amount":400.0},{"workType":"IDRICO SANITARIO","cinema":"TSC Cerro Maggiore (MI)","supplier":"BEI","frequency":"T","amount":1528.0},{"workType":"IDRICO SANITARIO","cinema":"TSC Montebello (PV)","supplier":"BEI","frequency":"T","amount":1825.0},{"workType":"IDRICO SANITARIO","cinema":"TSC Rozzano (MI)","supplier":"BEI","frequency":"T","amount":1528.0},{"workType":"IDRICO SANITARIO","cinema":"TSC Vimercate (MB)","supplier":"BEI","frequency":"T","amount":1636.0},{"workType":"IDRICO SANITARIO","cinema":"TSC Pradamano  (UD)","supplier":"ALTERNATIVE SOLUTION","frequency":"B","amount":1440.0},{"workType":"IDRICO SANITARIO","cinema":"TSC Bologna (BO)","supplier":"2G","frequency":"B","amount":1500.0},{"workType":"IDRICO SANITARIO","cinema":"TSC Firenze (FI)","supplier":"PREMATECK","frequency":"B","amount":800.0},{"workType":"IDRICO SANITARIO","cinema":"TSC Grosseto (GR)","supplier":"ABC","frequency":"B","amount":800.0},{"workType":"IDRICO SANITARIO","cinema":"TSC Livorno (LI)","supplier":"ABC","frequency":"M","amount":800.0},{"workType":"IDRICO SANITARIO","cinema":"TSC Corciano (PG)","supplier":"CEU","frequency":"T","amount":1000.0},{"workType":"IDRICO SANITARIO","cinema":"TSC Montesilvano (PE)","supplier":"Cosmo Appalti","frequency":"T","amount":3200.0},{"workType":"IDRICO SANITARIO","cinema":"TSC Guidonia (RM)","supplier":"MPOWER","frequency":"M","amount":1600.0},{"workType":"IDRICO SANITARIO","cinema":"TSC Napoli (NA)","supplier":"EME","frequency":"T","amount":3260.25},{"workType":"IDRICO SANITARIO","cinema":"TSC Nola (NA)","supplier":"EME","frequency":"T","amount":3260.25},{"workType":"IDRICO SANITARIO","cinema":"TSC Salerno (SA)","supplier":"EME","frequency":"T","amount":3260.25},{"workType":"IDRICO SANITARIO","cinema":"TSC Casamassima (BA)","supplier":"EME","frequency":"T","amount":3260.0},{"workType":"IDRICO SANITARIO","cinema":"TSC Surbo (LE)","supplier":"Alpha Costruzioni E Impianti Srl","frequency":"T","amount":2000.0},{"workType":"IDRICO SANITARIO","cinema":"TSC Belpasso (CT)","supplier":"Signorino","frequency":"T","amount":3259.16},{"workType":"IDRICO SANITARIO","cinema":"TSC Sestu (CA)","supplier":"OMEGA","frequency":"T","amount":1000.0},{"workType":"IDRICO SANITARIO","cinema":"TSC Quartucciu (CA)","supplier":"OMEGA","frequency":"T","amount":1000.0},{"workType":"ASCENSORI","cinema":"TSC Beinasco (TO)","supplier":"TK ELEVATOR","frequency":"T","amount":678.36},{"workType":"ASCENSORI","cinema":"TSC Torino (TO)","supplier":"TK ELEVATOR","frequency":"T","amount":678.36},{"workType":"ASCENSORI","cinema":"TSC Genova (GE)","supplier":"KONE (Genova Ascensore)","frequency":"S","amount":2560.0},{"workType":"ASCENSORI","cinema":"TSC Genova (GE)","supplier":"KONE (Genova Scale Mobili)","frequency":"T","amount":1602.0},{"workType":"ASCENSORI","cinema":"TSC Genova (GE)","supplier":"KONE (Genova Montascale)","frequency":"S","amount":300.0},{"workType":"ASCENSORI","cinema":"TSC Cerro Maggiore (MI)","supplier":"TK ELEVATOR","frequency":"T","amount":2547.6},{"workType":"ASCENSORI","cinema":"TSC Montebello (PV)","supplier":"SCHINDLER (Montebello)","frequency":"T","amount":4230.0},{"workType":"ASCENSORI","cinema":"TSC Vimercate (MB)","supplier":"Giambelli","frequency":"T","amount":0.0},{"workType":"ASCENSORI","cinema":"TSC Vimercate (MB)","supplier":"Giambelli","frequency":"T","amount":0.0},{"workType":"ASCENSORI","cinema":"TSC Limena (PD)","supplier":"OTIS (Limena Ascensori)","frequency":"S","amount":3024.0},{"workType":"ASCENSORI","cinema":"TSC Limena (PD)","supplier":"OTIS (Limena scale Mobili)","frequency":"S","amount":828.0},{"workType":"ASCENSORI","cinema":"TSC Silea (TV)","supplier":"OTIS (Silea Ascensore)","frequency":"S","amount":1008.0},{"workType":"ASCENSORI","cinema":"TSC Silea (TV)","supplier":"OTIS (Silea Ascensore Ristorante)","frequency":"S","amount":1008.0},{"workType":"ASCENSORI","cinema":"TSC Pradamano  (UD)","supplier":"OTIS (Pradamano Montacarichi)","frequency":"S","amount":1260.0},{"workType":"ASCENSORI","cinema":"TSC Pradamano  (UD)","supplier":"OTIS (Pradamano Ascensore Ristorante) Recherge1932","frequency":"S","amount":0.0},{"workType":"ASCENSORI","cinema":"TSC Trieste (TS)","supplier":"OTIS (Trieste)","frequency":"S","amount":441.0},{"workType":"ASCENSORI","cinema":"TSC Bologna (BO)","supplier":"OTIS (Bologna Ascensori)","frequency":"S","amount":1584.0},{"workType":"ASCENSORI","cinema":"TSC Bologna (BO)","supplier":"OTIS (Bologna Ascensori Ristorante)","frequency":"S","amount":1584.0},{"workType":"ASCENSORI","cinema":"TSC Parma Barilla (PR)","supplier":"SCHINDLER (Parma)","frequency":"T","amount":945.0},{"workType":"ASCENSORI","cinema":"TSC Parma Campus (PR)","supplier":"SCHINDLER (Parma)","frequency":"T","amount":945.0},{"workType":"ASCENSORI","cinema":"TSC Firenze (FI)","supplier":"TK ELEVATOR","frequency":"T","amount":678.36},{"workType":"ASCENSORI","cinema":"TSC Livorno (LI)","supplier":"ELEVAT","frequency":"t","amount":1104.0},{"workType":"ASCENSORI","cinema":"TSC Corciano (PG)","supplier":"SCHINDLER (Corciano)","frequency":"T","amount":5510.4},{"workType":"ASCENSORI","cinema":"TSC Terni (TR)","supplier":"KONE (Terni)","frequency":"Q","amount":1104.96},{"workType":"ASCENSORI","cinema":"TSC Montesilvano (PE)","supplier":"OTIS (Montesilvano)","frequency":"T","amount":1260.0},{"workType":"ASCENSORI","cinema":"TSC Roma Parco de' Medici (RM)","supplier":"SCHINDLER (TSC Roma P. de' Medici)","frequency":"S","amount":564.0},{"workType":"ASCENSORI","cinema":"TSC Roma Moderno (RM)","supplier":"KONE (Roma Moderno)","frequency":"Q","amount":1099.92},{"workType":"ASCENSORI","cinema":"TSC Napoli (NA)","supplier":"SCHINDLER (Napoli)","frequency":"T","amount":2400.0},{"workType":"ASCENSORI","cinema":"TSC Nola (NA)","supplier":"KONE (Nola)","frequency":"T","amount":1730.0},{"workType":"ASCENSORI","cinema":"TSC Salerno (SA)","supplier":"PARAVIA","frequency":"M","amount":720.0},{"workType":"ASCENSORI","cinema":"TSC Surbo (LE)","supplier":"OTIS (Surbo)","frequency":"T","amount":1080.0},{"workType":"ASCENSORI","cinema":"TSC Catanzaro (CZ)","supplier":"KONE (Catanzaro)","frequency":"T","amount":880.0},{"workType":"ASCENSORI","cinema":"TSC Lamezia (CZ)","supplier":"OTIS (Lamezia)","frequency":"T","amount":972.84},{"workType":"ASCENSORI","cinema":"TSC Belpasso (CT)","supplier":"SCHINDLER (Belpasso)","frequency":"T","amount":1200.0},{"workType":"ASCENSORI","cinema":"TSC Sestu (CA)","supplier":"SCHINDLER (Cagliari Sestu)","frequency":"S","amount":1490.0},{"workType":"ASCENSORI","cinema":"TSC Quartucciu (CA)","supplier":"OTIS (Quartucciu) ORDINE","frequency":"-","amount":96.0},{"workType":"EDILI-INSEGNE","cinema":"TSC Beinasco (TO)","supplier":"CLOD","frequency":"A","amount":1700.0},{"workType":"EDILI-INSEGNE","cinema":"TSC Torino (TO)","supplier":"CLOD","frequency":"A","amount":1700.0},{"workType":"EDILI-INSEGNE","cinema":"TSC Cerro Maggiore (MI)","supplier":"CLOD","frequency":"A","amount":null},{"workType":"EDILI-INSEGNE","cinema":"TSC Montebello (PV)","supplier":"CLOD","frequency":"A","amount":1700.0},{"workType":"EDILI-INSEGNE","cinema":"TSC Rozzano (MI)","supplier":"CLOD","frequency":"A","amount":1700.0},{"workType":"EDILI-INSEGNE","cinema":"TSC Vimercate (MB)","supplier":"CLOD","frequency":"A","amount":1700.0},{"workType":"EDILI-INSEGNE","cinema":"TSC Lugagnano (VR)","supplier":"CLOD","frequency":"A","amount":null},{"workType":"EDILI-INSEGNE","cinema":"TSC Torri di Quartesolo (VI)","supplier":"CLOD","frequency":"A","amount":1700.0},{"workType":"EDILI-INSEGNE","cinema":"TSC Limena (PD)","supplier":"CLOD","frequency":"A","amount":1700.0},{"workType":"EDILI-INSEGNE","cinema":"TSC Silea (TV)","supplier":"CLOD","frequency":"A","amount":null},{"workType":"EDILI-INSEGNE","cinema":"TSC Pradamano  (UD)","supplier":"CLOD","frequency":"A","amount":1700.0},{"workType":"EDILI-INSEGNE","cinema":"TSC Trieste (TS)","supplier":"CLOD","frequency":"A","amount":null},{"workType":"EDILI-INSEGNE","cinema":"TSC Bologna (BO)","supplier":"CLOD","frequency":"A","amount":null},{"workType":"EDILI-INSEGNE","cinema":"TSC Parma Barilla (PR)","supplier":"CLOD","frequency":"A","amount":null},{"workType":"EDILI-INSEGNE","cinema":"TSC Parma Campus (PR)","supplier":"CLOD","frequency":"A","amount":null},{"workType":"EDILI-INSEGNE","cinema":"TSC Firenze (FI)","supplier":"CLOD","frequency":"A","amount":null},{"workType":"EDILI-INSEGNE","cinema":"TSC Grosseto (GR)","supplier":"CLOD","frequency":"A","amount":1700.0},{"workType":"EDILI-INSEGNE","cinema":"TSC Livorno (LI)","supplier":"CLOD","frequency":"A","amount":1700.0},{"workType":"EDILI-INSEGNE","cinema":"TSC Corciano (PG)","supplier":"CLOD","frequency":"A","amount":null},{"workType":"EDILI-INSEGNE","cinema":"TSC Terni (TR)","supplier":"CLOD","frequency":"A","amount":null},{"workType":"EDILI-INSEGNE","cinema":"TSC Montesilvano (PE)","supplier":"CLOD","frequency":"A","amount":null},{"workType":"EDILI-INSEGNE","cinema":"TSC Guidonia (RM)","supplier":"CLOD","frequency":"A","amount":null},{"workType":"EDILI-INSEGNE","cinema":"TSC Roma Parco de' Medici (RM)","supplier":"CLOD","frequency":"A","amount":1700.0},{"workType":"EDILI-INSEGNE","cinema":"TSC Roma Moderno (RM)","supplier":"CLOD","frequency":"A","amount":1700.0},{"workType":"EDILI-INSEGNE","cinema":"TSC Napoli (NA)","supplier":"CLOD","frequency":"A","amount":1700.0},{"workType":"EDILI-INSEGNE","cinema":"TSC Nola (NA)","supplier":"CLOD","frequency":"A","amount":1700.0},{"workType":"EDILI-INSEGNE","cinema":"TSC Salerno (SA)","supplier":"CLOD","frequency":"A","amount":null},{"workType":"EDILI-INSEGNE","cinema":"TSC Casamassima (BA)","supplier":"CLOD","frequency":"A","amount":1700.0},{"workType":"EDILI-INSEGNE","cinema":"TSC Surbo (LE)","supplier":"CLOD","frequency":"A","amount":null},{"workType":"EDILI-INSEGNE","cinema":"TSC Catanzaro (CZ)","supplier":"CLOD","frequency":"A","amount":null},{"workType":"EDILI-INSEGNE","cinema":"TSC Lamezia (CZ)","supplier":"CLOD","frequency":"A","amount":1700.0},{"workType":"EDILI-INSEGNE","cinema":"TSC Belpasso (CT)","supplier":"CLOD","frequency":"A","amount":1700.0},{"workType":"EDILI-INSEGNE","cinema":"TSC Sestu (CA)","supplier":"CLOD","frequency":"A","amount":null},{"workType":"EDILI-INSEGNE","cinema":"TSC Quartucciu (CA)","supplier":"CLOD","frequency":"A","amount":1700.0},{"workType":"CABINE MT","cinema":"TSC Rozzano (MI)","supplier":"RDL","frequency":"A","amount":1900.0},{"workType":"CABINE MT","cinema":"TSC Vimercate (MB)","supplier":"GIAMBELLI","frequency":"A","amount":0.0},{"workType":"CABINE MT","cinema":"TSC Lugagnano (VR)","supplier":"RDL","frequency":"A","amount":1900.0},{"workType":"CABINE MT","cinema":"TSC Torri di Quartesolo (VI)","supplier":"RDL","frequency":"A","amount":1900.0},{"workType":"CABINE MT","cinema":"TSC Limena (PD)","supplier":"RDL","frequency":"A","amount":1900.0},{"workType":"CABINE MT","cinema":"TSC Silea (TV)","supplier":"RDL","frequency":"A","amount":1900.0},{"workType":"CABINE MT","cinema":"TSC Pradamano  (UD)","supplier":"RDL","frequency":"A","amount":1900.0},{"workType":"CABINE MT","cinema":"TSC Trieste (TS)","supplier":"RDL","frequency":"A","amount":1900.0},{"workType":"CABINE MT","cinema":"TSC Corciano (PG)","supplier":"RDL","frequency":"A","amount":1900.0},{"workType":"CABINE MT","cinema":"TSC Terni (TR)","supplier":"RDL","frequency":"A","amount":1900.0},{"workType":"CABINE MT","cinema":"TSC Montesilvano (PE)","supplier":"RDL","frequency":"A","amount":1900.0},{"workType":"CABINE MT","cinema":"TSC Guidonia (RM)","supplier":"RDL","frequency":"A","amount":1900.0},{"workType":"CABINE MT","cinema":"TSC Roma Parco de' Medici (RM)","supplier":"RDL","frequency":"A","amount":1900.0},{"workType":"CABINE MT","cinema":"TSC Roma Moderno (RM)","supplier":"RDL","frequency":"A","amount":1900.0},{"workType":"CABINE MT","cinema":"TSC Napoli (NA)","supplier":"RDL","frequency":"A","amount":1900.0},{"workType":"CABINE MT","cinema":"TSC Casamassima (BA)","supplier":"RDL","frequency":"A","amount":1900.0},{"workType":"CABINE MT","cinema":"TSC Surbo (LE)","supplier":"RDL","frequency":"A","amount":1900.0},{"workType":"CARICHI SOSPESI","cinema":"TSC Rozzano (MI)","supplier":"Scena4","frequency":"A","amount":2756.0},{"workType":"CARICHI SOSPESI","cinema":"TSC Pradamano  (UD)","supplier":"Scena4","frequency":"A","amount":2756.0},{"workType":"CARICHI SOSPESI","cinema":"TSC Trieste (TS)","supplier":"Scena4","frequency":"A","amount":2756.0},{"workType":"CARICHI SOSPESI","cinema":"TSC Bologna (BO)","supplier":"Scena4","frequency":"A","amount":2756.0},{"workType":"CARICHI SOSPESI","cinema":"TSC Parma Barilla (PR)","supplier":"Scena4","frequency":"A","amount":2756.0},{"workType":"CARICHI SOSPESI","cinema":"TSC Parma Campus (PR)","supplier":"Scena4","frequency":"A","amount":2756.0},{"workType":"CARICHI SOSPESI","cinema":"TSC Firenze (FI)","supplier":"Scena4","frequency":"A","amount":2756.0},{"workType":"CARICHI SOSPESI","cinema":"TSC Grosseto (GR)","supplier":"Scena4","frequency":"A","amount":2756.0},{"workType":"CARICHI SOSPESI","cinema":"TSC Livorno (LI)","supplier":"Scena4","frequency":"A","amount":2756.0},{"workType":"CARICHI SOSPESI","cinema":"TSC Corciano (PG)","supplier":"Scena4","frequency":"A","amount":2756.0},{"workType":"CARICHI SOSPESI","cinema":"TSC Terni (TR)","supplier":"Scena4","frequency":"A","amount":2756.0},{"workType":"CARICHI SOSPESI","cinema":"TSC Guidonia (RM)","supplier":"Scena4","frequency":"A","amount":2756.0},{"workType":"CARICHI SOSPESI","cinema":"TSC Roma Parco de' Medici (RM)","supplier":"Scena4","frequency":"A","amount":2756.0},{"workType":"CARICHI SOSPESI","cinema":"TSC Roma Moderno (RM)","supplier":"Scena4","frequency":"A","amount":2756.0},{"workType":"CARICHI SOSPESI","cinema":"TSC Napoli (NA)","supplier":"Scena4","frequency":"A","amount":2756.0},{"workType":"CARICHI SOSPESI","cinema":"TSC Nola (NA)","supplier":"Scena4","frequency":"A","amount":2756.0},{"workType":"CARICHI SOSPESI","cinema":"TSC Salerno (SA)","supplier":"Scena4","frequency":"A","amount":2756.0},{"workType":"FOTOVOLTAICO","cinema":"TSC Torino (TO)","supplier":"Renovit","frequency":"S","amount":14000.0},{"workType":"FOTOVOLTAICO","cinema":"TSC Torri di Quartesolo (VI)","supplier":"Renovit","frequency":"S","amount":2000.0},{"workType":"FOTOVOLTAICO","cinema":"TSC Limena (PD)","supplier":"Renovit","frequency":"S","amount":3000.0},{"workType":"FOTOVOLTAICO","cinema":"TSC Silea (TV)","supplier":"Renovit","frequency":"S","amount":3000.0},{"workType":"FOTOVOLTAICO","cinema":"TSC Bologna (BO)","supplier":"Renovit","frequency":"S","amount":2000.0},{"workType":"FOTOVOLTAICO","cinema":"TSC Parma Campus (PR)","supplier":"Renovit","frequency":"S","amount":12000.0},{"workType":"FOTOVOLTAICO","cinema":"TSC Livorno (LI)","supplier":"Renovit","frequency":"S","amount":2500.0},{"workType":"FOTOVOLTAICO","cinema":"TSC Salerno (SA)","supplier":"Renovit","frequency":"S","amount":2500.0},{"workType":"CONSULENZE","cinema":"TSC Beinasco (TO)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Torino (TO)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Genova (GE)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Cerro Maggiore (MI)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Montebello (PV)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Rozzano (MI)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Vimercate (MB)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Lugagnano (VR)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Torri di Quartesolo (VI)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Limena (PD)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Silea (TV)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Pradamano  (UD)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Trieste (TS)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Bologna (BO)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Parma Barilla (PR)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Parma Campus (PR)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Firenze (FI)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Grosseto (GR)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Livorno (LI)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Corciano (PG)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Terni (TR)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Montesilvano (PE)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Guidonia (RM)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Head Office 1","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Roma Parco de' Medici (RM)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Roma Moderno (RM)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Napoli (NA)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Nola (NA)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Salerno (SA)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Casamassima (BA)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Surbo (LE)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Catanzaro (CZ)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Lamezia (CZ)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Belpasso (CT)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Sestu (CA)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0},{"workType":"CONSULENZE","cinema":"TSC Quartucciu (CA)","supplier":"Molinaro Alberto","frequency":"A","amount":1945.0}];
const embeddedWorkTypes = [{"id":"work-1","name":"ASCENSORI","description":""},{"id":"work-2","name":"CABINE MT","description":""},{"id":"work-3","name":"CARICHI SOSPESI","description":""},{"id":"work-4","name":"CONSULENZE","description":""},{"id":"work-5","name":"EDILI-INSEGNE","description":""},{"id":"work-6","name":"ELETTRICI - ups ordinaria","description":""},{"id":"work-7","name":"ESTINTORI: porte-manichette-evacuatori","description":""},{"id":"work-8","name":"FOTOVOLTAICO","description":""},{"id":"work-9","name":"GRUPPI ELETTROGENI","description":""},{"id":"work-10","name":"GRUPPI POMPAGGIO: lame d'acqua-sprinkler - EFC","description":""},{"id":"work-11","name":"IDRICO SANITARIO","description":""},{"id":"work-12","name":"MECCANICO E CDZ","description":""},{"id":"work-13","name":"SICUREZZA:rilevazione fumi--evac","description":""},{"id":"work-14","name":"TVCC -ANTINTRUSIONE","description":""},{"id":"work-15","name":"UPS - Specialistica","description":""}];
if(!Array.isArray(setup.cinemas)) setup.cinemas=[];
setup.contracts=[...embeddedContracts];
setup.workTypes=[...embeddedWorkTypes];
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
  $("cinemaSelect").innerHTML=setup.cinemas.map(x=>`<option value="${esc(x.id)}">${esc(x.name)}</option>`).join("");
  $("workSelect").innerHTML=setup.workTypes.map(x=>`<option value="${esc(x.id)}">${esc(x.name)}</option>`).join("");
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


// ============================================================
// CONTROLLO PRELIMINARE DI COERENZA CAMERALE
// Fonti normative: D.M. 37/2008 vigente; ATECO 2025 ISTAT.
// Il controllo non sostituisce una verifica legale o camerale.
// ============================================================
const LEGAL_COMPLIANCE_RULES = [
  {test:/\b(cabine?\s*mt|elettric|ups|gruppi?\s*elettrogen|fotovolta)/i,letters:["A"],ateco:["43.21"],label:"Impianti elettrici"},
  {test:/\b(tvcc|antintrusione|antenne?|elettronic|dati|fibra)/i,letters:["B"],ateco:["43.21"],label:"Impianti elettronici e di sicurezza"},
  {test:/\b(meccanico|cdz|climat|condizion|riscald|refriger)/i,letters:["C"],ateco:["43.22"],label:"Climatizzazione e impianti termici"},
  {test:/\b(idrico|sanitari|idraul)/i,letters:["D"],ateco:["43.22"],label:"Impianti idrici e sanitari"},
  {test:/\b(gas|metano)/i,letters:["E"],ateco:["43.22"],label:"Impianti gas"},
  {test:/\b(ascensor|montacarich|scale mobili|sollevamento persone)/i,letters:["F"],ateco:["43.24"],label:"Impianti di sollevamento"},
  {test:/\b(estintor|manichette|evacuator|rilevazione fumi|sprinkler|efc|antincendio|lame d['’]?acqua)/i,letters:["G"],ateco:["43.22"],label:"Protezione antincendio"}
];
let lastComplianceDocumentText="";
let lastMatchedWorkNames=[];

function complianceNorm(v){return String(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ").trim()}
function findAtecoCodes(text){
  const out=new Set();
  const labelled=/\b(?:codice\s+)?ateco(?:\s+primario|\s+prevalente|\s+secondario)?\s*[:\-]?\s*(\d{2}(?:[.\s]\d{1,2}){1,3}|\d{6})\b/gi;
  let m; while((m=labelled.exec(text))){
    let code=m[1].replace(/\s+/g,".");
    if(/^\d{6}$/.test(code))code=`${code.slice(0,2)}.${code.slice(2,4)}.${code.slice(4)}`;
    out.add(code);
  }
  const dotted=/\b(\d{2}\.\d{1,2}(?:\.\d{1,2})?)\b/g;
  while((m=dotted.exec(text)))out.add(m[1]);
  return [...out];
}
function findDm37Letters(text){
  const t=complianceNorm(text).toUpperCase(),letters=new Set();
  const anchors=[...t.matchAll(/(?:D\.?\s*M\.?\s*37\s*\/\s*2008|DECRETO\s+37\s*\/\s*2008|ABILITAZION[EI]?\s+IMPIANTISTIC[AE]?|IMPIANTI\s+DI\s+CUI\s+ALL['’]?ART)/g)].map(m=>m.index);
  const zones=anchors.length?anchors.map(i=>t.slice(Math.max(0,i-400),i+5000)):[t];
  for(const zone of zones){
    let m;
    const direct=/(?:LETTER[AE]?|LETT\.?|CATEGORI[AE])\s*[:.\-]?\s*([A-G])\b/g;
    while((m=direct.exec(zone)))letters.add(m[1]);
    const item=/\b([A-G])\s*[)\.\-:]\s*(?=(?:IMPIANT|PROTEZION|ANTINCEND|ELETTRIC|ELETTRONIC|RISCALD|CLIMAT|IDRIC|SANITAR|GAS|SOLLEVAMENT|ASCENSOR))/g;
    while((m=item.exec(zone)))letters.add(m[1]);
    const sequences=zone.match(/\bA\s*[,;\/\-]\s*B(?:\s*[,;\/\-]\s*[C-G]){0,5}\b/g)||[];
    for(const seq of sequences)for(const x of seq.match(/[A-G]/g)||[])letters.add(x);
    const labelled=/(?:LETTER[AE]?|ABILITAZION[EI]?)[^A-G]{0,100}((?:[A-G]\s*[,;\/\-E]?\s*){2,7})/g;
    while((m=labelled.exec(zone)))for(const x of m[1].match(/[A-G]/g)||[])letters.add(x);
  }
  return [...letters].sort();
}
async function extractComplianceText(files){
  const chunks=[];
  for(const file of files||[]){
    try{
      if(/\.pdf$/i.test(file.name)&&typeof pdfjsLib!=="undefined"){
        const pdf=await pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise;
        for(let i=1;i<=pdf.numPages;i++){
          const page=await pdf.getPage(i),content=await page.getTextContent();
          let pageText=content.items.map(x=>x.str).join(" ");
          const isCamerale=/(?:CCIAA|VISURA|CAMERALE|CAMERA DI COMMERCIO)/i.test(file.name+" "+pageText);
          if(isCamerale&&window.Tesseract){
            const viewport=page.getViewport({scale:1.8}),canvas=document.createElement("canvas"),ctx=canvas.getContext("2d");
            canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);
            await page.render({canvasContext:ctx,viewport}).promise;
            try{pageText+=" "+(await Tesseract.recognize(canvas,"ita")).data.text}catch(err){console.warn("OCR camerale non riuscito, pagina",i,err)}
          }
          chunks.push(pageText);
        }
      }else if(/\.(txt|csv)$/i.test(file.name))chunks.push(await file.text());
    }catch(err){console.warn("Verifica camerale: testo non leggibile",file.name,err)}
  }
  return chunks.join("\n");
}
function ensureCompliancePanel(){
  let panel=document.getElementById("legalCompliancePanel");
  if(panel)return panel;
  panel=document.createElement("section");panel.id="legalCompliancePanel";
  panel.style.cssText="margin-top:16px;padding:16px;border:1px solid #cbd5e1;border-left:5px solid #2563eb;border-radius:8px;background:#f8fafc";
  const anchor=document.getElementById("dbMatchSummary")||document.getElementById("reviewPanel")||document.getElementById("status");
  (anchor?.parentElement||document.body).appendChild(panel);
  return panel;
}
function complianceWorkItems(){
  const selected=selectedWorkTypes();
  if(selected.length)return selected;
  if(lastMatchedWorkNames.length)return lastMatchedWorkNames.map(name=>({name}));
  const supplier=($("databaseCompanyName").value||$("supplier").value||$("companyName").value||"").trim();
  if(supplier){
    const names=[...new Set((setup.contracts||[])
      .filter(row=>ContractDbImporter.norm(row.supplier)===ContractDbImporter.norm(supplier))
      .map(row=>row.workType).filter(Boolean))];
    if(names.length){lastMatchedWorkNames=[...names];return names.map(name=>({name}))}
  }
  // Ultimo fallback: le opzioni evidenziate o le lavorazioni visibili associate al DB.
  const visible=[...$("workSelect").options].filter(option=>option.selected).map(option=>option.textContent.trim()).filter(Boolean);
  return visible.map(name=>({name}));
}
function renderLegalCompliance(text=lastComplianceDocumentText){
  const panel=ensureCompliancePanel();
  const works=complianceWorkItems();
  if(!works.length){panel.innerHTML='<h3>Verifica camerale delle lavorazioni</h3><p>La verifica partirà dopo il riconoscimento della ditta e delle tipologie di lavorazione.</p><button type="button" id="retryComplianceCheck">Riprova verifica</button>';document.getElementById("retryComplianceCheck").onclick=()=>renderLegalCompliance(lastComplianceDocumentText);return}
  const normalized=complianceNorm(text);
  const letters=findDm37Letters(normalized),ateco=findAtecoCodes(normalized);
  const rows=[];
  for(const work of works){
    const rule=LEGAL_COMPLIANCE_RULES.find(r=>r.test.test(work.name));
    if(!rule){
      rows.push({name:work.name,status:"review",title:"Verifica manuale",detail:"Nessuna regola automatica univoca. Verificare l’attività dichiarata in visura e l’eventuale normativa speciale."});continue;
    }
    const foundLetters=rule.letters.filter(x=>letters.includes(x));
    const foundAteco=ateco.filter(code=>rule.ateco.some(prefix=>code.startsWith(prefix)));
    if(foundLetters.length===rule.letters.length){
      rows.push({name:work.name,status:"ok",title:"Abilitazione rilevata",detail:`D.M. 37/2008: lettera ${rule.letters.join("/")} rilevata${foundAteco.length?`; ATECO coerente: ${foundAteco.join(", ")}`:". Codice ATECO non determinante ai fini dell’abilitazione."}`});
    }else if(foundAteco.length){
      rows.push({name:work.name,status:"review",title:"ATECO coerente, abilitazione da verificare",detail:`Rilevato ${foundAteco.join(", ")}; non è stata individuata con certezza la lettera ${rule.letters.join("/")} del D.M. 37/2008.`});
    }else{
      rows.push({name:work.name,status:"missing",title:"Requisito non rilevato",detail:`Nei documenti caricati non è stata individuata la lettera ${rule.letters.join("/")} del D.M. 37/2008 né un indicatore ATECO ${rule.ateco.join("/")}.`});
    }
  }
  const counts={ok:rows.filter(x=>x.status==="ok").length,review:rows.filter(x=>x.status==="review").length,missing:rows.filter(x=>x.status==="missing").length};
  const color={ok:"#15803d",review:"#b45309",missing:"#b91c1c"},icon={ok:"✓",review:"⚠",missing:"✕"};
  panel.innerHTML=`<h3 style="margin:0 0 8px">Verifica camerale delle lavorazioni</h3>
    <p style="margin:0 0 12px"><b>Esito preliminare:</b> ${counts.ok} compatibili, ${counts.review} da verificare, ${counts.missing} requisiti non rilevati.</p>
    ${rows.map(r=>`<div style="padding:10px 0;border-top:1px solid #e2e8f0"><b style="color:${color[r.status]}">${icon[r.status]} ${esc(r.name)} — ${r.title}</b><br><span>${esc(r.detail)}</span></div>`).join("")}
    <details style="margin-top:10px"><summary>Dati camerali individuati</summary><p>Lettere D.M. 37/2008: <b>${letters.join(", ")||"nessuna individuata"}</b><br>Codici ATECO: <b>${ateco.join(", ")||"nessuno individuato"}</b></p></details>
    <p style="font-size:12px;margin:12px 0 0;color:#475569">Controllo preliminare documentale. L’ATECO è un indicatore di coerenza, non sostituisce l’abilitazione camerale. Verificare visura aggiornata, attività esercitata, lettere D.M. 37/2008 ed eventuali requisiti speciali.</p>`;
}
async function runLegalComplianceCheck(files,evidenceText=""){
  const rawText=await extractComplianceText(files);
  lastComplianceDocumentText=[rawText,evidenceText].filter(Boolean).join("\n");
  renderLegalCompliance(lastComplianceDocumentText);
}

function selectedWorkTypes(){return [...$("workSelect").selectedOptions].map(o=>setup.workTypes.find(x=>x.id===o.value)||{id:o.value,name:o.textContent.trim(),description:""}).filter(x=>x.name)}
function updateWorkSummary(){const list=selectedWorkTypes();$("workSelectionSummary").textContent=list.length?`${list.length} tipologie: ${list.map(x=>x.name).join(", ")}`:"Nessuna tipologia selezionata"}
function selectedCinemas(){return [...$("cinemaSelect").selectedOptions].map(o=>setup.cinemas.find(x=>x.id===o.value)||{id:o.value,name:o.textContent.trim(),address:"",city:""}).filter(x=>x.name)}
function updateCinemaSummary(){const list=selectedCinemas();$("cinemaSelectionSummary").textContent=list.length?`${list.length} cinema: ${list.map(x=>x.name).join(", ")}`:"Nessun cinema selezionato"}
function cinemaMatches(dbName,selected){
  const a=ContractDbImporter.norm(dbName).replace(/^tsc /,""), b=ContractDbImporter.norm(selected).replace(/^tsc /,"");
  const core=x=>x.replace(/\b[a-z]{2}\b$/," ").replace(/\s+/g," ").trim();
  return core(a)===core(b) || core(a).includes(core(b)) || core(b).includes(core(a));
}
function applyDbMatches(matches,cinemas,works,fromSupplier){
  const unique=[];
  const seen=new Set();
  for(const row of (matches||[])){
    const key=[row.workType,row.cinema,row.supplier,row.frequency,row.amount].map(v=>String(v??"")).join("|");
    if(!seen.has(key)){seen.add(key);unique.push(row)}
  }
  const frequencies=[...new Set(unique.map(x=>String(x.frequency||"").trim()).filter(Boolean))];
  const amounts=unique.map(x=>Number(x.amount)).filter(Number.isFinite);
  $("frequency").value=frequencies.join(" / ");
  $("contractAmount").value=amounts.length ? amounts.reduce((a,b)=>a+b,0).toLocaleString("it-IT",{minimumFractionDigits:2,maximumFractionDigits:2}) : "";
  if(fromSupplier&&unique.length){
    const supplier=unique[0].supplier||"";
    $("databaseCompanyName").value=supplier;
    const official=cleanDisplayedCompanyName($("documentCompanyName").value||$("companyName").value);
    if(official)$("companyName").value=official;
    $("supplier").value=supplier;
  }
  const box=$("dbMatchSummary");
  if(box){
    if(!unique.length){
      box.innerHTML='<div class="match-ambiguous">Nessun abbinamento trovato nel DB per la selezione corrente.</div>';
    }else{
      const cinemaCount=new Set(unique.map(x=>x.cinema)).size;
      const workCount=new Set(unique.map(x=>x.workType)).size;
      box.innerHTML=`<div class="match-exact">DB applicato: ${unique.length} righe, ${cinemaCount} cinema, ${workCount} tipologie.</div>`;
    }
  }
}
function applyContractSuggestion(){
  updateCinemaSummary(); updateWorkSummary();
  const cinemas=selectedCinemas(), works=selectedWorkTypes();
  if(!cinemas.length||!works.length)return;
  const matches=[];
  for(const cinema of cinemas)for(const work of works){
    matches.push(...(setup.contracts||[]).filter(x=>ContractDbImporter.norm(x.workType)===ContractDbImporter.norm(work.name)&&(cinema.dbName ? x.cinema===cinema.dbName : cinemaMatches(x.cinema,cinema.name))));
  }
  applyDbMatches(matches,cinemas,works,false);
}
function cleanDisplayedCompanyName(value){
  return String(value||"").replace(/^\s*(ragione sociale|denominazione sociale|denominazione|ditta|fornitore)\s*[:\-]?\s*/i,"").replace(/\s+/g," ").trim();
}
function normalizeSupplierName(v){
  return ContractDbImporter.norm(cleanDisplayedCompanyName(v))
    .replace(/\b(srl|s r l|spa|s p a|snc|sas|sapa|soc coop|cooperativa)\b/g," ")
    .replace(/\s+/g," ").trim();
}
function canonicalSupplierName(v){return normalizeSupplierName(v).replace(/[^a-z0-9]/g,"").replace(/(srl|spa|snc|sas|sapa|soccoop|cooperativa)$/g,"")}
function compactName(v){return canonicalSupplierName(v)}
function levenshtein(a,b){
  a=compactName(a);b=compactName(b);if(!a||!b)return Math.max(a.length,b.length);
  const row=Array.from({length:b.length+1},(_,i)=>i);
  for(let i=1;i<=a.length;i++){let prev=row[0];row[0]=i;for(let j=1;j<=b.length;j++){const tmp=row[j];row[j]=Math.min(row[j]+1,row[j-1]+1,prev+(a[i-1]===b[j-1]?0:1));prev=tmp}}
  return row[b.length];
}
function supplierScore(documentName,dbName){
  const a=normalizeSupplierName(documentName),b=normalizeSupplierName(dbName),ac=canonicalSupplierName(a),bc=canonicalSupplierName(b);
  if(!ac||!bc)return 0;if(ac===bc)return 100;
  const shorter=Math.min(ac.length,bc.length),longer=Math.max(ac.length,bc.length);
  const containment=(ac.includes(bc)||bc.includes(ac))&&shorter>=5?Math.round(92+6*(shorter/longer)):0;
  const edit=1-levenshtein(ac,bc)/longer;
  const prefix=(()=>{let i=0;while(i<shorter&&ac[i]===bc[i])i++;return i/shorter})();
  return Math.round(Math.max(containment,edit*82,prefix>=0.75?88+10*prefix:0));
}
function activeContractRows(){return Array.isArray(setup.contracts)&&setup.contracts.length?setup.contracts:embeddedContracts;}
function supplierCandidates(company){
  const source=normalizeSupplierName(company),sourceCompact=canonicalSupplierName(company);
  const sourceTokens=new Set(source.split(/\s+/).filter(x=>x.length>=3&&!new Set(["srl","spa","snc","sas","costruzioni","costruzione","societa","servizi","service","della","degli","del","dei","e","ed"]).has(x)));
  return [...new Set(activeContractRows().map(x=>x.supplier).filter(Boolean))].map(name=>{
    const db=normalizeSupplierName(name),dbCompact=canonicalSupplierName(name),dbTokens=db.split(/\s+/).filter(x=>x.length>=3&&!new Set(["srl","spa","snc","sas","costruzioni","costruzione","societa","servizi","service","della","degli","del","dei","e","ed"]).has(x));
    const covered=dbTokens.length?dbTokens.filter(x=>sourceTokens.has(x)).length/dbTokens.length:0;
    let score=supplierScore(company,name);
    if(sourceCompact===dbCompact)score=100;else if(covered===1)score=Math.max(score,dbTokens.length===1?95:98);
    return {name,score,coverage:covered};
  }).filter(x=>x.score>=60).sort((a,b)=>b.score-a.score||b.coverage-a.coverage||a.name.localeCompare(b.name,"it"));
}
function applySupplierChoice(supplier,score,sourceName){
  const matches=activeContractRows().filter(x=>ContractDbImporter.norm(x.supplier)===ContractDbImporter.norm(supplier));
  const cinemaNames=[...new Set(matches.map(x=>x.cinema))],workNames=[...new Set(matches.map(x=>x.workType))];
  lastMatchedWorkNames=[...workNames];
  [...$("cinemaSelect").options].forEach(o=>{const c=setup.cinemas.find(x=>x.id===o.value);o.selected=!!c&&cinemaNames.some(n=>cinemaKey(n)===cinemaKey(c.dbName||c.name))});
  [...$("workSelect").options].forEach(o=>{const w=setup.workTypes.find(x=>x.id===o.value);o.selected=!!w&&workNames.some(n=>ContractDbImporter.norm(n)===ContractDbImporter.norm(w.name))});
  // Second pass by visible text: avoids stale/mismatched IDs after a DB import.
  [...$("workSelect").options].forEach(o=>{if(workNames.some(n=>ContractDbImporter.norm(n)===ContractDbImporter.norm(o.textContent)))o.selected=true});
  $("documentCompanyName").value=sourceName||$("documentCompanyName").value;
  $("databaseCompanyName").value=supplier;
  $("companyName").value=supplier;
  $("supplier").value=supplier;
  const cinemas=selectedCinemas(),works=selectedWorkTypes();
  updateCinemaSummary();updateWorkSummary();applyDbMatches(matches,cinemas,works,true);
  setTimeout(()=>renderLegalCompliance(),0);
  const panel=$("supplierMatchPanel");panel.hidden=true;
  const box=$("dbMatchSummary");
  const label=score===100?"Corrispondenza esatta":score>=80?"Corrispondenza probabile":"Corrispondenza scelta manualmente";
  box.innerHTML=`<div class="${score===100?"match-exact":score>=80?"match-probable":"match-ambiguous"}">${label}: ${score}%</div><div>Documenti: <b>${esc(sourceName)}</b><br>Database: <b>${esc(supplier)}</b></div>`+box.innerHTML;
}
function showSupplierCandidates(company,candidates){
  const panel=$("supplierMatchPanel");panel.hidden=false;
  panel.innerHTML=`<h4>Denominazione non univoca</h4><p>Documenti: <b>${esc(company)}</b>. Seleziona la ditta corretta:</p><div class="supplier-candidates">${candidates.slice(0,5).map(x=>`<div class="supplier-candidate"><span><b>${esc(x.name)}</b><br>Compatibilità ${x.score}%</span><button type="button" data-supplier="${esc(x.name)}" data-score="${x.score}">Usa questa ditta</button></div>`).join("")}</div>`;
}
function deterministicSupplierMatch(company){
  const source=normalizeSupplierName(company),sourceCompact=canonicalSupplierName(company);
  const ignore=new Set(["srl","spa","snc","sas","sapa","societa","costruzioni","costruzione","servizi","service","di","del","della","dei","degli","e","ed"]);
  const tokens=v=>normalizeSupplierName(v).split(/\s+/).filter(x=>x.length>=3&&!ignore.has(x));
  const sourceTokens=new Set(tokens(company));
  const names=[...new Set(embeddedContracts.map(x=>x.supplier).filter(Boolean))];
  const ranked=names.map(name=>{
    const dbCompact=canonicalSupplierName(name),dbTokens=tokens(name);
    const coverage=dbTokens.length?dbTokens.filter(x=>sourceTokens.has(x)).length/dbTokens.length:0;
    let score=supplierScore(company,name);
    if(sourceCompact===dbCompact)score=100;
    else if(coverage===1)score=Math.max(score,dbTokens.length===1?95:98);
    else if(sourceCompact.includes(dbCompact)||dbCompact.includes(sourceCompact))score=Math.max(score,94);
    return {name,score,coverage};
  }).sort((a,b)=>b.score-a.score||b.coverage-a.coverage||a.name.localeCompare(b.name,"it"));
  return ranked[0]?.score>=75?ranked:null;
}
function looksLikeOfficialCompanyName(value){
  const v=cleanDisplayedCompanyName(value);
  return v.length>=3&&!/^(via|viale|corso|piazza|strada|localita|sede legale|codice fiscale|numero d.iscrizione|dati per duvri)\b/i.test(v);
}
function applySupplierRowsDirect(supplier,score,sourceName){
  const rows=embeddedContracts.filter(x=>ContractDbImporter.norm(x.supplier)===ContractDbImporter.norm(supplier));
  if(!rows.length)return false;
  const cinemaNames=[...new Set(rows.map(x=>x.cinema).filter(Boolean))];
  const workNames=[...new Set(rows.map(x=>x.workType).filter(Boolean))];
  $("cinemaSelect").innerHTML=cinemaNames.map((name,i)=>`<option value="matched-c-${i}" selected>${esc(name)}</option>`).join("");
  $("workSelect").innerHTML=workNames.map((name,i)=>`<option value="matched-w-${i}" selected>${esc(name)}</option>`).join("");
  $("cinemaSelectionSummary").textContent=`${cinemaNames.length} cinema: ${cinemaNames.join(", ")}`;
  $("workSelectionSummary").textContent=`${workNames.length} tipologie: ${workNames.join(", ")}`;
  const frequencies=[...new Set(rows.map(x=>String(x.frequency||"").trim()).filter(Boolean))];
  const total=rows.reduce((sum,x)=>sum+(Number.isFinite(Number(x.amount))?Number(x.amount):0),0);
  const official=looksLikeOfficialCompanyName(sourceName)?sourceName:supplier;
  const dbIsShortAlias=normalizeSupplierName(supplier).split(/\s+/).filter(Boolean).length===1;
  const displayedDbName=dbIsShortAlias&&looksLikeOfficialCompanyName(official)?official:supplier;
  $("documentCompanyName").value=official;
  $("databaseCompanyName").value=displayedDbName;
  $("companyName").value=official;
  $("supplier").value=displayedDbName;
  $("frequency").value=frequencies.join(" / ");
  $("contractAmount").value=total.toLocaleString("it-IT",{minimumFractionDigits:2,maximumFractionDigits:2});
  lastMatchedWorkNames=[...workNames];
  const box=$("dbMatchSummary");
  box.innerHTML=`<div class="${score>=95?"match-exact":"match-probable"}">Ditta DB riconosciuta: ${esc(supplier)} (${score}%)</div><div>${rows.length} righe, ${cinemaNames.length} cinema, ${workNames.length} tipologie. Importo: € ${total.toLocaleString("it-IT",{minimumFractionDigits:2})}</div>`;
  $("supplierMatchPanel").hidden=true;
  setTimeout(()=>renderLegalCompliance(),0);
  return true;
}
function autoSelectFromCompany(){
  const documentName=cleanDisplayedCompanyName($("documentCompanyName").value||$("companyName").value);
  const emailHint=[document.getElementById("email")?.value,$("pec")?.value].filter(Boolean).map(v=>String(v).split("@")[1]||"").join(" ").replace(/\.(it|com|net|org)\b/gi," ").replace(/[^a-z0-9]+/gi," ");
  const ranked=deterministicSupplierMatch(documentName)||deterministicSupplierMatch(emailHint);
  if(!ranked){showStatus(`Nessuna ditta DB compatibile con: ${documentName}. DB incorporato: ${embeddedContracts.length} righe.`,"error");return false;}
  const best=ranked[0],second=ranked[1];
  const clearWinner=best.score>=75&&(!second||best.score-second.score>=20);
  if(clearWinner||best.score>=90&&(!second||best.score-second.score>=4||best.coverage===1&&second.coverage<1))return applySupplierRowsDirect(best.name,best.score,documentName);
  const plausible=ranked.filter(x=>x.score>=55||x.coverage>=0.5);
  showSupplierCandidates(documentName,plausible);showStatus("Trovate più denominazioni plausibili. Seleziona quella corretta.","error");return false;
}
document.addEventListener("click",e=>{
  const btn=e.target.closest("[data-supplier]");if(!btn)return;
  applySupplierRowsDirect(btn.dataset.supplier,Number(btn.dataset.score),$("documentCompanyName").value);
});
$("cinemaSelect").addEventListener("change",applyContractSuggestion);
$("workSelect").addEventListener("change",()=>{
  lastMatchedWorkNames=selectedWorkTypes().map(x=>x.name);
  applyContractSuggestion();renderLegalCompliance();
});
$("contractDbFile").onchange=async e=>{const file=e.target.files?.[0];if(!file)return;const status=$("contractDbStatus");try{status.textContent="Importazione in corso...";status.className="status";const contracts=await ContractDbImporter.read(file);setup.contracts=contracts;setup.workTypes=ContractDbImporter.workTypes(contracts);syncCinemasFromContracts();StorageService.save(setup);renderSetup();status.textContent=`Database importato: ${contracts.length} abbinamenti e ${setup.workTypes.length} tipologie.`;status.className="status ok"}catch(err){console.error(err);status.textContent=err.message||"Errore durante l'importazione.";status.className="status error"}finally{e.target.value=""}};

$("extractBtn").onclick=async()=>{
  if(!supportFiles.length){showStatus("Carica prima almeno un documento.","error");return}
  showStatus("Lettura documenti in corso... I file scansionati possono richiedere più tempo.");
  const documentFiles=supportFiles.filter(f=>!/\.(xlsx|xls|csv)$/i.test(f.name));
  if(!documentFiles.length){showStatus("Database Excel importato. Aggiungi visura, polizza o DURC per recuperare altri dati.","ok");return}
  const result=await DocumentParser.extract(documentFiles,(name,n,total)=>showStatus(`Lettura ${n}/${total}: ${name}`));
  Object.entries(result.values).forEach(([k,v])=>{if($(k)&&v)$(k).value=v});
  const extractedCompany=cleanDisplayedCompanyName(result.values.companyName||$("companyName").value);
  $("documentCompanyName").value=extractedCompany;
  const dbAutoMatched=autoSelectFromCompany();
  renderReview(result);
  const evidenceText=(result.evidence||[]).map(item=>`${item.label||""} ${item.value||""}`).join("\n");
  await runLegalComplianceCheck(documentFiles,evidenceText);
  setTimeout(()=>renderLegalCompliance(lastComplianceDocumentText),50);
  setTimeout(()=>renderLegalCompliance(lastComplianceDocumentText),300);
  const found=Object.keys(result.values).length;
  if(!dbAutoMatched)showStatus(`Recupero completato: ${found} campi trovati, ${result.conflicts.length} conflitti da verificare. Nessuna ditta DB riconosciuta automaticamente.`,found?"ok":"error");
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

// ============================================================
// WORD AREE GIALLE V4.1: nessuna graffa e nessun marcatore.
// Motore separato: assets/js/yellow-word-generator.js
// ============================================================
function buildData(){const selected=selectedCinemas();const works=selectedWorkTypes();const c=selected[0]||{};const w=works[0]||{};return {
  NUMERO_CONTRATTO:value("contractNumber"),DATA_CONTRATTO:formatDate(value("contractDate")),RAGIONE_SOCIALE:value("companyName"),DENOMINAZIONE_DOCUMENTI:value("documentCompanyName"),DENOMINAZIONE_DB:value("databaseCompanyName"),PARTITA_IVA:value("vatNumber"),CODICE_FISCALE:value("fiscalCode"),REA:value("rea"),SEDE_LEGALE:value("registeredOffice"),PEC:value("pec"),LEGALE_RAPPRESENTANTE:value("legalRepresentative"),COMPAGNIA_ASSICURATIVA:value("insuranceCompany"),NUMERO_POLIZZA:value("policyNumber"),SCADENZA_POLIZZA:formatDate(value("policyExpiry")),MASSIMALE:value("policyLimit"),DITTA:value("supplier"),FREQUENZA:value("frequency"),IMPORTO_CONTRATTO:value("contractAmount"),POSIZIONE_INPS:document.getElementById("inpsPosition")?.value||"",POSIZIONE_INAIL:document.getElementById("inailPosition")?.value||"",EMAIL:document.getElementById("email")?.value||"",TELEFONO:document.getElementById("phone")?.value||"",TELEFONO_REPERIBILITA:document.getElementById("emergencyPhone")?.value||"",COSTI_SICUREZZA:document.getElementById("safetyCosts")?.value||"",TARIFFE_STRAORDINARIE:document.getElementById("extraRates")?.value||"",PROTOCOLLO_DURC:value("durcProtocol"),SCADENZA_DURC:formatDate(value("durcExpiry")),ESITO_DURC:value("durcStatus"),NOME_CINEMA:selected.map(x=>x.name).join(", "),NOMI_CINEMA:selected.map(x=>x.name).join(", "),INDIRIZZO_CINEMA:selected.map(x=>x.address).filter(Boolean).join("; "),INDIRIZZI_CINEMA:selected.map(x=>x.address).filter(Boolean).join("; "),CITTA_CINEMA:selected.map(x=>x.city).filter(Boolean).join(", "),TIPO_LAVORAZIONE:works.map(x=>x.name).join(", "),TIPOLOGIE_LAVORAZIONE:works.map(x=>x.name).join(", "),DESCRIZIONE_LAVORAZIONE:works.map(x=>x.description).filter(Boolean).join("; "),DATA_INIZIO:formatDate(value("startDate")),DATA_FINE:formatDate(value("endDate"))
}}
function showStatus(t,type=""){const s=$("status");s.textContent=t;s.className=`status ${type}`}
$("generateBtn").onclick=async()=>{
  try{
    if(!masterFile)throw new Error("Carica prima il master originale senza marcatori.");
    if(!window.YellowAreaWordGenerator)throw new Error("Motore Aree Gialle v4.1 non disponibile.");
    const r=await YellowAreaWordGenerator.generate(masterFile,buildData());
    const warning=r.missing.length?` Attenzione: ${r.missing.length} campi impostati come [DA COMPILARE].`:"";
    showStatus(`Contratto generato da aree gialle: ${r.replaced} aree logiche compilate.${warning}`,r.missing.length?"":"ok");
  }catch(e){console.error(e);showStatus(e.message||"Errore durante la generazione.","error")}
};
$("contractDate").value=new Date().toISOString().slice(0,10);renderSetup();renderLegalCompliance();
showStatus(`Database pronto: ${setup.cinemas.length} cinema, ${setup.workTypes.length} tipologie, ${setup.contracts.length} abbinamenti.`,"ok");