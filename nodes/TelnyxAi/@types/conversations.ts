export interface ITelnyxConversationMetadata {
	telnyx_conversation_channel: string;
	telnyx_agent_target: string;
	telnyx_end_user_target: string;
	assistant_id: string;
}

export interface ITelnyxConversation {
	id: string;
	name: string;
	created_at: string;
	metadata: ITelnyxConversationMetadata;
	last_message_at: string;
}

export interface ITelnyxConversationsResponse {
	data: ITelnyxConversation[];
}
