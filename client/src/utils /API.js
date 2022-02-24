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

  getSignedUrl: function () {
    console.log("hello");
    return axios.get(
      "https://t0ihe9e020.execute-api.us-east-1.amazonaws.com/default/getPresignedImageUrl"
    );
  },

  uploadImage: function (uploadURL, img) {
    return fetch(uploadURL, {
      method: "PUT",
      headers: {
        "Content-Type": "image/jpeg",
      },
      body: img,
    });
  },
};
