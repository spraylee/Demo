<template>
  <canvas id="stage"></canvas>
      isShowController: {{isShowController}} <br>
  <span id="panel">
    <div v-if="isShowController">
      <span class="icon icon-close" @click="isShowController = !isShowController"></span>
      {{ text | json }} <br>
      Show Circle <input type="checkbox" name="Circle" v-model="isShowCircle"><br>
      Show Line <input type="checkbox" name="Line" v-model="isShowLine"><br>
      Move Circle <input type="checkbox" name="Move" v-model="isMoving"><br>
      Density <input type="range" v-model="density" min="10" max="1000">{{ density }}
    </div>
    <div v-if="!isShowController">
      <span class="icon icon-bars" @click="isShowController = !isShowController"></span>
    </div>
  </span>
</template>

<script>
  window.onresize = function() {
    window.location.reload(false);
  };
  export default {
    name: 'app',
    data() {
      return {
        text: {
          num: '',
          lines: ''
        },
        isShowLine: true,
        isShowCircle: true,
        isMoving: true,
        density: 100,
        isShowController: true
      };
    },
    ready() {
      var self = this;

      var canvas = document.getElementById('stage');
      var width = window.innerWidth;
      var height = window.innerHeight;
      var pixelRatio = window.devicePixelRatio || 1;
      // var pixelRatio = 3 || 1;
      var W = width * pixelRatio;
      var H = height * pixelRatio;
      var ctx = canvas.getContext('2d');
      var color = '#eee';
      var bgColor1 = '#134E5E';
      var bgColor2 = '#71B280';

      canvas.width = W;
      canvas.height = H;

      var density = this.density;
      var maxSize = 7 * pixelRatio;
      var minSize = 4 * pixelRatio;
      var maxSpeed = 0.4 * pixelRatio;
      var minSpeed = 0.2 * pixelRatio;
      var maxDistance = 40 * pixelRatio;
      var maxLineWidth = 2 * pixelRatio;

      var num = Math.floor((W * H) / (maxSize * minSize * 10000) * density);
      this.text.num = num;

      var cells = initObj();
      animate();

      // 检测改变
      this.$watch('density', function(val) {
        density = val;
        num = Math.floor((W * H) / (maxSize * minSize * 10000) * density);
        self.text.num = num;
        cells = changeObj(cells, num);
        // animate();
      });

      this.$watch('isShowLine', function(val) {

      });

      function animate() {
        countPostion();
        clearSreen();
        addBgColor();
        strokeLine();
        renderCircle();

        window.requestAnimationFrame(animate);
      }

      function initObj() {
        var obj = [];
        for (let i = 0; i < num; i++) {
          let size = getRandomNum(minSize, maxSize);
          let x = getRandomNum(size, W - size);
          let y = getRandomNum(size, H - size);
          let speed = getRandomNum(minSpeed, maxSpeed);
          let angle = getRandomNum(0, 2 * Math.PI);
          let speedX = speed * Math.cos(angle);
          let speedY = speed * Math.sin(angle);
          obj.push({
            size, x, y, speedX, speedY
          });
        }
        return obj;
      }

      function changeObj(obj, changeNum) {
        if (changeNum > obj.length) {
          for (let i = 0; i < changeNum - obj.length; i++) {
            let size = getRandomNum(minSize, maxSize);
            let x = getRandomNum(size, W - size);
            let y = getRandomNum(size, H - size);
            let speed = getRandomNum(minSpeed, maxSpeed);
            let angle = getRandomNum(0, 2 * Math.PI);
            let speedX = speed * Math.cos(angle);
            let speedY = speed * Math.sin(angle);
            obj.push({
              size, x, y, speedX, speedY
            });
          }
          return obj;
        } else {
          obj = obj.slice(0, changeNum);
          return obj;
        }
      }

      function countPostion() {
        if (!self.isMoving) {
          return;
        }
        cells.forEach(function(item, index) {
          item.x += item.speedX;
          item.y += item.speedY;
          if (item.x + item.size >= W) {
            item.x -= 2 * item.x + 2 * item.size - 2 * W;
            item.speedX *= -1;
          }
          if (item.y + item.size >= H) {
            item.y -= 2 * item.y + 2 * item.size - 2 * H;
            item.speedY *= -1;
          }
          if (item.x - item.size <= 0) {
            item.x -= 2 * item.x - 2 * item.size;
            item.speedX *= -1;
          }
          if (item.y - item.size <= 0) {
            item.y -= 2 * item.y - 2 * item.size;
            item.speedY *= -1;
          }
        });
      }

      function clearSreen() {
        ctx.clearRect(0, 0, W, H);
      }

      function addBgColor() {
        var bgc = ctx.createLinearGradient(0, 0, W, 0);
        bgc.addColorStop(0, bgColor1);
        bgc.addColorStop(1, bgColor2);
        ctx.fillStyle = bgc;
        ctx.fillRect(0, 0, W, H);
      }

      function strokeLine() {
        if (!self.isShowLine) {
          return;
        }
        var line = [];
        for (let i = 0; i < cells.length; i++) {
          for (let j = i + 1; j < cells.length; j++) {
            if (cells[i].x - cells[j].x > maxDistance || cells[i].y - cells[j].y > maxDistance) {
              continue;
            }
            let distance = Math.sqrt(Math.pow(cells[i].x - cells[j].x, 2) + Math.pow(cells[i].y - cells[j].y, 2));
            if (distance - cells[i].size - cells[j].size > maxDistance || distance - cells[i].size - cells[j].size <= 0) {
              continue;
            }
            let lineWidth = (1 - (distance - cells[i].size - cells[j].size) / maxDistance) * maxLineWidth;
            if (lineWidth > 0) {
              line.push({
                xFrom: cells[i].x,
                yFrom: cells[i].y,
                xTo: cells[j].x,
                yTo: cells[j].y,
                lineWidth: lineWidth
              });
            }
          }
        }
        self.text.lines = line.length;
        ctx.strokeStyle = color;
        line.forEach(function(item, index, list) {
          ctx.beginPath();
          ctx.moveTo(item.xFrom, item.yFrom);
          ctx.lineTo(item.xTo, item.yTo);
          ctx.lineWidth = item.lineWidth;
          ctx.stroke();
        });
      }

      function renderCircle() {
        if (!self.isShowCircle) {
          return;
        }
        ctx.fillStyle = color;
        cells.forEach(function(item, index, list) {
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.size, 0, 2 * Math.PI, false);
          ctx.fill();
        });
      }

      function getRandomNum(min, max) {
        return Math.random() * (max - min) + min;
      }
    }
  };
</script>

<style>
  canvas {
    background-image: linear-gradient(to right, #134E5E, #71B280);
  }
  p {
    font-size: 18px;
    color: red;
  }
  canvas {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: #ccc;
  }
  #panel {
    position: absolute;
    bottom: 20px;
    left: 20px;
    z-index: 100;
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 20px;
    border-radius: 10px;
  }
  .icon::before {
    color: white;
    font-size: 18px;
  }
  .icon-close {
    float: right;
  }


  @import './assets/fonts/style.css';
</style>
