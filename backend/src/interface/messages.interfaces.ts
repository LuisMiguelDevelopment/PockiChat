export interface IMessage {
  content: string;
  sender: "bot" | "user";
}

export interface AIRequest {
  input: string;
}

export interface AIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
      refusal: string | null;
    };
    logprobs: any;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  service_tier: string;
  system_fingerprint: string;
}
