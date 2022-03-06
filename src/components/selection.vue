<template>
  <button>
    <div
      class="bg-white rounded-lg shadow-md p-3 hover:cursor-pointer hover:bg-green-lightest focus:outline-none focus:shadow-outline-green"
    >
      <div class="flex justify-between items-center">
        <h1
          v-if="amount"
          class="uppercase text-base tracking-wide text-blue-darker my-1"
        >
          {{ idr(amount) }}
        </h1>
        <h1
          v-if="bank"
          class="uppercase text-base tracking-wide text-blue-darker my-1"
        >
          {{ bank }}
        </h1>
      </div>
    </div>
  </button>
</template>
<script>
export default {
  props: ["amount", "bank"],
  mounted() {},
  methods: {
    idr(number) {
      let result =
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0
        }).format(number) + ",-";
      return result;
    }
  }
};
</script>
