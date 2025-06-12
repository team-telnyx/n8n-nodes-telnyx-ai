import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

import { listSearch } from './Descriptions/utils';
import { ChatOperations, ChatFields } from './Descriptions/chat';
import { VoiceFields, VoiceOperations } from './Descriptions/voice';

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
						name: 'Voice',
						value: 'voice',
					},
					{
						name: 'Chat',
						value: 'chat',
					},
				],
				default: 'chat',
			},
			...ChatOperations,
			...ChatFields,
			...VoiceOperations,
			...VoiceFields,
		],
	};
	methods = {
		listSearch,
	};
}
