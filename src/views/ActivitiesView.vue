<template>
  <div class="activities-page">
    <div class="container">
      <h1 class="section-title" data-aos="fade-up">NOS ACTIVITÉS</h1>
      
      <!-- Services en lignes avec animations -->
      <div class="services-list">
        <div 
          v-for="(service, index) in services" 
          :key="service.name" 
          class="service-row"
          :class="{ 'reverse': index % 2 === 1 }"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="service-image" data-aos="zoom-in" :data-aos-delay="index * 100 + 50">
            <div class="image-wrapper">
              <span class="service-icon-large">{{ service.icon }}</span>
              <div class="image-overlay"></div>
            </div>
          </div>
          <div class="service-content" data-aos="fade-left" :data-aos-delay="index * 100 + 100">
            <div class="service-number">{{ (index + 1).toString().padStart(2, '0') }}</div>
            <h3 class="service-title">{{ service.name }}</h3>
            <p class="service-desc">{{ service.description }}</p>
            <div class="service-features">
              <span v-for="feature in service.features" :key="feature" class="feature-tag">
                {{ feature }}
              </span>
            </div>
            <button class="service-btn" @click="showServiceDetails(service)">
              En savoir plus
              <span class="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Section clients avec animation -->
      <div class="clients-section" data-aos="fade-up" data-aos-delay="600">
        <h2>Ils nous ont fait confiance</h2>
        <div class="clients-marquee">
          <div class="clients-track" ref="clientsTrack">
            <span v-for="client in duplicatedClients" :key="client" class="client-tag">
              {{ client }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <Thanks />
    
    <!-- Modal détails service -->
    <transition name="modal">
      <div v-if="selectedService" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content" data-aos="zoom-in">
          <button class="modal-close" @click="closeModal">×</button>
          <div class="modal-icon">{{ selectedService.icon }}</div>
          <h3>{{ selectedService.name }}</h3>
          <p>{{ selectedService.description }}</p>
          <div class="modal-features">
            <h4>Prestations incluses :</h4>
            <ul>
              <li v-for="feature in selectedService.features" :key="feature">
                {{ feature }}
              </li>
            </ul>
          </div>
          <button class="btn-contact" @click="contactService">Demander un devis</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Thanks from '../components/Thanks.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  name: 'ActivitiesView',
  components: {
    Thanks
  },
  data() {
    return {
      selectedService: null,
      marqueeInterval: null,
      scrollPosition: 0,
      
      services: [
        { 
          icon: '🎨', 
          name: 'Conception', 
          description: 'Création d\'identité visuelle unique et percutante pour votre marque',
          features: ['Logo', 'Identité visuelle', 'Design graphique', 'Charte graphique', 'Packaging']
        },
        { 
          icon: '🖨️', 
          name: 'Impression', 
          description: 'Impression haut de gamme sur tous supports avec un rendu exceptionnel',
          features: ['Affiche', 'Brochure', 'Autocollant', 'Bâche', 'Flyer', 'Carte de visite']
        },
        { 
          icon: '🎪', 
          name: 'Événementiel', 
          description: 'Organisation complète d\'événements professionnels et privatifs',
          features: ['Salon', 'PLV', 'Covering', 'Stand personnalisé', 'Signalétique']
        },
        { 
          icon: '📦', 
          name: 'Goodies', 
          description: 'Articles personnalisés pour renforcer votre image de marque',
          features: ['Stylo', 'Gourde', 'Porte-clé', 'Tote bag', 'Mug', 'Power bank']
        },
        { 
          icon: '👕', 
          name: 'Textile', 
          description: 'Personnalisation textile pour uniformes et vêtements promotionnels',
          features: ['Tote bag', 'Gilet', 'T-shirt', 'Polo', 'Veste', 'Casquette']
        },
        { 
          icon: '🏷️', 
          name: 'PLV', 
          description: 'Solutions de publicité sur lieu de vente sur mesure',
          features: ['Enseigne', 'Comptoir', 'Îlot', 'Réglette', 'Présentoir', 'Totem']
        }
      ],
      
      clients: [
        'NATICS', 'SANIFER', 'TALYS', 'INVISIO', 'BNI', 'ALTHEA', 'KVM',
        'Vahatra', 'METROPOLE', 'AXIAN', 'Kaid', 'Woogle', 'Ecusson',
        'Mohamed', 'Nanah', 'Christopher', 'Ando', 'Aina', 'Aristide',
        'Kiran Metha', 'Anja', 'Saraha', 'UNICEF', 'PNUD', 'ORANGE',
        'AIRTEL', 'BMOI', 'ACCESS BANK', 'ZOMA MARKET', 'HABIBO'
      ]
    }
  },
  computed: {
    duplicatedClients() {
      return [...this.clients, ...this.clients, ...this.clients];
    }
  },
  mounted() {
    this.startClientsMarquee();
    // Initialisation AOS (animation au scroll)
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  },
  beforeDestroy() {
    this.stopClientsMarquee();
  },
  methods: {
    showServiceDetails(service) {
      this.selectedService = service;
      document.body.style.overflow = 'hidden';
    },
    
    closeModal() {
      this.selectedService = null;
      document.body.style.overflow = '';
    },
    
    contactService() {
      this.closeModal();
      // Rediriger vers la page de contact ou ouvrir le modal de devis
      this.$router.push('/contact');
    },
    
    startClientsMarquee() {
      this.stopClientsMarquee();
      this.marqueeInterval = setInterval(() => {
        if (this.$refs.clientsTrack) {
          this.$refs.clientsTrack.scrollLeft += 1;
          if (this.$refs.clientsTrack.scrollLeft >= this.$refs.clientsTrack.scrollWidth / 3) {
            this.$refs.clientsTrack.scrollLeft = 0;
          }
        }
      }, 30);
    },
    
    stopClientsMarquee() {
      if (this.marqueeInterval) {
        clearInterval(this.marqueeInterval);
        this.marqueeInterval = null;
      }
    }
  }
}
</script>

<style scoped>
@import '/src/styles/activities.css';
</style>