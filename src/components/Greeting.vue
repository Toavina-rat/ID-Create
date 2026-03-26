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
@import '/src/styles/greeting.css'
</style>