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
      //首頁
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/recipes",
      name: "RecipeHomePage",
      component: () => import("../views/RecipeView.vue"),
      children: [
        {
          path: "/recipes/createrecipe",
          name: "createrecipe",
          component: () => import("../views/RecipeCreatePage.vue")
        },
      ]
    },
    {
      path: "/signin",
      name: "signin",
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
          path: "/cms/recipe",
          name: "recipe",
          component: () => import("../views/RecipeBackground.vue"),
        },
        {
          path: "/cms/course",
          name: "course",
          component: () => import("../views/CourseBackground.vue"),
        },
        {
          path: "/cms/chat",
          name: "chat",
          component: () => import("../views/ChatRoom.vue"),
        },
        {
          path: "/cms/product",
          name: "productBG",
          component: () => import("../views/ProductBackground.vue"),
        },
        {
          path: "/cms/member",
          name: "member",
          component: () => import("../views/MemberBackground.vue"),
        },
      ],
    },
    {
      path: "/courses",
      name: "courses",
      component: () => import("../views/CourseHomePage.vue"),
    },
    {
      path: "/classroom",
      name: "classroom",
      component: () => import("../views/Classroom.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/memberprofile",
      name: "memberprofile",
      component: () => import("../views/MemberProfile.vue"),
      children: [
        {
          path: "/memberprofile/changepassword",
          name: "changepassword",
          component: () => import("../views/ChangePassword.vue"),
        },
      ],
    },
    {
      path: "/mem",
      name: "mem",
      component: () => import("../views/MemberView.vue"),
      children: [
        {
          path: "",
          name: "profile",
          component: () => import("../views/MemberProfile.vue"),
        },
      ],
    }
  ],
});

export default router;
