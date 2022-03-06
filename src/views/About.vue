<template>
  <div class="text-justify">
    <h4 class="text-3xl font-mono font-thin uppercase">
      Tentang Kami
    </h4>
    <template v-if="aboutData">
      <div class="mt-2" v-html="aboutData.descriptionPlain"></div>
      <div class="mt-6 ">
        <h4 class="font-bold">Visi</h4>
        <p v-html="aboutData.vision"></p>
      </div>
      <div class="mt-6">
        <h4 class="font-bold">Misi</h4>
        <p v-html="aboutData.mission"></p>
      </div>
      <div class="mt-6">
        <h4 class="font-bold">Hubungi</h4>
        <div class="pt-1">
          <table class="border-solid border-4 border-gray-600">
            <tr>
              <th
                class="border-solid border-4 border-gray-600 text-left py-3 px-4"
              >
                Alamat
              </th>
              <td
                class="border-solid border-4 border-gray-600 text-left py-3 px-4"
              >
                {{ aboutData.address }}
              </td>
            </tr>
            <tr>
              <th
                class="border-solid border-4 border-gray-600 text-left py-3 px-4"
              >
                No Telp
              </th>
              <td
                class="border-solid border-4 border-gray-600 text-left py-3 px-4"
              >
                <a href="tel:+6281335755857">{{ aboutData.phoneNumber }}</a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "About",
  mounted() {
    this.$store.dispatch("about/find");
  },
  computed: {
    aboutData() {
      if (this.$store.state.about.data.length === 1) {
        return this.$store.state.about.data[0];
      }

      return null;
    }
  }
};
</script>
