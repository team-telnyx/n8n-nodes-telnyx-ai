import {
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

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
				action: 'Get many chat models',
				description: 'Returns metadata about many chat models',
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
			{
				name: 'Create Chat Completion',
				value: 'createChatCompletion',
				action: 'Create chat completion',
				description: 'Chat a new chat completion with a language model',
				routing: {
					request: {
						method: 'POST',
						url: '/v2/ai/chat/completions',
					},
					send: {
						preSend: [preSendChatCompletion],
					},
				},
			},
			{
				name: 'Summarize File',
				value: 'summarizeFile',
				action: 'Summarize file content',
				description: "Generate a summary of a file's contents",
				routing: {
					request: {
						method: 'POST',
						url: '/v2/ai/summarize',
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
	{
		displayName: 'Model',
		description: 'The model to chat with',
		name: 'model',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: null },
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['createChatCompletion'],
			},
		},
		modes: [
			{
				displayName: 'From list',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'listModels',
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
		displayName: 'Messages',
		name: 'messages',
		type: 'fixedCollection',
		typeOptions: {
			sortable: true,
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['createChatCompletion'],
			},
		},
		placeholder: 'Add Message',
		default: { values: [{ content: '', role: 'user' }] },
		required: true,
		options: [
			{
				displayName: 'Values',
				name: 'values',
				values: [
					{
						displayName: 'Prompt',
						name: 'content',
						type: 'string',
						description: 'The content of the message to be send',
						default: '',
						placeholder: 'e.g. Hello, how can you help me?',
						typeOptions: {
							rows: 2,
						},
					},
					{
						displayName: 'Role',
						name: 'role',
						type: 'options',
						description:
							"Role in shaping the model's response, it tells the model how it should behave and interact with the user",
						options: [
							{
								name: 'User',
								value: 'user',
								description: 'Send a message as a user and get a response from the model',
							},
							{
								name: 'Assistant',
								value: 'assistant',
								description: 'Tell the model to adopt a specific tone or personality',
							},
							{
								name: 'System',
								value: 'system',
								description:
									"Usually used to set the model's behavior or context for the next user message",
							},
						],
						default: 'user',
					},
				],
			},
		],
	},
	{
		displayName: 'External API Key Reference',
		name: 'api_key_ref',
		description:
			'Reference to your API key secret (for external providers like OpenAI, Anthropic, etc.)',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['createChatCompletion'],
			},
		},
	},
	{
		displayName: 'Response Format',
		name: 'response_format',
		description: 'Format of the response',
		type: 'options',
		default: 'text',
		options: [
			{ name: 'Text', value: 'text' },
			{ name: 'JSON Object', value: 'json_object' },
		],
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['createChatCompletion'],
			},
		},
	},
	{
		displayName: 'Stream',
		name: 'stream',
		description: 'Whether to stream data-only server-sent events as they become available',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['createChatCompletion'],
			},
		},
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['createChatCompletion'],
			},
		},
		options: [
			{
				displayName: 'Early Stopping',
				name: 'early_stopping',
				description: 'Whether to stop generation early if possible',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Guided Choice',
				name: 'guided_choice',
				description: 'Choices to guide the output',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Guided JSON Schema',
				name: 'guided_json',
				description: 'JSON schema to guide the output',
				type: 'json',
				default: '{}',
			},
			{
				displayName: 'Guided Regex',
				name: 'guided_regex',
				description: 'Regex pattern to guide the output',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Max Tokens',
				name: 'max_tokens',
				description: 'Maximum number of completion tokens to generate',
				type: 'number',
				default: 1024,
			},
			{
				displayName: 'Temperature',
				name: 'temperature',
				description: 'Adjusts the creativity of the model',
				type: 'number',
				default: 0.1,
			},
		],
	},
	{
		displayName: 'Bucket',
		name: 'bucket',
		description: 'The name of the bucket that contains the file to be summarized',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['summarizeFile'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'bucket',
			},
		},
	},
	{
		displayName: 'Filename',
		name: 'filename',
		description: 'The name of the file to be summarized',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['summarizeFile'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'filename',
			},
		},
	},
	{
		displayName: 'System Prompt',
		name: 'system_prompt',
		description: 'A system prompt to guide the summary generation',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['summarizeFile'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'system_prompt',
			},
		},
	},
];

async function preSendChatCompletion(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const model = (
		this.getNodeParameter('model', {
			mode: 'list',
			value: 'meta-llama/Meta-Llama-3.1-8B-Instruct',
		}) as {
			mode: 'list' | 'id';
			value: string;
		}
	).value;

	const messagesCollection = this.getNodeParameter('messages', { values: [] }) as {
		values: Array<{ content: string; role: string }>;
	};

	const messages = messagesCollection.values || [];

	const api_key_ref = this.getNodeParameter('api_key_ref', '') as string;
	const stream = this.getNodeParameter('stream', false) as boolean;
	const response_format = this.getNodeParameter('response_format', 'text') as string;
	const additionalOptions = this.getNodeParameter('additionalOptions', {}) as IDataObject;

	const body = {
		model,
		messages,
		stream,
		response_format: {
			type: response_format,
		},
		...(Boolean(api_key_ref) ? { api_key_ref } : {}),
		...additionalOptions,
	};

	requestOptions.body = body;
	return requestOptions;
}
