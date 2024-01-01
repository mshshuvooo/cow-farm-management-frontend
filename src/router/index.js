import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth.store";
import UnauthorizedView from "../views/auth/UnauthorizedView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/auth/LoginView.vue";
import CowsView from "../views/cow/CowsView.vue";
import AddNewCowView from "../views/cow/AddNewCowView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: UnauthorizedView,
    },

    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/cows",
      name: "cowList",
      component: CowsView,
      meta: {
        required_role: "admin",
      },
    },
    {
      path: "/cows/add-new",
      name: "addNewCow",
      component: AddNewCowView,
      meta: {
        required_role: "admin",
      },
    },

    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

router.beforeEach(async (to) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (auth.user == null) {
    await auth.getLoggedInUser();
  }

  if (authRequired && !auth.user) {
    return "/login";
  }

  if (auth.user && to.meta?.required_role) {
    const userRoles = auth?.user?.roles;
    if (!userRoles.includes(to.meta?.required_role)) {
      return "/unauthorized";
    }
  }

  if (to.path == "/login" && auth.user) return "/";
});

export default router;
