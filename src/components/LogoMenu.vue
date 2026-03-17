<!-- src/components/LogoMenu.vue -->
<template>
  <div class="logo-menu-container">
    <!-- Bouton MENU adaptatif -->
    <button 
      class="menu-toggle" 
      :class="{ 'menu-open': isOpen }"
      @click="toggleMenu"
    >
      <!-- Le texte n'apparaît que sur desktop -->
      <span class="menu-text desktop-only">{{ isOpen ? 'CLOSE' : 'MENU' }}</span>
      <span class="menu-icon">{{ isOpen ? '×' : '☰' }}</span>
    </button>

    <!-- Menu latéral avec animation livre -->
    <transition name="book-animation">
      <div v-if="isOpen" class="logo-sidebar">
        <!-- Header du sidebar avec titre -->
        <div class="sidebar-header">
          <h2 class="sidebar-title">NOS PARTENAIRES</h2>
          <p class="sidebar-subtitle">Ils nous font confiance</p>
        </div>

        <!-- Navigation Links -->
        <div class="sidebar-nav">
          <h3 class="nav-title">Navigation</h3>
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
              <span class="nav-badge">Demande de devis</span>
            </a>
          </div>
        </div>

        <!-- Zone de défilement des logos -->
        <div class="logos-marquee-container" ref="marqueeContainer">
          <div class="logos-marquee" :style="marqueeStyle">
            <div 
              v-for="(logo, index) in duplicatedLogos" 
              :key="index"
              class="marquee-item"
            >
              <div class="logo-placeholder">
                <span class="logo-icon">{{ getLogoIcon(logo) }}</span>
              </div>
              <span class="logo-name">{{ logo }}</span>
            </div>
          </div>
        </div>

        <!-- Stats rapides -->
        <div class="sidebar-footer">
          <div class="stat-item">
            <span class="stat-value">{{ partnerCount }}</span>
            <span class="stat-label">Partenaires</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ uniqueSectors }}</span>
            <span class="stat-label">Secteurs</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ internationalCount }}</span>
            <span class="stat-label">International</span>
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
              <button type="submit" class="btn">Envoyer la demande</button>
            </div>
          </form>
          <button class="modal-close" @click="closeDevisModal">×</button>
        </div>
      </div>
    </transition>

    <!-- Overlay sombre quand le menu est ouvert -->
    <transition name="fade">
      <div v-if="isOpen" class="menu-overlay" @click="closeMenu"></div>
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
      scrollPosition: 0,
      
      devisForm: {
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      },
      
      rawLogos: `UNICEF, PNUD, UNOPS, FAO, TANDAVANALA, SAHANALA, ADDEV, HELVETAS,
FISA, UK EMBASSY, TURKEY EMBASSY, BMOI, BNI, ACCESS BANK, SKILLZ,
PAMF, AQUAMAD, IZILI, CCIFM, ALFA CIMENT, KIBO, SANIFER, ZOMA MARKET,
HABIBO, WAKA, ZEBULON, MABEL, AGRIKOBA, AGRIFARM, PIQLA, ID RENTAL,
AXIAN, ORANGE, ORANGE BUSINESS SERVICES, SEM, TOM, TOA, GES,
MADAGASCO, STELLAR IX, CONNECTEO, YAS, AIRTEL, HONEY OF
MADAGASCAR, JB, OIM, SOCOLAIT, NATICS, KVM, CERNOL, CTL, AXIAN
UNIVERSITY, SGEM, UNITED MALAGASY, ALTHEA, HYGEA, PANAGORA, RAPIDE
SERVICES, BLUELINE, 2424.MG`,
      
      // Icônes par catégorie
      iconMap: {
        // Institutions / ONG
        'UNICEF': '🌍',
        'PNUD': '🤝',
        'UNOPS': '🏗️',
        'FAO': '🌾',
        'OIM': '🚶',
        'HELVETAS': '🏔️',
        'FISA': '⚖️',
        'UK EMBASSY': '👑',
        'TURKEY EMBASSY': '🕌',
        
        // Banques / Finance
        'BMOI': '🏦',
        'BNI': '💰',
        'ACCESS BANK': '💳',
        'SKILLZ': '🎯',
        
        // Entreprises locales
        'TANDAVANALA': '🌿',
        'SAHANALA': '🌱',
        'ADDEV': '⚙️',
        'PAMF': '🛡️',
        'AQUAMAD': '💧',
        'IZILI': '🧴',
        'CCIFM': '🤝',
        'ALFA CIMENT': '🏭',
        'KIBO': '🛒',
        'SANIFER': '🧹',
        'ZOMA MARKET': '🏪',
        'HABIBO': '🍫',
        'WAKA': '🚀',
        'ZEBULON': '🦓',
        'MABEL': '👗',
        'AGRIKOBA': '🌽',
        'AGRIFARM': '🚜',
        'PIQLA': '📱',
        'ID RENTAL': '🚗',
        
        // Télécoms / Tech
        'AXIAN': '📡',
        'ORANGE': '📱',
        'ORANGE BUSINESS SERVICES': '💼',
        'SEM': '🔧',
        'TOM': '🎵',
        'TOA': '🎨',
        'GES': '🔌',
        'MADAGASCO': '📊',
        'STELLAR IX': '✨',
        'CONNECTEO': '🔗',
        'YAS': '⚡',
        'AIRTEL': '📶',
        
        // Agro-alimentaire
        'HONEY OF MADAGASCAR': '🍯',
        'SOCOLAIT': '🍫',
        'NATICS': '🥤',
        
        // Éducation / Services
        'KVM': '💻',
        'CERNOL': '⚛️',
        'CTL': '🔬',
        'AXIAN UNIVERSITY': '🎓',
        'SGEM': '📈',
        'UNITED MADAGASY': '🤝',
        'ALTHEA': '🌺',
        'HYGEA': '🧼',
        'PANAGORA': '🏛️',
        'RAPIDE SERVICES': '⚡',
        'BLUELINE': '🔵',
        '2424.MG': '📱',
        'JB': '👔'
      }
    }
  },
  computed: {
    logoList() {
      return this.rawLogos
        .split(',')
        .flatMap(item => item.split('\n'))
        .map(item => item.trim())
        .filter(item => item.length > 0);
    },
    
    partnerCount() {
      return this.logoList.length;
    },
    
    // Dupliquer les logos pour un défilement infini
    duplicatedLogos() {
      return [...this.logoList, ...this.logosList, ...this.logoList, ...this.logoList];
    },
    
    // Style pour l'animation de défilement
    marqueeStyle() {
      return {
        transform: `translateX(-${this.scrollPosition}px)`
      };
    },
    
    // Stats calculées
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
        this.startMarquee();
        document.body.style.overflow = 'hidden';
      } else {
        this.stopMarquee();
        document.body.style.overflow = '';
      }
      
      this.$emit('toggle', newVal);
    }
  },
  mounted() {
    if (this.isOpen) {
      this.startMarquee();
    }
  },
  beforeDestroy() {
    this.stopMarquee();
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
      document.body.style.overflow = 'hidden';
    },
    
    closeDevisModal() {
      this.showDevisModal = false;
      document.body.style.overflow = '';
    },
    
    submitDevis() {
      console.log('Formulaire soumis:', this.devisForm);
      this.showNotification('Demande envoyée avec succès!', 'success');
      this.devisForm = {
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      };
      this.closeDevisModal();
      this.closeMenu();
    },
    
    showNotification(message, type = 'success') {
      this.toastMessage = message;
      this.toastType = type;
      this.showToast = true;
      
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },
    
    startMarquee() {
      this.stopMarquee();
      
      const animate = () => {
        this.scrollPosition += 0.8;
        
        // Réinitialiser quand on a défilé un jeu complet
        const itemWidth = 220;
        const singleSetWidth = itemWidth * this.logoList.length;
        if (this.scrollPosition >= singleSetWidth * 2) {
          this.scrollPosition = 0;
        }
        
        this.animationFrame = requestAnimationFrame(animate);
      };
      
      this.animationFrame = requestAnimationFrame(animate);
    },
    
    stopMarquee() {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
      }
    },
    
    getLogoIcon(logo) {
      return this.iconMap[logo] || '📌';
    }
  }
}
</script>

<style scoped>
.menu-toggle {
  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 1001;
  background: #f7b815;
  color: #3b3b3b;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(247, 184, 21, 0.3);
  transition: all 0.3s ease;
}

.menu-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(247, 184, 21, 0.4);
}

.menu-toggle.menu-open {
  background: #3b3b3b;
  color: #fefefe;
}

.menu-icon {
  font-size: 24px;
  line-height: 1;
}

.menu-text {
  letter-spacing: 1px;
}

/* Cache le texte sur mobile */
@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }
  
  .menu-toggle {
    padding: 12px 16px; /* Réduit le padding horizontal sur mobile */
  }
}

/* Animation livre */
.book-animation-enter-active,
.book-animation-leave-active {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.book-animation-enter-from {
  transform: translateX(100%) rotateY(-90deg);
}

.book-animation-enter-to {
  transform: translateX(0) rotateY(0);
}

.book-animation-leave-from {
  transform: translateX(0) rotateY(0);
}

.book-animation-leave-to {
  transform: translateX(100%) rotateY(90deg);
}

.logo-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 600px;
  height: 100vh;
  background: linear-gradient(135deg, #fefefe 0%, #f8f8f8 100%);
  z-index: 1000;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
  padding: 30px;
  display: flex;
  flex-direction: column;
  border-left: 3px solid #f7b815;
  transform-origin: right center;
  backface-visibility: hidden;
}

.sidebar-header {
  margin-bottom: 20px;
  text-align: center;
}

.sidebar-title {
  font-size: 28px;
  font-weight: 800;
  color: #3b3b3b;
  margin-bottom: 5px;
  line-height: 1.2;
  position: relative;
  display: inline-block;
}

.sidebar-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: #f7b815;
  border-radius: 3px;
}

.sidebar-subtitle {
  color: #f7b815;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 1px;
  margin-top: 10px;
}

/* Navigation */
.sidebar-nav {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px dashed rgba(247, 184, 21, 0.2);
}

.nav-title {
  font-size: 14px;
  font-weight: 600;
  color: #f7b815;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  background: rgba(247, 184, 21, 0.05);
  border-radius: 12px;
  text-decoration: none;
  color: #3b3b3b;
  transition: all 0.3s ease;
  border: 1px solid rgba(247, 184, 21, 0.1);
}

.nav-link:hover {
  background: #f7b815;
  transform: translateX(5px);
  border-color: #f7b815;
}

.nav-link:hover .nav-text,
.nav-link:hover .nav-icon {
  color: #3b3b3b;
}

.nav-icon {
  font-size: 20px;
  color: #f7b815;
  transition: color 0.3s ease;
}

.nav-text {
  font-weight: 600;
  font-size: 15px;
  transition: color 0.3s ease;
}

.nav-badge {
  margin-left: auto;
  font-size: 10px;
  background: #3b3b3b;
  color: #f7b815;
  padding: 3px 8px;
  border-radius: 20px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.nav-link:hover .nav-badge {
  background: #fefefe;
  color: #3b3b3b;
}

.logos-marquee-container {
  flex: 1;
  overflow: hidden;
  position: relative;
  background: rgba(247, 184, 21, 0.03);
  border-radius: 20px;
  padding: 20px 0;
  margin: 10px 0;
  border: 1px solid rgba(247, 184, 21, 0.1);
}

.logos-marquee {
  display: flex;
  gap: 15px;
  white-space: nowrap;
  will-change: transform;
  padding: 0 10px;
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 20px 8px 12px;
  background: #fefefe;
  border: 2px solid rgba(247, 184, 21, 0.2);
  border-radius: 50px;
  font-weight: 600;
  color: #3b3b3b;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
}

.marquee-item:hover {
  background: #f7b815;
  border-color: #f7b815;
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 8px 20px rgba(247, 184, 21, 0.3);
}

.logo-placeholder {
  width: 32px;
  height: 32px;
  background: rgba(247, 184, 21, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.3s ease;
}

.marquee-item:hover .logo-placeholder {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.logo-icon {
  line-height: 1;
}

.logo-name {
  font-weight: 600;
}

.sidebar-footer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: auto;
  padding-top: 20px;
  border-top: 2px dashed rgba(247, 184, 21, 0.3);
}

.stat-item {
  text-align: center;
  padding: 8px;
  background: rgba(247, 184, 21, 0.05);
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-3px);
  background: rgba(247, 184, 21, 0.1);
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: 800;
  color: #f7b815;
  line-height: 1;
  margin-bottom: 3px;
}

.stat-label {
  font-size: 10px;
  color: #3b3b3b;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 999;
  transition: opacity 0.3s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: #fefefe;
  padding: 30px;
  border-radius: 30px;
  max-width: 500px;
  width: 90%;
  position: relative;
  border: 3px solid #f7b815;
  box-shadow: 0 30px 40px -20px #f7b815;
}

.modal-content h3 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #3b3b3b;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #3b3b3b;
  font-size: 13px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px 15px;
  border: 2px solid #eaeaea;
  border-radius: 25px;
  font-family: 'Montserrat', sans-serif;
  transition: border-color 0.2s;
  font-size: 14px;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #f7b815;
}

.form-group select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233b3b3b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 15px;
}

.modal-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.modal-actions .btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Montserrat', sans-serif;
}

.btn {
  background: #f7b815;
  color: #3b3b3b;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(247, 184, 21, 0.4);
}

.btn-outline {
  background: transparent;
  border: 2px solid #f7b815;
  color: #3b3b3b;
}

.btn-outline:hover {
  background: #f7b815;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #3b3b3b;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
}

.modal-close:hover {
  background: rgba(247, 184, 21, 0.2);
}

/* Toast notification */
.toast-notification {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #f7b815;
  color: #3b3b3b;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  box-shadow: 0 10px 20px rgba(247, 184, 21, 0.3);
  z-index: 2001;
  border: 2px solid #fefefe;
}

.toast-notification.success {
  background: #f7b815;
}

.toast-notification.error {
  background: #ff4444;
  color: white;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s;
}

.toast-enter,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Responsive */
@media (max-width: 768px) {
  .logo-sidebar {
    width: 100%;
    padding: 20px;
  }
  
  .menu-toggle {
    top: 20px;
    right: 20px;
    padding: 10px 16px; /* Ajusté pour mobile */
    font-size: 14px;
  }
  
  .sidebar-title {
    font-size: 24px;
  }
  
  .marquee-item {
    padding: 6px 16px 6px 10px;
    font-size: 12px;
  }
  
  .logo-placeholder {
    width: 28px;
    height: 28px;
    font-size: 16px;
  }
  
  .stat-value {
    font-size: 20px;
  }
  
  .nav-link {
    padding: 10px 12px;
  }
  
  .modal-content {
    padding: 20px;
  }
  
  .modal-content h3 {
    font-size: 20px;
  }
}
</style>