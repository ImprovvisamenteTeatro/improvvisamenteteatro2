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
