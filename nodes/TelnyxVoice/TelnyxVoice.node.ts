import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';


export class TelnyxVoice implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Telnyx Voice',
		name: 'telnyxVoice',
		icon: { light: 'file:telnyx.svg', dark: 'file:telnyx.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Telnyx Voice node (wiring test)',
		defaults: {
			name: 'Telnyx Voice',
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
			default: 'Hello from Telnyx Voice!',
			description: 'Temporary field to verify node loads',
		},
	],

	};

}
