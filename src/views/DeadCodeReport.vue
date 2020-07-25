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
              {{ deadCodeReport.projectPath }}
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
      <v-expansion-panels>
        <v-expansion-panel v-for="section in tableSections" :key="`section-${section.key}`">
          <v-expansion-panel-header>
            <div class="justify-start">
              <v-icon class="mx-4" large>{{ section.icon }}</v-icon>
              <strong>{{ section.name }}</strong>
              <v-chip
                class="ma-2"
                :color="section.color"
              >{{ deadCodeReport.report.stats[section.statsKey] }}</v-chip>
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
    <div v-else>
      <section class="mb-8">
        <h1>Run Report</h1>
        <div class="subtitle-1">Fill the types of reports you want to run</div>
      </section>
      <v-divider></v-divider>
      <section>
        <v-form ref="dead-code-report-form">
          <v-text-field v-model="deadCodeReport.projectPath" label="Project Path" required />
          <v-text-field v-model="deadCodeReport.packageJson" label="Package json" required />
          <v-text-field v-model="deadCodeReport.projectOptions" label="Project Options" required />
          <v-btn color="success" :loading="isLoading" class="mr-4" @click="runReport">
            <v-icon>mdi-play</v-icon>Run
          </v-btn>
        </v-form>
      </section>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters, mapActions, mapMutations } from "vuex";

import ReportDataTable from "@/components/DeadCodeReport/ReportDataTable";
import ReportErrorTable from "@/components/DeadCodeReport/ReportErrorTable";
import ReportIsolatesTable from "@/components/DeadCodeReport/ReportIsolatesTable";

export default {
  name: "DeadCodeReport",
  components: { ReportDataTable, ReportErrorTable, ReportIsolatesTable },
  data() {
    return {
      isLoading: false,
      tableSections: [
        {
          name: _.startCase("errors"),
          key: "errors",
          statsKey: "errors",
          color: "red",
          icon: "mdi-alert",
          component: ReportErrorTable,
        },
        {
          name: _.startCase("isolates"),
          key: "isolates",
          statsKey: "isolates",
          color: "warning",
          icon: "mdi-grain",
          component: ReportIsolatesTable,
        },
        {
          name: _.startCase("report"),
          key: "dataReport",
          statsKey: "scanned_files",
          color: "primary",
          icon: "mdi-transit-connection",
          component: ReportDataTable,
        },
      ],
    };
  },
  computed: {
    ...mapGetters("projectReportsStore", [
      "existsDeadCodeReport",
      "deadCodeReport",
    ]),
  },
  methods: {
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
