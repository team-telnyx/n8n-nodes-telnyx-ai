export interface ITelnyxVoice {
	id: string;
	name: string;
	language: string;
	provider: string;
	gender: string;
	model_id?: string;
	label?: string;
	accent?: string;
}

export interface ITelnyxVoiceResponse {
	voices: ITelnyxVoice[];
}
