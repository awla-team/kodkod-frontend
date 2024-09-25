export interface StudentCompleteActivity {
  student: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  completed: boolean;
}
