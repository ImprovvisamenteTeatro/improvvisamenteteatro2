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
