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
@import '/src/styles/home.css';
</style>