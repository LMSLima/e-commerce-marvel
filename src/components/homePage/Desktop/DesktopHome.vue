<script setup>
import { onMounted, ref } from 'vue'
import { usePersonStore } from '@/stores/person'

const personStore = usePersonStore()
const isLoading = ref(true)

onMounted(async () => {
  try {
    await personStore.getAllPerson()
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="home-page">
    <!-- Hero Section com Homem-Aranha -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">EXPLORE O UNIVERSO MARVEL</h1>
        <p class="hero-subtitle">Descubra todos os seus personagens favoritos em um só lugar</p>
        <v-btn
          color="red-darken-4"
          size="large"
          class="hero-btn"
          to="/list-person"
        >
          Ver Todos os Personagens
        </v-btn>
      </div>
    </section>

    <!-- Destaques -->
    <v-container class="highlights-container">
      <section class="text-center my-10">
        <h2 class="text-h4 font-weight-bold mb-4">POR QUE ESCOLHER NOSSA PLATAFORMA?</h2>
        <v-row class="justify-center">
          <v-col cols="12" md="4" class="feature-card">
            <v-icon color="red-darken-4" size="60" class="mb-4">mdi-account-group</v-icon>
            <h3 class="text-h6 mb-2">Personagens Completos</h3>
            <p>Perfis detalhados com histórias, habilidades e aparências em quadrinhos</p>
          </v-col>
          <v-col cols="12" md="4" class="feature-card">
            <v-icon color="red-darken-4" size="60" class="mb-4">mdi-update</v-icon>
            <h3 class="text-h6 mb-2">Atualizações Constantes</h3>
            <p>Nosso banco de dados é atualizado regularmente com novos personagens</p>
          </v-col>
          <v-col cols="12" md="4" class="feature-card">
            <v-icon color="red-darken-4" size="60" class="mb-4">mdi-heart</v-icon>
            <h3 class="text-h6 mb-2">Feito por Fãs</h3>
            <p>Criado por entusiastas da Marvel para entusiastas da Marvel</p>
          </v-col>
        </v-row>
      </section>

      <!-- Personagens em Destaque -->
      <section class="featured-characters">
        <div class="d-flex justify-space-between align-center mb-6">
          <h2 class="text-h4 font-weight-bold">PERSONAGENS EM DESTAQUE</h2>
          <v-btn
            variant="outlined"
            color="red-darken-4"
            to="/list-person"
          >
            Ver Todos
          </v-btn>
        </div>

        <v-progress-linear
          v-if="isLoading"
          indeterminate
          color="red-darken-4"
        ></v-progress-linear>

        <v-slide-group show-arrows class="pa-2" v-else>
          <v-slide-item
            v-for="char in personStore.person.slice(0, 10)"
            :key="char.id"
            v-show="char.images?.lg"
          >
            <v-card class="ma-2 character-card" width="200" flat>
              <v-img
                :src="char.images.lg"
                height="250"
                cover
                class="character-image"
              >
                <div class="overlay-text px-2 py-1 w-100">
                  {{ char.name }}
                </div>
              </v-img>
              <v-card-actions class="character-actions">
                <v-btn
                  block
                  color="red-darken-4"
                  variant="outlined"
                  :to="`/character/${char.id}`"
                >
                  Detalhes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </section>

      <!-- Call to Action -->
      <section class="cta-section text-center my-16">
        <h2 class="text-h3 font-weight-bold mb-4">PRONTO PARA EXPLORAR?</h2>
        <p class="text-h6 mb-6">Junte-se a milhares de fãs e mergulhe no universo Marvel</p>
        <v-btn
          color="red-darken-4"
          size="x-large"
          to="/list-person"
        >
          Começar Agora
        </v-btn>
      </section>
    </v-container>
  </div>
</template>

<style scoped>
.home-page {
  background-color: #f5f5f5;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 80vh;
  min-height: 500px;
  background: url('https://i.ibb.co/XxFyr1c0/8ba037387688a27f3856b6ea12d6f63c.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 20px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.hero-btn {
  font-weight: bold;
  padding: 15px 30px !important;
}

.feature-card {
  padding: 30px;
  transition: transform 0.3s;
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  color: #d32f2f;
}

/* Characters */
.featured-characters {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 40px 0;
}

.character-card {
  transition: transform 0.3s;
  border-radius: 8px !important;
  overflow: hidden;
}

.character-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.character-image {
  transition: transform 0.5s;
}

.character-card:hover .character-image {
  transform: scale(1.1);
}

.character-actions {
  background: rgba(0, 0, 0, 0.7);
}

.overlay-text {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 1rem;
  padding: 10px !important;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #f52929 0%, #d32f2f 100%);
  padding: 60px 20px;
  border-radius: 8px;
  color: white;
}

/* Responsividade */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .feature-card {
    margin-bottom: 20px;
  }

  .featured-characters {
    padding: 20px;
  }
}
</style>