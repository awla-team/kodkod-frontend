export interface GoalType {
  id: number | string;
  title: string;
  description?: string;
  image_url?: string;
}

export interface GoalResponseType {
  responseData: GoalType[];
  responseStatus: number;
}
