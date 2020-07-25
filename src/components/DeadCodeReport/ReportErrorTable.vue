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
    <v-data-table
      show-expand
      item-key="error_id"
      :expanded.sync="expanded"
      :headers="headers"
      :items="reportRecords"
      :search="search"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="py-4">
          <span class="py-4">
            <div class="pb-4">
              <v-icon class="pr-4">mdi-message-alert</v-icon>Error Message
            </div>
            <v-alert type="error">{{item.message}}</v-alert>
          </span>
          <div
            v-for="(extraInformationSection, index) in expandedInformation.sections"
            class="py-4"
            :key="index"
          >
            <span>
              <v-icon class="pr-4">{{ extraInformationSection.icon }}</v-icon>
              {{ startCase(extraInformationSection.key) }}
            </span>

            <v-simple-table dense>
              <template v-slot:default>
                <tbody>
                  <tr
                    v-for="(sectionField, index) in extraInformationSection.fields"
                    :key="`${sectionField}-${index}`"
                  >
                    <td>{{ startCase(sectionField) }}</td>
                    <td>{{ get(item, `${extraInformationSection.key}.${sectionField}`) }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </td>
      </template>

      <template v-slot:item.files_formats="{ item }">
        <span class="d-flex">
          <FileFormatIcon :icon="item.importer.format" />
          <v-icon>mdi-arrow-left</v-icon>
          <FileFormatIcon :icon="item.imported.format" />
        </span>
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
import { get, startCase } from "lodash";
import FileFormatIcon from "@/components/DeadCodeReport/FileFormatIcon";

export default {
  name: "ReportErrorTable",
  components: { FileFormatIcon },
  props: {
    title: {
      type: String,
    },
    reportRecords: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      search: "",
      expanded: [],
      headers: [
        { text: "", value: "files_formats", filterable: false },
        { text: "Importer", value: "importer.filename", filterable: true },
        { text: "Imported", value: "importer.filename", filterable: false },
        { text: "", value: "data-table-expand", filterable: false },
      ],
      expandedInformation: {
        sections: [
          {
            key: "importer",
            icon: "mdi-package-down",
            fields: ["path", "filename", "format"],
          },
          {
            key: "imported",
            icon: "mdi-package-up",
            fields: ["path", "filename", "format"],
          },
        ],
      },
    };
  },
  methods: {
    get,
    startCase,
  },
};
</script>