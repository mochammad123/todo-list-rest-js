declare namespace ITask {
  interface ResponseTask {
    id: number;
    title: string;
    description: string;
    user_id: number;
  }

  interface CreateTask {
    title: string;
    description: string;
  }

  interface UpdateTask {
    id: number;
    title?: string;
    description?: string;
  }
}
