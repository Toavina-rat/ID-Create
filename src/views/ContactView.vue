<template>
  <div class="contact-page">
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
    
    <Thanks />
  </div>
</template>

<script>
import Greeting from '../components/Greeting.vue'
import Thanks from '../components/Thanks.vue'

export default {
  name: 'ContactView',
  components: {
    Greeting,
    Thanks
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
@import '/src/styles/contact.css';
</style>