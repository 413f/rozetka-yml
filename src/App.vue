<template>
  <v-app id="app">
    <RozetkaYml></RozetkaYml>
  </v-app>
</template>

<script>
import RozetkaYml from '@/components/rozetka/RozetkaYml';

export default {
  name: 'App',
  components: {
    RozetkaYml,
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*width: 900px;*/
    margin: 0 auto;
    max-height: 100vh;
  }
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
