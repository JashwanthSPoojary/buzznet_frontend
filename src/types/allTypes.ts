interface Owner {
    id: number;
    created_at: Date;
    username: string;
    email: string | null;
    password_hash: string;
  }
interface Workspace {
    name: string;
    id: number;
    owner_id: number;
    owner: Owner;
}
  interface Channel {
    name: string;
    workspace_id: number;
    id: number;
  }
  interface Sender {
    id: number;
    created_at: Date;
    username: string;
    email: string | null;
    password_hash: string;
  }
  
  interface Message {
    content: string | null;
    channel_id: number;
    id: number;
    sender_id: number | null;
    created_at: Date;
    sender: Sender;
    file_url: string | null;
  }

export type {
    Workspace,
    Channel,
    Message
}