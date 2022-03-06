<template>
  <div class="">
    <details>
      <summary class="font-semibold bg-gray-200 rounded-md py-2 pl-2">
        {{ title }}
      </summary>
      <p class="pl-2 pt-2 text-justify">
        {{ answer }}
      </p>
    </details>
  </div>
</template>
<script>
export default {
  props: ["id", "title", "answer"]
};
</script>
