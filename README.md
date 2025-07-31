# @telnyx/n8n-nodes-telnyx-ai

This is an n8n community node. It lets you use Telnyx Voice AI in your n8n workflows.

Telnyx Voice AI is a comprehensive platform that provides advanced conversational AI capabilities, including text-to-speech, speech-to-text, chat completions, and voice assistants with real-time interaction features.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)  
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

You can install this package using npm:

```bash
npm install @telnyx/n8n-nodes-telnyx-ai
```

## Operations

This node supports the following resources and operations:

### Assistants

- **Get Many**: Retrieve a list of AI Assistants configured by the user
- **Get**: Get details of a specific assistant

### Assistant Events

- **Create**: Create a scheduled event for an assistant
- **Get Many**: Get a list of assistant events
- **Get**: Get details of a specific event
- **Delete**: Delete an assistant event

### Chat

- **Get Many Models**: Get metadata about available chat models
- **Create Chat Completion**: Generate chat completions using AI models
- **Summarize**: Summarize file content using AI

### Conversations

- **Get Many**: Retrieve a list of conversations
- **Get**: Get details of a specific conversation
- **Get Messages**: Get messages from a conversation
- **Get Insights**: Get AI-generated insights for a conversation

### Voice

- **Get Many Voices**: Get metadata about available voice models
- **Text to Speech**: Convert text to speech audio
- **Speech to Text**: Transcribe audio to text

## Credentials

To use this node, you need to authenticate with the Telnyx API using your API key.

### Prerequisites

1. Sign up for a [Telnyx account](https://telnyx.com)
2. Navigate to your [API Keys page](https://portal.telnyx.com/#/app/api-keys) in the Telnyx Portal
3. Generate a new API key or use an existing one

### Setting up credentials in n8n

1. In n8n, go to **Credentials** and create new credentials
2. Search for "Telnyx API" and select it
3. Enter your Telnyx API key in the **API Key** field
4. Test the credentials to ensure they work correctly

For more information about Telnyx API keys, refer to the [official documentation](https://support.telnyx.com/en/articles/4305158-api-keys-and-how-to-use-them).

## Compatibility

- **Minimum n8n version**: 1.0.0
- **Node.js version**: >=20.15
- **Tested with**: n8n 1.x.x

This node is built using n8n's programmatic-style node architecture and follows the latest n8n development best practices.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Telnyx Voice AI API documentation](https://developers.telnyx.com/docs/api/v2/ai)
- [Telnyx Portal](https://portal.telnyx.com)
- [Telnyx Support](https://support.telnyx.com)

## Version history

### 1.5.5 (Current)

- Comprehensive Telnyx Voice AI integration
- Support for Assistants, Chat, Voice, Conversations, and Assistant Events
- Full CRUD operations for assistant events
- Text-to-speech and speech-to-text capabilities
- Chat completions and file summarization
- Conversation insights and message management
