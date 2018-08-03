<template>
  <div class="search-form">
    <div class="field has-addons">
      <div class="control">
        <input
          type="text"
          class="input is-primary"
          placeholder="Enter ticker"
          v-model.trim="ticker"
        >
      </div>
      <div class="control">
        <button class="button is-link" v-on:click="handleSubmit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'search-form',
  data () {
    return {
      ticker: '',
    };
  },
  methods: {
    ...mapActions([
      'addStock',
    ]),
    handleSubmit() {
      this.addStock(this.ticker);
    }
  }
}
</script>

<style>
.search-form input {
  text-transform: uppercase;
}
</style>
