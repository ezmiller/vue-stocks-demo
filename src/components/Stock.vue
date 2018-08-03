<template>
  <section class="section stock">
    <h1 class="ticker">{{ stock.ticker }}</h1>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'stock',
  props: ['stock'],
  created() {
    this.fetchPrices(this.stock.ticker);
  },
  methods: mapActions([
    'fetchPrices',
  ]),
}
</script>

<style>
.stock .ticker {
  text-transform: uppercase;
}
</style>
