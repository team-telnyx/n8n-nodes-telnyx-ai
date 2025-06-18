import {
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	IN8nHttpFullResponse,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';

export const VoiceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['voice'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many voices',
				description: 'Returns metadata about many voices',
				routing: {
					request: {
						method: 'GET',
						url: '/v2/text-to-speech/voices',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'voices',
								},
							},
						],
					},
				},
			},
			{
				name: 'Text to Speech',
				value: 'textToSpeech',
				description: 'Converts text into speech and returns audio',
				action: 'Convert text to speech',
				routing: {
					request: {
						url: '/v2/text-to-speech/speech',
						method: 'POST',
						returnFullResponse: true,
						encoding: 'arraybuffer',
					},
					output: {
						postReceive: [returnBinaryData],
					},
				},
			},
			{
				name: 'Speech to Text',
				value: 'speechToText',
				description: 'Transcribe an audio file',
				action: 'Transcribe audio',
				routing: {
					request: {
						url: '/v2/ai/audio/transcriptions',
						method: 'POST',
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					},
					send: {
						preSend: [preSendSpeechToText],
					},
				},
			},
		],
		default: 'getAll',
	},
];

export const VoiceFields: INodeProperties[] = [
	{
		displayName: 'Provider',
		name: 'provider',
		type: 'options',
		options: [
			{ name: 'AWS', value: 'aws' },
			{ name: 'Azure', value: 'azure' },
			{ name: 'ElevenLabs', value: 'elevenlabs' },
			{ name: 'Telnyx', value: 'telnyx' },
		],
		default: 'telnyx',
		description: 'Filter voices by provider',
		displayOptions: {
			show: {
				resource: ['voice'],
				operation: ['getAll'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'provider',
			},
		},
	},
	{
		displayName: 'ElevenLabs API Key Reference',
		name: 'elevenlabs_api_key_ref',
		type: 'string',
		default: '',
		required: true,
		description:
			'Reference to your ElevenLabs API key stored in Integration Secrets on Telnyx Portal',
		displayOptions: {
			show: {
				resource: ['voice'],
				operation: ['getAll'],
				provider: ['elevenlabs'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'elevenlabs_api_key_ref',
			},
		},
	},
	// Text to Speech
	{
		displayName: 'Voice',
		description: 'Select the voice to use for the conversion',
		name: 'voice',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'list', value: null },
		displayOptions: {
			show: {
				resource: ['voice'],
				operation: ['textToSpeech'],
			},
		},
		disabledOptions: {
			show: {
				includeElevenLabsVoices: [true],
				elevenlabs_api_key_ref_2: [''],
			},
		},
		modes: [
			{
				displayName: 'From list',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'listVoices',
					searchable: true,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				placeholder: 'Telnyx.Natural.Stan',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'voice',
			},
		},
	},
	{
		displayName: 'Include ElevenLabs Voices',
		name: 'includeElevenLabsVoices',
		type: 'boolean',
		default: false,
		description: 'Whether to include ElevenLabs voices in the response',
		displayOptions: {
			show: {
				resource: ['voice'],
				operation: ['textToSpeech'],
			},
		},
	},
	{
		displayName: 'ElevenLabs API Key Reference',
		name: 'elevenlabs_api_key_ref_2',
		type: 'string',
		default: '',
		required: true,
		description:
			'Reference to your ElevenLabs API key stored in Integration Secrets on Telnyx Portal',
		displayOptions: {
			show: {
				resource: ['voice'],
				operation: ['textToSpeech'],
				includeElevenLabsVoices: [true],
			},
		},
	},
	{
		displayName: 'Text',
		description: 'The text that will get converted into speech',
		placeholder: 'e.g. Where there is a will, there is a way.',
		name: 'text',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['voice'],
				operation: ['textToSpeech'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'text',
			},
		},
	},

	// Speech to Text
	{
		displayName: 'File',
		description: 'The audio file to transcribe',
		name: 'file',
		type: 'resourceLocator',
		required: true,
		default: { mode: 'file', value: 'data' },
		displayOptions: {
			show: {
				resource: ['voice'],
				operation: ['speechToText'],
			},
		},
		modes: [
			{
				displayName: 'File',
				name: 'file',
				type: 'string',
				placeholder: 'data',
			},
			{
				displayName: 'File URL',
				name: 'fileUrl',
				type: 'string',
				placeholder: 'https://example.com/audio.mp3',
			},
		],
	},
	{
		displayName: 'Model',
		description: 'Select the model to use for the transcription',
		name: 'model',
		type: 'options',
		default: 'distil-whisper/distil-large-v2',
		required: true,
		displayOptions: {
			show: {
				resource: ['voice'],
				operation: ['speechToText'],
			},
		},
		options: [
			{ name: 'distil-whisper/distil-large-v2', value: 'distil-whisper/distil-large-v2' },
			{ name: 'openai/whisper-large-v3-turbo', value: 'openai/whisper-large-v3-turbo' },
		],
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['voice'],
				operation: ['speechToText'],
			},
		},
		options: [
			{
				displayName: 'Response Format',
				description: 'Select the response format',
				name: 'responseFormat',
				type: 'options',
				default: 'json',
				options: [
					{ name: 'Json', value: 'json' },
					{ name: 'Verbose Json', value: 'verbose_json' },
				],
			},
			{
				displayName: 'Timestamp Granularities',
				name: 'timestampGranularities',
				description: 'Whether to include timestamps for each word in the response',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						responseFormat: ['verbose_json'],
					},
				},
			},
		],
	},
];

async function returnBinaryData<PostReceiveAction>(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	responseData: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation') as string;

	const binaryData = await this.helpers.prepareBinaryData(
		responseData.body as Buffer,
		`audio.${operation}.mp3`,
		'audio/mp3',
	);

	return items.map(() => ({ json: responseData.headers, binary: { ['data']: binaryData } }));
}

async function preSendSpeechToText(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const fileField = this.getNodeParameter('file', { mode: 'file', value: 'data' }) as {
		mode: 'file' | 'fileUrl';
		value: string;
	};
	const modelId = this.getNodeParameter('model', 'distil-whisper/distil-large-v2') as string;
	const additionalOptions = this.getNodeParameter('additionalOptions', {}) as IDataObject;

	const responseFormat = (additionalOptions.responseFormat as 'json' | 'verbose_json') || 'json';
	const timestampGranularities = additionalOptions.timestampGranularities as boolean;

	const formData = new FormData();

	if (fileField.mode === 'fileUrl') {
		const fileUrl = fileField.value;
		formData.append('file_url', fileUrl);
	} else {
		const fileBuffer = await this.helpers.getBinaryDataBuffer(fileField.value);
		formData.append('file', new Blob([fileBuffer]), 'audio.mp3');
	}
	formData.append('model', modelId);
	formData.append('response_format', responseFormat);

	if (timestampGranularities) {
		formData.append('timestamp_granularities[]', 'segment');
	}

	requestOptions.body = formData;
	return requestOptions;
}
