<template>
  <div class="GraphReportTab">
    Pika graph
    <!-- {{graphReportData}} -->
    <!-- <d3-network v-if="!isLoading" :net-nodes="nodes" :net-links="links" :options="options" /> -->
    <div ref="d3"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { generateForceGraphSvg } from "../../helpers/d3Helpers";

export default {
  name: "GraphReportTab",
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters("projectReportsStore", ["graphReportData"]),
  },
  mounted() {
    const nodoDeLosCojones = generateForceGraphSvg(this.graphReportData);
    console.log(this.$refs);
    this.$refs.d3.append(nodoDeLosCojones);

    // const svg = d3
    //   .select("#my_dataviz")
    //   .append("svg")
    //   .attr("width", 600)
    //   .attr("height", 600)
    //   .append("g");
  },
  methods: {},
};
</script>
