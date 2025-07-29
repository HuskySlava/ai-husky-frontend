export interface ChatMessage {
  id: number;
  type: "incoming" | "outgoing";
  timestamp: number;
  text  : string;
}

export type ChatMessages = ChatMessage[];
