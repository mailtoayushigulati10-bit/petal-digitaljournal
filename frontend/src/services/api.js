import axios from "axios";

const API = axios.create({

  baseURL: "https://petal-digitaljournal-1.onrender.com/api"

});

export default API;