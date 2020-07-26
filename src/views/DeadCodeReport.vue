<template>
  <div class="DeadCodeReport">
    <div v-if="existsDeadCodeReport">
      <HeaderSummary :isLoading="isLoading" @toggle-loading="toggleLoading" />
      <v-skeleton-loader
        v-for="(index) in skeletonItemsVisible"
        :key="index"
        min-width="1161"
        min-height="80"
        type="list-item-two-line"
        :loading="isLoading"
      ></v-skeleton-loader>
      <v-expansion-panels v-if="!isLoading">
        <v-expansion-panel v-for="section in tableSections" :key="`section-${section.key}`">
          <v-expansion-panel-header>
            <div class="justify-start">
              <v-tooltip v-if="section.tooltipInfo" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" class="mx-4" large>{{ section.icon }}</v-icon>
                </template>
                <span>{{ section.tooltipInfo }}</span>
              </v-tooltip>
              <strong>{{ section.name }}</strong>

              <v-chip class="ma-2" :color="section.color">
                {{
                get(deadCodeReportData, `stats.${section.statsKey}`)
                }}
              </v-chip>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-if="section.component">
              <component
                :is="section.component"
                :title="section.name"
                :reportRecords="deadCodeReportData[section.key]"
              />
            </div>
            <div v-else>Section not implemented</div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <ReportForm v-else />
  </div>
</template>

<script>
import { get, startCase, size, isBoolean } from "lodash";
import { mapGetters } from "vuex";

import HeaderSummary from "@/components/DeadCodeReport/HeaderSummary";
import ReportForm from "@/components/DeadCodeReport/ReportForm";
import ReportDataTable from "@/components/DeadCodeReport/ReportDataTable";
import ReportErrorTable from "@/components/DeadCodeReport/ReportErrorTable";
import ReportIsolatesTable from "@/components/DeadCodeReport/ReportIsolatesTable";

export default {
  name: "DeadCodeReport",
  components: {
    ReportDataTable,
    ReportErrorTable,
    ReportIsolatesTable,
    ReportForm,
    HeaderSummary,
  },
  data() {
    return {
      isLoading: false,
      tableSections: [
        {
          name: startCase("errors"),
          key: "errors",
          statsKey: "errors",
          color: "red",
          icon: "mdi-alert",
          component: ReportErrorTable,
          tooltipInfo:
            "Errors ocurring when scanning the imports from in a file. Mainly issues trying resolving the import path",
        },
        {
          name: startCase("isolates"),
          key: "isolates",
          statsKey: "isolates",
          color: "warning",
          icon: "mdi-grain",
          component: ReportIsolatesTable,
          tooltipInfo: "Files which has not being imported for any other file.",
        },
        {
          name: startCase("report"),
          key: "dataReport",
          statsKey: "scanned_files",
          color: "primary",
          icon: "mdi-transit-connection",
          component: ReportDataTable,
          tooltipInfo: "All files has been scanned on the project path.",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("projectReportsStore", [
      "existsDeadCodeReport",
      "deadCodeReportData",
    ]),

    skeletonItemsVisible() {
      return this.isLoading ? size(this.tableSections) : [];
    },
  },
  methods: {
    get,
    toggleLoading(isLoading) {
      this.isLoading = isBoolean(isLoading) ? isLoading : !this.isLoading;
    },
  },
};
</script>
