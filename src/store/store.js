import Vue from "vue";
import Vuex from "vuex";

import projectReportsStore from "@/store/modules/projectReports";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    projectReportsStore,
  },
});
