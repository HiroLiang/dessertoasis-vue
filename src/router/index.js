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
      path: "/logIn",
      name: "logIn",
      component: () => import("../views/member/LogIn.vue"),
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
          meta: { title: "商品首頁" },
        },
        {
          path: "/productdetail",
          name: "productDetail",
          component: () => import("../views/product/ProductDetail.vue"),
          meta: { title: "商品詳情" },
        },
        {
          path: "/producttype",
          name: "productType",
          component: () => import("../views/product/ProductType.vue"),
          meta: { title: "商品分類" },
        },
      ],
    },
    // {
    //   path: "/prod",
    //   name: "prod",
    //   component: () => import("../views/product/Product1.vue"),
    // },
    //後台管理系統
    {
      path: "/cms",
      name: "cms",
      component: () => import("../views/cms/CmsView.vue"),
      children: [
        {
          path: "",
          name: "cmsHome",
          component: () => import("../views/cms/CmsHome.vue"),
        },
        {
          path: "/cms/recipe",
          name: "cmsrecipe",
          component: () => import("../views/cms/recipe/CmsRecipeTable.vue"),
        },
        {
          path: "/cms/recipedetail",
          name: "cmsrecipeDetail",
          component: () => import("../views/cms/recipe/CmsRecipeDetail.vue"),
        },
        {
          path: "/cms/course",
          name: "cmscourse",
          component: () => import("../views/cms/course/CourseBackground.vue"),
        },
        {
          path: "/cms/editCourse",
          name: "cmsEditCourse",
          component: () => import("../views/cms/course/EditCourse.vue"),
        },
        // {
        //   path: "/courses/:id",
        //   name: "courseDetail",
        //   component: () => import("../views/course/CourseDetail.vue"), // 课程详情页面组件
        //   props: true, // 将路由参数传递为组件的 props
        // },
        // {
        //   path: "/course/:courseId",
        //   name: "courseDetail",
        //   component: CourseDetail,
        // },
        {
          path: "/cms/addCourse",
          name: "cmsaddCourse",
          component: () => import("../views/course/AddCourse.vue"),
        },

        //等待移動
        {
          path: "/cms/teacherCourseManager",
          name: "trCourseManger",
          component: () => import("../views/course/TeacherCourseManager.vue"),
        },
        //

        {
          path: "/cms/addTeacherProfile",
          name: "cmsaddTeacherProfile",
          component: () => import("../views/course/AddTeacherProfile.vue"),
        },

        //等待移動
        {
          path: "/cms/editTeacherProfile",
          name: "addteacherProfile",
          component: () => import("../views/course/EditTeacherProfile.vue"),
        },
        //

        {
          path: "/cms/managerAllTeacher",
          name: "managerAllTeacher",
          component: () => import("../views/course/ManagerAllTeacher.vue"),
        },
        {
          path: "/cms/chat",
          name: "chat",
          component: () => import("../components/Standard/ChatRoom.vue"),
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
          path: "/cms/editproduct",
          name: "Editproduct",
          component: () => import("../views/product/Editproduct.vue"),
        },
        {
          path: "/cms/prevproduct",
          name: "Prevproduct",
          component: () => import("../views/product/Prevproduct.vue"),
        },
        {
          path: "/cms/member",
          name: "member",
          component: () => import("../views/member/MemberBackground.vue"),
        },
        {
          path: "/cms/order",
          name: "CmsOrderTable",
          component: () => import("../views/cms/order/CmsOrderTable.vue"),
        },
        {
          path: "/cms/orderdetail",
          name: "CmsOrderDetail",
          component: () => import("../views/cms/order/CmsOrderDetail.vue"),
        }
      ],
    },
    {
      path: "/courses",
      name: "CourseHomePage",
      component: () => import("../views/course/CourseView.vue"),
      children: [
        {
          //首頁PATH設為空  即可進入則導入首頁頁面
          path: "",
          name: "CourseHp",
          component: () => import("../views/course/CourseHp.vue"),
        },
        {
          path: "/courses/aboutTeacher",
          name: "aboutTeacher",
          component: () => import("../views/course/AboutTeacher.vue"),
        },
        {
          path: "/courses/oneTeacher",
          name: "oneTeacher",
          component: () => import("../views/course/OneTeacher.vue"),
        },
        {
          path: "/courses/enrollCourse",
          name: "enrollCourse",
          component: () => import("../views/course/EnrollCourse.vue"),
        },
        // {
        //   path: "/courses/myCourses",
        //   name: "myCourses",
        //   component: () => import("../views/course/MyCourses.vue"),
        // },
      ],
      // children:[{}],//{}放要變化的東西
    },
    {
      path: "/teacher",
      name: "TeacherHomePage",
      component: () => import("../views/teacher/TeacherView.vue"),
      children: [
        {
          //首頁PATH設為空  即可進入則導入首頁頁面
          path: "",
          name: "teacherHp",
          component: () => import("../views/teacher/TeacherHp.vue"),
        },
        {
          path: "/teacher/myCourses",
          name: "myCourses",
          component: () => import("../views/teacher/MyCourses.vue"),
        },
        {
          path: "/teacher/editCourse",
          name: "editCourse",
          component: () => import("../views/teacher/EditCourse.vue"),
        },
        {
          path: "/teacher/editProfile",
          name: "editProfile",
          component: () => import("../views/teacher/EditProfile.vue"),
        },
      ],
      // children:[{}],//{}放要變化的東西
    },
    {
      path: "/becomeTeacher",
      name: "becomeTeacher",
      component: () => import("../views/teacher/BecomeTeacher.vue"),
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
          path: "/mem/bankaccount",
          name: "bankaccount",
          component: () => import("../views/member/BankAccount.vue"),
        },
        {
          path: "/mem/memberpic",
          name: "memberpic",
          component: () => import("../views/member/MemberPic.vue"),
        },

      ],
    },

    // Cart 購物車
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/cart/CartView.vue"),
      children: [
        {
          path: "",
          name: "cart",
          component: () => import("../views/cart/Cart.vue"),
        },
        {
          path: "/cart/pay",
          name: "pay",
          component: () => import("../views/cart/Pay.vue"),
        },
        {
          path: "/cart/pay_success",
          name: "paySuccess",
          component: () => import("../views/cart/PaySuccess.vue"),
        },
      ],
    },

    // 我的訂單
    {
      path: "/order",
      name: "order",
      component: () => import("../views/order/MyOrder.vue"),
    },

    {
      path: "/demo",
      name: "demo",
      component: () => import("../views/Demo.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../views/classroom/PersonalCalendar.vue"),
    },
  ],
})

export default router
