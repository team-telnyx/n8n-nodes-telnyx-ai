import {
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

export const AssistantEventsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['assistantEvents'],
			},
		},
		options: [
			/**
			 * Create a new scheduled event for an assistant
			 */
			{
				name: 'Create',
				value: 'create',
				action: 'Create a scheduled event',
				description: 'Create a new scheduled event for an assistant',
				routing: {
					request: {
						method: 'POST',
						url: '=/v2/ai/assistants/{{$parameter["assistant"]}}/scheduled_events',
					},
					send: {
						preSend: [handleCreateAssistantEvents],
					},
				},
			},
			/**
			 * Get many scheduled events for an assistant
			 */
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many events',
				description: 'Get scheduled events for an assistant with pagination and filtering',
				routing: {
					request: {
						method: 'GET',
						url: '=/v2/ai/assistants/{{$parameter["assistant"]}}/scheduled_events',
					},
					send: {
						paginate: 'page_number',
						property: 'page_size',
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
			/**
			 * Get a scheduled event by event ID
			 */
			{
				name: 'Get',
				value: 'get',
				action: 'Get an event',
				description: 'Retrieve a scheduled event by event ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/v2/ai/assistants/{{$parameter["assistant"]}}/scheduled_events/{{$parameter["eventId"]}}',
					},
				},
			},
		],
		default: 'getAll',
	},
];

export const AssistantEventsFields: INodeProperties[] = [
	{
		displayName: 'Assistant',
		description: 'The assistant to get events for',
		name: 'assistant',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: null },
		displayOptions: {
			show: {
				resource: ['assistantEvents'],
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
	{
		displayName: 'Event ID',
		name: 'eventId',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: null },
		displayOptions: {
			show: {
				resource: ['assistantEvents'],
				operation: ['get'],
			},
		},
		description: 'The ID of the event to retrieve',
		modes: [
			{
				displayName: 'From list',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'listScheduledEvents',
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
	/**
	 * Get many scheduled events for an assistant
	 */
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['assistantEvents'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Conversation Channel',
				name: 'conversation_channel',
				type: 'options',
				default: 'phone_call',
				description: 'Filter events by conversation channel',
				options: [
					{
						name: 'Phone Call',
						value: 'phone_call',
					},
					{
						name: 'SMS Chat',
						value: 'sms_chat',
					},
				],
			},
			{
				displayName: 'From Date',
				name: 'from_date',
				type: 'dateTime',
				default: '',
				description: 'Filter events from this date',
			},
			{
				displayName: 'Page Number',
				name: 'page_number',
				type: 'number',
				default: 1,
				description: 'Page number to retrieve',
				typeOptions: {
					minValue: 1,
				},
				routing: {
					send: {
						type: 'query',
						property: 'page[number]',
					},
				},
			},
			{
				displayName: 'Page Size',
				name: 'page_size',
				type: 'number',
				default: 20,
				description: 'Number of results per page',
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				routing: {
					send: {
						type: 'query',
						property: 'page[size]',
					},
				},
			},
			{
				displayName: 'To Date',
				name: 'to_date',
				type: 'dateTime',
				default: '',
				description: 'Filter events until this date',
			},
		],
	},
	{
		displayName: 'Conversation Channel',
		name: 'telnyx_conversation_channel',
		type: 'options',
		required: true,
		default: 'phone_call',
		description: 'The type of conversation channel',
		displayOptions: {
			show: {
				resource: ['assistantEvents'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Phone Call',
				value: 'phone_call',
			},
			{
				name: 'SMS Chat',
				value: 'sms_chat',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'telnyx_conversation_channel',
			},
		},
	},
	{
		displayName: 'End User Target',
		name: 'telnyx_end_user_target',
		type: 'string',
		required: true,
		default: '',
		description: 'The phone number or SIP URI to schedule the call or text to',
		displayOptions: {
			show: {
				resource: ['assistantEvents'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'telnyx_end_user_target',
			},
		},
	},
	{
		displayName: 'Agent Target',
		name: 'telnyx_agent_target',
		type: 'string',
		required: true,
		default: '',
		description: 'The phone number or SIP URI to schedule the call or text from',
		displayOptions: {
			show: {
				resource: ['assistantEvents'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'telnyx_agent_target',
			},
		},
	},
	{
		displayName: 'Scheduled At',
		name: 'scheduled_at_fixed_datetime',
		type: 'dateTime',
		required: true,
		default: '',
		description:
			'The datetime at which the event should be scheduled in ISO 8601 format (e.g. 2025-06-17T14:20:39Z)',
		displayOptions: {
			show: {
				resource: ['assistantEvents'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'scheduled_at_fixed_datetime',
			},
		},
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		default: '',
		description: 'Required for SMS scheduled events. The text to be sent to the end user.',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistantEvents'],
				operation: ['create'],
				telnyx_conversation_channel: ['sms_chat'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'text',
			},
		},
	},
	/**
	 * Create a new scheduled event for an assistant
	 */
	{
		displayName: 'Conversation Metadata',
		name: 'conversation_metadata',
		type: 'json',
		placeholder: '{ "key": "value" }',
		default: {},
		displayOptions: {
			show: {
				resource: ['assistantEvents'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'conversation_metadata',
			},
		},
	},
];

async function handleCreateAssistantEvents(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	let conversationMetadata = this.getNodeParameter('conversation_metadata', {}) as IDataObject;

	if (typeof conversationMetadata === 'string')
		conversationMetadata = JSON.parse(conversationMetadata);

	const initialRequestBody = requestOptions.body as IDataObject;

	initialRequestBody.conversation_metadata = conversationMetadata;

	requestOptions.body = initialRequestBody;
	return requestOptions;
}
