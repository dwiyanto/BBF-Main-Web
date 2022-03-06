<template>
  <div v-if="transaction">
    <div class="grid grid-cols-1 gap-4">
      <div>Donation Status</div>
      <div>
        <p>Project Name: {{ transaction.project.name }}</p>
        <p>Donation Payment Status: {{ transaction.status }}</p>
        <p>Nama Donatur: {{ transaction.name }}</p>
        <p>Email Donatur: {{ transaction.email || "-" }}</p>
        <p>No Telp Donatur: {{ transaction.phoneNumber || "-" }}</p>
        <p>Jumlah Donasi: {{ idr(transaction.amount) }}</p>
        <p>
          Metode Pembayaran:
          {{ transaction.selectedPaymentCategory.replace("_", " ") }} -
          {{ transaction.selectedPaymentCode.replace("ID_", "") }}
        </p>
        <template v-if="transaction.status !== 'completed'">
          <p v-if="transaction.selectedPaymentCategory === 'VIRTUAL_ACCOUNT'">
            Kode Pembayaran:
            {{ transaction.selectedPaymentDetail.account_number }}
          </p>
          <p v-if="transaction.selectedPaymentCategory === 'RETAIL_OUTLET'">
            Kode Pembayaran:
            {{ transaction.selectedPaymentDetail.payment_code }}
          </p>
          <p
            v-if="
              transaction.selectedPaymentCategory !== 'EWALLET' &&
                transaction.selectedPaymentCategory !== 'QRIS'
            "
          >
            Batas Waktu Pembayaran:
            {{
              new Date(
                transaction.selectedPaymentDetail.expiration_date
              ).toString()
            }}
          </p>
          <a
            v-if="
              (transaction.selectedPaymentCategory === 'EWALLET' ||
                transaction.selectedPaymentCategory === 'QRIS') &&
                transaction.selectedPaymentCode !== 'ID_SHOPEEPAY'
            "
            style="display: inline-block;"
            :href="
              transaction.selectedPaymentDetail.actions.desktop_web_checkout_url
            "
            target="_blank"
            class="mx-1 px-3 py-2 mt-2 bg-blue-200 hover:bg-blue-700 text-gray-700 hover:text-white rounded-lg"
          >
            Bayar Sekarang
          </a>
          <a
            v-if="
              (transaction.selectedPaymentCategory === 'EWALLET' ||
                transaction.selectedPaymentCategory === 'QRIS') &&
                transaction.selectedPaymentCode === 'ID_SHOPEEPAY'
            "
            style="display: inline-block;"
            :href="
              transaction.selectedPaymentDetail.actions
                .mobile_deeplink_checkout_url
            "
            target="_blank"
            class="mx-1 px-3 py-2 mt-2 bg-blue-200 hover:bg-blue-700 text-gray-700 hover:text-white rounded-lg"
          >
            Bayar Sekarang
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    const { id: _id } = this.$route.params;
    await this.$store.dispatch("transaction/get", _id);
  },
  computed: {
    transaction() {
      return this.$store.state.transaction.selectedData;
    }
  },
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
