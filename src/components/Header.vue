<template>
  <header class="header" :class="{ 'header-hidden': isHeaderHidden, 'scrolled': isScrolled }">
    <div class="container">
      <div class="header-content">
        <!-- Menu à gauche -->
        <nav class="menu">
          <router-link to="/" :class="{ active: $route.path === '/' }">
            <span class="menu-text">Home</span>
          </router-link>
          <router-link to="/work" :class="{ active: $route.path === '/work' }">
            <span class="menu-text">Featured Work</span>
          </router-link>
          <router-link to="/activities" :class="{ active: $route.path === '/activities' }">
            <span class="menu-text">Activites</span>
          </router-link>
          <router-link to="/contact" :class="{ active: $route.path === '/contact' }">
            <span class="menu-text">Contact</span>
          </router-link>
        </nav>

        <!-- Logo ID-CREATIVE au centre avec slogan en bas et petit logo à côté -->
        <div class="logo-container">
          <div class="logo-with-small">
            <router-link to="/" class="logo-wrapper">
              <span class="logo-id">ID</span>
              <span class="logo-creative">-CREATIVE</span>
            </router-link>
            
            <!-- Petit logo juste à côté du grand titre -->
            <div class="small-logo">
              <router-link to="/" class="small-logo-wrapper">
                <span class="small-logo-text">iD</span>
                <span class="small-logo-tooltip">Accueil</span>
              </router-link>
            </div>
          </div>
          
          <div class="slogan">« Animez votre publicité »</div>
          
          <!-- Éclaire jaune en mode animée guirlande (amélioré) -->
          <div class="garland-container">
            <div class="garland-light" v-for="n in 8" :key="n" 
                 :style="{
                   top: Math.random() * 20 - 10 + 'px',
                   left: Math.random() * 100 + '%',
                   animationDelay: Math.random() * 2 + 's',
                   animationDuration: 1.5 + Math.random() * 1 + 's'
                 }">
            </div>
          </div>
        </div>

        <!-- Espace vide à droite pour équilibrer (invisible) -->
        <div class="right-spacer"></div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isScrolled: false,
      isHeaderHidden: false,
      lastScrollPosition: 0,
      scrollThreshold: 50
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.checkScrollPosition()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const currentScrollPos = window.pageYOffset
      
      // Vérifier si on a scrollé
      if (currentScrollPos > this.scrollThreshold) {
        this.isScrolled = true
      } else {
        this.isScrolled = false
      }
      
      // Masquer le header quand on scroll vers le bas, révéler quand on scroll vers le haut
      if (currentScrollPos > this.lastScrollPosition && currentScrollPos > 100) {
        // Scroll vers le bas - masquer le header
        this.isHeaderHidden = true
      } else {
        // Scroll vers le haut - révéler le header
        this.isHeaderHidden = false
      }
      
      this.lastScrollPosition = currentScrollPos
    },
    checkScrollPosition() {
      // Vérifier la position initiale
      if (window.pageYOffset > this.scrollThreshold) {
        this.isScrolled = true
      }
    }
  }
}
</script>

<style scoped>
@import '/src/styles/header.css'
</style>