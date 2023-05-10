export enum Role {
  User = 'user',
  Assisstant = 'assisstant',
}

export interface Message {
  role: Role;
  content: string;
}

export interface OpenAIMessage {
  index: number;
  finish_reason: string;
}

export type Delta = { role: string } | { content: string };

export interface Data {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: Array<{
    delta: Delta;
    finish_reason: string;
    index: number;
  }>;
  actions: OpenAIMessage[];
}

// export interface Done =

export interface EventData {
  isTrusted: boolean;
  data: string;
}
