<template>
  <div class="main">
    <div class="item">
      <h4>Compress</h4>
      <div class="compass" :style="{transform: 'rotate(' + (datas.deviceOrientation.alpha - 90) + 'deg)'}">
        --------------------->>>>
      </div>
    </div>
    <div class="item" v-for="(key, value) of datas">
      <h4>{{key}}</h4>
      <section>
        <div class="content" v-for="(k, v) of value">
          <p class="title">{{k}}: {{Math.floor(v)}}</p>
          <div class="value">
            <div class="value-left">
              <div class="left-inner" v-if="v < 0" :style="{width: -v + '%'}"></div>
            </div>
            <div class="value-right">
              <div class="right-inner" v-if="v >= 0" :style="{width: v + '%'}"></div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <span>Designed by Spray Lee</span>
  </div>
</template>

<style scoped>
  .item {
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    align-items: center;
  }
  section {
    width: 100%;
  }
  .content {
    display: flex;
    flex-direction: column;
  }
  .title {
    text-align: center;
    flex: none;
    background-color: transparent;
    line-height: 1.2em;
    padding: 0;
    margin: 0;
  }
  .value {
    height: 10px;
    display: flex;
  }
  .value > div {
    flex: auto;
    height: 100%;
    position: relative;
  }
  .left-inner {
    background-color: red;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
  }
  .right-inner {
    background-color: green;
    height: 100%;
    position: absolute;
    left: 0;
  }
  .compass {
    border: 1px solid #ccc;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin: 20px auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    margin-top: 50px;
    margin-bottom: 20px;
    font-size: 12px;
    display: block;
    text-align: center;
  }

</style>

<script>
  export default {
    name: 'app',
    data() {
      return {
        info: '',
        datas: {
          accelerationIncludingGravity: {
            x: '', y: '', z: ''
          },
          acceleration: {
            x: '', y: '', z: ''
          },
          rotationRate: {
            alpha: '', beta: '', gamma: ''
          },
          deviceOrientation: {
            alpha: '', beta: '', gamma: ''
          }
        }
      };
    },
    ready() {
      var self = this;
      if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
      } else {
        self.info = 'Not supported on your device.';
      }
      window.addEventListener('deviceorientation', function(event) {
        self.info = event.gamma;
        formatObj(event, self.datas.deviceOrientation, 1);
      }, true);
      function deviceMotionHandler(event) {
        console.dir(event);
        formatObj(event.accelerationIncludingGravity, self.datas.accelerationIncludingGravity, 5);
        formatObj(event.acceleration, self.datas.acceleration, 20);
        formatObj(event.rotationRate, self.datas.rotationRate, 20);
      }
      function formatObj(obj, target, num) {
        for (var key in target) {
          target[key] = (Number(obj[key]) * num).toFixed(3);
        }
      }
    }
  };
</script>
<style>
  .main {
    margin: 10px;
    text-align: right;
  }
  p {
    display: block;
    background-color: green;
  }
</style>