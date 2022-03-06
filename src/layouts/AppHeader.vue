<template>
  <!-- app header -->
  <div class="py-5" style="padding-right: 0.75rem; padding-left: 0.75rem">
    <!-- logo -->
    <div class="col-span-2 md:col-span-4">
      <router-link to="/">
        <img
          src="@/assets/logo.png"
          id="logo"
          alt="Bumi Bhakti Foundation"
          class="py-1 h-24 md:h-48 md:mx-auto"
        />
      </router-link>
    </div>

    <!-- menu -->
    <app-menu
      id="menu"
      class="items-center col-span-2 md:col-span-4 md:text-left text-gray-700"
    ></app-menu>
  </div>
</template>

<script>
import AppMenu from "./AppMenu";

export default {
  components: {
    AppMenu
  }
};
</script>
