import _ from "lodash";

import {
  runDeadCodeReport
} from "@/services/styx-api";


const DEAD_CODE_REPORT_INITIAL_STATE = {
  form: {
    projectPath: "",
    packageJson: "",
    projectOptions: "",
  },
  report: undefined,
};

const TRANSLATIONS_REPORT_INITIAL_STATE = {
  projectPath: "",
  packageJson: "",
  projectOptions: "",
  report: undefined,
};

const INITIAL_STATE = {
  deadCodeReport: DEAD_CODE_REPORT_INITIAL_STATE,
  translationsReport: TRANSLATIONS_REPORT_INITIAL_STATE,
};

export default {
  namespaced: true,
  state: INITIAL_STATE,
  getters: {
    existsDeadCodeReport(state) {
      return !_.isEmpty(state.deadCodeReport.report);
    },
    existsTranslationsCodeReport(state) {
      return !_.isEmpty(state.translationsReport.report);
    },
    deadCodeReport(state) {
      return _.get(state, 'deadCodeReport');
    },
    deadCodeReportForm(state) {
      return _.get(state, 'deadCodeReport.form');
    }
  },
  mutations: {
    UPDATE_PACKAGE_JSON(state, packageJson) {
      state.deadCodeReport.packageJson = packageJson;
    },
    UPDATE_PROJECT_OPTIONS(state, projectOptions) {
      state.deadCodeReport.projectOptions = projectOptions;
    },
    UPDATE_DEAD_CODE_REPORT_PARAMS(state, form) {
      state.deadCodeReport = {
        ...form
      };
    },
    UPDATE_DEAD_CODE_REPORT_DATA(state, report) {
      state.deadCodeReport = {
        ...state.deadCodeReport,
        report
      };
    },
    RESET_DEAD_CODE_REPORT_DATA(state) {
      state.deadCodeReport = {
        ...state.deadCodeReport,
        report: undefined
      };
    },
  },
  actions: {
    async generateDeadCodeReport(context) {
      const deadReportPayload = _.get(context, 'state.deadCodeReport.form');
      const {
        data
      } = await runDeadCodeReport(deadReportPayload);
      context.commit("UPDATE_DEAD_CODE_REPORT_DATA", data);
    },
  },
};