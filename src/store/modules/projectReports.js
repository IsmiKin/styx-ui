import _ from "lodash";

import {
    runDeadCodeReport
} from "@/services/styx-api";


const DEAD_CODE_REPORT_INITIAL_STATE = {
    packageJson: "",
    projectOptions: "",
    dataReport: undefined,
};

const TRANSLATIONS_REPORT_INITIAL_STATE = {
    packageJson: "",
    projectOptions: "",
    dataReport: undefined,
};

const INITIAL_STATE = {
    projectPath: "",
    deadCodeReport: DEAD_CODE_REPORT_INITIAL_STATE,
    translationsReport: TRANSLATIONS_REPORT_INITIAL_STATE,
};

export default {
    namespaced: true,
    state: INITIAL_STATE,
    getters: {
        existsDeadCodeReport(state) {
            return !_.isEmpty(state.deadCodeReport.dataReport);
        },
        existsTranslationsCodeReport(state) {
            return !_.isEmpty(state.translationsReport.dataReport);
        },
        deadCodeReport(state) {
            return _.get(state, 'deadCodeReport');
        },
        projectPath(state) {
            return state.projectPath;
        },
    },
    mutations: {
        UPDATE_PROJECT_PATH(state, projectPath) {
            state.projectPath = projectPath;
        },
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
        UPDATE_DEAD_CODE_REPORT_DATA(state, dataReport) {
            state.deadCodeReport = {
                ...dataReport
            };
        },
    },
    actions: {
        async generateDeadCodeReport(context, deadCodeReportForm) {
            const {
                data
            } = await runDeadCodeReport(deadCodeReportForm);
            context.commit(
                "UPDATE_DEAD_CODE_REPORT_PARAMS",
                _.pick(deadCodeReportForm, [
                    "packageJson",
                    "projectOptions",
                ])
            );
            context.commit("UPDATE_PROJECT_PATH", deadCodeReportForm.projectPath);
            context.commit("UPDATE_DEAD_CODE_REPORT_DATA", data);
        },
    },
};