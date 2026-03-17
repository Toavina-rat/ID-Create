<template>
  <div class="activities-page">
    <!-- <Greeting /> -->
    
    <div class="container">
      <h1 class="section-title">NOS ACTIVITÉS</h1>
      
      <div class="services-grid">
        <div v-for="service in services" :key="service.name" class="service-card">
          <div class="service-icon">{{ service.icon }}</div>
          <h3 class="service-title">{{ service.name }}</h3>
          <p class="service-desc">{{ service.description }}</p>
        </div>
      </div>

      <div class="clients-section">
        <h2>Ils nous ont fait confiance</h2>
        <div class="clients-grid">
          <span v-for="client in clients" :key="client" class="client-tag">
            {{ client }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Greeting from '../components/Greeting.vue'
export default {
  name: 'ActivitiesView',
  components: {
    Greeting
  },
  data() {
    return {
      services: [
        { icon: '🎨', name: 'Conception', description: 'Logo, identité visuelle, design graphique' },
        { icon: '🖨️', name: 'Impression', description: 'Affiche, brochure, autocollant, bâche' },
        { icon: '🎪', name: 'Événementiel', description: 'Salon, PLV, covering, organisation' },
        { icon: '📦', name: 'Goodies', description: 'Stylo, gourde, porte-clé, totebag' },
        { icon: '👕', name: 'Textile', description: 'Totebag, gilet, personnalisation' },
        { icon: '🏷️', name: 'PLV', description: 'Enseigne, comptoir, îlot, réglette' }
      ],
      clients: [
        'NATICS', 'SANIFER', 'TALYS', 'INVISIO', 'BNI', 'ALTHEA', 'KVM',
        'Vahatra', 'METROPOLE', 'AXIAN', 'Kaid', 'Woogle', 'Ecusson',
        'Mohamed', 'Nanah', 'Christopher', 'Ando', 'Aina', 'Aristide',
        'Kiran Metha', 'Vahatra', 'Anja', 'Saraha'
      ]
    }
  }
}
</script>

<style scoped>
.activities-page {
  padding: 0 0 60px;
  min-height: 100vh;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

.section-title {
  font-size: 48px;
  font-weight: 800;
  margin: 100px 0 50px;
  color: var(--gray);
  position: relative;
  display: block;
  width: 100%;
  padding-left: 30px;
  word-break: break-word;
  white-space: normal;
  overflow: visible;
  clear: both;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 10px;
  height: 10px;
  background: var(--yellow);
  border-radius: 50%;
  transform: translateY(-50%);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  margin-bottom: 60px;
}

.service-card {
  background: var(--white);
  padding: 30px 20px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease;
  border: 1px solid #eee;
}

.service-card:hover {
  transform: translateY(-10px);
  border-color: var(--yellow);
}

.service-icon {
  width: 70px;
  height: 70px;
  background: var(--yellow);
  border-radius: 50%;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: var(--gray);
}

.service-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--gray);
}

.service-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.clients-section {
  margin-top: 60px;
}

.clients-section h2 {
  font-size: 32px;
  margin-bottom: 30px;
  color: var(--gray);
}

.clients-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.client-tag {
  background: var(--yellow);
  color: var(--gray);
  padding: 8px 20px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 14px;
  transition: transform 0.3s ease;
}

.client-tag:hover {
  transform: scale(1.05);
}

@media (min-width: 1200px) {
  .section-title {
    margin: 100px 0 50px;
  }
}

@media (max-width: 1199px) and (min-width: 993px) {
  .section-title {
    font-size: 44px;
    margin: 110px 0 45px;
    padding-left: 30px;
  }
}

@media (max-width: 992px) and (min-width: 769px) {
  .activities-page {
    padding-top: 20px;
  }

  .section-title {
    font-size: 42px;
    margin: 130px 0 40px; 
    padding-left: 30px;
    display: block;
    width: 100%;
    color: var(--gray);
    opacity: 1;
    visibility: visible;
  }

  .section-title::before {
    width: 10px;
    height: 10px;
    background: var(--yellow);
  }

  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .clients-section h2 {
    font-size: 30px;
  }
}

@media (max-width: 768px) {
  .activities-page {
    padding-top: 30px;
  }

  .section-title {
    font-size: 36px;
    margin: 140px 0 30px;
    padding-left: 25px;
    text-align: left;
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    color: var(--gray);
    opacity: 1;
    visibility: visible;
  }
  
  .section-title::before {
    width: 10px;
    height: 10px;
    background: var(--yellow);
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .clients-section h2 {
    font-size: 28px;
    text-align: center;
  }
  
  .clients-grid {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .activities-page {
    padding-top: 40px;
  }

  .section-title {
    font-size: 32px;
    margin: 150px 0 25px;
    padding-left: 20px;
  }
}

@media (max-width: 380px) {
  .section-title {
    font-size: 28px;
    margin: 160px 0 20px;
  }
}
</style>