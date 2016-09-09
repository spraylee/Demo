<template>
  <div class="main">
    <div class="contanier">
      <s-wave class="btn" type="checkbox" color='green' active="true" base="red">点击</s-wave>
      <s-wave class="btn" color="#ccc">按钮</s-wave>
      <tips v-ref:tips></tips>
    </div>

    <span>Designed by Spray Lee</span>
  </div>
</template>



<script>
  import sWave from './components/wave';
  import tips from './components/tips';
  export default {
    name: 'app',
    components: {
      sWave, tips
    },
    data() {
      return {

      };
    },
    ready() {
      this.$refs.tips.log('success');
      // this.$tips.log('success');
    }
  };
</script>

<style>
  * {
    box-sizing: border-box;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    /*flex: 1 0 auto;*/
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
  .contanier {
    margin-top: 200px;
  }
</style>

<style scoped>

  .btn {
    width: 400px;
    height: 80px;
    border-radius: 20px;
    background-color: pink;
    font-size: 40px;
    text-align: center;
    line-height: 80px;
    color: white;
  }
</style>