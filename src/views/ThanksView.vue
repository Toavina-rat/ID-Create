<template>
  <div class="thanks-page">
    <!-- Bannière de remerciements -->
    <div class="thanks-banner">
      <div class="thanks-marquee">
        <div class="thanks-content">
          <span v-for="(thank, index) in thanksList" :key="index" class="thanks-item">
            <span class="thanks-lang">{{ thank.lang }}</span>
            <span class="thanks-word">{{ thank.word }}</span>
            <span class="thanks-arrow">→</span>
          </span>
          <span v-for="(thank, index) in thanksList" :key="'dup-'+index" class="thanks-item">
            <span class="thanks-lang">{{ thank.lang }}</span>
            <span class="thanks-word">{{ thank.word }}</span>
            <span class="thanks-arrow">→</span>
          </span>
        </div>
      </div>
    </div>

    <!-- Navigation vers les autres pages -->
    <div class="navigation-section">
      <div class="container">
        <h1 class="section-title">All Work</h1>
        
        <div class="nav-cards">
          <router-link to="/" class="nav-card">
            <span class="nav-icon">🏠</span>
            <span class="nav-text">Home</span>
            <span class="nav-arrow">→</span>
          </router-link>

          <router-link to="/activities" class="nav-card">
            <span class="nav-icon">⚡</span>
            <span class="nav-text">Activites</span>
            <span class="nav-arrow">→</span>
          </router-link>

          <router-link to="/contact" class="nav-card">
            <span class="nav-icon">📞</span>
            <span class="nav-text">Contact</span>
            <span class="nav-arrow">→</span>
          </router-link>
        </div>

        <!-- Section des remerciements détaillés -->
        <div class="thanks-detailed">
          <h2 class="thanks-title">Merci du monde entier</h2>
          
          <div class="thanks-grid">
            <div v-for="(thank, index) in thanksDetailed" :key="index" class="thanks-card">
              <div class="thank-flag">{{ thank.flag }}</div>
              <div class="thank-lang">{{ thank.lang }}</div>
              <div class="thank-original">{{ thank.original }}</div>
              <div class="thank-arrow">→</div>
              <div class="thank-translation">{{ thank.translation }}</div>
              <div v-if="thank.note" class="thank-note">{{ thank.note }}</div>
            </div>
          </div>
        </div>

        <!-- Message de fin -->
        <div class="closing-message">
          <p>Merci à tous nos clients et partenaires à travers le monde</p>
          <div class="heart-decoration">❤️</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThanksView',
  data() {
    return {
      // Liste pour la bannière défilante
      thanksList: [
        { lang: 'MALGACHE', word: 'Misaotra' },
        { lang: 'ALLEMAND', word: 'Danke' },
        { lang: 'ANGLAIS', word: 'Thank you' },
        { lang: 'ESPAGNOL', word: 'Gracias' },
        { lang: 'ITALIEN', word: 'Grazie' },
        { lang: 'PORTUGAIS', word: 'Obrigado / Obrigada' },
        { lang: 'RUSSE', word: 'Спасибо' },
        { lang: 'GREC', word: 'Ευχαριστώ' },
        { lang: 'TURC', word: 'Teşekkür ederim' },
        { lang: 'NÉERLANDAIS', word: 'Dank je / Dank u' }
      ],
      // Liste détaillée pour la grille
      thanksDetailed: [
        { flag: '🇲🇬', lang: 'Malgache', original: 'Salama', translation: 'Misaotra', note: '' },
        { flag: '🇩🇪', lang: 'Allemand', original: 'Hallo', translation: 'Danke', note: '' },
        { flag: '🇬🇧', lang: 'Anglais', original: 'Hello', translation: 'Thank you', note: '' },
        { flag: '🇪🇸', lang: 'Espagnol', original: 'Hola', translation: 'Gracias', note: '' },
        { flag: '🇮🇹', lang: 'Italien', original: 'Ciao', translation: 'Grazie', note: '' },
        { flag: '🇵🇹', lang: 'Portugais', original: 'Olá', translation: 'Obrigado', note: 'homme' },
        { flag: '🇵🇹', lang: 'Portugais', original: 'Olá', translation: 'Obrigada', note: 'femme' },
        { flag: '🇷🇺', lang: 'Russe', original: 'Здравствуйте', translation: 'Спасибо', note: '' },
        { flag: '🇬🇷', lang: 'Grec', original: 'Καλημέρα', translation: 'Ευχαριστώ', note: '' },
        { flag: '🇹🇷', lang: 'Turc', original: 'Merhaba', translation: 'Teşekkür ederim', note: '' },
        { flag: '🇳🇱', lang: 'Néerlandais', original: 'Goedemorgen', translation: 'Dank je', note: 'informel' },
        { flag: '🇳🇱', lang: 'Néerlandais', original: 'Goedemorgen', translation: 'Dank u', note: 'formel' }
      ]
    }
  }
}
</script>

<style scoped>
.thanks-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #fefefe 0%, #fff9e6 100%);
  padding-top: 80px;
}

/* Bannière de remerciements */
.thanks-banner {
  background: linear-gradient(90deg, #f7b815, #ffd966);
  padding: 20px 0;
  overflow: hidden;
  position: relative;
  border-bottom: 3px solid #3b3b3b;
  border-top: 3px solid #3b3b3b;
  margin-bottom: 60px;
}

.thanks-marquee {
  overflow: hidden;
}

.thanks-content {
  display: flex;
  animation: scrollThanks 40s linear infinite;
  white-space: nowrap;
}

.thanks-item {
  display: inline-flex;
  align-items: center;
  margin-right: 40px;
  font-size: 18px;
  font-weight: 600;
}

.thanks-lang {
  background: #3b3b3b;
  color: #f7b815;
  padding: 6px 15px;
  border-radius: 25px;
  font-size: 14px;
  margin-right: 12px;
}

.thanks-word {
  color: #3b3b3b;
  font-size: 18px;
  margin-right: 12px;
}

.thanks-arrow {
  color: #3b3b3b;
  font-size: 20px;
  font-weight: 800;
}

/* Navigation */
.navigation-section {
  padding: 40px 0 80px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 64px;
  font-weight: 800;
  color: #3b3b3b;
  margin-bottom: 50px;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '→';
  position: absolute;
  right: -60px;
  top: 50%;
  transform: translateY(-50%);
  color: #f7b815;
  font-size: 48px;
  animation: arrowMove 1s ease-in-out infinite;
}

.nav-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 80px;
}

.nav-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  text-decoration: none;
  color: #3b3b3b;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.nav-card:hover {
  transform: translateY(-10px);
  border-color: #f7b815;
  box-shadow: 0 20px 40px rgba(247, 184, 21, 0.2);
}

.nav-icon {
  font-size: 48px;
}

.nav-text {
  font-size: 28px;
  font-weight: 700;
}

.nav-arrow {
  font-size: 32px;
  color: #f7b815;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.3s ease;
}

.nav-card:hover .nav-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Grille des remerciements */
.thanks-detailed {
  margin: 80px 0;
}

.thanks-title {
  font-size: 42px;
  font-weight: 700;
  color: #3b3b3b;
  text-align: center;
  margin-bottom: 50px;
  position: relative;
}

.thanks-title::before,
.thanks-title::after {
  content: '✨';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 32px;
  color: #f7b815;
}

.thanks-title::before {
  left: 20%;
}

.thanks-title::after {
  right: 20%;
}

.thanks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}

.thanks-card {
  background: white;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #eee;
  position: relative;
  overflow: hidden;
}

.thanks-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #f7b815, #ffd966);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

.thanks-card:hover::before {
  transform: translateX(0);
}

.thanks-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(247, 184, 21, 0.15);
}

.thank-flag {
  font-size: 48px;
  margin-bottom: 10px;
}

.thank-lang {
  font-size: 18px;
  font-weight: 600;
  color: #3b3b3b;
  margin-bottom: 15px;
}

.thank-original {
  font-size: 24px;
  font-weight: 500;
  color: #666;
  margin-bottom: 10px;
}

.thank-arrow {
  font-size: 24px;
  color: #f7b815;
  margin: 10px 0;
}

.thank-translation {
  font-size: 28px;
  font-weight: 700;
  color: #3b3b3b;
  margin-bottom: 10px;
}

.thank-note {
  font-size: 12px;
  color: #f7b815;
  font-style: italic;
  background: #fefefe;
  padding: 4px 8px;
  border-radius: 15px;
  display: inline-block;
}

/* Message de fin */
.closing-message {
  text-align: center;
  margin-top: 80px;
  padding: 40px;
  background: #3b3b3b;
  border-radius: 30px;
  color: white;
}

.closing-message p {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
}

.heart-decoration {
  font-size: 48px;
  animation: heartBeat 1.5s ease-in-out infinite;
}

/* Animations */
@keyframes scrollThanks {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes arrowMove {
  0%, 100% { transform: translateY(-50%) translateX(0); }
  50% { transform: translateY(-50%) translateX(10px); }
}

@keyframes heartBeat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1); }
  75% { transform: scale(1.1); }
}

/* Responsive */
@media (max-width: 992px) {
  .thanks-title::before,
  .thanks-title::after {
    display: none;
  }
  
  .section-title {
    font-size: 48px;
  }
  
  .section-title::after {
    font-size: 36px;
    right: -40px;
  }
}

@media (max-width: 768px) {
  .nav-cards {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 36px;
    display: block;
    text-align: center;
  }
  
  .section-title::after {
    position: relative;
    right: 0;
    display: inline-block;
    margin-left: 15px;
  }
  
  .thanks-item {
    font-size: 14px;
  }
  
  .thanks-lang {
    font-size: 11px;
    padding: 4px 10px;
  }
  
  .thanks-word {
    font-size: 14px;
  }
  
  .closing-message p {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .thanks-grid {
    grid-template-columns: 1fr;
  }
  
  .thanks-card {
    padding: 20px;
  }
}
</style>