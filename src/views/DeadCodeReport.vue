<template>
  <div class="DeadCodeReport">
    <div v-if="existsDeadCodeReport">
      <HeaderSummary :isLoading="isLoading" @toggle-loading="toggleLoading" />

      <v-container>
        <v-card>
          <v-tabs v-model="tab" background-color="success">
            <v-tab v-for="item in tabs" :key="item.tab">
              <v-icon class="mr-2">{{item.icon}}</v-icon>
              {{ item.label }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in tabs" :key="item.tab">
              <v-card flat>
                <v-card-text>
                  <component :is="item.content" :isLoading="isLoading"></component>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-container>
    </div>
    <ReportForm v-else />
  </div>
</template>

<script>
import { isBoolean } from "lodash";
import { mapGetters } from "vuex";

import HeaderSummary from "@/components/DeadCodeReport/HeaderSummary";
import ReportForm from "@/components/DeadCodeReport/ReportForm";
import FilesReportTab from "@/components/DeadCodeReport/FilesReportTab";

export default {
  name: "DeadCodeReport",
  components: {
    ReportForm,
    HeaderSummary,
    FilesReportTab,
  },
  data() {
    return {
      tab: null,
      tabs: [
        {
          label: "Files Report",
          icon: "mdi-file-search",
          content: FilesReportTab,
        },
        {
          label: "Graph",
          icon: "mdi-hubspot",
          content: "ComponentB",
        },
      ],
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("projectReportsStore", ["existsDeadCodeReport"]),
  },
  methods: {
    toggleLoading(isLoading) {
      this.isLoading = isBoolean(isLoading) ? isLoading : !this.isLoading;
    },
  },
};
</script>
