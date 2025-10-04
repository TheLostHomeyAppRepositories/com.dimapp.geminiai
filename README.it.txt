Invia prompt a Google Gemini dai Flow di Homey e usa la risposta dell'IA nelle tue automazioni.

Caratteristiche
- “Invia Prompt” restituisce un token “Risposta di Gemini” che puoi usare nei tuoi Homey Flow.
- Semplice pagina di impostazioni per salvare la tua chiave API Gemini.
- Basato su Google Generative AI (gemini-1.5-flash).

Requisiti
- Una chiave API Google Gemini valida (vedi guida alla configurazione: https://github.com/s-dimaio/com.dimapp.geminiforhomey#getting-your-google-gemini-api-key).

Configurazione
1) Apri le Impostazioni dell'app ed inserisci la tua chiave API.
2) Crea un Flow e aggiungi l'azione “Invia Prompt”.
3) Fornisci il testo del prompt e usa il token “Risposta di Gemini” nelle schede Flow successive.

Privacy
- L'app memorizza solo la tua chiave API nelle impostazioni di Homey.
- I prompt e le risposte vengono inviati all'API di Google quando esegui il Flow.