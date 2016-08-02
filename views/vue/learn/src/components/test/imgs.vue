<template>
  <!-- <img src="item" v-for="item in list"> -->
  <div v-for="item in list">
    <img :src="item">
  </div>
  <p>There is {{ list.length }} photos in all.</p>
</template>


<script>
  // var baseUrl = 'src/assets/'
  export default {
    data () {
      return {
        // baseUrl: '/src/assets/',
        // list: [require(this.baseUrl + 'logo.png'), require(this.baseUrl + 'logo2.png')]
        list: ['../../src/assets/logo.png', '../../src/assets/logo.png'],
        // img: 'src/assets/logo.png',
        imgs: [{
          width: '200px'
        },
        {
          width: '200px'
        }],
        button: {
          qty: 0
        }
        // list: [require('src/assets/logo.png'), require('src/assets/logo.png')]
        // list: [require('src/assets/' + 'logo.png')]
        // list: [require('assets/logo.png')]
      }
    },
    created () {
      // var self = this
      // this.list = this.list.map(function (item, index) {
      //   // return require('src/assets/logo.png')
      //   return require(item)
      // })
      // console.dir(this.list)
      // this.list = [require(baseUrl + 'logo.png')]
    }
  }
</script>


<style>


</style>