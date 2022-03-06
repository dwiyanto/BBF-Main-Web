<template>
  <div v-if="project" class="">
    <div id="content-header" class="grid grid-cols-12 gap-4">
      <div id="content-image" class="col-span-12 md:col-span-4">
        <img
          class="bg-gray-300 w-full"
          src="/img/project/menanam-pohon.jpg"
          :alt="project.name"
        />
      </div>
      <div id="content-title" class="w-full col-span-12 md:col-span-8">
        <h1 class="text-3xl font-bold uppercase">{{ project.name }}</h1>
        <h2>{{ project.motto }}</h2>
        <div class="rounded shadow w-full md:w-2/3 bg-gray-200 h-6">
          <div
            class="rounded h-6 bg-green-400 text-xs leading-none text-center text-white"
            :style="{ width: project.totalPercentageReceivedFunding + '%' }"
          >
            <p class="p-1">
              {{ project.totalPercentageReceivedFunding + "%" }}
            </p>
          </div>
        </div>
        <h2>
          {{ idr(project.totalNominalReceivedFunding) }}
        </h2>
        <h2>
          {{ "Target pengumpulan dana " + idr(project.fundingTarget) }}
        </h2>
        <div class="gap-y-3 flex flex-wrap mr-2 mt-2 space-x-2">
          <donate class="flex" :project-id="project._id" />
          <social class="flex" />
        </div>
      </div>
    </div>
    <div class="mx-auto mt-4 rounded">
      <!-- Tabs -->
      <ul id="tabs" class="inline-flex px-1 pt-2 ">
        <li
          class="md:px-4 px-2 md:py-2 font-semibold text-gray-800 border-b-2 border-blue-400 rounded-t opacity-50"
        >
          <a id="default-tab" href="#story">Story</a>
        </li>
        <li
          class="md:px-4 px-2 md:py-2 font-semibold text-gray-800 rounded-t opacity-50"
        >
          <a href="#faq">FAQ</a>
        </li>
        <li
          class="md:px-4 px-2 md:py-2 font-semibold text-gray-800 rounded-t opacity-50"
        >
          <a href="#updates">Updates</a>
        </li>
        <li
          class="md:px-4 px-2 md:py-2 font-semibold text-gray-800 rounded-t opacity-50"
        >
          <a href="#contributors">Contributors</a>
        </li>
      </ul>

      <!-- Tab Contents -->
      <div id="tab-contents">
        <div
          id="story"
          class="text-justify pt-4"
          v-html="project.story.contentPlain"
        ></div>
        <div id="faq" class="hidden pt-4">
          <div>
            <faq
              v-for="faq in project.faqs"
              :key="faq._id"
              :id="faq._id"
              :title="faq.question"
              :answer="faq.answer"
            />
          </div>
        </div>
        <div id="updates" class="hidden pt-4">
          <div>
            <updates
              v-for="update in project.updates"
              :key="update._id"
              :id="update._id"
              :date="update.date"
              :title="update.title"
              :image="update.image"
              :description="update.contentPlain"
            />
          </div>
        </div>
        <div id="contributors" class="hidden pt-4">
          {{ project.contributors }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import donate from "../components/donate-new";
import social from "../components/social";
import faq from "../components/faq";
import updates from "../components/updates";
export default {
  name: "Project",
  components: {
    donate,
    social,
    faq,
    updates
  },
  data() {
    return {
      isOpen: false
    };
  },
  async created() {
    const { slug: _id } = this.$route.params;
    await this.$store.dispatch("projects/get", _id);
    this.initTab();
  },
  computed: {
    project() {
      return this.$store.state.projects.selectedData;
    }
  },
  methods: {
    initTab() {
      const tabsContainer = document.querySelector("#tabs");
      let tabTogglers = tabsContainer.querySelectorAll("a");
      tabTogglers.forEach(function(toggler) {
        toggler.addEventListener("click", function(e) {
          e.preventDefault();
          let tabName = this.getAttribute("href");
          let tabContents = document.querySelector("#tab-contents");
          for (let i = 0; i < tabContents.children.length; i++) {
            tabTogglers[i].parentElement.classList.remove(
              "border-blue-400",
              "border-b",
              "-mb-px",
              "opacity-100"
            );
            tabContents.children[i].classList.remove("hidden");
            if ("#" + tabContents.children[i].id === tabName) {
              continue;
            }
            tabContents.children[i].classList.add("hidden");
          }
          e.target.parentElement.classList.add(
            "border-blue-400",
            "border-b-4",
            "-mb-px",
            "opacity-100"
          );
        });
      });
      document.getElementById("default-tab").click();
    },
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
