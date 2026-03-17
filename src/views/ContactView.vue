<template>
  <div class="contact-page">
    <!-- <Greeting /> -->
    
    <div class="container">
      <div class="contact-container">
        <div class="contact-info">
          <h2>Hey there! 👋</h2>
          <p class="contact-intro">
            Looking to work with us? Get started by filling out this simple form 
            and we'll get back to you in a snap.
          </p>
          
          <div class="contact-details">
            <div class="contact-detail">
              <span class="contact-icon">📍</span>
              <span>2 IVC, 5 Avenue Lénine Ambatomitsangana</span>
            </div>
            
            <div class="contact-detail">
              <span class="contact-icon">📧</span>
              <span>contact@idcreative.com</span>
            </div>
            
            <div class="contact-detail">
              <span class="contact-icon">📞</span>
              <span>+261 34 20 134 20</span>
            </div>
          </div>
        </div>
        
        <div class="contact-form">
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label class="form-label">What did you have in mind?</label>
              <div class="service-options">
                <span v-for="service in services" :key="service"
                      class="service-option" 
                      :class="{ selected: selectedServices.includes(service) }"
                      @click="toggleService(service)">
                  {{ service }}
                </span>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Tell us more *</label>
              <textarea class="form-control" rows="3" 
                        placeholder="Tell us more about what you're working on and how we can help..."
                        v-model="form.message"></textarea>
            </div>
            
            <div class="form-group">
              <label class="form-label">Did you have a budget? *</label>
              <div class="budget-options">
                <div v-for="option in budgetOptions" :key="option.value"
                     class="budget-option" 
                     :class="{ selected: form.budget === option.value }"
                     @click="form.budget = option.value">
                  {{ option.label }}
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Your info *</label>
              <div class="name-fields">
                <input type="text" class="form-control" placeholder="First name" v-model="form.firstName" required>
                <input type="text" class="form-control" placeholder="Last name" v-model="form.lastName" required>
              </div>
              <input type="email" class="form-control" style="margin-top: 12px;" placeholder="Email" v-model="form.email" required>
              <input type="tel" class="form-control" style="margin-top: 12px;" placeholder="Telephone" v-model="form.phone">
            </div>
            
            <button type="submit" class="submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Greeting from '../components/Greeting.vue'

export default {
  name: 'ContactView',
  components: {
    Greeting
  },
  data() {
    return {
      services: ['Conception', 'Impression', 'Events', 'Personnalisation goodies et CE', 'Autres'],
      selectedServices: [],
      budgetOptions: [
        { value: 'A', label: 'A - 100k or more' },
        { value: 'B', label: 'B - 50k - 100k' },
        { value: 'C', label: 'C - 25k - 50k' },
        { value: 'D', label: 'D - 15k - 25k' },
        { value: 'E', label: 'E - I\'m not sure' },
        { value: 'F', label: 'F - Non-profit work' },
        { value: 'G', label: 'G - Other' }
      ],
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        budget: ''
      }
    }
  },
  methods: {
    toggleService(service) {
      const index = this.selectedServices.indexOf(service)
      if (index === -1) {
        this.selectedServices.push(service)
      } else {
        this.selectedServices.splice(index, 1)
      }
    },
    submitForm() {
      console.log('Form submitted:', {
        ...this.form,
        services: this.selectedServices
      })
      alert('Merci de nous avoir contacté! Nous vous répondrons dans les plus brefs délais.')
      
      // Reset form
      this.form = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        budget: ''
      }
      this.selectedServices = []
    }
  }
}
</script>

<style scoped>
.contact-page {
  padding: 0 0 60px; /* Enlevé le padding-top */
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f5f5 0%, var(--white) 100%);
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  background: white;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  margin-top: 150px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  position: relative;
  clear: both;
}

.contact-info {
  background: var(--gray);
  color: var(--white);
  padding: 40px; 
}

.contact-info h2 {
  font-size: 32px; 
  margin-bottom: 15px; 
  color: var(--yellow);
}

.contact-intro {
  margin-bottom: 30px; 
  line-height: 1.6; 
  font-size: 15px; 
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 20px; 
}

.contact-detail {
  display: flex;
  align-items: center;
  gap: 12px;
}

.contact-icon {
  width: 36px;
  height: 36px; 
  background: rgba(247, 184, 21, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--yellow);
  font-size: 18px;
}

.contact-form {
  padding: 40px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px; 
  font-weight: 600;
  color: var(--gray);
  font-size: 13px; 
}

.service-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px; 
}

.service-option {
  background: #f5f5f5;
  padding: 6px 12px; 
  border-radius: 25px;
  font-size: 12px; 
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #eee;
}

.service-option:hover,
.service-option.selected {
  background: var(--yellow);
  color: var(--gray);
  border-color: var(--yellow);
}

.budget-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px; 
  margin-top: 8px; 
}

.budget-option {
  background: #f5f5f5;
  padding: 8px;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px; 
  border: 1px solid #eee;
}

.budget-option:hover,
.budget-option.selected {
  background: var(--yellow);
  color: var(--gray);
  border-color: var(--yellow);
}

.form-control {
  width: 100%;
  padding: 10px 12px; 
  border: 2px solid #eee;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  transition: border-color 0.3s ease;
  font-size: 13px;
}

.form-control:focus {
  outline: none;
  border-color: var(--yellow);
}

.name-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.submit-btn {
  background: var(--yellow);
  color: var(--gray);
  border: none;
  padding: 12px 30px;
  font-size: 15px;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 15px; 
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(247, 184, 21, 0.4);
}


@media (min-width: 1200px) {
  .contact-container {
    margin-top: 100px;
  }
}

@media (max-width: 1199px) and (min-width: 993px) {
  .contact-container {
    margin-top: 90px;
    max-width: 900px;
  }
}


@media (max-width: 992px) and (min-width: 769px) {
  .contact-container {
    grid-template-columns: 1fr;
    margin-top: 100px; 
    max-width: 700px;
  }
  
  .contact-info,
  .contact-form {
    padding: 35px; 
  }
}

@media (max-width: 768px) {
  .contact-page {
    padding-top: 0;
  }

  .contact-container {
    grid-template-columns: 1fr;
    margin-top: 130px;
    max-width: 100%;
    border-radius: 20px;
  }
  
  .contact-info,
  .contact-form {
    padding: 25px; 
  }
  
  .budget-options {
    grid-template-columns: 1fr;
  }
  
  .name-fields {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .contact-info h2 {
    font-size: 28px;
  }
}


@media (max-width: 576px) {
  .contact-container {
    margin-top: 140px; 
  }
}

@media (max-width: 480px) {
  .contact-container {
    margin-top: 150px; 
  }
  
  .contact-info h2 {
    font-size: 24px;
  }
  
  .contact-info,
  .contact-form {
    padding: 20px;
  }
}
</style>