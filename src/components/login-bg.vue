<template>
<div class="login-bg">
	<div id="particlesJS"></div>
</div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
.login-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    canvas {
        width: 100%;
        height: 100%;
    }
}
</style>
<script type="text/ecmascript-6">
  require('particles.js')
  export default {
    data () {
      return {
        msg: 'hello vue',
        canvas: {
          particles: {
            number: {
              // 粒子的数量
              value: 80,
              // 粒子的稀密程度
              density: {
                // 启用粒子的稀密程度(true 或 false)
                enable: true,
                // 每一个粒子占据的空间（启用粒子密度，才可用）
                value_area: 800
              }
            },
            color: {
              // 粒子的颜色 （支持16进制'#b61924'，rgb'{r:182, g:25, b:36}'，hsl，以及random）
              value: '#666'
            },
            shape: {
              // 粒子的形状 （”circle” “edge” “triangle” “polygon” “star” “image”）
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000'
              }
            },
            opacity: {
              // 粒子的透明度
              value: 0.3,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
              }
            },
            size: {
              value: 5,
              random: true,
              anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: true
              }
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#666',
              opacity: 0.4,
              width: 1
            },
            move: {
              speed: 6
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'repulse'
              },
              onclick: {
                enable: true,
                mode: 'push'
              },
              resize: true
            }
          },
          retina_detect: true
        }
      }
    },
    components: {

    },
    created () {

    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        particlesJS('particlesJS', this.canvas)
      }
    }
  }
</script>
