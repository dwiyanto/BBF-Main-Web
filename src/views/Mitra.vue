<template>
  <div class="px-4 md:px-0">
    <div class="flex justify-between">
      <h1 class="w-full text-1x1 md:text-3xl inline-flex font-bold uppercase">
        Daftar mitra kami
      </h1>
      <input
        type="text"
        class="w-full inline-flex py-3 pl-4 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
        placeholder="Search"
        v-model="searchQuery"
        v-on:keypress.enter="doSearch(searchQuery)"
      />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
      <brand
        v-for="mitra of mitraData.data"
        :key="mitra._id"
        :id="mitra._id"
        :name="mitra.name"
        :desc="mitra.desc"
        :image="mitra.logo"
      />
    </div>

    <ul class="flex pt-4" v-if="this.showPagination">
      <button
        v-for="(page, index) of this.dataMitras"
        :key="page[index + 1]"
        @click="changePage(index + 1)"
      >
        <li
          class="mx-1 px-3 py-2 bg-blue-200 hover:bg-blue-700 text-gray-700 hover:text-white rounded-lg"
        >
          {{ index + 1 }}
        </li>
      </button>
    </ul>
  </div>
</template>
<script>
import brand from "../components/brand.vue";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
export default {
  name: "test",
  components: {
    brand
  },
  data() {
    return {
      searchQuery: this.searchQuery,
      showPagination: this.$store.state.pages > 1,
      dataMitras: this.$store.state.dataMitras
    };
  },
  computed: {
    mitraData() {
      return this.$store.state.mitra;
    }
  },
  mounted() {
    this.$store.dispatch("mitra/find", {
      name: {
        $search: ""
      }
    });
  },
  methods: {
    doSearch(query) {
      this.$store.commit("search", query);
    },
    changePage(num) {
      this.$store.commit("changePage", num);
    }
  }
};
</script>
