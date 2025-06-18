import { ILoadOptionsFunctions, INodeListSearchItems, INodeListSearchResult } from 'n8n-workflow';
import { ITelnyxVoiceResponse } from '../@types/voice';
import { ITelnyxModelsResponse } from '../@types/chat';
import { ITelnyxAssistantsResponse } from '../@types/assistants';
import { ITelnyxAssistantEventsResponse } from '../@types/assistantEvents';
import { ITelnyxConversationsResponse } from '../@types/conversations';

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

	async listScheduledEvents(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
		const assistantId = (
			this.getNodeParameter('assistant', {
				value: 'some-random-id',
			}) as { value: string }
		).value;

		const scheduledEventsResponse = (await this.helpers.httpRequestWithAuthentication.call(
			this,
			'telnyxApi',
			{
				method: 'GET',
				url: `https://api.telnyx.com/v2/ai/assistants/${assistantId}/scheduled_events`,
			},
		)) as ITelnyxAssistantEventsResponse;

		const returnData: INodeListSearchItems[] = scheduledEventsResponse.data.map((event) => ({
			name: event.scheduled_event_id ?? 'No scheduled event ID',
			value: event.scheduled_event_id ?? 'No scheduled event ID',
		}));

		return {
			results: returnData,
		};
	},

	async listConversations(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
		const conversationsResponse = (await this.helpers.httpRequestWithAuthentication.call(
			this,
			'telnyxApi',
			{
				method: 'GET',
				url: 'https://api.telnyx.com/v2/ai/conversations',
				qs: {
					limit: 100,
				},
			},
		)) as ITelnyxConversationsResponse;

		const returnData: INodeListSearchItems[] = conversationsResponse.data.map((conversation) => ({
			name: conversation.id,
			value: conversation.id,
		}));

		return {
			results: returnData,
		};
	},
};
