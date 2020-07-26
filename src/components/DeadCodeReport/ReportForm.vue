<template>
  <div class="ReportForm">
    <section class="mb-8">
      <h1>Run Report</h1>
      <div class="subtitle-1">Fill the types of reports you want to run</div>
    </section>
    <v-divider></v-divider>
    <section>
      <v-form ref="dead-code-report-form">
        <v-text-field
          v-for="input in reportFormInputs"
          v-model="deadCodeReportForm[input.key]"
          class="my-4"
          persistent-hint
          required
          :key="input.key"
          :prepend-icon="input.icon"
          :label="input.label"
          :hint="input.hint"
        >
          <template v-slot:append>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">mdi-help-circle-outline</v-icon>
              </template>
              {{ input.toolTipInfo }}
            </v-tooltip>
          </template>
        </v-text-field>
        <v-btn color="success" :loading="isLoading" class="mt-4 mr-4" @click="runReport">
          <v-icon>mdi-play</v-icon>Run
        </v-btn>
      </v-form>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ReportForm",
  data() {
    return {
      isLoading: false,
      reportFormInputs: [
        {
          key: "projectPath",
          label: "Project Path",
          icon: "mdi-folder",
          hint: "/home/username/projects/project_name/src",
          toolTipInfo:
            "Project where the scanner would run the report. It would search files matching criteria and resolve imports.",
        },
        {
          key: "packageJson",
          label: "Package json",
          icon: "mdi-package-variant-closed",
          hint: "/home/username/projects/project_name/package.json",
          toolTipInfo:
            "Project package.json path. It would be use to ignore vendor packages on the imports statements.",
        },
        {
          key: "projectOptions",
          label: "Project Options",
          icon: "mdi-format-list-checks",
          hint: "/home/username/projects/project_name/project-options.json",
          toolTipInfo:
            "Project options path. Specific options for the scanner (formats, ignores...) MORE INFO COMING.",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("projectReportsStore", ["deadCodeReportForm"]),
  },
  methods: {
    ...mapActions("projectReportsStore", ["generateDeadCodeReport"]),

    async runReport() {
      this.isLoading = true;
      await this.generateDeadCodeReport();
      this.isLoading = false;
    },
  },
};
</script>
