<template>
  <div id="app" class="container">
    <search-form />
    <div class="stocks">
      <div v-for="stock in stocks">
        <stock :stock="stock"></stock>
      </div>
    </div>
  </div>
</template>

<script>
import store from './store';
import { mapGetters } from 'vuex';
import SearchForm from './components/SearchForm.vue';
import Stock from './components/Stock.vue';

export default {
  name: 'app',
  store,
  components: {
    searchForm: SearchForm,
    stock: Stock,
  },
  computed: mapGetters(['stocks']),
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
