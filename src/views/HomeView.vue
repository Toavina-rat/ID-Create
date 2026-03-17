<template>
  <div class="home">
    <!-- Section d'accueil avec animation -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="hero-id">iD</span>
            <span class="hero-creative">-creative</span>
          </h1>
          <p class="hero-slogan">« Animez votre publicité »</p>
          
          <!-- Animation de guirlande -->
          <div class="hero-garland">
            <div class="garland-particle" v-for="n in 20" :key="n" 
                 :style="{
                   left: Math.random() * 100 + '%',
                   top: Math.random() * 100 + '%',
                   animationDelay: Math.random() * 3 + 's',
                   animationDuration: 2 + Math.random() * 2 + 's'
                 }">
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
/* Empêcher le scroll sur toute la page */
.home {
  height: 100vh;
  overflow: hidden;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}

/* Hero Section */
.hero-section {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #fefefe 0%, #fff5e0 100%);
  /* Supprimer margin-top qui cause le décalage */
  margin-top: 0;
}

.hero-content {
  text-align: center;
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 120px;
  font-weight: 800;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-wrap: wrap;
}

.hero-id {
  color: #f7b815;
  animation: heroPulse 2s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(247, 184, 21, 0.5);
}

.hero-creative {
  color: #3b3b3b;
  margin-left: 10px;
}

.hero-slogan {
  font-size: 24px;
  color: #3b3b3b;
  opacity: 0.8;
  font-style: italic;
  letter-spacing: 2px;
  position: relative;
  display: inline-block;
}

.hero-slogan::before,
.hero-slogan::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 50px;
  height: 2px;
  background: #f7b815;
}

.hero-slogan::before {
  left: -70px;
}

.hero-slogan::after {
  right: -70px;
}

/* Animation de guirlande */
.hero-garland {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.garland-particle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #f7b815;
  border-radius: 50%;
  box-shadow: 0 0 20px #f7b815;
  animation: floatParticle 3s ease-in-out infinite;
  opacity: 0.6;
}

/* Animations */
@keyframes heroPulse {
  0%, 100% {
    text-shadow: 0 0 20px rgba(247, 184, 21, 0.5);
    transform: scale(1);
  }
  50% {
    text-shadow: 0 0 50px rgba(247, 184, 21, 0.9), 0 0 80px rgba(247, 184, 21, 0.5);
    transform: scale(1.05);
  }
}

@keyframes floatParticle {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-30px) scale(1.5);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 60px;
  }
  
  .hero-slogan {
    font-size: 18px;
  }
  
  .hero-slogan::before,
  .hero-slogan::after {
    width: 30px;
  }
  
  .hero-slogan::before {
    left: -40px;
  }
  
  .hero-slogan::after {
    right: -40px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 40px;
  }
  
  .hero-creative {
    margin-left: 5px;
  }
  
  .hero-slogan {
    font-size: 14px;
  }
}
</style>