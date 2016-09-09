<template>
  <div class="main">
    <div class="contanier">
      <p v-for="value in content" track-by="$index">{{value | json}}</p>
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
        content: [],
        times: [],
        canSay: true
      };
    },
    ready() {
      socket = io('http://192.168.0.67:3000');

      socket.on('all', content => {
        this.content.push("all");
      });
      socket.on('other', content => {
        this.content.push("hi");
        if (this.canSay) {
          socket.emit('other', 'hi');
        }
      });
      socket.on('me', content => {
        console.dir(content);
      });

    },
    methods: {
      submit(word) {
        // socket.emit('all', {
        //   word: 'all'
        // });
        // socket.emit('me', {
        //   action: 'getConnectCounts'
        // });
        socket.emit('other', 'hi');
        window.setTimeout(() => {
          this.canSay = false;
        }, 10000);
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