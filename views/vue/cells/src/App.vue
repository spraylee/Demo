<template>
  <div class="cells">
    <span class="cell" v-for="index in count" :style="left: {{ cells[index][left] + 'px' }};top:{{ cells[index][top] + 'px'}};">
      <p class="index">{{ index }}</p>
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
      count: 1,
      cells: []
    }
  },
  created () {
    for (var i = 0; i < 10; i++) {
      this.cells.push({
        left: W * Math.random(),
        top: H * Math.random()
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
  position: relative;
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
}
.cell p {
  color: white;
  text-align: center;
}
</style>
