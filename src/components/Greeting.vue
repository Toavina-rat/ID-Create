<template>
  <div class="greeting-banner">
    <div class="greeting-marquee">
      <div class="greeting-content">
        <span v-for="(greeting, index) in greetings" :key="index" class="greeting-item">
          <span class="greeting-lang">{{ greeting.lang }}</span>
          <span class="greeting-word">{{ greeting.word }}</span>
        </span>
        <span v-for="(greeting, index) in greetings" :key="'dup-'+index" class="greeting-item">
          <span class="greeting-lang">{{ greeting.lang }}</span>
          <span class="greeting-word">{{ greeting.word }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Greeting',
  data() {
    return {
      greetings: [
        { lang: 'MALGACHE', word: 'Salama' },
        { lang: 'ALLEMAND', word: 'Hallo' },
        { lang: 'ANGLAIS', word: 'Hello' },
        { lang: 'ESPAGNOL', word: 'Hola' },
        { lang: 'ITALIEN', word: 'Ciao' },
        { lang: 'PORTUGAIS', word: 'Olá' },
        { lang: 'RUSSE', word: 'Здравствуйте' },
        { lang: 'GREC', word: 'Καλημέρα' },
        { lang: 'TURC', word: 'Merhaba' },
        { lang: 'NÉERLANDAIS', word: 'Goedemorgen' },
        { lang: 'POLONAIS', word: 'Dzień dobry' },
        { lang: 'SUISSE', word: 'Grüezi' },
        { lang: 'CHINOIS', word: '你好' },
        { lang: 'JAPONAIS', word: 'こんにちは' },
        { lang: 'hindi/népalais', word: 'नमस'},
        { lang: 'THAÏ', word: 'สวัสดี' },
        { lang: 'CORÉEN', word: '안녕' },
        { lang: 'SWAHILI', word: 'Jambo' },
        { lang: 'ARABE', word: 'مرحبا' },
        { lang: 'CRÉOLE', word: 'Bonjou' },
        { lang: 'ZOULOU', word: 'Sawubona' }
      ]
    }
  }
}
</script>

<style scoped>
.greeting-banner {
  background: linear-gradient(90deg, #f7b815, #ffd966);
  padding: 15px 0;
  overflow: hidden;
  position: relative;
  border-bottom: 3px solid #3b3b3b;
  margin-top: 80px;
}

.greeting-marquee {
  overflow: hidden;
}

.greeting-content {
  display: flex;
  animation: scroll 40s linear infinite;
  white-space: nowrap;
}

.greeting-item {
  display: inline-flex;
  align-items: center;
  margin-right: 30px;
}

.greeting-lang {
  background: #3b3b3b;
  color: #f7b815;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-right: 10px;
}

.greeting-word {
  color: #3b3b3b;
  font-size: 14px;
  font-weight: 500;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>