import { INodeProperties } from 'n8n-workflow';

export const AssistantsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many assistants',
				description: 'Returns a list of many AI Assistants configured by the user',
				routing: {
					request: {
						method: 'GET',
						url: '/v2/ai/assistants',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an assistant',
				description: 'Returns a specific AI Assistant by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/v2/ai/assistants/{{$parameter["assistant"]}}',
					},
				},
			},
		],
		default: 'getAll',
	},
];

export const AssistantsFields: INodeProperties[] = [
	{
		displayName: 'Assistant',
		description: 'The assistant to retrieve',
		name: 'assistant',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: null },
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['get'],
			},
		},
		modes: [
			{
				displayName: 'From list',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'listAssistants',
					searchable: true,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
			},
		],
	},
];
