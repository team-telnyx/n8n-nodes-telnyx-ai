export interface ITelnyxAssistantTool {
	type: string;
	hangup?: {
		description: string;
	};
}

export interface ITelnyxAssistantVoiceSettings {
	voice: string;
	api_key_ref: string | null;
	voice_speed: number;
}

export interface ITelnyxAssistantTranscription {
	model: string;
	language: string;
}

export interface ITelnyxAssistantTelephonySettings {
	default_texml_app_id: string;
	supports_unauthenticated_web_calls: boolean;
}

export interface ITelnyxAssistantInsightSettings {
	insight_group_id: string;
	use_insights_for_memory: boolean | null;
}

export interface ITelnyxAssistantPrivacySettings {
	data_retention: boolean;
	pii_redaction: string;
}

export interface ITelnyxAssistant {
	id: string;
	name: string;
	description: string;
	model: string;
	instructions: string;
	tools: ITelnyxAssistantTool[];
	created_at: string;
	greeting: string;
	llm_api_key_ref: string | null;
	voice_settings: ITelnyxAssistantVoiceSettings;
	transcription: ITelnyxAssistantTranscription;
	telephony_settings: ITelnyxAssistantTelephonySettings;
	messaging_settings: null;
	enabled_features: string[];
	insight_settings: ITelnyxAssistantInsightSettings;
	privacy_settings: ITelnyxAssistantPrivacySettings;
	dynamic_variables_webhook_url: string | null;
	dynamic_variables: null;
	import_metadata: null;
}

export interface ITelnyxAssistantsResponse {
	data: ITelnyxAssistant[];
}
