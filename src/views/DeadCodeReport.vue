<template>
  <div class="DeadCodeReport">
    <div v-if="existsDeadCodeReport">
      <v-card class="mx-auto mb-8" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">
              <v-icon class="pr-4">mdi-skull-crossbones</v-icon>DEAD CODE REPORT
            </div>

            <v-list-item-subtitle>
              <v-icon class="pr-4">mdi-folder</v-icon>
              <strong>Project path:</strong>
              {{ deadCodeReportForm.projectPath }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn color="success" :loading="isLoading" class="ml-2" @click="runReport">
            <v-icon>mdi-refresh</v-icon>Re-run
          </v-btn>
          <v-btn color="red" class="ml-2" @click="resetDeadCodeReportData">
            <v-icon>mdi-broom</v-icon>New Report
          </v-btn>
        </v-card-actions>
      </v-card>
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
              <v-icon class="mx-4" large>{{ section.icon }}</v-icon>
              <strong>{{ section.name }}</strong>
              <v-tooltip v-if="section.tooltipInfo" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" class="px-2">mdi-help-circle-outline</v-icon>
                </template>
                <span>{{ section.tooltipInfo }}</span>
              </v-tooltip>

              <v-chip class="ma-2" :color="section.color">
                {{
                get(deadCodeReport, `report.stats.${section.statsKey}`)
                }}
              </v-chip>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-if="section.component">
              <component
                :is="section.component"
                :title="section.name"
                :reportRecords="deadCodeReport.report[section.key]"
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
import { get, startCase, size } from "lodash";
import { mapGetters, mapMutations, mapActions } from "vuex";

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
      "deadCodeReport",
      "deadCodeReportForm",
    ]),

    skeletonItemsVisible() {
      return this.isLoading ? size(this.tableSections) : [];
    },
  },
  methods: {
    get,
    ...mapMutations("projectReportsStore", {
      resetDeadCodeReportData: "RESET_DEAD_CODE_REPORT_DATA",
    }),
    ...mapActions("projectReportsStore", ["generateDeadCodeReport"]),
    async runReport() {
      this.isLoading = true;
      await this.generateDeadCodeReport();
      this.isLoading = false;
    },
  },
};
</script>
