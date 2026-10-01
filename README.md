# Improvvisamente Teatro — sito web

Sito vetrina della scuola, versione ottimizzata per hosting statico (GitHub Pages / Netlify).

## Struttura

```
index.html          pagina unica (SPA, routing via showView())
css/
  style.css          sorgente leggibile (per sviluppo)
  style.min.css       versione minificata (referenziata da index.html)
js/
  script.js          tutto il JS del sito (routing, form, hover, animazioni)
images/              tutte le immagini del sito (foto convertite in WebP, loghi/favicon in PNG)
```

## Cosa è cambiato rispetto al file originale

Il file di partenza (`index.html` di ~4,2MB) aveva CSS, JS e 21 immagini incorporati
direttamente nel markup come base64. Questo rendeva il file pesante e impediva al
browser di mettere in cache le risorse separatamente. In questa versione:

- le 21 immagini sono state estratte in file reali dentro `images/`; le foto sono
  state convertite in **WebP** (qualità 80), che pesa in media il 40% in meno del
  JPEG a parità di resa visiva; loghi/favicon restano PNG (identici, solo ottimizzati
  senza perdita);
- CSS e JS sono stati spostati in file esterni cacheabili dal browser;
- tutte le `<img>` hanno `loading="lazy"` per non caricare le immagini fuori
  dallo schermo al primo accesso;
- è stato corretto un refuso preesistente nei tag `og:image` / `twitter:image` /
  JSON-LD (mancava lo slash tra dominio e percorso immagine);
- `index.html` è passato da 4,2MB a ~240KB (–94% sul peso del primo caricamento).

**Peso totale del sito**: da 4,2MB a ~2,1MB (–51%).

## Cosa NON è cambiato (verificato)

- `showView()` e la catena di override (base → b2b timer → od-float-bar) sono intatte
  e nello stesso ordine di esecuzione originale.
- I 3 form (`open-day-booking`, `brochure-request`, `b2b-lead`) e il submit handler
  globale (`document.addEventListener('submit', ...)`) sono invariati — nessun
  `onsubmit` inline è stato introdotto.
- Elementi fissi (`mainNav`, `view-overlay`, `brochure-modal`) sono presenti con gli
  stessi id.
- Il contenuto visivo di loghi e favicon è identico byte-per-byte a livello di
  immagine (solo la modalità di consegna è cambiata: da inline a file).

## Cose da sapere prima del deploy

- **Il sito ora è multi-file**, non più un singolo HTML. Se il flusso di lavoro
  attuale prevede "un file HTML = fonte unica di verità" (come descritto nel
  documento di Best Practice), va aggiornato per riflettere la nuova struttura a
  cartelle: chi modifica il sito ora deve caricare anche `css/`, `js/` e `images/`,
  non solo `index.html`.
- I form restano collegati a **Netlify Forms**: continuano a funzionare solo se il
  sito è servito da Netlify (build/deploy identico a prima, ma ora con più file da
  caricare invece di uno solo).
- Non testato in un vero browser in questa sessione: prima del deploy consiglio una
  verifica visiva rapida e un test dei 3 form su un deploy di staging Netlify.

## Changelog

**Settembre 2026 — Fix struttura sezioni**
- Corretto un bug per cui alcune sezioni della pagina "Corsi" (il blocco prezzi
  "Un percorso serio / Costruito per te" con i pacchetti base/intermedio/avanzato)
  restava visibile sopra ad altre sezioni invece di essere nascosto insieme al
  resto. Ora è un blocco a sé (`corso-view-extra`) mostrato/nascosto correttamente
  da `showView('corso')`, verificato su tutte le view del sito.

**Settembre 2026 — Sezione Masterclass**
- La sezione "Cinema Academy" (voce di menu e pagina `accademia-view`) è stata
  rinominata e ristrutturata in **Masterclass**. Rimosso completamente il vecchio
  contenuto legato al percorso biennale (hero "Accademia di Recitazione
  Cinematografica e Televisiva", "Il percorso formativo", citazione, sbocchi
  professionali con partnership Rita Axon Agency, CTA "Richiedi Colloquio
  Conoscitivo") — quella pagina descriveva un corso biennale che non corrisponde
  più all'offerta reale: le masterclass di cinema sono percorsi su misura da
  mezza giornata a più giornate, non un corso annuale/biennale.
- Nuova hero snella in cima alla pagina: "Masterclass di Cinema, Teatro e
  Comunicazione", con sottotitolo che chiarisce il formato (mezza giornata o più
  giornate, su misura, individuali o in gruppo, anche per aziende).
- Sotto la hero, un'unica sezione **"Masterclass"** con 3 tab
  (Cinema, Teatro, Comunicazione) selezionabili tramite la nuova funzione JS
  `showMasterclassCat()` in `js/script.js`:
  - **Cinema** (6): le stesse masterclass già presenti nel percorso (Grammatica
    del Cinema & Prove di Set, Self-Tape & Provini, Lezioni con Casting Director,
    Make Up & Posa Fotografica, Danza Musical & Preparazione Vocale,
    Combattimento Scenico & Intimacy Coordination).
  - **Teatro** (6, nuove): Improvvisazione, Stand-up Comedy, Analisi del Testo e
    Messa in Scena, L'Uso delle Maschere, Clownerie, Dizione e Voce.
  - **Comunicazione** (5): Public Speaking (contenuto ripreso dal vecchio blocco),
    Video Speaking, Comunicazione Efficace, Comunicazione Non Verbale &
    Linguaggio del Corpo, Personal Branding & Comunicazione sui Social.
  - Ogni masterclass ha un link "Richiedi Info →" che apre un'email precompilata
    (stesso meccanismo `mailto:` già usato altrove nel sito, nessun nuovo form
    Netlify introdotto — zero rischio di rompere il tracciamento dei form
    esistenti).
- Nuove classi CSS aggiunte in fondo a `css/style.css` / `css/style.min.css`:
  `.masterclass-tabs`, `.masterclass-tab`, `.masterclass-panel`,
  `.masterclass-cta`.
- Testato con Playwright su tutte le view del sito (desktop e mobile): nessun
  errore JS, nessuna regressione sulle altre sezioni.

**Settembre 2026 — Restyling "meno AI", animazioni ed effetto sipario**

Obiettivo: rendere il sito meno "da template AI generico" e più curato,
mantenendo intatti palette colori, logo, contenuti, form e routing.

- **Transizione a sipario tra le view**: ogni cambio di sezione (click su un
  link del menu, su un pulsante "Scopri", ecc.) ora mostra due pannelli rosso
  corallo con motivo a pieghe che si chiudono come un sipario teatrale,
  coprono lo schermo, poi si riaprono sulla nuova sezione — al posto del
  vecchio flash istantaneo. Implementata in `js/script.js` avvolgendo la
  funzione `showView()` originale (rinominata `__doShowView`, invariata nella
  logica) con un nuovo `showView()` che gestisce l'animazione. Gestisce anche
  i click ripetuti/rapidi in coda, senza mai perdere o invertire l'ordine
  delle richieste (testato con Playwright). Rispetta
  `prefers-reduced-motion` (nessuna animazione se l'utente ha disattivato gli
  effetti di movimento nel proprio sistema).
- **Fix di un bug preesistente**: l'animazione "reveal" al scroll (i titoli e
  le card che dovevano apparire con un fade quando entrano nello schermo)
  non funzionava mai per il contenuto sotto la prima schermata, perché il
  JavaScript aggiungeva la classe `revealed` mentre il CSS cercava `visible`
  — nomi diversi, quindi l'animazione non scattava mai oltre il caricamento
  iniziale. Corretto l'allineamento dei nomi, e aggiunta una doppia verifica
  manuale dopo ogni cambio di sezione/tab (necessaria perché gli elementi
  nascosti con `display:none` non vengono notificati subito quando tornano
  visibili).
- **Divisore a pieghe**: una striscia decorativa verde con motivo a pieghe
  (stesso linguaggio grafico del sipario) separa la hero dalla sezione
  Masterclass, come elemento distintivo ricorrente legato all'identità del
  brand teatrale.
- **Micro-interazioni**: pulsanti, tab e link "Richiedi Info" hanno ora
  transizioni più curate (curve di movimento naturali, leggero effetto di
  pressione al click, ombra che appare in modo più organico). Le card delle
  masterclass (`.academy-module`) si sollevano leggermente e l'icona ruota/si
  ingrandisce al passaggio del mouse, invece del semplice hover uniforme di
  prima.
- **Animazioni scaglionate**: la hero e le card della sezione Masterclass
  appaiono ora una dopo l'altra con un leggero ritardo progressivo (stagger),
  invece di comparire tutte insieme.
- Nessuna modifica a contenuti, struttura delle pagine, form o routing.
  Verificato con Playwright: transizioni su tutte le 8 view principali,
  stress-test con click rapidi in sequenza, comportamento su mobile —
  nessun errore JavaScript, nessuna regressione.

**Settembre 2026 — Sipario più graduale e velluto più ricco**

Su richiesta: rallentare l'effetto sipario e avvicinare l'aspetto a un vero
sipario teatrale in velluto rosso (drappeggiato, con mantovana e bordo
dorato), come da immagine di riferimento fornita.

- **Timing più lento e cinematografico**: il ciclo di chiusura/apertura del
  sipario è passato da ~750ms totali a ~2,35s (chiusura 950ms, pausa 450ms,
  riapertura 950ms) in `js/script.js`. L'effetto ora si percepisce come un
  vero cambio di scena a teatro, non più uno scatto veloce.
- **Velluto più realistico**: le pieghe del sipario (`css/style.css` /
  `style.min.css`) usano ora un gradiente più morbido e graduale invece di
  strisce nette, per un effetto drappeggiato più simile a tessuto vero.
- **Mantovana e bordo dorato**: aggiunta una fascia superiore più scura
  (mantovana) con un bordo dorato, e una fila di "festoni" ondulati
  (motivo a nappa arrotondata) appena sotto, per richiamare il sipario
  gathered/scalloped dell'immagine di riferimento.
- Nessuna modifica a contenuti, struttura, form o routing. Ri-verificato con
  Playwright (tempi di attesa aggiornati al nuovo ciclo più lento): tutte le
  8 view principali, stress-test con click rapidi in sequenza — nessun
  errore JavaScript, nessuna regressione.

**Settembre 2026 — Rimosso il sipario, aggiunte bolle di sapone**

Su richiesta: l'effetto sipario non piaceva. Rimosso completamente e
sostituito con una decorazione più leggera: bolle di sapone che fluttuano
sullo sfondo e si muovono su e giù mentre si scrolla la pagina.

- **Rimosso il sipario**: eliminati l'HTML (`#curtain-left`/`#curtain-right`),
  tutto il CSS dedicato e la logica di accodamento delle transizioni in
  `js/script.js`. `showView()` è tornata alla funzione originale (il
  cambio di sezione è di nuovo istantaneo), con l'unica aggiunta del
  trigger delle animazioni "reveal" già presente.
- **Bolle di sapone**: un nuovo layer fisso (`#bubbles-layer`) genera circa
  13 bolle (7 su mobile) in stile vetro/sapone — riflesso di luce,
  sfumatura verde/azzurro tenue coerente con la palette, bordo sottile.
  Fluttuano dolcemente in continuazione e si spostano su/giù (direzioni
  alternate tra loro) in base alla posizione di scroll, per un effetto
  ambientale gradevole invece di un'animazione invadente. Elemento
  puramente decorativo (`pointer-events:none`), disattivato se l'utente ha
  impostato `prefers-reduced-motion`.
- Nessuna modifica a contenuti, struttura, form o routing. Verificato con
  Playwright su tutte le 8 view principali e su mobile: nessun errore
  JavaScript, nessuna regressione.

**Settembre 2026 — Nuovo pulsante menu mobile e drawer ridisegnato**

Su richiesta: le "tre lineette" dell'hamburger che si aprivano a X
ricordavano troppo l'icona di Claude. Ridisegnato da zero il pulsante e il
pannello del menu mobile con un linguaggio più editoriale/da agenzia.

- **Pulsante "Menu / Chiudi"**: al posto delle tre lineette, un pulsante a
  pillola con la scritta "MENU" che, al tocco, si trasforma nella scritta
  "CHIUDI" (in corallo) con una piccola ✕ che compare con un effetto
  elastico. Nessuna animazione di linee che ruotano — un pattern
  completamente diverso, più distintivo e coerente con un sito di
  comunicazione/teatro.
- **Drawer ridisegnato**: il pannello del menu ora si apre con una dissolvenza
  e leggero scorrimento, e le singole voci compaiono una dopo l'altra in
  sequenza (effetto a cascata) invece di apparire tutte insieme. Ogni voce,
  al tocco, mostra un piccolo accento verticale verde/corallo sul bordo
  sinistro. Sfondo con un leggero gradiente invece del colore piatto.
- Implementato in `index.html` (markup del pulsante), `css/style.css` /
  `style.min.css` (nuove regole `.hamburger`, `.ham-word`, `.ham-mark`,
  `#mobileMenu`) e `js/script.js` (`toggleMenu()` ora gestisce anche le
  classi per le nuove animazioni, oltre al vecchio comportamento
  mostra/nascondi). Rispetta `prefers-reduced-motion`.
- Nessuna modifica a contenuti, form o routing. Verificato con Playwright su
  mobile: apertura, chiusura, navigazione da menu, riapertura — nessun
  errore JavaScript, nessuna regressione.

**Settembre 2026 — Pulsante menu mobile senza box, testo più bold/tondo**

Su richiesta: il pulsante "Menu/Chiudi" con bordo e sfondo sembrava ancora
troppo "in una scatola" e poco d'impatto.

- **Rimosso il box**: niente più bordo/sfondo attorno al pulsante — ora è
  solo testo su sfondo trasparente, in linea con l'impaginazione pulita del
  resto del sito.
- **Testo più bold e morbido**: da `.66rem`/peso 800 a `1.05rem`/peso 900,
  spaziatura tra lettere ridotta (meno "distanziato-corporate", più
  compatto e pieno).
- **Più effetto**: al passaggio del mouse il testo si ingrandisce
  leggermente e diventa verde, con una piccola sottolineatura sfumata
  verde→corallo che si disegna da sinistra; al tocco tutto il pulsante fa
  un piccolo "bounce" (si restringe e torna); la ✕ di chiusura ora ruota e
  si ingrandisce con un effetto elastico invece di comparire e basta.
- Nessuna modifica a contenuti, form o routing. Ri-verificato con
  Playwright: apertura, chiusura, navigazione da menu — nessun errore
  JavaScript, nessuna regressione.

**Settembre 2026 — Fix allineamento "Chiudi" nel pulsante menu**

Bug segnalato: quando il pulsante mostrava "CHIUDI", il testo risultava
disallineato verticalmente rispetto alla ✕ (sembrava anche un font diverso,
in realtà era lo stesso font ma spostato più in alto).

- **Causa**: la scritta "Chiudi" è sovrapposta a "Menu" tramite
  posizionamento assoluto (per l'effetto di dissolvenza/scambio); era
  ancorata al bordo superiore del pulsante (`top:0`) invece che centrata,
  mentre la ✕ accanto restava centrata verticalmente dal layout flessibile
  — da qui i ~6px di differenza che si notavano.
- **Fix**: "Chiudi" ora è centrato verticalmente allo stesso modo della ✕
  (`top:50%` con trasformazione corretta), e ho uniformato l'altezza riga
  di entrambi gli elementi. Risultato: "Menu", "Chiudi" e la ✕ sono ora
  tutti perfettamente allineati sulla stessa linea centrale.
- Verificato con Playwright (allineamento calcolato via bounding box, oltre
  allo screenshot) e rieseguita la suite completa: nessun errore
  JavaScript, nessuna regressione.

**Settembre 2026 — Fix spaziatura "Chiudi ✕" (si toccavano)**

Bug segnalato subito dopo il fix precedente: la ✕ ora era allineata, ma
attaccata alla parola "Chiudi" (si leggeva quasi "CHIUDIX", senza spazio).

- **Causa**: lo spazio tra parola e ✕ viene creato dal `gap` del pulsante,
  calcolato in base alla larghezza della parola "Menu" (quella normalmente
  in flusso) — ma "Chiudi" è più larga di "Menu" (~58px contro ~49px) e,
  essendo sovrapposta in posizione assoluta, "sconfinava" oltre lo spazio
  riservato, arrivando quasi a toccare la ✕.
- **Fix**: riservato uno spazio minimo fisso (66px) sufficiente per la
  parola più larga ("Chiudi"), così il distacco dalla ✕ resta costante e
  corretto in entrambi gli stati.
- Verificato con Playwright misurando la distanza reale tra il testo e la
  ✕ (ora ~19px) e rieseguita la suite completa: nessun errore JavaScript,
  nessuna regressione.

**Settembre 2026 — Rimossa la ✕ dal pulsante menu, resta solo "CHIUDI"**

Richiesta esplicita: niente più simbolo ✕ accanto al testo — solo la
scritta "CHIUDI" quando il menu è aperto.

- **Fix**: rimosso l'elemento `<i class="ham-mark">` dall'HTML e le
  relative regole CSS (`.hamburger .ham-mark`, `::before`, stato `.open`).
  Il pulsante ora mostra semplicemente "MENU" da chiuso e "CHIUDI" da
  aperto, con la stessa animazione di dissolvenza/scambio di prima.
- Verificato con Playwright: zero elementi `.ham-mark` nel DOM, testo
  "Chiudi" corretto allo stato aperto, e rieseguita la suite completa
  (menu mobile + 8 viste + bolle): nessun errore JavaScript, nessuna
  regressione.

**Settembre 2026 — Fix "il menu mobile porta a sezioni sbagliate" (cache)**

Segnalato: toccando un link del menu mobile si apriva una sezione diversa
da quella cliccata.

- **Analisi**: ho controllato riga per riga l'HTML e lo `showView()` reali
  in uso sul sito e sono corretti — ogni link punta all'ID giusto, e nei
  test automatici (incluso il tocco reale simulato da smartphone) ogni
  link porta sempre alla sezione corretta. Il codice quindi non ha un bug
  di logica.
- **Causa più probabile**: `css/style.min.css` e `js/script.js` vengono
  richiamati sempre con lo stesso nome file, senza nessun parametro di
  versione. Netlify (e i browser mobili, specialmente Safari su iPhone)
  mettono questi file in cache per molto tempo: dopo un aggiornamento del
  sito, il telefono può continuare a usare per un po' una versione VECCHIA
  di `script.js` già scaricata in precedenza — con una mappa dei link
  diversa da quella attuale — dando l'impressione che "i link siano
  sbagliati", anche se il codice online è corretto.
- **Fix**: aggiunto un parametro di versione ai link di CSS e JS
  (`style.min.css?v=20260912a`, `script.js?v=20260912a`) e un file
  `_headers` per Netlify che dice esplicitamente al browser di non mettere
  mai in cache `index.html` (così ogni visita scarica sempre l'ultima
  pagina, con l'ultimo numero di versione) mentre CSS/JS restano in cache
  a lungo termine — ma vengono automaticamente "invalidati" quando cambio
  quel numero ad ogni futura modifica.
- **Da fare ad ogni futuro aggiornamento**: cambiare il numero dopo `?v=`
  in `index.html` (es. da `20260912a` a `20260912b`) ogni volta che si
  modificano `style.min.css` o `script.js`, così i telefoni scaricano
  sempre la versione nuova invece di quella in cache.
- Rieseguita la suite completa (menu mobile + 8 viste + bolle): nessun
  errore JavaScript, nessuna regressione.

**Settembre 2026 — Allineati i box "Chi siamo" (sinistra) con i numeri (destra)**

Segnalato: nella sezione "IT ti aiuta a tirare fuori..." i 4 box colorati
a sinistra (Nessuna esperienza, Max 14 persone, ecc.) partivano più in
basso rispetto ai 4 numeri a destra (500+, 4+, ecc.), sembrando
disallineati.

- **Causa 1**: il contenitore `.about-grid` aveva uno stile inline
  `align-items:center` che centrava verticalmente la colonna dei numeri
  (più corta) rispetto a quella di testo (più alta), invece di farla
  partire dall'alto.
- **Fix 1**: cambiato in `align-items:start`.
- **Causa 2**: una volta corretto l'allineamento verticale, restava
  comunque uno sfasamento perché la colonna di sinistra ha del testo
  (titolo + paragrafo) sopra i suoi 4 box, mentre quella dei numeri no.
- **Fix 2**: aggiunto uno "spaziatore fantasma" invisibile
  (stessa struttura di titolo/paragrafo, `visibility:hidden`,
  nascosto agli screen reader) sopra i 4 numeri, così occupa esattamente
  lo stesso spazio del testo a sinistra e i due gruppi di box partono
  sempre alla stessa altezza — anche se il testo dovesse andare a capo
  diversamente su schermi di larghezza diversa. Nascosto su mobile dove
  le colonne sono impilate una sotto l'altra.
- Verificato con Playwright (misurata la posizione esatta dei due gruppi
  di box: differenza 0px) e con screenshot desktop e mobile. Rieseguita
  la suite completa: nessun errore JavaScript, nessuna regressione.

**Ottobre 2026 — Link diretti alle sezioni (deep link)**

Richiesta: poter mandare un link che apre direttamente una sezione del
sito (es. "I Corsi"), invece che sempre la home page.

- **Causa**: essendo una single page application, tutte le sezioni
  vivono nella stessa pagina e vengono mostrate/nascoste via JavaScript
  (`showView()`) — l'URL non cambiava mai, quindi ogni link portava
  sempre e solo alla home.
- **Fix**: ora ogni volta che si cambia sezione, l'indirizzo nella barra
  del browser si aggiorna automaticamente (es.
  `improvvisamenteteatro.com/#corsi`,
  `improvvisamenteteatro.com/#metodo`,
  `improvvisamenteteatro.com/#chi-siamo`...). Aprendo direttamente uno di
  questi link si arriva subito alla sezione giusta, senza passare dalla
  home. In più ora funziona anche il tasto "Indietro" del browser: torna
  alla sezione visitata in precedenza invece di uscire dal sito.
- **Sezioni collegabili**: Home (nessun hash o `#site`), Corsi
  (`#corsi`), Il Metodo (`#metodo`), Chi Siamo (`#chisiamo`), Masterclass
  (`#accademia`), Aziende (`#b2b`), Eventi (`#eventi`), Contatti
  (`#contatti`), Gallery (`#gallery`), Open Day (`#openday`). Un hash non
  riconosciuto o inesistente riporta semplicemente alla home, senza
  errori.
- Verificato con Playwright: aperto il sito direttamente su ciascuno di
  questi link e confermata la sezione corretta; testata la navigazione
  avanti/indietro del browser tra due sezioni; testato un link con
  sezione inesistente (torna alla home senza errori). Rieseguita anche
  la suite completa (menu mobile + 8 viste + bolle): nessun errore
  JavaScript, nessuna regressione.
