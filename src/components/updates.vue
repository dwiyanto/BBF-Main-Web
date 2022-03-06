<template>
  <div>
    <div class="rounded overflow-hidden shadow-lg w-full">
      <div class="py-4">
        <img :src="`${cdnUrl}/${image}`" alt="" />
        <div class="mb-4">
          <h2 class="font-bold text-3xl uppercase">{{ title }}</h2>
          <h3>{{ date }}</h3>
        </div>

        <div
          v-html="description"
          class="text-gray-700 text-base text-justify"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "date", "title", "description", "image"],
  data() {
    return {
      cdnUrl: process.env.VUE_APP_CDN_URL
    };
  }
};
</script>
