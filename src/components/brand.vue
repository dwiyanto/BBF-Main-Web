<template>
  <div
    class="px-4 py-3 mt-4 bg-white border border-gray-300 rounded-md hover:border-gray-400 hover:bg-gray-100"
  >
    <div class="space-x-2">
      <div class=" flex items-center justify-center h-48">
        <img
          class="object-contain w-full max-h-48"
          :src="`${cdnUrl}/${image}`"
          :alt="name"
        />
      </div>
      <div>
        <h3 class="font-medium text-center text-gray-700" v-html="name"></h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: ""
    },
    desc: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: ""
    },
    cdnUrl: {
      type: String,
      default: process.env.VUE_APP_CDN_URL
    }
  }
};
</script>
