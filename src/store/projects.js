import axios from "axios";

const projects = {
  namespaced: true,
  state: () => ({
    total: 0,
    limit: 10,
    skip: 0,
    data: [],
    selectedData: null
  }),
  actions: {
    async find({ commit }, payload) {
      await axios
        .get(`${process.env.VUE_APP_API_URL}/global-projects`, {
          params: payload.name.$search ? payload.name.$search : null
        })
        .then(response => {
          if (response && response.data) {
            commit("afterFind", response.data);
          }
        });
    },
    async get({ commit }, _id) {
      await axios
        .get(`${process.env.VUE_APP_API_URL}/global-projects/${_id}`)
        .then(response => {
          if (response && response.data) {
            commit("afterGet", response.data);
          }
        });
    }
  },
  mutations: {
    afterFind(state, payload) {
      state.total = payload.total;
      state.limit = payload.limit;
      state.skip = payload.skip;
      state.data = payload.data;
    },
    afterGet(state, payload) {
      state.selectedData = null;
      state.selectedData = payload;
    }
  }
};

export default projects;
