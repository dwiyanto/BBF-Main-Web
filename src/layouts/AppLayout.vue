<template>
  <!-- Header -->
  <div id="wrapper" class="grid grid-cols-4">
    <AppHeader
      id="nav"
      class="grid grid-cols-4 col-span-4 md:block md:col-span-1"
    />
    <router-view
      id="content"
      class="col-span-4 px-3 md:px-0 md:col-span-3 md:pt-12 pb-12 md:mr-8 min-h-screen"
    />
    <AppFooter id="footer"/>
  </div>
</template>

<script>
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

export default {
  components: {
    AppHeader,
    AppFooter
  }
};
</script>
