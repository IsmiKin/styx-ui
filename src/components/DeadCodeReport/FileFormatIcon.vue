<template>
  <div class="FileFormatIcon">
    <v-icon>{{ parsedIconName }}</v-icon>
  </div>
</template>

<script>
import _ from "lodash";

const FILE_FORMAT_DICITONARY = {
  ".vue": "vuejs",
  ".js": "language-javascript",
};

export default {
  name: "FileFormatIcon",
  props: {
    icon: {
      type: String,
      default: "image-broken",
    },
  },
  computed: {
    parsedIconName() {
      return `mdi-${_.get(FILE_FORMAT_DICITONARY, this.icon, "file-question")}`;
    },
  },
  methods: {},
};
</script>
