<template>
  <Transition name="fade">
    <button 
      v-if="showButton" 
      @click="scrollToTop" 
      class="scroll-to-top"
      :style="{ backgroundColor: isHovered ? '#f7b815' : '#3b3b3b' }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      aria-label="Retour en haut"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        :stroke="isHovered ? '#3b3b3b' : '#f7b815'"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  </Transition>
</template>

<script>
export default {
  name: 'ScrollToTop',
  data() {
    return {
      showButton: false,
      isHovered: false,
      scrollThreshold: 10 // Seuil très bas : 10px de scroll suffisent
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    // Vérifier immédiatement si la page est déjà scrollée
    this.handleScroll()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      // Afficher le bouton dès que le scroll est > 10px
      this.showButton = window.scrollY > this.scrollThreshold
      console.log('Scroll position:', window.scrollY, 'Show button:', this.showButton) // Pour déboguer
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped>
@import '/src/styles/scrollTo.css'
</style>