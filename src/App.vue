<template>
  <div id="app">
    <!-- Composant d'ouverture -->
    <GreetingOpening 
      v-if="showGreeting" 
      @closed="showGreeting = false"
      :duration="10000"
    />
    
    <div class="custom-cursor" :style="{ left: cursorX + 'px', top: cursorY + 'px' }"></div>
    <div class="cursor-flash" :style="{ left: cursorX + 'px', top: cursorY + 'px' }"></div>
    
    <AppHeader />
    
    <!-- Contenu principal avec effet de flou quand le menu est ouvert -->
    <div class="main-content" :class="{ 'menu-open': isMenuOpen }">
      <router-view />
    </div>
    
    <AppFooter />
    <ScrollToTop />
    
    <!-- Menu latéral avec logos -->
    <LogoMenu @toggle="handleMenuToggle" />
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import AppFooter from './components/Footer.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import GreetingOpening from './components/GreetingOpening.vue'
import LogoMenu from './components/LogoMenu.vue' // Import du nouveau menu

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    ScrollToTop,
    GreetingOpening,
    LogoMenu // Ajout du composant
  },
  data() {
    return {
      cursorX: 0,
      cursorY: 0,
      showGreeting: true, // Afficher la bannière d'ouverture
      isMenuOpen: false // Nouvel état pour le menu
    }
  },
  mounted() {
    document.addEventListener('mousemove', this.onMouseMove)
  },
  beforeUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove)
  },
  methods: {
    onMouseMove(e) {
      this.cursorX = e.clientX
      this.cursorY = e.clientY
    },
    handleMenuToggle(isOpen) {
      this.isMenuOpen = isOpen;
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  background-color: #fefefe;
  cursor: none;
  overflow-x: hidden;
}

:root {
  --yellow: #f7b815;
  --gray: #3b3b3b;
  --white: #fefefe;
  --black: #1a1a1a;
}

.custom-cursor {
  width: 20px;
  height: 20px;
  border: 2px solid var(--yellow);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease;
  transform: translate(-50%, -50%);
}

.cursor-flash {
  width: 40px;
  height: 40px;
  background: var(--yellow);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.3;
  filter: blur(4px);
  transform: translate(-50%, -50%);
  animation: cursorPulse 2s infinite;
}

@keyframes cursorPulse {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.1; transform: translate(-50%, -50%) scale(1.5); }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Effet de flou quand le menu est ouvert */
.main-content.menu-open {
  filter: blur(3px);
  transition: filter 0.3s ease;
  pointer-events: none;
}
</style>