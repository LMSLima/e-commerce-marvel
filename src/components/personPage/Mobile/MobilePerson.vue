<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePersonStore } from '@/stores/person'
import { useCartStore } from '@/stores/cart'

const personStore = usePersonStore()
const cartStore = useCartStore()
const currentPage = ref(1)
const itemsPerPage = 4 
const showTooltip = ref(false)
const tooltipTimeout = ref(null)
const searchQuery = ref('')

onMounted(() => {
  personStore.getAllPerson()
})

const filteredHeroes = computed(() => {
  if (!searchQuery.value) return personStore.person
  return personStore.person.filter(hero =>
    hero.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (hero.biography.fullName && hero.biography.fullName.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
    hero.biography.publisher.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const totalPages = computed(() => {
  return Math.ceil(filteredHeroes.value.length / itemsPerPage)
})

const paginatedHeroes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredHeroes.value.slice(start, end)
})

const addToCartWithFeedback = (hero) => {
  const price = cartStore.calculateHeroPrice(hero);
  const heroWithPrice = {
    ...hero,
    price: price.toFixed(2)
  };

  cartStore.addToCart(heroWithPrice)
  showTooltip.value = true

  if (tooltipTimeout.value) {
    clearTimeout(tooltipTimeout.value)
  }

  tooltipTimeout.value = setTimeout(() => {
    showTooltip.value = false
  }, 2000)
}

const handleSearch = () => {
  currentPage.value = 1
}
</script>

<template>
  <v-container class="px-3">
    <v-snackbar
      v-model="showTooltip"
      :timeout="2000"
      color="success"
      location="top"
      elevation="24"
    >
      Personagem adicionado ao carrinho!
      <template v-slot:actions>
        <v-btn
          icon
          @click="showTooltip = false"
          size="small"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-row>
      <v-col cols="12" class="text-center">
        <h2 class="text-h5 font-weight-bold mb-4">Super Heróis</h2>
        
        <v-text-field
          v-model="searchQuery"
          label="Pesquisar heróis"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          clearable
          density="comfortable"
          single-line
          hide-details
          @input="handleSearch"
          @click:clear="handleSearch"
          class="mb-4"
        />
        
        <v-alert
          v-if="filteredHeroes.length === 0"
          type="info"
          variant="tonal"
          class="mb-4"
        >
          Nenhum herói encontrado com "{{ searchQuery }}"
        </v-alert>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col
        v-for="(hero) in paginatedHeroes"
        :key="hero.id"
        cols="12"
      >
        <v-card class="mb-3" elevation="2">
          <v-img
            :src="hero.images.lg"
            height="180px"
            cover
            gradient="to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7)"
            class="align-end"
          >
            <v-card-title class="text-white text-h6">
              {{ hero.name }}
            </v-card-title>
          </v-img>

          <v-card-text class="px-3 pt-3 pb-1">
            <div class="d-flex flex-wrap gap-1 mb-2">
              <v-chip color="red" size="small" variant="outlined">
                {{ hero.biography.publisher }}
              </v-chip>
              <v-chip color="red" size="small" variant="outlined">
                {{ hero.appearance.race || 'Humano' }}
              </v-chip>
            </div>

            <div class="text-caption mb-1">
              <strong>Poderes:</strong> 
              INT {{ hero.powerstats.intelligence }} | 
              FOR {{ hero.powerstats.strength }} | 
              VEL {{ hero.powerstats.speed }}
            </div>

            <div class="text-caption mb-1">
              <strong>Identidade:</strong> {{ hero.biography.fullName || 'Desconhecida' }}
            </div>

            <div class="text-caption mb-2">
              {{ hero.work.occupation || 'Herói profissional' }}
            </div>

            <div class="text-subtitle-1 text-red-darken-4 font-weight-bold">
              R$ {{ cartStore.calculateHeroPrice(hero).toFixed(2) }}
            </div>
          </v-card-text>

          <v-card-actions class="px-3 pb-3 pt-0">
            <v-btn
              color="red-darken-4"
              variant="text"
              size="small"
              block
              class="me-1"
              :to="`/character/${hero.id}`"
            >
              Detalhes
            </v-btn>
            <v-btn
              color="red-darken-4"
              variant="flat"
              size="small"
              block
              @click="addToCartWithFeedback(hero)"
              prepend-icon="mdi-cart-plus"
            >
              Comprar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-4">
      <v-col cols="auto">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="3"
          color="red-darken-4"
          density="comfortable"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s;
}

.v-card:active {
  transform: scale(0.98);
}

.v-card-title {
  line-height: 1.2;
  word-break: break-word;
}

.v-btn {
  min-width: 0;
  padding: 0 8px;
}

.v-chip {
  margin-right: 4px;
  margin-bottom: 4px;
}

.text-caption {
  font-size: 0.75rem;
  line-height: 1.3;
}

.v-card-text {
  padding: 12px;
}

.v-card-actions {
  padding: 0 12px 12px;
}
</style>