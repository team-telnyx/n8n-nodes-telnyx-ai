import { INodeProperties } from 'n8n-workflow';

export const ChatOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['chat'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many models',
				description: 'Returns metadata about many models',
				routing: {
					request: {
						method: 'GET',
						url: '/v2/ai/models',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data',
								},
							},
							{
								type: 'setKeyValue',
								enabled: '={{$parameter["simplify"]}}',
								properties: {
									id: '={{$responseItem.id}}',
									created: '={{$responseItem.created}}',
									owned_by: '={{$responseItem.owned_by}}',
									context_length: '={{$responseItem.context_length}}',
									languages: '={{$responseItem.languages}}',
									parameters: '={{$responseItem.parameters}}',
								},
							},
						],
					},
				},
			},
		],
		default: 'getAll',
	},
];

export const ChatFields: INodeProperties[] = [
	{
		displayName: 'Simplify',
		name: 'simplify',
		type: 'boolean',
		default: false,
		description: 'Whether to simplify the response',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['getAll'],
			},
		},
	},
];
