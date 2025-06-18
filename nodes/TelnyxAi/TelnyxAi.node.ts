import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

import { listSearch } from './Descriptions/utils';
import { ChatOperations, ChatFields } from './Descriptions/chat';
import { VoiceFields, VoiceOperations } from './Descriptions/voice';
import { AssistantsOperations, AssistantsFields } from './Descriptions/assistants';
import { AssistantEventsOperations, AssistantEventsFields } from './Descriptions/assistantEvents';
import { ConversationsOperations, ConversationsFields } from './Descriptions/conversations';

export class TelnyxAi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Telnyx AI',
		name: 'telnyxAi',
		icon: 'file:telnyx.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Telnyx AI API',
		defaults: {
			name: 'Telnyx AI',
		},
		usableAsTool: true,
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'telnyxApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.telnyx.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Assistant',
						value: 'assistants',
					},
					{
						name: 'Assistant Event',
						value: 'assistantEvents',
					},
					{
						name: 'Chat',
						value: 'chat',
					},
					{
						name: 'Conversation',
						value: 'conversations',
					},
					{
						name: 'Voice',
						value: 'voice',
					},
				],
				default: 'chat',
			},
			...ChatOperations,
			...ChatFields,
			...VoiceOperations,
			...VoiceFields,
			...AssistantsOperations,
			...AssistantsFields,
			...AssistantEventsOperations,
			...AssistantEventsFields,
			...ConversationsOperations,
			...ConversationsFields,
		],
	};
	methods = {
		listSearch,
	};
}
