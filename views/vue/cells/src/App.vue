<template>
  <div class="cells">
    <span class="cell" v-for="item in count" :style="cellsStyle[$index]">
      <p class="index">{{ $index }}</p>
    </span>
<!--     <pre>
      {{ cells | json }}
    </pre> -->
  </div>
</template>

<script>
var W = window.innerWidth
var H = window.innerHeight
var maxSpeed = 5
export default {
  data () {
    return {
      count: 200,
      cells: []
    }
  },
  created () {
    for (var i = 0; i < this.count; i++) {
      var size = Math.random() * 20 + 40
      var left = size / 2 + Math.random() * (W - size)
      var top = size / 2 + Math.random() * (H - size)
      var speedX = Math.random() * 2 * maxSpeed - maxSpeed
      var speedY = Math.random() * 2 * maxSpeed - maxSpeed
      this.cells.push({
        left,
        top,
        size,
        speedX,
        speedY
      })
    }
    var self = this
    window.requestAnimationFrame(function animation () {
      move(self.cells)
      self.cellsStyle = countStyle(self.cells)
      window.requestAnimationFrame(animation)
    })
  },
  computed: {
    cellsStyle () {
      return countStyle(this.cells)
    }
  }
}
function move (cells) {
  cells.forEach(function (item, index) {
    item.left += item.speedX
    item.top += item.speedY
    if (item.left + item.size / 2 >= W) {
      item.left -= 2 * item.left + item.size - 2 * W
      item.speedX *= -1
    }
    if (item.top + item.size / 2 >= H) {
      item.top -= 2 * item.top + item.size - 2 * H
      item.speedY *= -1
    }
    if (item.left - item.size / 2 <= 0) {
      item.left -= 2 * item.left - item.size
      item.speedX *= -1
    }
    if (item.top - item.size / 2 <= 0) {
      item.top -= 2 * item.top - item.size
      item.speedY *= -1
    }
  })
}
function countStyle (cells) {
  return cells.map(function (item, index) {
    return {
      left: item.left + 'px',
      top: item.top + 'px',
      width: item.size + 'px',
      height: item.size + 'px'
    }
  })
}
</script>

<style>
html {
  height: 100%;
  width: 100%;
}

body {
  width: 100%;
  margin: 0;
  position: absolute;
  border: 0px solid black;
/*  display: flex;
  align-items: center;
  justify-content: center;*/
  height: 100%;
}
.cells {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.cells .cell {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: green;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  transform: translate(-50%,-50%);
}
.cell p {
  color: white;
  text-align: center;
}
</style>
