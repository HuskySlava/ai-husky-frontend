export interface ChatMessage {
  id: string;
  type: "incoming" | "outgoing";
  timestamp: number;
  text: string;
}
