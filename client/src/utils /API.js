import axios from "axios";

// eslint-disable-next-line
export default {
  upsertUser: function (creds) {
    return axios.post("/api/user", creds);
  },

  deleteSpot: function (spotId) {
    return axios.post(`/api/session/delete`, { id: spotId });
  },

  getReport: function (spotId) {
    return axios.get(`/api/surf/report/${spotId}`);
  },
  getSessions: function (id) {
    return axios.get(`/api/session/spot/${id}`);
  },
};
