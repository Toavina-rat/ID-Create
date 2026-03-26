<template>
  <div class="page-transition" :class="{ 'is-active': isActive }">
    <div class="transition-overlay"></div>
    <div class="logo-container">
      <div class="logo-wrapper" :class="{ 'spin': isSpinning }">
        <span class="logo-id">iD</span>
        <span class="logo-creative">-creative</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTransition',
  data() {
    return {
      isActive: false,
      isSpinning: false
    }
  },
  methods: {
    startTransition() {
      return new Promise((resolve) => {
        this.isActive = true
        this.isSpinning = true
        
        // Attendre la fin de l'animation
        setTimeout(() => {
          resolve()
        }, 1200)
      })
    },
    endTransition() {
      setTimeout(() => {
        this.isSpinning = false
        this.isActive = false
      }, 200)
    }
  }
}
</script>

<style scoped>
@import '/src/styles/transition.css'
</style>