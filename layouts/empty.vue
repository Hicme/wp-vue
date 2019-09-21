<template>
  <div>
    <transition :name="transitionName" mode="out-in">
      <nuxt />
    </transition>
  </div>
</template>

<script>
const DEFAULT_TRANSITION = 'slide'

export default {
  data() {
    return {
      transitionName: DEFAULT_TRANSITION
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = 'fade'
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      if (toDepth < fromDepth) {
        transitionName = 'slide-right'
      }
      if (toDepth > fromDepth) {
        transitionName = 'slide-left'
      }

      this.transitionName = transitionName || DEFAULT_TRANSITION

      next()
    })
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 1s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 1s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>
