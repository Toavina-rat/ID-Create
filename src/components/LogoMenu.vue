<!-- src/components/LogoMenu.vue -->
<template>
  <div class="logo-menu-container">
    <!-- Bouton MENU adaptatif -->
    <button 
      class="menu-toggle" 
      :class="{ 'menu-open': isOpen }"
      @click="toggleMenu"
    >
      <span class="menu-text desktop-only">{{ isOpen ? 'CLOSE' : 'MENU' }}</span>
      <span class="menu-icon">{{ isOpen ? '×' : '☰' }}</span>
    </button>

    <!-- Page complète qui s'affiche quand on clique sur MENU -->
    <transition name="page-slide">
      <div v-if="isOpen" class="fullscreen-menu-page">
        <!-- Arrière-plan avec 3 lignes de logos qui défilent -->
        <div class="background-marquee">
          <div class="marquee-container">
            <!-- LIGNE 1 - défile vers la gauche -->
            <div class="marquee-track" :style="marqueeStyle1">
              <div 
                v-for="(logo, index) in duplicatedLogos" 
                :key="'line1-' + index"
                class="marquee-logo"
              >
                <div class="logo-bg-wrapper">
                  <img :src="getLogoImage(logo)" :alt="logo" class="logo-bg-img">
                  <span class="logo-bg-name">{{ logo }}</span>
                </div>
              </div>
            </div>
            
            <!-- LIGNE 2 - défile vers la droite -->
            <div class="marquee-track reverse" :style="marqueeStyle2">
              <div 
                v-for="(logo, index) in duplicatedLogos" 
                :key="'line2-' + index"
                class="marquee-logo"
              >
                <div class="logo-bg-wrapper">
                  <img :src="getLogoImage(logo)" :alt="logo" class="logo-bg-img">
                  <span class="logo-bg-name">{{ logo }}</span>
                </div>
              </div>
            </div>
            
            <!-- LIGNE 3 - défile vers la gauche -->
            <div class="marquee-track" :style="marqueeStyle3">
              <div 
                v-for="(logo, index) in duplicatedLogos" 
                :key="'line3-' + index"
                class="marquee-logo"
              >
                <div class="logo-bg-wrapper">
                  <img :src="getLogoImage(logo)" :alt="logo" class="logo-bg-img">
                  <span class="logo-bg-name">{{ logo }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contenu de la page (par-dessus l'arrière-plan) -->
        <div class="page-content">
          <!-- Header -->
          <div class="content-header">
            <h1 class="main-title">NOS PARTENAIRES</h1>
            <p class="main-subtitle">Ils nous font confiance</p>
          </div>

          <!-- Navigation Links -->
          <div class="navigation-section">
            <h3 class="section-title">Navigation</h3>
            <div class="nav-links">
              <router-link to="/activities" class="nav-link" @click="closeMenu">
                <span class="nav-icon">📋</span>
                <span class="nav-text">Activities</span>
              </router-link>
              
              <router-link to="/contact" class="nav-link" @click="closeMenu">
                <span class="nav-icon">📬</span>
                <span class="nav-text">Contact</span>
              </router-link>
              
              <a href="#" class="nav-link" @click.prevent="openDevisModal">
                <span class="nav-icon">⚡</span>
                <span class="nav-text">Work with us</span>
                <span class="nav-badge">Devis</span>
              </a>
            </div>
          </div>

          <!-- Section des logos partenaires (défilement horizontal) -->
          <div class="partners-section">
            <h3 class="section-title">Nos partenaires</h3>
            <div class="logos-horizontal-scroll" ref="scrollContainer">
              <div class="logos-scroll-track" ref="scrollTrack">
                <div 
                  v-for="(logo, idx) in carouselLogos" 
                  :key="idx"
                  class="partner-logo-item"
                  @click="openPartnerLink(logo)"
                >
                  <div class="partner-logo-circle">
                    <img :src="getLogoImage(logo)" :alt="logo" class="partner-img">
                  </div>
                  <span class="partner-name">{{ logo }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Stats rapides -->
          <div class="stats-section">
            <div class="stat-card">
              <span class="stat-number">{{ partnerCount }}</span>
              <span class="stat-label">Partenaires</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">{{ uniqueSectors }}</span>
              <span class="stat-label">Secteurs</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">{{ internationalCount }}</span>
              <span class="stat-label">International</span>
            </div>
          </div>

          <!-- Footer avec lien de fermeture -->
          <div class="page-footer">
            <button class="close-page-btn" @click="closeMenu">
              ✕ Fermer
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal Demande de devis -->
    <transition name="modal">
      <div v-if="showDevisModal" class="modal-overlay" @click.self="closeDevisModal">
        <div class="modal-content">
          <h3>Demande de devis</h3>
          <form @submit.prevent="submitDevis">
            <div class="form-group">
              <label for="name">Nom / Société</label>
              <input type="text" id="name" v-model="devisForm.name" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="devisForm.email" required>
            </div>
            <div class="form-group">
              <label for="phone">Téléphone</label>
              <input type="tel" id="phone" v-model="devisForm.phone">
            </div>
            <div class="form-group">
              <label for="service">Service souhaité</label>
              <select id="service" v-model="devisForm.service" required>
                <option value="">Sélectionnez un service</option>
                <option value="conception">Conception</option>
                <option value="impression">Impression</option>
                <option value="evenementiel">Événementiel</option>
                <option value="goodies">Goodies</option>
                <option value="textile">Textile</option>
                <option value="plv">PLV</option>
              </select>
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" v-model="devisForm.message" rows="4" required></textarea>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-outline" @click="closeDevisModal">Annuler</button>
              <button type="submit" class="btn">Envoyer</button>
            </div>
          </form>
          <button class="modal-close" @click="closeDevisModal">×</button>
        </div>
      </div>
    </transition>

    <!-- Notification toast -->
    <transition name="toast">
      <div v-if="showToast" class="toast-notification" :class="toastType">
        {{ toastMessage }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'LogoMenu',
  props: {
    initialOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen: this.initialOpen,
      showDevisModal: false,
      showToast: false,
      toastMessage: '',
      toastType: 'success',
      animationFrame: null,
      carouselInterval: null,
      scrollPosition1: 0,
      scrollPosition2: 0,
      scrollPosition3: 0,
      
      devisForm: {
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      },
      
      // ============================================================
      // 🔧 MODIFIEZ ICI LA LISTE DES LOGOS (AJOUTEZ / SUPPRIMEZ)
      // ============================================================
      rawLogos: `UNICEF, PNUD, UNOPS, FAO, TANDAVANALA, SAHANALA, ADDEV, HELVETAS,
FISA, UK EMBASSY, TURKEY EMBASSY, BMOI, BNI, ACCESS BANK, SKILLZ,
PAMF, AQUAMAD, IZILI, CCIFM, ALFA CIMENT, KIBO, SANIFER, ZOMA MARKET,
HABIBO, WAKA, ZEBULON, MABEL, AGRIKOBA, AGRIFARM, PIQLA, ID RENTAL,
AXIAN, ORANGE, ORANGE BUSINESS SERVICES, SEM, TOM, TOA, GES,
MADAGASCO, STELLAR IX, CONNECTEO, YAS, AIRTEL, HONEY OF
MADAGASCAR, JB, OIM, SOCOLAIT, NATICS, KVM, CERNOL, CTL, AXIAN
UNIVERSITY, SGEM, UNITED MALAGASY, ALTHEA, HYGEA, PANAGORA, RAPIDE
SERVICES, BLUELINE, 2424.MG`,
      
      // ============================================================
      // 🔧 MODIFIEZ ICI LES URL DES IMAGES DES LOGOS
      // METTEZ LE CHEMIN VERS VOS IMAGES (ex: /images/unicef.png)
      // ============================================================
      logoImages: {
        'UNICEF': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/UNICEF_Logo.svg/200px-UNICEF_Logo.svg.png',
        'PNUD': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/UNDP_Logo.svg/200px-UNDP_Logo.svg.png',
        'UNOPS': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/UNOPS_logo.svg/200px-UNOPS_logo.svg.png',
        'FAO': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/FAO_logo.svg/200px-FAO_logo.svg.png',
        'OIM': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/IOM_logo.svg/200px-IOM_logo.svg.png',
        'HELVETAS': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Helvetas_logo.svg/200px-Helvetas_logo.svg.png',
        'FISA': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=FISA',
        'UK EMBASSY': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom.svg/200px-Flag_of_the_United_Kingdom.svg.png',
        'TURKEY EMBASSY': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/200px-Flag_of_Turkey.svg.png',
        'BMOI': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=BMOI',
        'BNI': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=BNI',
        'ACCESS BANK': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=ACCESS',
        'SKILLZ': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=SKILLZ',
        'TANDAVANALA': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=TANDAVANALA',
        'SAHANALA': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=SAHANALA',
        'ADDEV': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=ADDEV',
        'PAMF': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=PAMF',
        'AQUAMAD': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=AQUAMAD',
        'IZILI': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=IZILI',
        'CCIFM': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=CCIFM',
        'ALFA CIMENT': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=ALFA',
        'KIBO': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=KIBO',
        'SANIFER': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=SANIFER',
        'ZOMA MARKET': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=ZOMA',
        'HABIBO': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=HABIBO',
        'WAKA': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=WAKA',
        'ZEBULON': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=ZEBULON',
        'MABEL': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=MABEL',
        'AGRIKOBA': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=AGRIKOBA',
        'AGRIFARM': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=AGRIFARM',
        'PIQLA': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=PIQLA',
        'ID RENTAL': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=ID',
        'AXIAN': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=AXIAN',
        'ORANGE': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Orange_logo.svg/200px-Orange_logo.svg.png',
        'ORANGE BUSINESS SERVICES': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Orange_logo.svg/200px-Orange_logo.svg.png',
        'SEM': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=SEM',
        'TOM': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=TOM',
        'TOA': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=TOA',
        'GES': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=GES',
        'MADAGASCO': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=MADAGASCO',
        'STELLAR IX': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=STELLAR',
        'CONNECTEO': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=CONNECTEO',
        'YAS': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=YAS',
        'AIRTEL': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Airtel_Logo.svg/200px-Airtel_Logo.svg.png',
        'HONEY OF MADAGASCAR': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=HONEY',
        'JB': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=JB',
        'SOCOLAIT': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=SOCOLAIT',
        'NATICS': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=NATICS',
        'KVM': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=KVM',
        'CERNOL': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=CERNOL',
        'CTL': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=CTL',
        'AXIAN UNIVERSITY': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=AXIAN+U',
        'SGEM': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=SGEM',
        'UNITED MALAGASY': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=UNITED',
        'ALTHEA': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=ALTHEA',
        'HYGEA': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=HYGEA',
        'PANAGORA': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=PANAGORA',
        'RAPIDE SERVICES': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=RAPIDE',
        'BLUELINE': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=BLUELINE',
        '2424.MG': 'https://via.placeholder.com/80x80/f7b815/ffffff?text=2424'
      },
      
      // ============================================================
      // 🔧 MODIFIEZ ICI LES LIENS DES PARTENAIRES (CLIC SUR LOGO)
      // ============================================================
      partnerLinks: {
        'UNICEF': 'https://www.unicef.org',
        'PNUD': 'https://www.undp.org',
        'AXIAN': 'https://www.axian-group.com',
        'ORANGE': 'https://www.orange.com',
        'AIRTEL': 'https://www.airtel.com',
        'BMOI': 'https://www.bmoi.mg',
        'BNI': 'https://www.bni.mg',
        'FAO': 'https://www.fao.org',
        'HELVETAS': 'https://www.helvetas.org'
      }
    }
  },
  computed: {
    // Liste des logos
    logoList() {
      return this.rawLogos
        .split(',')
        .flatMap(item => item.split('\n'))
        .map(item => item.trim())
        .filter(item => item.length > 0);
    },
    
    // Pour le carrousel (logos en avant)
    carouselLogos() {
      return [...this.logoList, ...this.logoList, ...this.logoList];
    },
    
    // Pour l'arrière-plan (3 lignes)
    duplicatedLogos() {
      return [...this.logoList, ...this.logoList, ...this.logoList];
    },
    
    partnerCount() {
      return this.logoList.length;
    },
    
    marqueeStyle1() {
      return { transform: `translateX(-${this.scrollPosition1}px)` };
    },
    
    marqueeStyle2() {
      return { transform: `translateX(${this.scrollPosition2}px)` };
    },
    
    marqueeStyle3() {
      return { transform: `translateX(-${this.scrollPosition3}px)` };
    },
    
    uniqueSectors() {
      const sectors = new Set();
      this.logoList.forEach(logo => {
        if (logo.includes('BANK') || logo.includes('BNI') || logo.includes('BMOI') || logo.includes('ACCESS')) 
          sectors.add('Finance');
        else if (logo.includes('UN') || logo.includes('EMBASSY') || logo.includes('OIM') || logo.includes('FISA')) 
          sectors.add('Institution');
        else if (logo.includes('AXIAN') || logo.includes('ORANGE') || logo.includes('AIRTEL')) 
          sectors.add('Télécom');
        else if (logo.includes('CIMENT') || logo.includes('SANIFER') || logo.includes('KIBO')) 
          sectors.add('Industrie');
        else if (logo.includes('HONEY') || logo.includes('SOCOLAIT') || logo.includes('NATICS')) 
          sectors.add('Agro-alimentaire');
        else sectors.add('Entreprise');
      });
      return sectors.size;
    },
    
    internationalCount() {
      return this.logoList.filter(l => 
        l.includes('UK') || l.includes('TURKEY') || l.includes('UN') || 
        l.includes('ACCESS') || l.includes('HELVETAS') || l.includes('FISA')
      ).length;
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.startBackgroundMarquee();
        this.startCarousel();
        document.body.style.overflow = 'hidden';
      } else {
        this.stopBackgroundMarquee();
        this.stopCarousel();
        document.body.style.overflow = '';
      }
      this.$emit('toggle', newVal);
    }
  },
  mounted() {
    if (this.isOpen) {
      this.startBackgroundMarquee();
      this.startCarousel();
    }
  },
  beforeDestroy() {
    this.stopBackgroundMarquee();
    this.stopCarousel();
    document.body.style.overflow = '';
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    
    closeMenu() {
      this.isOpen = false;
    },
    
    openDevisModal() {
      this.showDevisModal = true;
    },
    
    closeDevisModal() {
      this.showDevisModal = false;
    },
    
    submitDevis() {
      this.showNotification('Demande envoyée avec succès!', 'success');
      this.devisForm = {
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      };
      this.closeDevisModal();
    },
    
    openPartnerLink(logo) {
      const link = this.partnerLinks[logo];
      if (link) {
        window.open(link, '_blank');
        this.showNotification(logo, 'success');
      } else {
        this.showNotification(`Aucun lien pour ${logo}`, 'error');
      }
    },
    
    getLogoImage(logo) {
      return this.logoImages[logo] || 'https://via.placeholder.com/80x80/cccccc/ffffff?text=Logo';
    },
    
    showNotification(message, type = 'success') {
      this.toastMessage = message;
      this.toastType = type;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 2000);
    },
    
    // Animation des 3 lignes en arrière-plan
    startBackgroundMarquee() {
      this.stopBackgroundMarquee();
      const animate = () => {
        this.scrollPosition1 += 0.7;
        this.scrollPosition2 += 0.5;
        this.scrollPosition3 += 0.9;
        
        const totalWidth = this.logoList.length * 280;
        if (this.scrollPosition1 >= totalWidth) this.scrollPosition1 = 0;
        if (this.scrollPosition2 >= totalWidth) this.scrollPosition2 = 0;
        if (this.scrollPosition3 >= totalWidth) this.scrollPosition3 = 0;
        
        this.animationFrame = requestAnimationFrame(animate);
      };
      this.animationFrame = requestAnimationFrame(animate);
    },
    
    stopBackgroundMarquee() {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
      }
    },
    
    // Animation du carrousel (logos en avant)
    startCarousel() {
      this.stopCarousel();
      this.carouselInterval = setInterval(() => {
        if (this.$refs.scrollTrack) {
          this.$refs.scrollTrack.scrollLeft += 1.2;
          if (this.$refs.scrollTrack.scrollLeft >= this.$refs.scrollTrack.scrollWidth / 3) {
            this.$refs.scrollTrack.scrollLeft = 0;
          }
        }
      }, 30);
    },
    
    stopCarousel() {
      if (this.carouselInterval) {
        clearInterval(this.carouselInterval);
        this.carouselInterval = null;
      }
    }
  }
}
</script>

<style scoped>
@import '/src/styles/logomenu.css'
</style>