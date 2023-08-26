import { createRouter, createWebHashHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"

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
      component: () => import("../views/recipe/RecipeView.vue"),
      children: [
        {
          path: "/recipes/createrecipe",
          name: "createrecipe",
          component: () => import("../views/recipe/RecipeCreatePage.vue"),
        },
      ],
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("../views/SignIn.vue"),
    },
    {
      path: "/product",
      name: "product",
      component: () => import("../views/product/Product.vue"),
      children: [
        {
          path: "/producthome",
          name: "productHome",
          component: () => import("../views/product/ProductHome.vue"),
        },
        {
          path: "/productdetail",
          name: "productDetail",
          component: () => import("../views/product/ProductDetail.vue"),
        },
        {
          path: "/producttype",
          name: "productType",
          component: () => import("../views/product/ProductType.vue"),
        },
      ],
    },

    {
      path: "/cms",
      name: "cms",
      component: () => import("../views/CmsView.vue"),
      children: [
        {
          path: "/cms/recipe",
          name: "recipe",
          component: () => import("../views/recipe/RecipeBackground.vue"),
        },
        {
          path: "/cms/course",
          name: "course",
          component: () => import("../views/CourseBackground.vue"),
        },
        {
          path: "/cms/addCourse",
          name: "addCourse",
          component: () => import("../views/AddCourse.vue"),
        },
        {
          path: "/cms/chat",
          name: "chat",
          component: () => import("../views/ChatRoom.vue"),
        },
        {
          path: "/cms/product",
          name: "productBG",
          component: () => import("../views/product/ProductBackground.vue"),
        },
        {
          path: "/cms/addproduct",
          name: "Addproduct",
          component: () => import("../views/product/Addproduct.vue"),
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
      // children:[],//放要變化的東西
    },
    {
      path: "/classroom",
      name: "classroom",
      component: () => import("../views/classroom/Classroom.vue"),
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
    },
    {
      path: "/reservation",
      name: "reservation",
      component: () => import("../views/classroom/Reservation.vue"),
    },
  ],
})

export default router
