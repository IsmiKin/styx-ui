<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table item-key="path" :headers="headers" :items="reportRecords" :search="search">
      <template v-slot:item.file_format="{ item }">
        <FileFormatIcon :icon="item.format" />
      </template>

      <v-alert
        slot="no-results"
        :value="true"
        color="error"
        icon="warning"
      >Your search for "{{ search }}" found no results.</v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
import FileFormatIcon from "@/components/DeadCodeReport/FileFormatIcon";

export default {
  name: "ReportIsolatesTable",
  components: { FileFormatIcon },
  props: {
    title: {
      type: String,
    },
    reportRecords: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "", value: "file_format", filterable: false },
        { text: "Filename", value: "filename", filterable: true },
      ],
    };
  },
};
</script>