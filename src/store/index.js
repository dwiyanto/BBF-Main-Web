import { createStore } from "vuex";
import mitra from "./mitra";
import about from "./about";
import projects from "./projects";
import transaction from "./transaction";
import datas from "../assets/json/dataMitra.json";
const filteredData = datas.reduce(
  (tmp, currentVal, currentIndex) => {
    tmp[tmp.length - 1].push(currentVal);
    if (currentIndex % 9 === 8) {
      tmp.push([]);
    }
    return tmp;
  },
  [[]]
);
const pages = filteredData.length;
export default createStore({
  state: {
    paginatedMitras: filteredData[0],
    dataMitras: filteredData,
    pages: pages,
    donationAmount: "",
    donatorName: "",
    donatorInfo: "",
    donatorMessage: "",
    donationPaymentMethod: ""
  },
  mutations: {
    updateDonationAmount(state, value) {
      state.donationAmount = value;
    },
    updateDonatorName(state, value) {
      state.donatorName = value;
    },
    updateDonatorInfo(state, value) {
      state.donatorInfo = value;
    },
    updateDonatorMessage(state, value) {
      state.donatorMessage = value;
    },
    updateDonationPaymentMethod(state, value) {
      state.donationPaymentMethod = value;
    },
    search(state, query) {
      if (query) {
        let stringQuery = "" + query;
        let res = datas.filter(data =>
          data.name.toLowerCase().includes(stringQuery)
        );
        state.paginatedMitras = res;
      } else {
        state.paginatedMitras = filteredData[0];
      }
    },
    changePage(state, num) {
      if (num) {
        console.log("page: " + num);
        state.paginatedMitras = filteredData[num - 1];
      }
    }
  },
  actions: {},
  modules: {
    mitra,
    about,
    projects,
    transaction
  }
});
