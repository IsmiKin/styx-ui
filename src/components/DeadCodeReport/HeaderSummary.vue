<template>
  <div class="HeaderSummary">
    <v-card class="mx-auto mb-8" outlined :loading="isLoading">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4 d-flex">
            <div>
              <v-icon class="pr-4">mdi-skull-crossbones</v-icon>DEAD CODE REPORT
            </div>
            <div class="ml-auto">
              <v-tooltip bottom v-for="(statNumber, key) in deadCodeReportData.stats" :key="key">
                <template v-slot:activator="{ on }">
                  <v-chip
                    v-on="on"
                    :color="statsMeta[key].color"
                    :disabled="isLoading"
                    class="ma-2"
                  >
                    <v-icon>{{statsMeta[key].icon}}</v-icon>
                    {{statNumber}}
                  </v-chip>
                </template>
                {{ statsMeta[key].tooltipInfo }}
              </v-tooltip>
            </div>
          </div>

          <v-list-item-subtitle class="d-flex">
            <div class>
              <v-icon class="pr-4">mdi-folder</v-icon>
              <strong>Project path:</strong>
              {{ deadCodeReportForm.projectPath }}
            </div>
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
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "HeaderSummary",
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      statsMeta: {
        errors: {
          label: "Errors",
          color: "red",
          icon: "mdi-alert",
          tooltipInfo:
            "Errors ocurring when scanning the imports from in a file. Mainly issues trying resolving the import path",
        },
        isolates: {
          label: "Isolates",
          color: "warning",
          icon: "mdi-grain",
          tooltipInfo: "Files which has not being imported for any other file.",
        },
        scanned_files: {
          label: "Files scanned",
          color: "primary",
          icon: "mdi-transit-connection",
          tooltipInfo: "All files has been scanned on the project path.",
        },
      },
    };
  },
  computed: {
    ...mapGetters("projectReportsStore", [
      "deadCodeReportData",
      "deadCodeReportForm",
    ]),
  },
  methods: {
    ...mapMutations("projectReportsStore", {
      resetDeadCodeReportData: "RESET_DEAD_CODE_REPORT_DATA",
    }),
    ...mapActions("projectReportsStore", ["generateDeadCodeReport"]),

    async runReport() {
      this.$emit("toggle-loading");
      await this.generateDeadCodeReport();
      this.$emit("toggle-loading");
    },
  },
};
</script>
