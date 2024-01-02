import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";

import "./assets/main.css";

import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faCow,
  faHouseChimney,
  faXmark,
  faMagnifyingGlass,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleUser,
  faUser,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";

/* add icons to the library */
library.add(
  faBars,
  faCow,
  faHouseChimney,
  faCircleUser,
  faShareFromSquare,
  faUser,
  faXmark,
  faMagnifyingGlass,
  faChevronLeft,
  faChevronRight,
);

const app = createApp(App);
const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(router);
app.use(pinia);
app.mount("#app");
