import axios from "axios";

const about = {
  namespaced: true,
  state: () => ({
    total: 0,
    limit: 10,
    skip: 0,
    data: []
  }),
  actions: {
    async find({ commit }) {
      await axios.get(`${process.env.VUE_APP_API_URL}/about`).then(response => {
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

export default about;
