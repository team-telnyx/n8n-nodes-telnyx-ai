import { ILoadOptionsFunctions, INodeListSearchItems, INodeListSearchResult } from 'n8n-workflow';
import { ITelnyxVoiceResponse } from '../@types/voice';
import { ITelnyxModelsResponse } from '../@types/chat';
import { ITelnyxAssistantsResponse } from '../@types/assistants';

export const listSearch = {
	async listVoices(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
		const voicesResponse = (await this.helpers.httpRequestWithAuthentication.call(
			this,
			'telnyxApi',
			{
				method: 'GET',
				url: 'https://api.telnyx.com/v2/text-to-speech/voices',
			},
		)) as ITelnyxVoiceResponse;

		const returnData: INodeListSearchItems[] = voicesResponse.voices.map((voice) => ({
			name: voice.name,
			value: voice.id,
		}));

		return {
			results: returnData,
		};
	},

	async listModels(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
		const modelsResponse = (await this.helpers.httpRequestWithAuthentication.call(
			this,
			'telnyxApi',
			{
				method: 'GET',
				url: 'https://api.telnyx.com/v2/ai/models',
			},
		)) as ITelnyxModelsResponse;

		const returnData: INodeListSearchItems[] = modelsResponse.data.map((model) => ({
			name: model.id,
			value: model.id,
		}));

		return {
			results: returnData,
		};
	},

	async listAssistants(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
		const assistantsResponse = (await this.helpers.httpRequestWithAuthentication.call(
			this,
			'telnyxApi',
			{
				method: 'GET',
				url: 'https://api.telnyx.com/v2/ai/assistants',
			},
		)) as ITelnyxAssistantsResponse;

		const returnData: INodeListSearchItems[] = assistantsResponse.data.map((assistant) => ({
			name: assistant.id,
			value: assistant.id,
		}));

		return {
			results: returnData,
		};
	},
};
