'use strict';

const Homey = require('homey');
const { GeminiClient } = require('./lib/GeminiClient');

module.exports = class GeminiApp extends Homey.App {


  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('[onInit] GeminiApp has been initialized');

    this.sendPromptActionCard = this.homey.flow.getActionCard("send-prompt");
    this.sendPromptActionCard.registerRunListener(async (args) => {
      this.log(`[onInit] sendPromptActionCard: ${JSON.stringify(args, null, 2)}`);

      const prompt = args['prompt'];

      this.log(`[onInit] sendPromptActionCard - Prompt: ${prompt}`);

      try {
        // Ottieni l'API key dalle impostazioni
        const apiKey = this.homey.settings.get('gemini_api_key');

        if (!apiKey) {
          this.error('[onInit] API key not found in settings');
          throw new Error(this.homey.__("prompt.error.noapi"));
        }

        // Crea un'istanza di GeminiClient con l'API key
        const geminiClient = new GeminiClient(apiKey);
        const text = await geminiClient.generateText(prompt);
        console.log(text);

        return {
          answer: text
        };

      } catch (error) {
        this.error('[onInit] Error sending prompt:', error);

        // Extract a specific error message if available
        let errorMessage = error.message;
        if (Array.isArray(error.errorDetails)) {
          const localized = error.errorDetails.find(
            d => d['@type'] === 'type.googleapis.com/google.rpc.LocalizedMessage' && d.message
          );
          if (localized) {
            errorMessage = localized.message;
          }
        }

        this.error(`[onInit] Error message: ${errorMessage}`);

        throw new Error(this.homey.__("prompt.error.generic", { error: errorMessage }));
      }
    });
  }
};
