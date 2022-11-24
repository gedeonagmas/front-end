import axios from "axios";

const instances = axios.create({
  baseURL: "http://localhost:2200",
});

export default instances;
