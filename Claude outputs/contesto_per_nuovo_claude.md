# Contesto per Claude — Antonio Bellanca & Improvvisamente Teatro

Questo documento riassume una conversazione con Claude (Cowork) per trasferire il contesto a un nuovo account/sessione. È pensato per essere letto e "assimilato" da un'altra istanza di Claude, così da poter continuare ad aiutare Antonio senza ripartire da zero.

## Chi è Antonio

Antonio Bellanca, di Palermo, vive a Milano. Lavora come dipendente in BIP (società di consulenza). Parallelamente è socio di Roberta Crivelli in una scuola di teatro, Improvvisamente Teatro, di cui è Direttore Generale.

Obiettivi che ha condiviso:
- Vuole imparare a usare strumenti tecnici che prima non conosceva — in questa conversazione, in particolare, sta imparando a usare **Git e GitHub Desktop** per gestire le modifiche al sito della scuola (commit, push, lettura dei diff). All'inizio non sapeva nemmeno cosa fossero le righe rosse/verdi nel diff ("file en rouge").
- Vorrebbe costruirsi un brand personale nel tempo (idee discusse: podcast, videocorsi, partecipazione a TEDx).
- Obiettivo di carriera a medio termine: crescere professionalmente (valuta anche un master di alto livello) e, nel lungo periodo, tornare a vivere a Palermo.
- Sta usando Claude come assistente tecnico per costruire e mantenere il sito web della scuola, senza avere lui stesso competenze di sviluppo web pregresse — più o meno tutte le modifiche al codice (HTML/CSS/animazioni) sono state fatte da Claude su sua richiesta, con lui che valuta il risultato visivamente e dà feedback in linguaggio naturale, non tecnico.

## Improvvisamente Teatro — cos'è

Scuola di teatro per adulti a Milano, con sedi in zona Loreto (Spazio Oit, Via Porpora 14; La Voce del Corpo, Viale Monza 37) e a Cernusco sul Naviglio (IT Lab).

**Il team:**
- **Roberta Crivelli** — Direttrice Artistica e fondatrice. Attrice, performer, formatrice teatrale, regista, imprenditrice culturale, esperta di comunicazione efficace, video e public speaking e uso professionale della voce. Si occupa anche di neurodivergenza.
- **Antonio Bellanca** — Direttore Generale (la persona con cui Claude sta parlando in questa conversazione).
- **Giulio Locatelli** — Attore, improvvisatore, docente di improvvisazione teatrale, esperto nella gestione del lavoro di gruppo.

**I numeri:** scuola attiva dal 2021, percorso formativo strutturato su 4 anni, oltre 500 allievi formati, gruppi di massimo 14 persone, prezzi dei corsi a partire da 150€.

**Cosa offre:**
1. **Corsi per privati** — percorso pluriennale di recitazione/teatro, con Open Day gratuiti come porta d'ingresso.
2. **Masterclass e Academy.**
3. **Formazione aziendale (B2B)** — questo è il fulcro di buona parte del lavoro recente sul sito. Due percorsi principali:
   - **SPEAK** (Public Speaking): consapevolezza degli strumenti comunicativi, gestione delle emozioni, linguaggio del corpo, voce, storytelling, cenni di PNL, videospeaking, lettura espressiva.
   - **TEAM** (Team Building teatrale): miglioramento delle dinamiche relazionali, costruzione di fiducia, pensiero creativo, consapevolezza del corpo, empatia, improvvisazione teatrale e problem solving.
   - Rivolto a piccole/medie/grandi aziende, con un'attenzione dichiarata all'identità di genere e alle neurodivergenze (neuroinclusività è un valore esplicito del metodo).
4. **Un nuovo servizio ad hoc, "Team Building Teatrale D&I"** — nato da una richiesta di Antonio: una proposta per il team D&I (Diversity & Inclusion) della sua azienda (BIP), pensata come giornata (o mezza giornata) di teatro con un **gruppo misto**: colleghi seguiti dal team D&I insieme ad altri colleghi, usando l'improvvisazione teatrale come terreno comune neutro — "nessuno sa recitare meglio di un altro", quindi le etichette contano meno e l'inclusione nasce dalla pratica. Condotto da Roberta. Per questa proposta è stato creato anche un mazzo di slide dedicato da presentare all'HR di BIP (non un pacchetto standard, ma un format costruito insieme al cliente).

**Il metodo pedagogico ("Didattica Integrata"):**
- Fondato sulla pedagogia esperienziale di **Jacques Lecoq** ("il corpo sa cose che la mente ignora") — si parte dall'esperienza, non dalla teoria.
- Altri riferimenti: Stanislavskij, Chubbuck, Ronconi/Strehler, PNL, neuroscienze.
- Principi dichiarati: pratica e teoria in osmosi continua; percorsi su misura modellati sulle esigenze del gruppo; neuroinclusività (attenzione costante ai differenti stili cognitivi ed espressivi).
- Approccio individuale: "non esiste un metodo uguale per tutti" — Roberta segue il percorso di ogni singolo allievo.

**Idea in discussione (non ancora sviluppata):** un podcast della scuola che copra teatro, public speaking e cinema in generale, pensato anche come possibile canale di sponsorizzazione — per ora è rimasto a livello di brainstorming, senza un piano concreto.

## Il lavoro svolto sul sito (improvvisamenteteatro.com)

Il sito è una single-page application in un unico file HTML (routing via `showView()` JavaScript, viste nascoste con `display:none!important`), ospitata su GitHub (repo `improvvisamenteteatro2`) e gestita da Antonio in locale con **GitHub Desktop**. Il flusso di lavoro consolidato in questa conversazione:
1. Claude lavora su una copia di lavoro del sito (un unico file HTML) e la pubblica come anteprima condivisa, cosicché Antonio possa vederla ed approvarla prima che tocchi i file veri.
2. Una volta approvata, Claude riporta le modifiche nei file reali del repository (`index.html`, `css/style.css`, `css/style.min.css`, `js/script.js`), collegandosi al computer di Antonio.
3. Antonio apre GitHub Desktop, controlla il diff, scrive un messaggio di commit, fa **Commit to main** e poi **Push origin** per pubblicare online.

**Interventi fatti finora, in ordine cronologico:**
- Aggiunte illustrazioni decorative geometriche (esagoni, rettangoli, linee) in stile line-art su tutto il sito, dopo diverse iterazioni di stile (da forme tipo maschere, a più minimal/geometriche, a sovrapposte/sparse, fino a distribuirle su tutte le sezioni e non solo nell'header).
- L'animazione delle forme è stata ridefinita più volte su richiesta: da un piccolo giro circolare fisso, a un dondolio verticale lento tra nord-est e sud-est (per non affaticare la vista), poi velocizzato perché risultava troppo lento, e infine esteso anche più in basso nelle pagine (non solo nella prima schermata di ogni sezione).
- Creato un mazzo di slide ("Improvvisamente Teatro x D&I BIP") per la proposta di collaborazione con il team D&I di BIP, con il format "Team Building Teatrale" sopra descritto.
- Integrata la stessa proposta nel sito, nella sezione Aziende, come "servizio ad hoc costruito insieme" (prima mostrata in anteprima, poi approvata e pubblicata).
- Ricostruita l'intera sezione Aziende seguendo il formato di una presentazione aziendale fornita da Antonio (PDF "Improvvisamente Aziende"), riorganizzandola in: due percorsi (SPEAK/TEAM), dettaglio di ciascuno, strumenti utilizzati, metodo (Didattica Integrata), il blocco D&I già approvato, target audience — escludendo volutamente la sezione "Chi siamo" del PDF (i bio del team), su richiesta esplicita.
- Collegato il bottone di prenotazione Calendly (`calendly.com/improvvisamenteteatro/30min`) sia nella sezione Aziende che con una card dedicata nella sezione Contatti.
- Risolto un bug della mappa di Google Maps nella sezione Contatti: l'embed usava un ID luogo "inventato" che aveva smesso di funzionare; sostituito con un embed basato sull'indirizzo reale (formato che non richiede chiavi API).
- Ricostruiti e pubblicati i file reali del repository GitHub (index.html con link esterni a CSS/JS invece di tutto inline, style.css leggibile, style.min.css minificato), scrivendoli direttamente nella cartella del repo sul computer di Antonio tramite il collegamento Claude↔computer.

**Stato attuale:** le modifiche sono state scritte nei file del repo locale; Antonio deve ancora completare il commit e il push da GitHub Desktop per pubblicarle online (stava verificando il diff di due file, `js/script.js` e `README.md`, che risultavano modificati senza che Claude li avesse toccati — probabilmente solo normalizzazione dei fine riga LF/CRLF, da controllare).

## Note tecniche utili (per chi continuerà a lavorare sul sito)
- Architettura SPA: tutte le viste sono nascoste via `display:none!important` e mostrate con la funzione JS `showView()`.
- Palette brand: `#030316` (blu notte), `#78E08A` (verde menta), `#F76152` (corallo), `#F0F4FF` (crema), più azzurro `#5CC9F5` e viola `#A78BFA` come accenti.
- Font: Cormorant (titoli), Nunito Sans (testo).
- Le decorazioni geometriche usano le classi `.geo-deco` / `.hero-illustration` con sotto-elementi `.hi-s1`–`.hi-s8`, animati con keyframes `hiSwayA`/`hiSwayB` (dondolio lento nord-est/sud-est).
- Attenzione a un bug di stacking CSS già risolto: un elemento `position:absolute` (la decorazione) può dipingersi sopra un contenuto statico successivo nel DOM se quel contenuto non ha anche lui `position:relative;z-index:1` esplicito.
