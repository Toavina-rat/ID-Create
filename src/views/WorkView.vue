<template>
  <div class="work-page">
    <!-- Section des travaux -->
    <section class="featured-work">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">FEATURED WORK</h2>
        </div>
        
        <div class="work-list">
          <div v-for="(work, index) in displayedWorks" :key="index" 
               class="work-item" 
               :class="{ active: work.active }"
               data-aos="fade-up"
               :data-aos-delay="index * 100"
               @click="work.active = !work.active">
            
            <!-- Partie gauche : description -->
            <div class="work-info">
              <div class="work-client">{{ work.client }}</div>
              <div class="work-description">{{ work.description }}</div>
              <div class="work-testimonial" v-if="work.testimonial">
                <span class="quote-icon">"</span>
                {{ work.testimonial }}
                <span class="quote-icon">"</span>
              </div>
              <div class="work-avis" v-if="work.avis">— {{ work.avis }}</div>
              <div class="work-tags" v-if="work.tags && work.tags.length">
                <span v-for="(tag, tagIndex) in work.tags" :key="tagIndex" class="tag">
                  {{ tag }}
                </span>
              </div>
              <button class="work-detail-btn" @click.stop="openWorkModal(work)">
                Voir le projet
                <span class="btn-arrow">→</span>
              </button>
            </div>
            
            <!-- Partie droite : média (image/vidéo/logo) -->
            <div class="work-media" :style="{ backgroundColor: work.color }">
              <div class="media-content">
                <!-- Image -->
                <div v-if="work.imageUrl && !work.videoUrl" class="image-container">
                  <img :src="work.imageUrl" :alt="work.client" class="work-image">
                  <div class="image-overlay">
                    <span class="view-icon">🔍</span>
                  </div>
                </div>
                
                <!-- Vidéo -->
                <div v-else-if="work.videoUrl" class="video-container">
                  <video 
                    :src="work.videoUrl" 
                    class="work-video"
                    muted
                    loop
                    playsinline
                    @mouseenter="playVideo"
                    @mouseleave="pauseVideo"
                    ref="videos">
                    Your browser does not support the video tag.
                  </video>
                  <div class="video-play-hint">
                    <span>▶</span>
                  </div>
                </div>
                
                <!-- Emoji par défaut si pas d'image/vidéo -->
                <span v-else class="work-emoji">{{ work.emoji }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Bouton ALL en bas -->
        <div class="all-button-container" data-aos="fade-up">
          <button class="show-all-btn" @click="showAllWorks = !showAllWorks">
            {{ showAllWorks ? 'SHOW LESS' : 'ALL' }}
          </button>
        </div>
      </div>
    </section>
    
    <!-- Modal pour voir les détails du projet -->
    <transition name="modal">
      <div v-if="selectedWork" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <button class="modal-close" @click="closeModal">×</button>
          <div class="modal-media">
            <img v-if="selectedWork.imageUrl" :src="selectedWork.imageUrl" :alt="selectedWork.client">
            <video v-else-if="selectedWork.videoUrl" :src="selectedWork.videoUrl" controls autoplay></video>
            <div v-else class="modal-emoji">{{ selectedWork.emoji }}</div>
          </div>
          <div class="modal-info">
            <h3>{{ selectedWork.client }}</h3>
            <p class="modal-desc">{{ selectedWork.description }}</p>
            <div class="modal-testimonial" v-if="selectedWork.testimonial">
              <span class="quote-icon">"</span>
              {{ selectedWork.testimonial }}
              <span class="quote-icon">"</span>
            </div>
            <div class="modal-avis" v-if="selectedWork.avis">— {{ selectedWork.avis }}</div>
            <div class="modal-tags" v-if="selectedWork.tags">
              <span v-for="tag in selectedWork.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <button class="btn-contact" @click="contactForProject">Demander un devis</button>
          </div>
        </div>
      </div>
    </transition>
    
    <Thanks />
  </div>
</template>

<script>
import Thanks from '../components/Thanks.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  name: 'WorkView',
  components: {
    Thanks
  },
  data() {
    return {
      showAllWorks: false,
      selectedWork: null,
      
      // ============================================================
      // 🔧 MODIFIEZ ICI LES PROJETS (AJOUTEZ / MODIFIEZ / SUPPRIMEZ)
      // ============================================================
      featuredWorks: [
        {
          client: 'UNICEF',
          description: 'Impression brochure, autocollant, bâche, 3D pion, confection sac',
          testimonial: 'Excellent travail, professionnalisme et créativité',
          avis: 'Claudia - UNICEF',
          emoji: '📚',
          // 🔧 METTEZ ICI LE CHEMIN DE VOTRE IMAGE
          imageUrl: 'https://via.placeholder.com/500x400/f7b815/ffffff?text=UNICEF+Project',
          // 🔧 OU METTEZ ICI LE CHEMIN DE VOTRE VIDEO (prioritaire)
          videoUrl: null,
          color: '#1e3a8a',
          active: false,
          tags: ['Print', '3D', 'Textile']
        },
        {
          client: 'TANDAVANALA',
          description: 'Logo, objets promo, pochette, goodies, textile, PLV',
          testimonial: 'De la création du logo aux objets promotionnels, un travail remarquable',
          avis: 'Manantsoa - TANDAVANALA',
          emoji: '🎨',
          imageUrl: 'https://via.placeholder.com/500x400/f7b815/ffffff?text=TANDAVANALA',
          videoUrl: null,
          color: '#92400e',
          active: false,
          tags: ['Logo', 'Goodies', 'Textile']
        },
        {
          client: 'BMOI',
          description: 'Communication, affiche, goodies, personnalisation, PLV',
          testimonial: 'La communication qui s\'offre et s\'affiche avec élégance',
          avis: 'Toky - BMOI',
          emoji: '🏦',
          imageUrl: 'https://via.placeholder.com/500x400/f7b815/ffffff?text=BMOI',
          videoUrl: null,
          color: '#854d0e',
          active: false,
          tags: ['Communication', 'Affiche', 'PLV']
        },
        {
          client: 'HONEY OF MADAGASCAR',
          description: 'Design, print, digital, événementiel, siteweb, salon',
          testimonial: 'Design, print, digital et événementiel réunis avec brio',
          avis: 'Rarivo - HONEY',
          emoji: '🍯',
          imageUrl: 'https://via.placeholder.com/500x400/f7b815/ffffff?text=HONEY',
          videoUrl: null,
          color: '#b45309',
          active: false,
          tags: ['Design', 'Digital', 'Event']
        },
        {
          client: 'ALPHA CIMENT',
          description: 'Événementiel, production audiovisuelle, spot TV/Radio',
          testimonial: 'Événementiel et production audiovisuelle de qualité',
          avis: 'Ando - ALPHA CIMENT',
          emoji: '🏗️',
          imageUrl: 'https://via.placeholder.com/500x400/f7b815/ffffff?text=ALPHA+CIMENT',
          videoUrl: null,
          color: '#4b5563',
          active: false,
          tags: ['Event', 'TV', 'Radio']
        },
        {
          client: 'MADAGASCO',
          description: 'Identité visuelle, autocollant, papier, doypack, PLV',
          testimonial: 'Une identité déclinée sur tous les supports avec cohérence',
          avis: 'Toky - MADAGASCO',
          emoji: '🥭',
          imageUrl: 'https://via.placeholder.com/500x400/f7b815/ffffff?text=MADAGASCO',
          videoUrl: null,
          color: '#b91c1c',
          active: false,
          tags: ['Branding', 'Packaging', 'PLV']
        },
        {
          client: 'UK EMBASSY',
          description: 'Événementiel, expérience live',
          testimonial: 'Une réalisation d\'expérience live mémorable',
          avis: 'Donnovan, Soa - UK Embassy',
          emoji: '🇬🇧',
          imageUrl: 'https://via.placeholder.com/500x400/f7b815/ffffff?text=UK+EMBASSY',
          videoUrl: null,
          color: '#1e3a8a',
          active: false,
          tags: ['Event', 'Live Experience']
        },
        {
          client: 'PANAGORA',
          description: 'Covering, branding',
          testimonial: 'Une marque en mouvement, un covering exceptionnel',
          avis: 'Anja / Sitraka - PANAGORA',
          emoji: '🚗',
          imageUrl: 'https://via.placeholder.com/500x400/f7b815/ffffff?text=PANAGORA',
          videoUrl: null,
          color: '#6b21a8',
          active: false,
          tags: ['Covering', 'Branding']
        },
        {
          client: 'SOCOLAIT',
          description: 'PLV, réglette, oriflamme, gate banner, comptoir',
          testimonial: 'Une présence forte au cœur des rayons',
          avis: 'Ony, Joel - SOCOLAIT',
          emoji: '🥛',
          imageUrl: 'https://via.placeholder.com/500x400/f7b815/ffffff?text=SOCOLAIT',
          videoUrl: null,
          color: '#92400e',
          active: false,
          tags: ['PLV', 'Display']
        },
        {
          client: 'ORANGE BUSINESS SERVICES',
          description: 'Objets promo, PLV, goodies, impression, panier garni',
          testimonial: 'Activation de la marque réussie',
          avis: 'Mikael - OBS',
          emoji: '📱',
          imageUrl: 'https://via.placeholder.com/500x400/f7b815/ffffff?text=ORANGE',
          videoUrl: null,
          color: '#ea580c',
          active: false,
          tags: ['Promo', 'Goodies', 'PLV']
        },
        {
          client: 'PNUD',
          description: 'Mug, pochette, impression, PLV',
          testimonial: 'Support de communication efficace',
          avis: 'Mirija - PNUD',
          emoji: '🌍',
          imageUrl: 'https://via.placeholder.com/500x400/f7b815/ffffff?text=PNUD',
          videoUrl: null,
          color: '#0284c7',
          active: false,
          tags: ['Print', 'PLV']
        }
      ]
    }
  },
  computed: {
    displayedWorks() {
      if (this.showAllWorks) {
        return this.featuredWorks;
      }
      return this.featuredWorks.slice(0, 4);
    }
  },
  mounted() {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  },
  methods: {
    playVideo(event) {
      const video = event.target;
      video.play();
    },
    pauseVideo(event) {
      const video = event.target;
      video.pause();
      video.currentTime = 0;
    },
    openWorkModal(work) {
      this.selectedWork = work;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.selectedWork = null;
      document.body.style.overflow = '';
    },
    contactForProject() {
      this.closeModal();
      this.$router.push('/contact');
    }
  }
}
</script>

<style scoped>
@import '/src/styles/work.css';
</style>