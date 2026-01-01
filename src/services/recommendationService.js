import axios from "axios";

const RECOMMEND_API = "http://localhost:9000/recommend";

const recommendDoctor = (symptoms) => {
  return axios.post(RECOMMEND_API, symptoms, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  recommendDoctor,
};
