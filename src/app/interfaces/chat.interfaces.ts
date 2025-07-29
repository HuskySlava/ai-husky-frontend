export interface ChatMessage {
  id: number;
  type: "question" | "answer";
  timestamp: number;
  message: string;
}

export type ChatMessages = ChatMessage[];
