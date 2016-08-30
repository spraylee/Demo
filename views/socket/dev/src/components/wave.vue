<template>
  <a @click="click">
    <p>
      <slot name="default">按钮</slot>
    </p>
  </a>
</template>

<script>
function Waves(DOM, type, color, active, baseColor) {
  var waves = {};
  var type = type;
  var color = color;
  var baseColor = baseColor || '#eee';
  var duration = '1s';
  var active = active || false;
  if (type === 'checkbox') {
    DOM.style.backgroundColor = active ? color : baseColor;
  }

  function destory(id) {
    delete waves[id];
    DOM.removeChild(document.getElementById(id));
  }
  function justKeep(id) {
    var keep = null;
    for (let i in waves) {
      if (i === id) {
        var keep = waves[i];
        break;
      } else {
        delete waves[i];
        DOM.removeChild(document.getElementById(i));
      }
    }
    // waves = {};
    // waves[id] = keep;
  }
  function addDom(wave) {
    var dom = window.document.createElement('div');
    dom.classList.add('colorWaveArea');
    dom.id = wave.id;
    waves[wave.id] = wave;
    waves[wave.id].dom = dom;
    var width = window.getComputedStyle(DOM, null).width.split('px')[0];
    var height = window.getComputedStyle(DOM, null).width.split('px')[0];
    var max = Math.max(width, height);
    dom.style.width  = max * 2 + 'px';
    dom.style.height = max * 2 + 'px';
    dom.style.left = wave.x - max + 'px';
    dom.style.top  = wave.y - max + 'px';
    dom.style.transform = 'scale(0)';
    dom.style.webkitTransform = 'scale(0)';
    dom.style.backgroundColor = wave.colorFrom;
    dom.style.opacity = 1;
    dom.style.transition = 'all ' + wave.duration / 1000 + 's';
    dom.style.webkitTransition = 'all ' + wave.duration / 1000 + 's';
    DOM.appendChild(dom);
    window.requestAnimationFrame(() => {
      dom.style.transform = 'scale(1)';
    });
    window.setTimeout(() => {
      dom.style.opacity = wave.isFade ? 0 : 1;
      dom.style.backgroundColor = wave.colorTo;
    }, wave.duration / 4);
  }


  function Wave() {
  }
  Wave.prototype = {
    init(colorFrom, colorTo, isFade , x, y, duration) {
      this.id = 'wave' + new Date().getTime();
      this.colorFrom = colorFrom;
      this.colorTo = colorTo;
      this.isFade = isFade;
      this.x = x;
      this.y = y;
      if (duration.match(/s$/)) {
        duration = duration.split('s')[0] * 1000;
      }
      this.duration = duration;
      addDom(this);

      if (type === 'default') {
        window.setTimeout(() => {
          destory(this.id);
        }, duration * 1.25);
      } else if (type === 'checkbox') {
        window.setTimeout(() => {
          justKeep(this.id);
          console.dir('change');
        }, duration);
      }

      return this;
    }
  }


  return {
    create(x, y) {
      if (type === 'default') {
        let isFade = true;
        let colorFrom = color;
        let colorTo = baseColor;
        let thisWave = new Wave().init(colorFrom, colorTo, isFade , x, y, duration);
      } else if (type === 'checkbox') {
        let isFade = false;
        let colorFrom = color;
        let colorTo = baseColor;
        active = !active;
        if (active) {
          let thisWave = new Wave().init(colorFrom, colorFrom, isFade , x, y, duration);
        } else {
          let thisWave = new Wave().init(colorTo, colorTo, isFade , x, y, duration);
        }
      }
    }
  };
}

  export default {
    data() {
      return {
        x: '',
        y: '',
        opacity: '',
        width: '',
        height: '',
        isAnimation: true,
        parentTransform: '',
        waves: {}
      };
    },
    props: ['type', 'color', 'active', 'base'],
    ready() {
      var type = this.type || 'default';
      var color = this.color || 'green';
      var baseColor = this.base || {};
      var active = this.active || false;
      this.waves = new Waves(this.$el, type, color, active, baseColor);
    },
    methods: {
      click(event) {
        var x = event.offsetX;
        var y = event.offsetY;
        this.waves.create(x, y);
      }
    }
  };
</script>

<style>
  .colorWaveArea {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
  }
</style>

<style scoped>
  a {
    overflow: hidden;
    position: relative;
    /*width: 400px;*/
    transform: scale(1);
    cursor: pointer;
  }
  .color {
    border-radius: 50%;
    position: absolute;
    opacity: 1;
    color: green;
    transform: translate(-50%, -50%) scale(0);
    background-color: green;
  }
  .animation {
    transition: opacity 1s, transform 1s;
    opacity: 0.2;
    pointer-events: none;
  }
  p {
    pointer-events: none;
    margin: 0;
    padding: 0;
    font-size: inherit;
    position: relative;
    z-index: 10;
    color: inherit;
  }
</style>