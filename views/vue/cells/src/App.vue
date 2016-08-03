<template>
  <div class="cells">
    <span class="cell" v-for="item in count" :style="cellsStyle[$index]">
      <p class="index">{{ $index }}</p>
    </span>
    <pre>
      {{ cells | json }}
    </pre>
  </div>
</template>

<script>
var W = window.innerWidth
var H = window.innerHeight
export default {
  data () {
    return {
      count: 10,
      cells: []
    }
  },
  created () {
    for (var i = 0; i < 10; i++) {
      var size = Math.random() * 20 + 40
      var left = size / 2 + Math.random() * (W - size)
      var top = size / 2 + Math.random() * (H - size)
      this.cells.push({
        left,
        top,
        size
      })
    }
    window.setTimeout(function () {
      move(cells)
    })
  },
  computed: {
    cellsStyle () {
      console.log('computed')
      return this.cells.map(function (item, index) {
        return {
          left: item.left + 'px',
          top: item.top + 'px',
          width: item.size + 'px',
          height: item.size + 'px'
        }
      })
    }
  }
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
