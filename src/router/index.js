import {
  createRouter,
  createWebHashHistory
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
      component: () => import("../views/member/SignIn.vue"),
    },
    {
      path: "/product",
      name: "product",
      component: () => import("../views/product/Product.vue"),
    },
    {
      path: "/cms",
      name: "cms",
      component: () => import("../views/CmsView.vue"),
      children: [
        {

          path: '/cms/recipe',
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
          component: () => import("../views/product/ProductBackground.vue"),
        },
        {
          path: "/cms/member",
          name: "member",
          component: () => import("../views/member/MemberBackground.vue"),
        },
        {
          path: "/cms/table",
          name: "table",
          component: () => import("../components/Standard/Table.vue")
        }
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
      component: () => import("../views/member/Register.vue"),
    },
    {
      path: "/mem",
      name: "mem",
      component: () => import("../views/member/MemberView.vue"),
      children: [
        {
          path: "",
          name: "profile",
          component: () => import("../views/member/MemberProfile.vue"),
        },
        {
          path: "/mem/changepassword",
          name: "changepassword",
          component: () => import("../views/member/ChangePassword.vue"),
        },
        {
          path: "/mem/creditcard",
          name: "creditcard",
          component: () => import("../views/member/CreditCard.vue"),
        },
        {
          path: "/mem/bankaccount",
          name: "bankaccount",
          component: () => import("../views/member/BankAccount.vue"),
        },
        {
          path: "/mem/vompanyprofile",
          name: "vompanyprofile",
          component: () => import("../views/member/CompanyProfile.vue"),
        },
      ],
    }

  ],
});

export default router;
