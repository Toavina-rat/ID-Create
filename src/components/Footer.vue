<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div>
          <div class="footer-logo">iD-creative</div>
          <p>Animez votre publicité</p>
        </div>
        
        <div>
          <h3>Contact</h3>
          <ul class="footer-links">
            <li>Siege: 2 IVC, 5 Avenue Lénine</li>
            <li>Ambatomitsangana</li>
            <li>Email: contact@idcreative.com</li>
            <li>Tél: +261 34 20 134 20</li>
          </ul>
        </div>
        
        <div>
          <h3>Merci</h3>
          <div class="thanks-mini">
            <span v-for="(thank, index) in thanks" :key="index" class="thank-mini-item">
              {{ thank }}
            </span>
          </div>
        </div>
      </div>
      
      <div class="copyright">
        &copy; 2024 iD-creative. Tous droits réservés.
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      thanks: [
        'Misaotra', 'Danke', 'Thank you', 'Gracias', 
        'Grazie', 'Obrigado', 'Спасибо', 'Ευχαριστώ',
        'Teşekkür ederim', 'Dank je'
      ]
    }
  }
}
</script>

<style scoped>
.footer {
  background: #3b3b3b;
  color: #fefefe;
  padding: 50px 0 20px;
  margin-top: 50px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  margin-bottom: 40px;
}

.footer-logo {
  font-size: 24px;
  font-weight: 800;
  color: #f7b815;
  margin-bottom: 15px;
}

.footer h3 {
  color: #f7b815;
  margin-bottom: 20px;
  font-size: 18px;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 10px;
}

.thanks-mini {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.thank-mini-item {
  background: rgba(247, 184, 21, 0.2);
  color: #f7b815;
  padding: 4px 8px;
  border-radius: 15px;
  font-size: 11px;
}

.copyright {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.1);
  font-size: 14px;
  color: #999;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>