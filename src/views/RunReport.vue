<template>
  <div class="RunReport">
    <section class="mb-8">
      <h1>Run Report</h1>
      <div class="subtitle-1">Fill the types of reports you want to run</div>
    </section>
    <v-divider></v-divider>
    <section>
      <v-form ref="dead-code-report-form">
        <v-text-field
          v-model="deadCodeForm.projectPath"
          label="Project Path"
          required
        />
        <v-text-field
          v-model="deadCodeForm.packageJson"
          label="Package json"
          required
        />
        <v-text-field
          v-model="deadCodeForm.projectOptions"
          label="Project Options"
          required
        />
        <v-btn
          color="success"
          :loading="isLoading"
          class="mr-4"
          @click="runReport"
          >Run</v-btn
        >
      </v-form>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RunReport",
  data() {
    return {
      deadCodeForm: {
        projectPath: "",
        packageJson: "",
        projectOptions: "",
      },
      isLoading: false,
    };
  },
  methods: {
    ...mapActions("projectReportsStore", ["generateDeadCodeReport"]),

    async runReport() {
      this.isLoading = true;
      await this.generateDeadCodeReport(this.deadCodeForm);
      this.isLoading = false;
    },
  },
};
</script>
