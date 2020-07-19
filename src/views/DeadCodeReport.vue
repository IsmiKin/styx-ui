<template>
  <div class="DeadCodeReport">
    <div v-if="existsDeadCodeReport">
      <v-card class="mx-auto mb-8" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">DEAD CODE REPORT</div>

            <v-list-item-subtitle
              ><strong>Project path:</strong>
              {{ projectPath }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn
            color="success"
            :loading="isLoading"
            class="ml-2"
            @click="runReport"
            >Re-run</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-expansion-panels>
        <v-expansion-panel v-for="section in tableSections" :key="section.key">
          <v-expansion-panel-header>
            <div class="justify-start">
              <v-icon class="mx-4" large>{{ section.icon }}</v-icon>
              <strong>{{ section.name }}</strong>
              <v-chip class="ma-2" :color="section.color">
                {{ deadCodeReport.stats[section.statsKey] }}
              </v-chip>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            Pika
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-else>
      No data / Go to Run Report section
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "DeadCodeReport",
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
        },
        {
          name: _.startCase("isolates"),
          key: "isolates",
          statsKey: "isolates",
          color: "warning",
          icon: "mdi-grain",
        },
        {
          name: _.startCase("dataReport"),
          key: "dataReport",
          statsKey: "scanned_files",
          color: "primary",
          icon: "mdi-transit-connection",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("projectReportsStore", [
      "existsDeadCodeReport",
      "deadCodeReport",
      "projectPath",
    ]),
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
