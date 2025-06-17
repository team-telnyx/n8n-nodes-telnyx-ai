export interface ITelnyxModel {
	id: string;
	object: string;
	created: string;
	base_model: string | null;
	owned_by: string;
	organization: string;
	task: string;
	context_length: number;
	languages: string[];
	parameters: number;
	parameters_str: string;
	tier: string;
	license: string;
	is_fine_tunable: boolean;
	recommended_for_assistants: boolean;
}

export interface ITelnyxModelsResponse {
	object: 'list';
	data: ITelnyxModel[];
}
