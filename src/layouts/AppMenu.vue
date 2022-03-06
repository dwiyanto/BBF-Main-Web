<template>
  <nav>
    <div class="flex items-center justify-center">
      <ul
        id="menu-items"
        class="hidden md:block md:mx-auto pt-2 col-span-2 font-bold space-y-3 text-gray-700 uppercase"
      >
        <li><router-link to="/">Daftar Donasi</router-link></li>
        <li><router-link to="/mitra">Mitra Kami</router-link></li>
        <li><router-link to="/about">Tentang Kami</router-link></li>
      </ul>
    </div>
    <div
      class="block my-auto items-center space-x-6 text-gray-700 uppercase md:hidden text-right"
    >
      <button class="font-bold mt-9 mr-4" @click="toggleMenu">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fal"
          data-icon="bars"
          class="w-5 h-5"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M442 114H6a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6z"
          ></path>
        </svg>
      </button>
    </div>

    <div
      v-if="isMenuOpen"
      class="absolute left-0 z-20 flex flex-col w-full p-4 mt-12 space-y-3 bg-blue-300 text-black shadow-md"
    >
      <router-link to="/">Home</router-link>
      <router-link to="/mitra">Mitra</router-link>
      <router-link to="/about">About</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
</script>
