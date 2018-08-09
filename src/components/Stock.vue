<template>
  <section class="section stock">
    <div class="container'">
      <h1 class="ticker">{{ stock.ticker }}</h1>
      <line-chart :data="data"></line-chart>
    </div>
  </section>
</template>

<style>
.stock {
  margin: 15px 0;
  border: solid 1px lightblue;
  border-radius: 5px;
  box-shadow: 2px 2px 2px lightblue;
}
</style>

<script>
import * as R from 'ramda';
import { mapActions } from 'vuex';
import LineChart from './LineChart.vue';

export default {
  name: 'stock',
  props: ['stock'],
  computed: {
    data() {
      const pullPrices = R.pipe(R.propOr({}, this.stock.ticker),
                                R.propOr({}, 'data'));

      return pullPrices(this.$store.state.prices);
    }
  },
  components: {
    lineChart: LineChart,
  },
  methods: mapActions([
    'fetchPrices',
  ]),
  created() {
    this.fetchPrices(this.stock.ticker);
  },
}
</script>

<style>
.stock .ticker {
  text-transform: uppercase;
}
</style>
