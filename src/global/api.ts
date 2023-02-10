import axios from "axios";

const baseURL = "http://localhost:3000";

const http = axios.create({ baseURL });

export default http;
