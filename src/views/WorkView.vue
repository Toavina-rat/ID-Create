<template>
  <div class="work-page">
    <!-- Section des travaux -->
    <section class="featured-work">
      <div class="container">
        <h2 class="section-title">FEATURED WORK</h2>
        
        <div class="work-grid">
          <div v-for="(work, index) in featuredWorks" :key="index" 
               class="work-item" 
               :class="{ active: work.active }"
               @click="work.active = !work.active">
            <div class="work-image" :style="{ backgroundColor: work.color }">
              <span class="work-emoji">{{ work.emoji }}</span>
            </div>
            <div class="work-caption">
              <div class="work-client">{{ work.client }}</div>
              <div class="work-description">{{ work.description }}</div>
              <div class="work-testimonial">"{{ work.testimonial }}" - {{ work.avis }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'WorkView',
  data() {
    return {
      featuredWorks: [
        {
          client: 'UNICEF',
          description: 'Impression brochure, autocollant, bâche, 3D pion, confection sac',
          testimonial: 'Excellent travail',
          avis: 'Claudia',
          emoji: '📚',
          color: '#1e3a8a',
          active: false
        },
        {
          client: 'TANDAVANALA',
          description: 'Logo, objets promo, pochette, goodies, textile, PLV',
          testimonial: 'De la création du logo aux objets promotionnels',
          avis: 'Manantsoa',
          emoji: '🎨',
          color: '#92400e',
          active: false
        },
        {
          client: 'BMOI',
          description: 'Communication, affiche, goodies, personnalisation, PLV',
          testimonial: 'La communication qui s\'offre et s\'affiche',
          avis: 'Toky',
          emoji: '🏦',
          color: '#854d0e',
          active: false
        },
        {
          client: 'HONEY OF MADAGASCAR',
          description: 'Design, print, digital, événementiel, siteweb, salon',
          testimonial: 'Design, print, digital et événementiel réunis',
          avis: 'Rarivo',
          emoji: '🍯',
          color: '#b45309',
          active: false
        },
        {
          client: 'ALPHA CIMENT',
          description: 'Événementiel, production audiovisuelle, spot TV/Radio',
          testimonial: 'Événementiel et production audiovisuelle',
          avis: 'Ando',
          emoji: '🏗️',
          color: '#4b5563',
          active: false
        },
        {
          client: 'MADAGASCO',
          description: 'Identité visuelle, autocollant, papier, doypack, PLV',
          testimonial: 'Une identité déclinée sur tous les supports',
          avis: 'Toky',
          emoji: '🥭',
          color: '#b91c1c',
          active: false
        },
        {
          client: 'UK EMBASSY',
          description: 'Événementiel, expérience live',
          testimonial: 'Une réalisation d\'expérience live',
          avis: 'Donnovan, Soa',
          emoji: '🇬🇧',
          color: '#1e3a8a',
          active: false
        },
        {
          client: 'PANAGORA',
          description: 'Covering, branding',
          testimonial: 'Une marque en mouvement',
          avis: 'Anja / Sitraka',
          emoji: '🚗',
          color: '#6b21a8',
          active: false
        },
        {
          client: 'SOCOLAIT',
          description: 'PLV, réglette, oriflamme, gate banner, comptoir',
          testimonial: 'Une présence forte au cœur des rayons',
          avis: 'Ony, Joel',
          emoji: '🥛',
          color: '#92400e',
          active: false
        },
        {
          client: 'ORANGE BUSINESS SERVICES',
          description: 'Objets promo, PLV, goodies, impression, panier garni',
          testimonial: 'Activation de la marque',
          avis: 'Mikael',
          emoji: '📱',
          color: '#ea580c',
          active: false
        },
        {
          client: 'PNUD',
          description: 'Mug, pochette, impression, PLV',
          testimonial: 'Support de communication',
          avis: 'Mirija',
          emoji: '🌍',
          color: '#0284c7',
          active: false
        }
      ]
    }
  }
}
</script>

<style scoped>
.work-page {
  min-height: 100vh;
  padding-top: 80px;
  background: #fefefe;
}

.featured-work {
  padding: 80px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 48px;
  font-weight: 800;
  margin: 0 0 50px;
  color: #3b3b3b;
  position: relative;
  display: inline-block;
}

.section-title::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 50%;
  width: 10px;
  height: 10px;
  background: #f7b815;
  border-radius: 50%;
  transform: translateY(-50%);
}

.work-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.work-item {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  cursor: pointer;
  transition: transform 0.3s ease;
  height: 250px;
}

.work-item:hover {
  transform: translateY(-5px);
}

.work-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: grayscale(100%);
  transition: filter 0.5s ease;
}

.work-item.active .work-image {
  filter: grayscale(0%);
}

.work-emoji {
  font-size: 64px;
}

.work-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  color: white;
  padding: 30px 20px 20px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.work-item:hover .work-caption {
  transform: translateY(0);
}

.work-client {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
  color: #f7b815;
}

.work-description {
  font-size: 12px;
  opacity: 0.9;
  margin-bottom: 10px;
}

.work-testimonial {
  font-style: italic;
  font-size: 11px;
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: 36px;
  }
  
  .work-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 28px;
  }
}
</style>