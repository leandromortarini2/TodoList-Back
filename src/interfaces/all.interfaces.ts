export interface ITodo {
  id: number;
  title: string;
  type: string;
  description: string;
  status: "pending" | "in-progress" | "finished";
}

export interface ITodoData {
  title: string;
  type: string;
  description: string;
}
