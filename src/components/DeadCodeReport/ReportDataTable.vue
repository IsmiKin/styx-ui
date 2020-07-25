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
      item-key="path"
      :expanded.sync="expanded"
      :headers="headers"
      :items="reportRows"
      :search="search"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="py-4">
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr v-for="fieldName in expandedInformation.simple" :key="fieldName">
                  <td>{{ startCase(fieldName) }}</td>
                  <td>{{ item[fieldName] }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(fieldNameCollapsable, index) in expandedInformation.collapsable"
              :key="index"
            >
              <v-expansion-panel-header>
                <span>
                  <v-icon class="pr-4">{{ fieldNameCollapsable.icon }}</v-icon>
                  {{ startCase(fieldNameCollapsable.key) }}
                </span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-simple-table dense>
                  <template v-slot:default>
                    <tbody>
                      <tr
                        v-for="(collapsableFieldItem, index) in item[fieldNameCollapsable.key]"
                        :key="`${fieldNameCollapsable.key}-${index}`"
                      >
                        <td>
                          <v-icon>{{ fieldNameCollapsable.itemIcon }}</v-icon>
                          {{ collapsableFieldItem }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </td>
      </template>
      <template v-slot:item.file_format="{ item }">
        <FileFormatIcon :icon="item.format" />
      </template>
      <template v-slot:item.filename="{ item }">
        <p class="font-weight-bold">{{ item.filename }}</p>
      </template>
      <template v-slot:item.imports="{ item }">
        <v-chip color="green">{{ size(item.imports) }}</v-chip>
      </template>
      <template v-slot:item.importer_by="{ item }">
        <v-chip color="blue">{{ size(item.importer_by) }}</v-chip>
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
import { get, size, isObject, values, startCase } from "lodash";
import FileFormatIcon from "@/components/DeadCodeReport/FileFormatIcon";

export default {
  name: "ReportDataTable",
  components: { FileFormatIcon },
  props: {
    title: {
      type: String,
    },
    reportRecords: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    reportRows() {
      return isObject(this.reportRecords)
        ? values(this.reportRecords)
        : this.reportRecords;
    },
  },
  data() {
    return {
      search: "",
      expanded: [],
      headers: [
        { text: "", value: "file_format", filterable: false },
        { text: "Filename", value: "filename", filterable: true },
        { text: "Imports", value: "imports", filterable: false },
        { text: "Importer By", value: "importer_by", filterable: false },
        { text: "", value: "data-table-expand", filterable: false },
      ],
      expandedInformation: {
        simple: ["path", "filename", "format"],
        collapsable: [
          {
            key: "imports",
            icon: "mdi-package-down",
            itemIcon: "mdi-file",
          },
          {
            key: "importer_by",
            icon: "mdi-package-up",
            itemIcon: "mdi-file",
          },
        ],
      },
    };
  },
  methods: {
    get,
    size,
    startCase,
  },
};
</script>