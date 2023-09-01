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
          //首頁PATH設為空  即可進入則導入首頁頁面
          path: "",
          name: "recipeHp",
          component: () => import("../views/recipe/RecipeHp.vue"),
        },
        {
          path: "/recipes/ToSomerecipe",
          name: "tosomerecipe",
          component: () => import("../views/recipe/ToSomeRecipePage.vue"),
        },
        {
          path: "/recipes/createrecipe",
          name: "createrecipe",
          component: () => import("../views/recipe/RecipeCreatePage.vue"),
        },
        {
          path: "/recipes/recipe",
          name: "onerecipe",
          component: () => import("../views/recipe/OneRecipePage.vue"),
        },

      ],
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("../views/member/Signin.vue"),
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
          meta: { title: "商品首頁" }
        },
        {
          path: "/productdetail",
          name: "productDetail",
          component: () => import("../views/product/ProductDetail.vue"),
          meta: { title: "商品詳情" }
        },
        {
          path: "/producttype",
          name: "productType",
          component: () => import("../views/product/ProductType.vue"),
          meta: { title: "商品分類" }
        },
      ],
    },

    {
      path: "/cms",
      name: "cms",
      component: () => import("../views/cms/CmsView.vue"),
      children: [
        {
          path: "/cms/recipe",
          name: "recipe",
          component: () => import("../views/recipe/RecipeBackground.vue"),
        },
        {
          path: "/cms/course",
          name: "course",
          component: () => import("../views/course/CourseBackground.vue"),
        },
        {
          path: "/cms/addCourse",
          name: "addCourse",
          component: () => import("../views/course/AddCourse.vue"),
        },
        {
          path: "/cms/teacherCourseManager",
          name: "trCourseManger",
          component: () => import("../views/course/TeacherCourseManager.vue"),
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
          component: () => import("../views/member/MemberBackground.vue"),
        },
      ],
    },
    {
      path: "/courses",
      name: "courses",
      component: () => import("../views/course/CourseHomePage.vue"),
      children: [
        {
          path: "/courses/aboutTeacher",
          name: "aboutTeacher",
          component: () => import("../views/course/AboutTeacher.vue"),
        },
        {
          path: "/courses/enrollCourse",
          name: "enrollCourse",
          component: () => import("../views/course/EnrollCourse.vue"),
        },
      ],
      // children:[{}],//{}放要變化的東西
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/member/Register.vue"),
    },
    {
      path: "/forgetPassword",
      name: "forgetPassword",
      component: () => import("../views/member/ForgetPassword.vue"),
    },
    {
      path: "/sendEmail",
      name: "sendEmail",
      component: () => import("../views/member/SendEmail.vue"),
    },
    {
      path: "/activationTest",
      name: "activationTest",
      component: () => import("../views/member/activationTest.vue"),
    },
    {
      path: "/reservation",
      name: "reservation",
      component: () => import("../views/classroom/Reservation.vue"),
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
    },
  ],
})

export default router
