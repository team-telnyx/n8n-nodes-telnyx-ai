import { ILoadOptionsFunctions, INodeListSearchItems, INodeListSearchResult } from 'n8n-workflow';
import { ITelnyxVoiceResponse, ITelnyxModelsResponse } from './types';

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
};
