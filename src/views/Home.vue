<template class="pr-0 mx-auto mr-0 px-auto" id="app">
  <div>
    <h1 class="text-1x1 md:text-3xl font-bold text-center uppercase">
      Bergerak untuk indonesia yang lebih baik
    </h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center pt-4 gap-2 m-2"
    >
      <CardProject
        v-for="project in projectData.data"
        :key="project._id"
        :item="project"
      >
      </CardProject>
    </div>
  </div>
</template>
<script>
import CardProject from "../components/card-project.vue";
//import axios from "axios";
import data from "../assets/json/data.json";
export default {
  components: {
    CardProject
  },
  computed: {
    projectData() {
      return this.$store.state.projects;
    }
  },
  mounted() {
    this.$store.dispatch("projects/find", {
      name: {
        $search: ""
      }
    });
  },
  methods: {},
  data() {
    return {
      projects: data
    };
  }
};
</script>
