<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePersonStore } from '@/stores/person'
import { useCartStore } from '@/stores/cart'

const personStore = usePersonStore()
const cartStore = useCartStore()
const currentPage = ref(1)
const itemsPerPage = 6
const showTooltip = ref(false)
const tooltipTimeout = ref(null)
const searchQuery = ref('')

onMounted(() => {
  personStore.getAllPerson()
})

// Filtra os heróis baseado na pesquisa
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

// Resetar página quando pesquisar
const handleSearch = () => {
  currentPage.value = 1
}
</script>

<template>
  <v-container>
    <v-snackbar
      v-model="showTooltip"
      :timeout="2000"
      color="success"
      location="top center"
      elevation="24"
    >
      Personagem adicionado ao carrinho!
      <template v-slot:actions>
        <v-btn
          icon
          @click="showTooltip = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-row>
      <v-col cols="12">
        <h2 class="text-center mb-6">Super Heróis</h2>

        <!-- Campo de pesquisa -->
        <v-row justify="center" class="mb-6">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="searchQuery"
              label="Pesquisar heróis"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              clearable
              @input="handleSearch"
              @click:clear="handleSearch"
            >
            </v-text-field>
          </v-col>
        </v-row>

        <div v-if="filteredHeroes.length === 0" class="text-center">
          <v-alert type="info" variant="tonal">
            Nenhum herói encontrado com o termo "{{ searchQuery }}"
          </v-alert>
        </div>
      </v-col>

      <v-col
        v-for="(hero) in paginatedHeroes"
        :key="hero.id"
        cols="12"
      >
        <v-card class="mb-4">
          <v-row no-gutters>
            <v-col cols="4">
              <v-img
                :src="hero.images.lg"
                height="300px"
                cover
                class="hero-image"
              />
            </v-col>

            <v-col cols="8" class="pa-4">
              <v-card-title class="text-h5 font-weight-bold">
                {{ hero.name }}
              </v-card-title>

              <v-card-subtitle class="mt-2">
                <v-chip class="mr-2" color="red" small>
                  {{ hero.biography.publisher }}
                </v-chip>
                <v-chip color="red" small>
                  {{ hero.appearance.race || 'Humano' }}
                </v-chip>
              </v-card-subtitle>

              <v-card-text>
                <div class="mb-2">
                  <strong>Poderes:</strong>
                  {{ hero.powerstats.intelligence }} INT,
                  {{ hero.powerstats.strength }} FOR,
                  {{ hero.powerstats.speed }} VEL
                </div>

                <div>
                  <strong>Identidade:</strong>
                  {{ hero.biography.fullName || 'Desconhecida' }}
                </div>

                <div class="mt-4">
                  {{ hero.work.occupation || 'Herói profissional' }}
                </div>

                <div class="mt-4 text-h6 text-red">
                  R$ {{ cartStore.calculateHeroPrice(hero).toFixed(2) }}
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn color="red" variant="outlined">
                  Ver detalhes
                </v-btn>
                <v-btn
                  color="red"
                  variant="flat"
                  @click="addToCartWithFeedback(hero)"
                  prepend-icon="mdi-cart-plus"
                >
                  Adicionar ao Carrinho
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-6">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="5"
        color="red"
      />
    </v-row>
  </v-container>
</template>

<style scoped>
.hero-image {
  border-radius: 4px 0 0 4px;
}

h2 {
  font-weight: bold;
  color: #f52929;
}

.v-card {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.v-card-actions .v-btn {
  margin-right: 8px;
}

.v-snackbar {
  transition: all 0.3s ease;
}

/* Estilo para o campo de pesquisa */
.v-text-field {
  margin-bottom: 20px;
}
</style>