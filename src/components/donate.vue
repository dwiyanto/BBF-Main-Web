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
          <selection
            :amount="10000"
            @click="this.$store.commit('updateDonationAmount', 10000)"
          />
          <selection
            :amount="20000"
            @click="this.$store.commit('updateDonationAmount', 20000)"
          />
          <selection
            :amount="50000"
            @click="this.$store.commit('updateDonationAmount', 50000)"
          />
          <selection
            :amount="100000"
            @click="this.$store.commit('updateDonationAmount', 100000)"
          />
          <input
            type="number"
            step="1000"
            min="0"
            class="w-full py-3 pl-4 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            placeholder="Nominal donasi lainnya"
            @input="
              this.$store.commit('updateDonationAmount', customDonationAmount)
            "
            v-model="customDonationAmount"
          />
        </div>
        <!-- STEP 1 -->

        <!-- STEP 2 -->
        <div v-if="step == 2" class="flex flex-col gap-y-2 overflow-y-auto">
          <selection
            bank="Gopay"
            @click="this.$store.commit('updateDonationPaymentMethod', 'gopay')"
          />
          <selection
            bank="Dana"
            @click="this.$store.commit('updateDonationPaymentMethod', 'dana')"
          />
          <selection
            bank="Shopee Pay"
            @click="
              this.$store.commit('updateDonationPaymentMethod', 'shopeepay')
            "
          />
          <selection
            bank="Link aja"
            @click="
              this.$store.commit('updateDonationPaymentMethod', 'linkaja')
            "
          />
          <selection
            bank="BRI Virtual Account"
            @click="this.$store.commit('updateDonationPaymentMethod', 'briva')"
          />
          <selection
            bank="BCA Virtual Account"
            @click="this.$store.commit('updateDonationPaymentMethod', 'bcava')"
          />
          <selection
            bank="BNI Virtual Account"
            @click="this.$store.commit('updateDonationPaymentMethod', 'bniva')"
          />
          <selection
            bank="BSI Virtual Account"
            @click="this.$store.commit('updateDonationPaymentMethod', 'bsiva')"
          />
          <selection
            bank="Mandiri Virtual Account"
            @click="
              this.$store.commit('updateDonationPaymentMethod', 'mandiriva')
            "
          />
          <selection
            bank="Transfer BRI"
            @click="this.$store.commit('updateDonationPaymentMethod', 'tfbri')"
          />
          <selection
            bank="Transfer BCA"
            @click="this.$store.commit('updateDonationPaymentMethod', 'tfbca')"
          />
          <selection
            bank="Transfer BNI"
            @click="this.$store.commit('updateDonationPaymentMethod', 'tfbni')"
          />
          <selection
            bank="Transfer Mandiri"
            @click="
              this.$store.commit('updateDonationPaymentMethod', 'tfmandiri')
            "
          />
        </div>
        <!-- STEP 2 -->

        <!-- STEP 3 -->
        <div v-if="step == 3" class="flex flex-col gap-y-2">
          <h1
            class="w-full py-3 pl-4 pr-4 text-gray-700 bg-white border border-gray-300 bg-gray-200 rounded-md"
          >
            {{ idr(this.$store.state.donationAmount) }}
          </h1>
          <h3>Lengkapi data dibawah ini</h3>
          <input
            type="text"
            class="w-full py-3 pl-4 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            placeholder="Nama Lengkap"
            @input="this.$store.commit('updateDonatorName', donatorName)"
            v-model="donatorName"
          />
          <input
            type="text"
            class="w-full py-3 pl-4 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500 focus:outline-none focus:ring"
            placeholder="No Telepon / Email"
            @input="this.$store.commit('updateDonatorInfo', donatorInfo)"
            v-model="donatorInfo"
          />
          <h3>Berdoa Di Donasi Ini</h3>
          <textarea
            class="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            rows="10"
            cols="30"
            placeholder="Type here"
            @input="this.$store.commit('updateDonatorMessage', donatorMessage)"
            v-model="donatorMessage"
          ></textarea>
        </div>
        <!-- STEP 3 -->

        <!-- STEP 4 -->
        <div v-if="step == 4" class="flex flex-col gap-y-2">
          <h1 v-if="this.$store.state.donationAmount">
            this.$store.state.donationAmount:
            {{ idr(this.$store.state.donationAmount) }}
          </h1>
          <h1 v-if="this.$store.state.donationPaymentMethod">
            this.$store.state.donationPaymentMethod:
            {{ this.$store.state.donationPaymentMethod }}
          </h1>
          <h1 v-if="this.$store.state.donatorName">
            this.$store.state.donationPaymentMethod:
            {{ this.$store.state.donatorName }}
          </h1>
          <h1 v-if="this.$store.state.donatorInfo">
            this.$store.state.donatorInfo: {{ this.$store.state.donatorInfo }}
          </h1>
          <h1 v-if="this.$store.state.donatorMessage">
            this.$store.state.donatorMessage:
            {{ this.$store.state.donatorMessage }}
          </h1>
        </div>
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
  computed() {},
  data() {
    return {
      isOpen: false,
      step: 1,
      donationAmount: "",
      donatorName: "",
      donatorInfo: "",
      donatorMessage: "",
      donationPaymentMethod: "",
      customDonationAmount: ""
    };
  },
  methods: {
    updateDonation() {
      //later
    },
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
    donatePrev() {
      this.step >= 2 ? this.step-- : null;
    },
    donateNext() {
      while (this.step == 1 && this.$store.state.donationAmount != "") {
        this.step <= 3 ? this.step++ : null;
        return null;
      }
      if (this.step == 1 && this.$store.state.donationAmount == "") {
        alert("Pilih nominal donasi");
      }

      while (this.step == 2 && this.$store.state.donationPaymentMethod != "") {
        this.step <= 3 ? this.step++ : null;
        return null;
      }
      if (this.step == 2 && this.$store.state.donationPaymentMethod == "") {
        alert("Pilih metode pembayaran donasi");
      }
      while (this.step == 3 && this.$store.state.donatorInfo != "") {
        //this.step <= 3 ? this.step++ : null; //temporary disabled, waiting for xendit implementation
        this.isOpen = false; // temporary closing in step 3
        return null;
      }
      if (this.step == 3 && this.$store.state.donatorInfo == "") {
        alert("No telepon / Email ");
      }
    }
  }
};
</script>
