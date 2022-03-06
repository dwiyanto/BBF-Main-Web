import axios from "axios";

const transaction = {
  namespaced: true,
  state: () => ({
    selectedData: null
  }),
  actions: {
    async get({ commit }, _id) {
      await axios
        .get(`${process.env.VUE_APP_API_URL}/transaction/${_id}`)
        .then(response => {
          if (response && response.data) {
            commit("afterGet", response.data);
          }
        });
    }
  },
  mutations: {
    afterGet(state, payload) {
      state.selectedData = null;
      state.selectedData = payload;
    }
  }
};

export default transaction;
