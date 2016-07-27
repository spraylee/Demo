<template>
  <p class="time" @click='show'>现在的时间：{{ time }}</p>
  <test-imgs></test-imgs>
</template>

<script>
  import testImgs from './test/imgs'

  function format (num) {
    var str = String(num)
    return (str.length === 1) ? '0' + str : str
  }
  export default {
    data () {
      return {
        time: ''
      }
    },
    components: {
      testImgs
    },
    methods: {
      show () {
        window.alert(this.time)
      }
    },
    created () {
      // this.time = 323423
      // this.show()
      var self = this
      self.time = format(new Date().getHours()) + ':' + format(new Date().getMinutes()) + ':' + format(new Date().getSeconds())
      window.setInterval(function () {
        self.time = format(new Date().getHours()) + ':' + format(new Date().getMinutes()) + ':' + format(new Date().getSeconds())
      }, 100)
    }
  }
</script>


<style scoped>
  p.time {
    /*color: green;*/
    position: absolute;
    bottom: 30px;
    right: 30px;
  }
</style>