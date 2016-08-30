<template>
  <div class="main">
    <div class="contanier">
      <p v-for="value in content">{{value}}</p>
      <hr>
      <input type="text" v-model="word">
      <button @click="submit(word)">submit</button>
    </div>

    <span>Designed by Spray Lee</span>
  </div>
</template>



<script>
  import io from 'src/assets/lib/socket.io.js';
  var socket;
  export default {
    name: 'app',
    components: {
    },
    data() {
      return {
        word: '',
        content: []
      };
    },
    ready() {
      socket = io('http://192.168.0.67:3000');

      socket.on('say', content => {
        this.content.push(content);
      });

    },
    methods: {
      submit(word) {
        socket.emit('talk', word);
        this.word = '';
      }
    }
  };
</script>

<style>
  * {
    box-sizing: border-box;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  html, body {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>

<style scoped>
 .main {
  flex-direction: column;
 }
</style>