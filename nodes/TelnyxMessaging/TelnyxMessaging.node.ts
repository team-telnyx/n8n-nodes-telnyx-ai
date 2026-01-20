import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class TelnyxMessaging implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Telnyx Messaging',
		name: 'telnyxMessaging',
		icon: { light: 'file:telnyx.svg', dark: 'file:telnyx.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Telnyx Messaging API',
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
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: 'Hello from Telnyx Messaging',
				description: 'Temporary field to verify node loads',
			},
		],

	};
}
