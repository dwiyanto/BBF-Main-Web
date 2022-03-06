<template>
  <div class="bg-white shadow-md border border-gray-200 rounded-lg mb-5">
    <router-link
      :to="{
        name: 'project',
        params: { slug: this.slug },
        meta: { title: this.title }
      }"
    >
      <img
        class="rounded-t-lg bg-gray-200"
        :src="this.image"
        :alt="this.title"
      />
      <div class="p-2">
        <a href="#">
          <h5 class="text-center text-gray-700 font-bold tracking-tight mb-2">
            {{ this.title }}
          </h5>
        </a>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ["id", "title", "image", "link", "slug"],
  methods: {
    shorten(str, maxLen, separator = " ") {
      if (str.length <= maxLen) return str;
      return str.substr(0, str.lastIndexOf(separator, maxLen)) + "...";
    }
  }
};
</script>
