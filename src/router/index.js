import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("../layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "BBF",
        component: () => import("../views/Home.vue")
      },

      {
        path: "/donation",
        name: "donation",
        meta: {
          title: "Bumi Bhakti Foundation",
          metaTags: [
            {
              name: "description",
              content:
                "Sarana berbagi kepada masyarakat Indonesia hingga berskala global."
            },
            {
              property: "og:description",
              content:
                "Sarana berbagi kepada masyarakat Indonesia hingga berskala global."
            }
          ]
        },
        component: () => import("../views/Donation.vue")
      },

      {
        path: "/project/:slug",
        name: "project",
        meta: {
          title: "Project",
          metaTags: [
            {
              name: "description",
              content: ":desc"
            },
            {
              property: "og:description",
              content: ":desc"
            }
          ]
        },
        component: () => import("../views/ProjectDetail.vue")
      },

      {
        path: "/about",
        name: "about",
        meta: {
          title: "Tentang Bumi Bhakti Foundation",
          metaTags: [
            {
              name: "description",
              content:
                "yayasan yang bergerak dalam bidang sosial dan pendidikan"
            },
            {
              property: "og:description",
              content:
                "yayasan yang bergerak dalam bidang sosial dan pendidikan"
            }
          ]
        },
        component: () => import("../views/About.vue")
      },

      {
        path: "/Mitra",
        name: "mitra",
        meta: {
          title: "Mitra Bumi Bhakti Foundation",
          metaTags: [
            {
              name: "description",
              content:
                "Sarana berbagi kepada masyarakat Indonesia hingga berskala global."
            },
            {
              property: "og:description",
              content:
                "Sarana berbagi kepada masyarakat Indonesia hingga berskala global."
            }
          ]
        },
        component: () => import("../views/Mitra.vue")
      },

      {
        path: "/donation-status/:id",
        name: "donation-status",
        meta: {
          title: "Mitra Bumi Bhakti Foundation",
          metaTags: [
            {
              name: "description",
              content:
                "Sarana berbagi kepada masyarakat Indonesia hingga berskala global."
            },
            {
              property: "og:description",
              content:
                "Sarana berbagi kepada masyarakat Indonesia hingga berskala global."
            }
          ]
        },
        component: () => import("../views/DonationStatus.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

//
// CUSTOM NAVIGATION GUARD, UNLESS YOU KNOW WHAT YOURE DOING, DONT EDIT
//
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map(tagDef => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));

  next();
});
//
// CUSTOM NAVIGATION GUARD, UNLESS YOU KNOW WHAT YOURE DOING, DONT EDIT
//

export default router;
