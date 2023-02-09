import { User } from "./interfaces";
import avatar from "./../../assets/images/avatar.png";

export const TEST_USER: User = {
  id: 1,
  avatar,
  first_name: "Juan",
  last_name: "Pérez",
  role: "Profesor",
};

export const EMPTY_USER: User = {
  id: -1,
  avatar: "",
  first_name: "",
  last_name: "",
  role: "",
};
