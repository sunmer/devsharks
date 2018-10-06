import Vue from "vue";
import Router from "vue-router";
import Index from "./components/Index.vue";
import TalentLogin from "./components/talent/Login.vue";
import TalentSignUp from "./components/talent/SignUp.vue";
import TalentCreateProfile from "./components/talent/CreateProfile.vue";
import TalentCreateProfileSuccess from "./components/talent/CreateProfileSuccess.vue";
import Talent from "./components/talent/Talent.vue";
import OrganizationLogin from "./components/organization/Login.vue";
import OrganizationSignUp from "./components/organization/SignUp.vue";
import Organization from "./components/organization/Organization.vue";
import OrganizationCreateProfile from "./components/organization/CreateProfile.vue";
import AssignmentCreate from "./components/assignment/Create.vue";
import AssignmentSuccess from "./components/assignment/CreateSuccess.vue";
import Logout from "./components/Logout.vue";
import store from "./stores/store"; 

Vue.use(Router);

let router = new Router({
  mode: "history",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    { 
      path: "/index",
      name: "index",
      component: Index
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    },
    { 
      path: "/talent/login",
      name: "talent-login",
      component: TalentLogin
    },
    { 
      path: "/talent/sign-up",
      name: "talent-sign-up",
      component: TalentSignUp
    },
    { 
      path: "/talent/create-profile",
      name: "talent-create-profile",
      component: TalentCreateProfile,
      meta: { requiresAuth: true }
    },
    { 
      path: "/talent/create-profile-success",
      name: "talent-create-profile-success",
      component: TalentCreateProfileSuccess
    },
    {
      path: "/talent",
      name: "talent",
      component: Talent,
      meta: { requiresAuth: true, requiresTalent: true }
    },
    {
      path: "/organization/login",
      name: "organization-login",
      component: OrganizationLogin
    },
    {
      path: "/organization/sign-up",
      name: "organization-sign-up",
      component: OrganizationSignUp
    },
    {
      path: "/organization",
      name: "organization",
      component: Organization,
      meta: { requiresAuth: true }
    },
    {
      path: "/organization/create-profile",
      name: "organization-create-profile",
      component: OrganizationCreateProfile,
      meta: { requiresAuth: true }
    },
    {
      path: "/assignment/create",
      name: "assignment-create",
      component: AssignmentCreate,
      meta: { requiresAuth: true, requiresOrganization: true }
    },
    {
      path: "/assignment/success",
      name: "assignment-success",
      component: AssignmentSuccess
    },
    { 
      path: "*",
      name: "not-found",
      component: Index 
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !hasUser()) {
    next({ path: "/login", query: { redirect: to.fullPath }});
  } else if (to.matched.some(record => record.meta.requiresTalent) && !hasTalent()) {
    next({ path: "/talent/create-profile", query: { redirect: to.fullPath }});
  } else if (to.matched.some(record => record.meta.requiresOrganization) && !hasOrganization()) {
    next({ path: "/organization/create-profile", query: { redirect: to.fullPath }});
  } else {
    next();
  }
});

let hasUser = () => store.getters["userStore/get"] !== undefined;
let hasTalent = () => store.getters["talentStore/getTalent"] !== undefined;
let hasOrganization = () => store.getters["organizationStore/getOrganization"] !== undefined;

export default router;