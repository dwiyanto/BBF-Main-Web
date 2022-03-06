<template>
  <div class="bg-white shadow-md border border-gray-200 rounded-lg mb-5">
    <router-link
      :to="{
        name: 'project',
        params: { slug: item._id },
        meta: { title: item.name }
      }"
    >
      <img
        class="rounded-t-lg bg-gray-200"
        src="/img/project/menanam-pohon.jpg"
        :alt="item.name"
      />
      <div class="p-2">
        <a href="#">
          <h5 class="text-center text-gray-700 font-bold tracking-tight mb-2">
            {{ item.name }}
          </h5>
        </a>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return null;
      }
    }
  }
};
</script>
