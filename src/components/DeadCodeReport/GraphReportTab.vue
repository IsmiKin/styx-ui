<template>
  <div class="GraphReportTab">
    Pika graph
    <!-- {{graphReportData}} -->
    <!-- <d3-network v-if="!isLoading" :net-nodes="nodes" :net-links="links" :options="options" /> -->
    <div id="my_dataviz"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import d3 from "d3";

export default {
  name: "GraphReportTab",
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      nodes: [
        { id: 1, name: "my awesome node 1" },
        { id: 2, name: "my node 2" },
        { id: 3, name: "orange node", _color: "orange" },
        { id: 4, _color: "#4466ff" },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
      ],
      links: [
        { source: 1, target: 2 },
        { source: 2, target: 8 },
        {
          source: 3,
          target: 4,
        },
        { source: 4, target: 5 },
        { source: 5, target: 6 },
        { source: 7, target: 8 },
        { source: 5, target: 8 },
        { source: 3, target: 8 },
        { source: 7, target: 9 },
      ],
      options: {
        force: 3000,
        size: { w: 600, h: 600 },
        nodeSize: 20,
        nodeLabels: true,
        linkLabels: true,
        canvas: false,
      },
    };
  },
  created() {
    const svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", 600)
      .attr("height", 600)
      .append("g");
  },
  computed: {
    ...mapGetters("projectReportsStore", ["graphReportData"]),
  },
  methods: {},
};
</script>
