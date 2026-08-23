'use strict';

/**
 * Default Gemini models for each functional role in the application.
 *
 * @public
 * @constant
 * @type {Object<string, string>}
 */
const DEFAULT_MODELS = {
  chat: 'gemini-3.1-flash-lite',
  shGeneric: 'gemini-3.1-flash-lite',
  shFlow: 'gemini-3.7-flash',
  image: 'gemini-3.1-flash-image'
};

/**
 * List of all currently supported and active Gemini models.
 * Any supported model can be selected for any role in the application.
 *
 * @public
 * @constant
 * @type {string[]}
 */
const SUPPORTED_MODELS = [
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash',
  'gemini-2.5-pro',
  'gemini-3-flash-preview',
  'gemini-3.1-flash-lite',
  'gemini-3.1-pro-preview',
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.6-flash',
  'gemini-3.7-flash'
];

/**
 * Localization keys for supported models in UI dropdowns.
 *
 * @public
 * @constant
 * @type {Object<string, string>}
 */
const MODEL_I18N_KEYS = {
  'gemini-2.5-flash-lite': 'settings.api.models.flash_lite',
  'gemini-2.5-flash': 'settings.api.models.flash',
  'gemini-2.5-pro': 'settings.api.models.pro',
  'gemini-3-flash-preview': 'settings.api.models.flash3_preview',
  'gemini-3.1-flash-lite': 'settings.api.models.flash3_lite',
  'gemini-3.1-pro-preview': 'settings.api.models.pro3_preview',
  'gemini-3.5-flash-lite': 'settings.api.models.flash35_lite',
  'gemini-3.5-flash': 'settings.api.models.flash35',
  'gemini-3.6-flash': 'settings.api.models.flash36',
  'gemini-3.7-flash': 'settings.api.models.flash37'
};

/**
 * Explicit migration mapping for deprecated or preview model identifiers to their active replacement.
 *
 * @public
 * @constant
 * @type {Object<string, string>}
 */
const MODEL_DEPRECATION_FALLBACKS = {
  'gemini-3.1-flash-lite-preview': 'gemini-3.1-flash-lite',
  'gemini-3-pro-preview': 'gemini-3.1-pro-preview',
  'gemini-1.5-flash': 'gemini-2.5-flash',
  'gemini-1.5-pro': 'gemini-2.5-pro',
  'gemini-2.0-flash': 'gemini-2.5-flash',
  'gemini-2.0-flash-lite': 'gemini-2.5-flash-lite'
};

/**
 * Resolves a model identifier for a specific role slot, applying deprecation mappings
 * or falling back to the slot's default if the model is not supported.
 *
 * @public
 * @param {('chat'|'shGeneric'|'shFlow'|'image')} slot - The role category slot.
 * @param {?string} currentModel - The current model identifier string from settings or input.
 * @returns {string} A valid, supported model identifier.
 * @example
 * const validModel = ModelConfig.resolveModel('chat', 'gemini-3.1-flash-lite-preview');
 * // returns 'gemini-3.1-flash-lite'
 *
 * const fallbackModel = ModelConfig.resolveModel('shFlow', 'unknown-model-id');
 * // returns 'gemini-3.5-flash'
 */
function resolveModel(slot, currentModel) {
  if (typeof currentModel === 'string' && currentModel.trim().length > 0) {
    const trimmed = currentModel.trim();

    // 1. Direct match with a supported model
    if (SUPPORTED_MODELS.includes(trimmed)) {
      return trimmed;
    }

    // 2. Explicit deprecation mapping fallback
    if (MODEL_DEPRECATION_FALLBACKS[trimmed]) {
      const targetModel = MODEL_DEPRECATION_FALLBACKS[trimmed];
      if (SUPPORTED_MODELS.includes(targetModel)) {
        return targetModel;
      }
    }
  }

  // 3. Fallback to category default
  return DEFAULT_MODELS[slot] || DEFAULT_MODELS.shGeneric;
}

/**
 * Inspects and automatically migrates all model keys stored in Homey settings.
 * If an obsolete, preview, or deprecated model is detected, it is updated in settings
 * and logged.
 *
 * @public
 * @param {import('homey')} homey - The Homey application instance.
 * @returns {{ chatModel: string, shGenericModel: string, shFlowModel: string }} Resolved model identifiers.
 * @example
 * const { chatModel, shGenericModel, shFlowModel } = ModelConfig.migrateSettings(this.homey);
 */
function migrateSettings(homey) {
  if (!homey || !homey.settings) {
    return {
      chatModel: DEFAULT_MODELS.chat,
      shGenericModel: DEFAULT_MODELS.shGeneric,
      shFlowModel: DEFAULT_MODELS.shFlow
    };
  }

  const legacySmartHomeModel = homey.settings.get('gemini_model');
  const storedChat = homey.settings.get('gemini_model_chat');
  const storedShGeneric = homey.settings.get('gemini_model_sh_generic') || legacySmartHomeModel;
  const storedShFlow = homey.settings.get('gemini_model_sh_flow') || legacySmartHomeModel;

  const resolvedChat = resolveModel('chat', storedChat);
  const resolvedShGeneric = resolveModel('shGeneric', storedShGeneric);
  const resolvedShFlow = resolveModel('shFlow', storedShFlow);

  // Migrate chat model if needed
  if (storedChat && storedChat !== resolvedChat) {
    homey.settings.set('gemini_model_chat', resolvedChat);
    homey.log(`[ModelMigration] Migrated setting "gemini_model_chat" from "${storedChat}" to "${resolvedChat}"`);
  }

  // Migrate smart home generic model if needed
  if (storedShGeneric && storedShGeneric !== resolvedShGeneric) {
    homey.settings.set('gemini_model_sh_generic', resolvedShGeneric);
    homey.log(`[ModelMigration] Migrated setting "gemini_model_sh_generic" from "${storedShGeneric}" to "${resolvedShGeneric}"`);
  }

  // Migrate smart home flow model if needed
  if (storedShFlow && storedShFlow !== resolvedShFlow) {
    homey.settings.set('gemini_model_sh_flow', resolvedShFlow);
    homey.log(`[ModelMigration] Migrated setting "gemini_model_sh_flow" from "${storedShFlow}" to "${resolvedShFlow}"`);
  }

  // Clean up legacy setting if it was deprecated
  if (legacySmartHomeModel && MODEL_DEPRECATION_FALLBACKS[legacySmartHomeModel]) {
    const resolvedLegacy = resolveModel('shGeneric', legacySmartHomeModel);
    homey.settings.set('gemini_model', resolvedLegacy);
    homey.log(`[ModelMigration] Migrated legacy setting "gemini_model" from "${legacySmartHomeModel}" to "${resolvedLegacy}"`);
  }

  return {
    chatModel: resolvedChat,
    shGenericModel: resolvedShGeneric,
    shFlowModel: resolvedShFlow
  };
}

module.exports = {
  DEFAULT_MODELS,
  SUPPORTED_MODELS,
  MODEL_I18N_KEYS,
  MODEL_DEPRECATION_FALLBACKS,
  resolveModel,
  migrateSettings
};
