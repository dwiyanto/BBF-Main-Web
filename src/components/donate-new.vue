<template>
  <div>
    <button
      @click="open()"
      type="button"
      class="inline-block focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg font-bold whitespace-nowrap"
    >
      Donasi sekarang
    </button>
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-gray-800 opacity-75"
      style="z-index: 1"
      @click="close()"
      href="javascript:void(0)"
    />
    <div
      v-if="isOpen"
      class="absolute inset-x-0 flex flex-col justify-center h-1/2 md:w-full md:h-full max-w-screen-lg md:p-20 m-auto"
      style="z-index: 1"
    >
      <div
        class="flex flex-col max-w-screen-lg p-4 space-y-3 bg-white rounded-md m-auto max-h-screen=lg"
        style="z-index: 2"
      >
        <!-- SET STEP TITLE HERE, SO IT IN A ROW WITH CLOSE BUTTON -->
        <div class="justify-between grid grid-cols-4">
          <h1 class="col-span-3">
            {{
              step == 1
                ? "Pilih nominal donasi"
                : step == 2
                ? "Pilih metode"
                : step == 3
                ? "Isi nominal donasi"
                : step == 4
                ? "Send to Xendit"
                : null
            }}
          </h1>
          <button class="col-span-1 text-right pr-2 font-bold" @click="close()">
            X
          </button>
        </div>
        <!-- SET STEP TITLE HERE, SO IT IN A ROW WITH CLOSE BUTTON -->

        <!-- STEP 1 -->
        <div v-if="step == 1" class="flex flex-col gap-y-2">
          <selection :amount="10000" @click="updateAmount(10000)" />
          <selection :amount="20000" @click="updateAmount(20000)" />
          <selection :amount="50000" @click="updateAmount(50000)" />
          <selection :amount="100000" @click="updateAmount(100000)" />
          <input
            type="number"
            step="1000"
            min="10000"
            class="w-full py-3 pl-4 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            placeholder="Nominal donasi lainnya"
            v-model.number="transaction.customAmount"
          />
        </div>
        <!-- STEP 1 -->

        <!-- STEP 2 -->
        <div v-if="step == 2" class="flex flex-col gap-y-2 overflow-y-auto">
          <template
            v-for="paymentChannel in paymentChannels"
            :key="paymentChannel.channelCategory"
          >
            <h4 style="margin-top: 10px; font-weight: bold;">
              {{ paymentChannel.channelCategory.replace("_", " ") }}
            </h4>
            <selection
              v-for="channel in paymentChannel.channelPayments"
              :key="channel.channel_code"
              :bank="channel.channel_code.replace('ID_', '')"
              @click="
                updatePaymentChannel(
                  channel.channel_category,
                  channel.channel_code
                )
              "
            />
          </template>
        </div>
        <!-- STEP 2 -->

        <!-- STEP 3 -->
        <div v-if="step == 3" class="flex flex-col gap-y-2">
          <h1
            class="w-full py-3 pl-4 pr-4 text-gray-700 bg-white border border-gray-300 bg-gray-200 rounded-md"
          >
            {{ idr(this.transaction.amount) }}
          </h1>
          <h3>Lengkapi data dibawah ini</h3>
          <input
            type="text"
            class="w-full py-3 pl-4 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            placeholder="Nama Lengkap"
            v-model="transaction.name"
          />
          <input
            type="text"
            class="w-full py-3 pl-4 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500 focus:outline-none focus:ring"
            placeholder="No Telepon"
            v-model="transaction.phoneNumber"
          />
          <input
            type="text"
            class="w-full py-3 pl-4 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500 focus:outline-none focus:ring"
            placeholder="Email"
            v-model="transaction.email"
          />
          <h3>Berdoa Di Donasi Ini</h3>
          <textarea
            class="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            rows="10"
            cols="30"
            placeholder="Type here"
          ></textarea>
        </div>
        <!-- STEP 3 -->

        <!-- STEP 4 -->
        <div class="grid grid-cols-2 gap-x-2">
          <div
            @click="donatePrev"
            class="flex w-full bg-white shadow rounded-lg py-4"
          >
            <p
              class="m-auto inset-0 text-xl font-semibold leading-7 text-center text-gray-800"
            >
              Sebelumnya
            </p>
          </div>
          <div
            @click="donateNext"
            class="flex w-full bg-blue-600 shadow rounded-lg py-4 px-16"
          >
            <p
              class="m-auto inset-0 text-xl font-semibold leading-7 text-center text-white"
            >
              Lanjut
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import selection from "../components/selection.vue";
/* XENDIT STUFF
import Xendit from "xendit-node";
const x = new Xendit({
  secretKey: 'xnd_development_dHAurgMjhllgKiLWGZEpBdrBozaVzZbPvWVT21dvjxBnnQ43sFxal4toDjCUg',
});
const { Card } = x;
const cardSpecificOptions = {};
const card = new Card(cardSpecificOptions);
XENDIT STUFF */
export default {
  components: {
    selection
  },
  props: {
    projectId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isBusy: false,
      isOpen: false,
      step: 1,
      paymentChannels: [],
      transaction: {
        projectId: this.projectId,
        email: "",
        name: "",
        phoneNumber: "",
        organization: "",
        amount: 0,
        customAmount: "",
        selectedPaymentCategory: "",
        selectedPaymentCode: ""
      }
    };
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
    },
    open() {
      this.isOpen = true;
      this.step = 1;
    },
    close() {
      this.isOpen = false;
    },
    async getPaymentChannels() {
      this.isBusy = true;
      await axios
        .get(`${process.env.VUE_APP_API_URL}/payment-channels`)
        .then(response => {
          if (response && response.data) {
            this.paymentChannels = response.data.filter(item => {
              return item.channelCategory !== "CREDIT_CARD";
            });
          }
        });

      this.isBusy = false;
    },
    updateAmount(amount) {
      this.transaction.amount = amount;
      this.transaction.customAmount = "";
    },
    updatePaymentChannel(paymentCategory, paymentCode) {
      this.transaction.selectedPaymentCategory = paymentCategory;
      this.transaction.selectedPaymentCode = paymentCode;
    },
    donatePrev() {
      this.step >= 2 ? this.step-- : null;
    },
    async donateNext() {
      if (this.isBusy) {
        return false;
      }

      const transactionData = this.transaction;

      switch (this.step) {
        case 1:
          this.transaction.amount = this.transaction.customAmount
            ? this.transaction.customAmount
            : this.transaction.amount;

          if (this.step === 1 && this.transaction.amount < 10000) {
            alert("Nominal donasi minimal Rp10.000");
          } else {
            await this.getPaymentChannels();
            this.step = 2;
          }
          break;

        case 2:
          if (this.step === 2 && !this.transaction.selectedPaymentCategory) {
            alert("Pilih metode pembayaran donasi");
          } else {
            this.step = 3;
          }
          break;

        default:
          delete transactionData.customAmount;
          this.isBusy = true;
          await axios
            .post(`${process.env.VUE_APP_API_URL}/transaction`, transactionData)
            .then(response => {
              if (response && response.data) {
                this.$router.push(`/donation-status/${response.data._id}`);
              }
            });

          this.isBusy = false;
          break;
      }
    }
  }
};
</script>
