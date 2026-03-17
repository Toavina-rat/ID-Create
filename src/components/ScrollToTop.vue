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
.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 1000;
  outline: none;
}

.scroll-to-top:hover {
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 6px 20px rgba(247, 184, 21, 0.4);
}

/* Animation d'entrée/sortie */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Animation de pulsation au premier affichage */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(247, 184, 21, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(247, 184, 21, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(247, 184, 21, 0);
  }
}

.scroll-to-top {
  animation: pulse 2s 1;
}

/* Version mobile */
@media (max-width: 768px) {
  .scroll-to-top {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
  }
}
</style>