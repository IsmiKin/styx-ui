<template>
  <div class="DeadCodeReport">
    <div v-if="existsDeadCodeReport">
      <HeaderSummary :isLoading="isLoading" @toggle-loading="toggleLoading" />

      <FilesReportTab :isLoading="isLoading" />
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
