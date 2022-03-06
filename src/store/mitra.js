import axios from "axios";

const mitra = {
  namespaced: true,
  state: () => ({
    total: 0,
    limit: 10,
    skip: 0,
    data: []
  }),
  actions: {
    async find({ commit }, payload) {
      await axios
        .get(`${process.env.VUE_APP_API_URL}/partners`, {
          params: payload.name.$search ? payload.name.$search : null
        })
        .then(response => {
          if (response && response.data) {
            commit("afterFind", response.data);
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
    }
  }
};

export default mitra;
