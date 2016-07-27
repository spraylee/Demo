<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <hello></hello>
    <span>
      Welcome to your Vue.js app! </span><span>We start here by using Vue!
    </span>
    <test></test>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Test from './components/Test'

export default {
  components: {
    Hello,
    Test
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
span {
  font-size: 20px;
  word-break:
}
</style>
