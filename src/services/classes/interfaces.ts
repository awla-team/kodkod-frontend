import { FormInitialState } from "components/Modals/CreateClassModal/interfaces";

export interface Adventure {
  id: number;
  title: string;
  thumbnail: string;
  banner: string;
  category: string;
  overview: string;
  expected_results: string;
}

export interface ClassInterface {
  [index: string]: any;
  id: number;
  userId: number;
  alias: string;
  img?: string;
  level: number;

  adventures?: Adventure[];
}
