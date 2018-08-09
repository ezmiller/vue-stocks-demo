<template>
  <div class="line-chart">
    <svg width="800" height="350"></svg>
    <!-- <div :data="data" /> -->
  </div>
</template>

<script>
import * as R from 'ramda';
import * as d3 from 'd3';

export default {
  name: 'line-chart',
  props: ['data'],
  computed: {
    closingPrices() {
      const rv = R.map(R.prop(['4. close']))(this.data);
      return rv;
    }
  },
  watch: {
    closingPrices() {
      this.update();
    }
  },
  methods: {
    update() {
      const svg = d3.select(this.$el).select('svg');
      const margin = {top: 20, right: 20, bottom: 30, left: 50};
      const width = +svg.attr("width") - margin.left - margin.right;
      const height = +svg.attr("height") - margin.top - margin.bottom;
      const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      const x = d3.scaleTime().rangeRound([0, width]);
      const y = d3.scaleLinear().rangeRound([height, 0]);

      const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.000Z');

      const line = d3.line()
        .x(d => x(parseTime(d.date)))
        .y(d => y(d.price));

      const convertTime = R.compose(
        d3.timeFormat('%Y-%m-%dT%H:%M:%S.000Z'),
        d3.timeParse('%Y-%m-%d %H:%M:%S'),
      );

      const convertDateKeys = R.curry((parseFn, obj) =>
        R.reduce(
          (acc, k) => R.append({ date: parseFn(k), price: parseFloat(obj[k]) }, acc),
          [],
          R.keys(obj)
        )
      );

      const data = convertDateKeys(convertTime, this.closingPrices);

      x.domain(d3.extent(data, d => parseTime(d.date)));
      y.domain(d3.extent(data, d => d.price));

      g.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .select('.domain')
        .remove();

      g.append("g")
        .call(d3.axisLeft(y))
        .append('text')
        .attr('fill', '#000')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Price ($)');

      g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
    }
  },
}
</script>
