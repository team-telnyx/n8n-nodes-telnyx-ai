import { INodeProperties } from 'n8n-workflow';

export const ConversationsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['conversations'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many conversations',
				description: 'Returns a list of conversations',
				routing: {
					request: {
						method: 'GET',
						url: '/v2/ai/conversations',
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
				action: 'Get a conversation',
				description: 'Returns a specific conversation by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/v2/ai/conversations/{{$parameter["conversationId"]}}',
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
				name: 'Get Messages',
				value: 'getMessages',
				action: 'Get conversation messages',
				description:
					'Retrieve messages for a specific conversation, including tool calls made by the assistant',
				routing: {
					request: {
						method: 'GET',
						url: '=/v2/ai/conversations/{{$parameter["conversationId"]}}/messages',
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
				name: 'Get Conversation Insights',
				value: 'getConversationInsights',
				action: 'Get insights for a conversation',
				description: 'Retrieve insights for a specific conversation',
				routing: {
					request: {
						method: 'GET',
						url: '=/v2/ai/conversations/{{$parameter["conversationId"]}}/conversations-insights',
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
		],
		default: 'getAll',
	},
];

export const ConversationsFields: INodeProperties[] = [
	{
		displayName: 'Conversation ID',
		description: 'The conversation to retrieve',
		name: 'conversationId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: null },
		modes: [
			{
				displayName: 'From list',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'listConversations',
					searchable: true,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
			},
		],
		displayOptions: {
			show: {
				resource: ['conversations'],
				operation: ['get', 'getMessages', 'getConversationInsights'],
			},
		},
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['conversations'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Agent Target',
				name: 'metadata_telnyx_agent_target',
				type: 'string',
				description: 'Filter by agent (e.g., metadata->telnyx_agent_target=eq.+13128675309)',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'metadata->telnyx_agent_target',
					},
				},
			},
			{
				displayName: 'Assistant ID',
				name: 'metadata_assistant_id',
				type: 'resourceLocator',
				description: 'Filter by assistant ID (e.g., metadata->assistant_id=eq.assistant-123)',
				default: { mode: 'list', value: null },
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
				routing: {
					send: {
						type: 'query',
						property: 'metadata->assistant_id',
					},
				},
			},
			{
				displayName: 'Call Control ID',
				name: 'metadata_call_control_id',
				type: 'string',
				description: 'Filter by call control ID (e.g., metadata->call_control_id=eq.v3:123)',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'metadata->call_control_id',
					},
				},
			},
			{
				displayName: 'Conversation Channel',
				name: 'metadata_telnyx_conversation_channel',
				type: 'string',
				description:
					'Filter by conversation channel (e.g., metadata->telnyx_conversation_channel=eq.phone_call)',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'metadata->telnyx_conversation_channel',
					},
				},
			},
			{
				displayName: 'Created At',
				name: 'created_at',
				type: 'string',
				description: 'Filter by creation datetime (e.g., created_at=gte.2025-01-01)',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'created_at',
					},
				},
			},
			{
				displayName: 'End User Target',
				name: 'metadata_telnyx_end_user_target',
				type: 'string',
				description: 'Filter by end user (e.g., metadata->telnyx_end_user_target=eq.+13128675309)',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'metadata->telnyx_end_user_target',
					},
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				description: 'Filter by conversation ID (e.g. ID=eq.123)',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'id',
					},
				},
			},
			{
				displayName: 'Last Message At',
				name: 'last_message_at',
				type: 'string',
				description: 'Filter by last message datetime (e.g., last_message_at=lte.2025-06-01)',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'last_message_at',
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				description: 'Max number of results to return',
				default: 50,
				typeOptions: {
					minValue: 1,
				},
				routing: {
					send: {
						type: 'query',
						property: 'limit',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				description: 'Filter by conversation Name (e.g. name=like.Voice%)',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'name',
					},
				},
			},
			{
				displayName: 'Or',
				name: 'or',
				type: 'string',
				description:
					'Apply OR conditions using PostgREST syntax (e.g., or=(created_at.gte.2025-04-01,last_message_at.gte.2025-04-01))',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'or',
					},
				},
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'string',
				description: 'Order the results by specific fields (e.g., order=created_at.desc)',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'order',
					},
				},
			},
		],
	},
];
