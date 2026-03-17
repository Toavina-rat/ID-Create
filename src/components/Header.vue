<template>
  <header class="header">
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
      isScrolled: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(254, 254, 254, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(247, 184, 21, 0.1);
}

.header.scrolled {
  padding: 5px 0;
  background: rgba(254, 254, 254, 0.98);
  box-shadow: 0 2px 20px rgba(0,0,0,0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  position: relative;
}

/* Menu à gauche */
.menu {
  display: flex;
  gap: 30px;
  flex: 1;
}

.menu a {
  text-decoration: none;
  color: #3b3b3b;
  font-weight: 500;
  font-size: 16px;
  position: relative;
  padding: 5px 0;
  transition: color 0.3s ease;
}

.menu a:hover {
  color: #f7b815;
}

.menu a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #f7b815;
  transition: width 0.3s ease;
}

.menu a:hover::after,
.menu a.active::after {
  width: 100%;
}

.menu a.active {
  color: #f7b815;
  font-weight: 600;
}

/* Logo container */
.logo-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.logo-with-small {
  display: flex;
  align-items: center;
  gap: 15px; /* Espace entre le grand logo et le petit logo */
}

.logo-wrapper {
  text-decoration: none;
  display: flex;
  align-items: baseline;
  font-size: 32px;
  font-weight: 800;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.logo-wrapper:hover {
  transform: scale(1.05);
}

.logo-id {
  color: #f7b815;
  font-size: 42px;
  letter-spacing: -2px;
  text-shadow: 0 0 10px rgba(247, 184, 21, 0.5);
  animation: logoPulse 2s ease-in-out infinite;
  position: relative;
}

.logo-id::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: radial-gradient(circle, rgba(247,184,21,0.2) 0%, transparent 70%);
  border-radius: 50%;
  z-index: -1;
  animation: glowExpand 2s ease-in-out infinite;
}

.logo-creative {
  color: #3b3b3b;
  font-size: 32px;
  margin-left: 2px;
}

/* Petit logo juste à côté du grand titre */
.small-logo {
  display: flex;
  align-items: center;
}

.small-logo-wrapper {
  text-decoration: none;
  position: relative;
}

.small-logo-text {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #f7b815, #ffd966);
  color: #3b3b3b;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: 800;
  font-size: 22px;
  box-shadow: 0 4px 15px rgba(247, 184, 21, 0.3);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
}

.small-logo-text::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.small-logo-wrapper:hover .small-logo-text {
  transform: rotate(360deg) scale(1.1);
  box-shadow: 0 8px 25px rgba(247, 184, 21, 0.6);
}

.small-logo-wrapper:hover .small-logo-text::before {
  opacity: 1;
  animation: rotate 3s linear infinite;
}

.small-logo-tooltip {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: #3b3b3b;
  color: #f7b815;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  pointer-events: none;
}

.small-logo-tooltip::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #3b3b3b;
}

.small-logo-wrapper:hover .small-logo-tooltip {
  opacity: 1;
  visibility: visible;
  bottom: -40px;
}

.slogan {
  font-size: 11px;
  color: #3b3b3b;
  opacity: 0.7;
  letter-spacing: 1px;
  margin-top: 2px;
  font-style: italic;
  position: relative;
  background: rgba(247, 184, 21, 0.1);
  padding: 2px 10px;
  border-radius: 20px;
  white-space: nowrap;
}

/* Espace vide à droite pour équilibrer */
.right-spacer {
  flex: 1;
  visibility: hidden;
}

/* Conteneur de guirlande */
.garland-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* Éclaire jaune en mode animée guirlande */
.garland-light {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f7b815;
  box-shadow: 0 0 15px #f7b815, 0 0 30px #f7b815;
  animation: garland 1.5s ease-in-out infinite;
  opacity: 0.6;
}

/* Animations */
@keyframes logoPulse {
  0%, 100% {
    text-shadow: 0 0 10px rgba(247, 184, 21, 0.5);
    transform: scale(1);
  }
  50% {
    text-shadow: 0 0 30px rgba(247, 184, 21, 0.9), 0 0 50px rgba(247, 184, 21, 0.5);
    transform: scale(1.05);
  }
}

@keyframes glowExpand {
  0%, 100% {
    transform: scale(1);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.4;
  }
}

@keyframes garland {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
    box-shadow: 0 0 10px #f7b815;
  }
  50% {
    opacity: 1;
    transform: scale(1.8);
    box-shadow: 0 0 30px #f7b815, 0 0 50px #f7b815;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Animation de flottement pour les lumières */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.garland-light {
  animation: garland 1.5s ease-in-out infinite, float 2s ease-in-out infinite;
}

/* Responsive */
@media (max-width: 992px) {
  .header-content {
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .menu {
    order: 2;
    justify-content: center;
    margin-top: 5px;
    flex: 0 0 100%;
  }
  
  .logo-container {
    order: 1;
    flex: 1;
  }
  
  .right-spacer {
    display: none; /* Cache l'espaceur sur tablette et mobile */
  }
  
  .menu a {
    font-size: 14px;
  }
  
  .garland-light {
    width: 5px;
    height: 5px;
  }
  
  .logo-with-small {
    gap: 10px;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 10px;
  }
  
  .menu {
    order: 2;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .logo-id {
    font-size: 32px;
  }
  
  .logo-creative {
    font-size: 24px;
  }
  
  .slogan {
    font-size: 10px;
    padding: 2px 8px;
  }
  
  .small-logo-text {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  
  .logo-with-small {
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .menu {
    gap: 10px;
  }
  
  .menu a {
    font-size: 12px;
  }
  
  .logo-id {
    font-size: 28px;
  }
  
  .logo-creative {
    font-size: 20px;
  }
  
  .slogan {
    font-size: 9px;
  }
  
  .small-logo-text {
    width: 35px;
    height: 35px;
    font-size: 18px;
  }
  
  .logo-with-small {
    gap: 5px;
  }
}
</style>