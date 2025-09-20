# Gemini AI

Send prompts to Google Gemini from Homey Flows and use the AI's answer in your automations.

Features
- Homey Flow action: “Send Prompt” returning an “answer” token.
- Simple settings page to store your Gemini API Key.
- Powered by Google Generative AI (gemini-1.5-flash).

Requirements
- A valid Google Gemini API Key (see setup guide: https://github.com/s-dimaio/com.dimapp.geminiforhomey#getting-your-google-gemini-api-key).

Setup
1) Open the app’s Settings and paste your API Key. 
2) Create a Flow and add the action “Send Prompt”.
3) Provide the prompt text and use the “answer” token in subsequent Flow cards.

Privacy
- The app stores only your API Key in Homey’s settings.
- Prompts and answers are sent to Google’s API when you run the Flow.

Support
- Author: Simone Di Maio — simone.dimaio77@gmail.com

License
- GPLv3 (see LICENSE).