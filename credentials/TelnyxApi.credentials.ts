import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TelnyxApi implements ICredentialType {
	name = 'telnyxApi';
	displayName = 'Telnyx API';
	documentationUrl = 'https://support.telnyx.com/en/articles/4305158-api-keys-and-how-to-use-them';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			noDataExpression: true,
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.telnyx.com/v2',
			url: '/text-to-speech/voices',
		},
	};
}
