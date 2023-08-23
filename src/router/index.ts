import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: '/recipes',
      name: 'RecipeHomePage',
      component: () => import('../views/RecipeView.vue')
    },
    {
      path: "/signIn",
      name: "signIn",
      component: () => import("../views/SignIn.vue"),
    },
    {
      path: "/product",
      name: "product",
      component: () => import("../views/Product.vue"),
    },
    {
      path: "/cms",
      name: "cms",
      component: () => import("../views/CmsView.vue"),
      children: [
        {
          path: '/cms/recipe',
          name: 'recipe',
          component: () => import('../views/RecipeBackground.vue')
        },
        {
<<<<<<< HEAD
          path: "/cms/courses",
          name: "courses",
          component: () => import("../views/CoursesBackground.vue"),
        },
      ],
=======
          path: '/cms/chat',
          name: 'chat',
          component: () => import('../views/ChatRoom.vue')
        },
        {
          path: '/cms/product',
          name: 'productBG',
          component: () => import('../views/ProductBackground.vue')
        },
      ]
>>>>>>> fe0374f16d25152eea7493fb0c2c50b602740f4a
    },
    {
      path: "/courses",
      name: "courses",
      component: () => import("../views/CourseHomePage.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../views/Test.vue")
    }
  ],
});

export default router;
