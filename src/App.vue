<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          :to="item.link"
          :disabled="item.disabled"
          link
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="green" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-icon class="mx-4" large>mdi-rowing</v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Styx UI</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-row align="center" style="max-width: 650px">
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="mdi-magnify"
          color="white"
          hide-details
        ></v-text-field>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height">
        <v-row justify="center" align="center">
          <v-col>
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
  computed: {
    ...mapGetters("projectReportsStore", [
      "existsDeadCodeReport",
      "existsTranslationsCodeReport",
    ]),

    items() {
      return [
        { icon: "mdi-send", text: "Run analysis", link: "run-report" },
        {
          icon: "mdi-timeline",
          text: "Dead code report",
          disabled: !this.existsDeadCodeReport,
          link: "dead-code-report",
        },
        {
          icon: "mdi-translate",
          text: "Translations report",
          disabled: !this.existsTranslationsCodeReport,
        },
        { icon: "mdi-history", text: "History" },
      ];
    },
  },
  created() {},
};
</script>
