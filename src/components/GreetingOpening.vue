<template>
  <div class="opening">

    <!-- ─── Fond subtil ─── -->
    <div class="opening__bg">
      <div class="opening__grain" />
      <div class="opening__glow" />
    </div>

    <!-- ─── Scène avec tous les mots ─── -->
    <Transition 
      name="drop-all"
      @before-enter="onBeforeDropAll"
      @after-enter="onAllLanded"
    >
      <div v-if="showAllWords" class="opening__words-container">
        <div class="opening__words-grid">
          <div 
            v-for="(greeting, index) in greetings" 
            :key="index"
            class="opening__word-item"
            :style="{
              animationDelay: index * 0.02 + 's',
              transform: `rotate(${Math.random() * 6 - 3}deg)`
            }"
          >
            <span class="opening__word">
              {{ greeting.text }}
            </span>
            <span class="opening__word-lang">{{ greeting.lang }}</span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ─── Ligne d'impact horizontale ─── -->
    <Transition name="impact">
      <div v-if="showImpact" class="opening__impact-wrapper">
        <span class="opening__impact" />
      </div>
    </Transition>

    <!-- ─── Message de bienvenue après la chute ─── -->
    <Transition name="fade">
      <div v-if="showWelcome" class="opening__welcome">
        <h2 class="opening__welcome-title">BIENVENUE CHEZ</h2>
        <div class="opening__logo">
          <span class="opening__logo-id">iD</span>
          <span class="opening__logo-creative">-creative</span>
        </div>
        <p class="opening__welcome-subtitle">« Animez votre publicité »</p>
        <button class="opening__enter-btn" @click="$emit('closed')">
          ENTRER
          <span class="opening__enter-arrow">→</span>
        </button>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

/* ── Événements ── */
const emit = defineEmits(['enter'])

/* ── Données ──────────────────────────────────────────── */
const greetings = [
  { text: 'Salama',       lang: 'Malgache' },
  { text: 'Hallo',        lang: 'Allemand' },
  { text: 'Hello',        lang: 'Anglais' },
  { text: 'Hola',         lang: 'Espagnol' },
  { text: 'Ciao',         lang: 'Italien' },
  { text: 'Olá',          lang: 'Portugais' },
  { text: 'Здравствуйте', lang: 'Russe' },
  { text: 'Καλημέρα',     lang: 'Grec' },
  { text: 'Merhaba',      lang: 'Turc' },
  { text: 'Goedemorgen',  lang: 'Néerlandais' },
  { text: 'Dzień dobry',  lang: 'Polonais' },
  { text: 'Grüezi',       lang: 'Suisse allemand' },
  { text: '你好',          lang: 'Chinois' },
  { text: 'こんにちは',     lang: 'Japonais' },
  { text: 'नमस्ते',        lang: 'Hindi' },
  { text: 'สวัสดี',        lang: 'Thaï' },
  { text: '안녕',          lang: 'Coréen' },
  { text: 'Jambo',        lang: 'Swahili' },
  { text: 'مرحبا',        lang: 'Arabe' },
  { text: 'Bonjou',       lang: 'Créole haïtien' },
  { text: 'Sawubona',     lang: 'Zoulou' }
]

/* ── État ─────────────────────────────────────────────── */
const showAllWords = ref(false)
const showImpact = ref(false)
const showWelcome = ref(false)
const isDropping = ref(false)

/* ── Timers ───────────────────────────────────────────── */
let timerImpact = null
let timerWelcome = null
let timerHideWords = null

/* ── Méthodes ─────────────────────────────────────────── */
function onBeforeDropAll() {
  isDropping.value = true
}

function onAllLanded() {
  isDropping.value = false
  
  // Flash d'impact
  showImpact.value = true
  timerImpact = setTimeout(() => {
    showImpact.value = false
  }, 600)
  
  
  timerWelcome = setTimeout(() => {
    showWelcome.value = true
  }, 3500) 
  
g
  timerHideWords = setTimeout(() => {
    showAllWords.value = false
  }, 4000)
}


onMounted(() => {
 
  setTimeout(() => {
    showAllWords.value = true
  }, 100)
})

onUnmounted(() => {
  clearTimeout(timerImpact)
  clearTimeout(timerWelcome)
  clearTimeout(timerHideWords)
})
</script>

<style scoped>
@import '/src/styles/opening.css'
</style>