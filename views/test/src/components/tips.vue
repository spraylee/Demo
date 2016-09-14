<template>
  <div class="main">
    <span :class="item.state" v-for="item in list">{{ item.text }}</span>
  </div>
</template>

<script>
  export default {
    props: [],
    components: {

    },
    ready () {

    },
    data () {
      return {
        list: []
      };
    },
    methods: {
      log (text) {
        var obj = {
          text: text,
          state: 'toBorn'
        }
        this.list.push(obj);
        window.requestAnimationFrame(() => {
          obj.state = 'active';
        });
        window.setTimeout(() => {
          obj.state = 'dead';
        }, 2000);
      }
    }
  }
</script>

<style scoped>
  .main {
    display: block;
    position: absolute;
    width: 0;
    height: 0;
  }
  span {
    display: inline-block;
    padding: 10px 15px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    font-size: 12px;
    transition: all 0.5s;
    position: fixed;
    left: 50%;
    bottom: 5%;
    transform: translate(-50%, 0%);
    opacity: 0;
    color: white;
  }
  span.active {
    bottom: 15%;
    opacity: 1;
  }
  span.dead {
    bottom: 20%;
    opacity: 0;
  }
</style>