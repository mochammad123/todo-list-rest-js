declare namespace ITask {
  interface ResponseTask {
    id: number;
    title: string;
    description: string;
    user?: {
      id: number;
      name: string;
      username: string;
    };
  }

  interface CreateTask {
    title: string;
    description: string;
  }

  interface UpdateTask {
    title?: string;
    description?: string;
  }
}
