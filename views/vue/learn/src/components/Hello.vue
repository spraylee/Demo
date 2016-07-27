<template>
  <div class="hello">
    <h1 @click='click'>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello Spray Lee!'
    }
  },
  methods: {
    click () {
      this.msg = 'changed!'
      var self = this
      window.setTimeout(function () {
        self.msg = 'Hello Spray Lee!'
      }, 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
  transition: all 1s;
}
h1:hover {
  transform: scale(1.1);
}
</style>
