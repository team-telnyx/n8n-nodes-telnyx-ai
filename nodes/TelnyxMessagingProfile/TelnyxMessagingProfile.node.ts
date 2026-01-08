import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';


export class TelnyxMessagingProfile implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Telnyx Messaging Profile',
		name: 'telnyxMessagingProfile',
		icon: { light: 'file:telnyx.svg', dark: 'file:telnyx.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Create and manage Telnyx Messaging profiles',
		defaults: {
			name: 'Telnyx Messaging Profile',
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
				default: 'Hello from Telnyx Messaging Profiles',
				description: 'Temporary field to verify node loads',
			},
		],
	};

}
