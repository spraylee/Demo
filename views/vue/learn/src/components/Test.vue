<template>
  <p class="time" v-on:click='show'>
    <span>现在的时间：</span>
    <span class="time-box">
      <span class="time">
        <span v-for="letter in time" track-by="$index" v-bind:class="" v-if="showIndex">{{ letter }}</span>
      </span>
      <span class="time">
        <span v-for="letter in time" track-by="$index" v-bind:class="" v-if="showIndex">{{ letter }}</span>
      </span>
    </span>
  </p>
  <!-- <test-imgs></test-imgs> -->
</template>

<script>
  // import testImgs from './test/imgs'

  function format (num) {
    var str = String(num)
    return (str.length === 1) ? '0' + str : str
  }
  export default {
    data () {
      return {
        showIndex: 1,    // 0 or 1
        time: ''
      }
    },
    // components: {
    //   testImgs
    // },
    methods: {
      show () {
        var a = func(Math.floor(Math.random() * 120))
        function func (num) {
          return num <= 1 ? 1 : num * func(num - 1)
        }
        if (a < 1) {
          a = 10
        }
        window.console.log(this.time)
      }
    },
    created () {
      var self = this
      self.time = format(new Date().getHours()) + ':' + format(new Date().getMinutes()) + ':' + format(new Date().getSeconds())
      window.setInterval(function () {
        self.time = format(new Date().getHours()) + ':' + format(new Date().getMinutes()) + ':' + format(new Date().getSeconds())
        self.show()
      }, 4)
    }
  }
</script>


<style scoped>
  p.time {
    /*color: green;*/
    position: absolute;
    bottom: 30px;
    right: 80px;
  }
  .time-box {
    position: relative;
    display: inline-block;
  }
  .time-box > span {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
  }
</style>