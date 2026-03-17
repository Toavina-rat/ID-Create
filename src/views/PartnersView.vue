<template>
  <div class="partners-page">
    <div class="container">
      <h1 class="page-title">ILS NOUS FONT CONFIANCE</h1>
      
      <!-- Section avec tous les logos -->
      <div class="partners-section">
        <h2 class="section-subtitle">Nos partenaires et clients</h2>
        
        <!-- Grille de logos -->
        <div class="partners-grid">
          <div v-for="(partner, index) in partners" :key="index" class="partner-card">
            <div class="partner-logo-placeholder">
              <span class="partner-name">{{ partner }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Navigation vers autres pages -->
      <div class="navigation-section">
        <div class="nav-links">
          <router-link to="/activities" class="nav-link">
            <span class="nav-icon">🎯</span>
            Activities
          </router-link>
          <router-link to="/contact" class="nav-link">
            <span class="nav-icon">📞</span>
            Contact
          </router-link>
          <router-link to="/devis" class="nav-link highlight">
            <span class="nav-icon">📝</span>
            Work with us
            <span class="nav-badge">Demande de devis</span>
          </router-link>
        </div>
      </div>
      
      <!-- Bouton menu/close (optionnel) -->
      <div class="menu-toggle" @click="toggleMenu">
        <span v-if="!menuOpen">MENU</span>
        <span v-else>CLOSE</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PartnersView',
  data() {
    return {
      menuOpen: false,
      partners: [
        'UNICEF', 'PNUD', 'UNOPS', 'FAO', 'TANDAVANALA', 'SAHANALA', 'ADDEV', 'HELVETAS',
        'FISA', 'UK EMBASSY', 'TURKEY EMBASSY', 'BMOI', 'BNI', 'ACCESS BANK', 'SKILLZ',
        'PAMF', 'AQUAMAD', 'IZILI', 'CCIFM', 'ALFA CIMENT', 'KIBO', 'SANIFER', 'ZOMA MARKET',
        'HABIBO', 'WAKA', 'ZEBULON', 'MABEL', 'AGRIKOBA', 'AGRIFARM', 'PIQLA', 'ID RENTAL',
        'AXIAN', 'ORANGE', 'ORANGE BUSINESS SERVICES', 'SEM', 'TOM', 'TOA', 'GES',
        'MADAGASCO', 'STELLAR IX', 'CONNECTEO', 'YAS', 'AIRTEL', 'HONEY OF MADAGASCAR',
        'JB', 'OIM', 'SOCOLAIT', 'NATICS', 'KVM', 'CERNOL', 'CTL', 'AXIAN UNIVERSITY',
        'SGEM', 'UNITED MALAGASY', 'ALTHEA', 'HYGEA', 'PANAGORA', 'RAPIDE SERVICES',
        'BLUELINE', '2424.MG'
      ]
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
      
    }
  }
}
</script>

<style scoped>
.partners-page {
  padding: 40px 0 80px;
  min-height: 100vh;
  background: linear-gradient(135deg, #fefefe 0%, #fff9e6 100%);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
}

.page-title {
  font-size: 48px;
  font-weight: 800;
  margin: 80px 0 20px;
  color: var(--gray);
  position: relative;
  display: inline-block;
  letter-spacing: 2px;
}

.page-title::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 50%;
  width: 10px;
  height: 10px;
  background: var(--yellow);
  border-radius: 50%;
  transform: translateY(-50%);
}

.section-subtitle {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 40px;
  color: #666;
  font-style: italic;
}

/* Grille des logos */
.partners-section {
  margin: 50px 0 60px;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
}

.partner-card {
  background: white;
  border-radius: 15px;
  padding: 25px 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
}

.partner-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(247, 184, 21, 0.15);
  border-color: var(--yellow);
}

.partner-logo-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.partner-name {
  font-weight: 600;
  color: var(--gray);
  text-align: center;
  font-size: 14px;
  line-height: 1.4;
  word-break: break-word;
}

/* Section de navigation */
.navigation-section {
  margin: 60px 0 40px;
  padding: 40px 0;
  border-top: 1px solid rgba(247, 184, 21, 0.2);
  border-bottom: 1px solid rgba(247, 184, 21, 0.2);
}

.nav-links {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  background: white;
  border-radius: 50px;
  text-decoration: none;
  color: var(--gray);
  font-weight: 600;
  font-size: 18px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  border: 1px solid #eee;
}

.nav-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(247, 184, 21, 0.2);
  border-color: var(--yellow);
  background: var(--yellow);
  color: var(--gray);
}

.nav-link.highlight {
  background: var(--yellow);
  border-color: var(--yellow);
  color: var(--gray);
  position: relative;
  padding-right: 45px;
}

.nav-link.highlight:hover {
  background: #ffd24d;
}

.nav-badge {
  position: absolute;
  top: -10px;
  right: 10px;
  background: var(--gray);
  color: white;
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.nav-icon {
  font-size: 24px;
}

/* Menu toggle */
.menu-toggle {
  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 100;
  background: var(--gray);
  color: white;
  padding: 12px 25px;
  border-radius: 40px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 2px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  border: 2px solid var(--yellow);
}

.menu-toggle:hover {
  background: var(--yellow);
  color: var(--gray);
  transform: scale(1.05);
}

/* Animation de défilement (optionnel - peut être ajouté plus tard) */
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Responsive */
@media (max-width: 992px) {
  .page-title {
    font-size: 42px;
    margin: 70px 0 20px;
  }
  
  .partners-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
  }
  
  .nav-links {
    gap: 20px;
  }
  
  .nav-link {
    padding: 12px 25px;
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 36px;
    margin: 60px 0 15px;
  }
  
  .section-subtitle {
    font-size: 20px;
    margin-bottom: 30px;
  }
  
  .partners-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 15px;
  }
  
  .partner-card {
    padding: 15px 10px;
    min-height: 80px;
  }
  
  .partner-name {
    font-size: 12px;
  }
  
  .nav-links {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  .nav-link {
    width: 100%;
    justify-content: center;
  }
  
  .menu-toggle {
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 28px;
  }
  
  .partners-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .partner-card {
    min-height: 70px;
  }
}
</style>