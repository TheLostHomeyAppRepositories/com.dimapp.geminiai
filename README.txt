# Gemini for Homey

Send prompts to Google Gemini from Homey Flows and use the AI's answer in your automations.

Features
- Homey Flow action: “Send Prompt” returning an “answer” token.
- Simple settings page to store your Gemini API Key.
- Powered by Google Generative AI (gemini-1.5-flash).

Requirements
- A valid Google Gemini API Key.

Setup
1) Open the app’s Settings and paste your API Key (stored under `gemini_api_key`). See settings UI: settings/index.html.
2) Create a Flow and add the action “Send Prompt”.
3) Provide the prompt text and use the “answer” token in subsequent Flow cards.

Usage Notes
- The Flow action is registered in app.js and calls the Gemini client for text generation via lib/GeminiClient.js.
- If the API Key is missing, the action returns a helpful message.

Privacy
- The app stores only your API Key in Homey’s settings.
- Prompts and answers are sent to Google’s API when you run the Flow.

Support
- Author: Simone Di Maio — simone.dimaio77@gmail.com

License
- GPLv3 (see LICENSE).