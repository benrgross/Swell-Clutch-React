import axios from "axios";

export default {
  upsertUser: function (creds) {
    return axios.post("/api/user", creds);
  },
};
