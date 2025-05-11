<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const cep = ref('')
const showCepInput = ref(false)

const updateQuantity = (itemId, newQuantity) => {
  if (newQuantity < 1) return;
  const item = cartStore.items.find(item => item.id === itemId);
  if (item) {
    item.quantity = newQuantity;
    cartStore.saveToLocalStorage();
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <h2 class="mb-4">Personagens no Carrinho</h2>

        <v-row v-if="cartStore.items.length > 0">
          <v-col
            v-for="item in cartStore.items"
            :key="item.id"
            cols="12"
          >
            <v-card class="mb-4">
              <v-row no-gutters>
                <v-col cols="4">
                  <v-img
                    :src="item.image"
                    height="200px"
                    cover
                    class="hero-image"
                  />
                </v-col>

                <v-col cols="8" class="pa-4">
                  <v-card-title class="text-h5 font-weight-bold">
                    {{ item.name }}
                  </v-card-title>

                  <v-card-text>
                    <div class="text-h6 text-red mb-4">
                      R$ {{ item.price }} cada
                    </div>

                    <div class="d-flex align-center">
                      <v-btn
                        icon
                        @click="updateQuantity(item.id, item.quantity - 1)"
                        :disabled="item.quantity <= 1"
                      >
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>

                      <v-text-field
                        v-model.number="item.quantity"
                        type="number"
                        min="1"
                        hide-details
                        density="compact"
                        style="max-width: 60px; margin: 0 10px;"
                        @update:modelValue="updateQuantity(item.id, $event)"
                      />

                      <v-btn
                        icon
                        @click="updateQuantity(item.id, item.quantity + 1)"
                      >
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>

                      <v-spacer />

                      <div class="text-h6">
                        Total: R$ {{ (item.price * item.quantity).toFixed(2) }}
                      </div>
                    </div>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn
                      color="error"
                      variant="outlined"
                      @click="cartStore.removeFromCart(item.id)"
                      prepend-icon="mdi-delete"
                    >
                      Remover
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <v-alert
          v-else
          type="info"
          variant="tonal"
          class="mt-4"
        >
          Seu carrinho está vazio. Adicione personagens para continuar.
        </v-alert>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="sticky-top" elevation="4">
          <v-card-title class="bg-red text-white">
            Resumo do Pedido
          </v-card-title>

          <v-card-text class="border-top">
            <h3 class="mb-2">Preço de entrega</h3>

            <v-row align="center">
              <v-col cols="8">
                <v-text-field
                  v-if="showCepInput"
                  v-model="cep"
                  label="Digite seu CEP"
                  variant="outlined"
                  density="compact"
                />
              </v-col>
              <v-col cols="4">
                <v-btn
                  color="red"
                  @click="showCepInput = true"
                  v-if="!showCepInput"
                  block
                >
                  Calcular
                </v-btn>
                <v-btn
                  color="red"
                  @click="calculateShipping()"
                  v-else
                  block
                >
                  OK
                </v-btn>
              </v-col>
            </v-row>

            <v-btn
              variant="text"
              size="small"
              @click="showCepInput = !showCepInput"
            >
              Não sei meu CEP
            </v-btn>

            <div class="mt-2 text-caption">
              Normal: 7 dias úteis (Frete Grátis)
            </div>
          </v-card-text>

          <v-card-text class="bg-grey-lighten-4">
            <h3 class="mb-3">Resumo</h3>

            <v-table density="compact">
              <tbody>
                <tr>
                  <td>Valor dos personagens</td>
                  <td class="text-right">R$ {{ cartStore.subtotal }}</td>
                </tr>
                <tr>
                  <td>Frete</td>
                  <td class="text-right">Grátis</td>
                </tr>
                <tr>
                  <td>Desconto</td>
                  <td class="text-right">-R$ 0.00</td>
                </tr>
                <tr class="font-weight-bold">
                  <td>Total da compra</td>
                  <td class="text-right">R$ {{ cartStore.total }}</td>
                </tr>
              </tbody>
            </v-table>

            <v-btn
              color="red"
              block
              size="large"
              class="mt-4"
              :disabled="cartStore.items.length === 0"
            >
              Finalizar Compra
            </v-btn>

            <div class="text-caption text-center mt-2">
              Divididas? Confira a nossa Política de Frete e Entregas.
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.sticky-top {
  position: sticky;
  top: 20px;
}

.border-top {
  border-top: 1px solid rgba(0,0,0,0.12);
}

.v-card-title {
  padding: 16px;
}

.v-card-text {
  padding: 16px;
}

.text-red {
  color: rgb(var(--v-theme-red));
}

.hero-image {
  border-radius: 4px 0 0 4px;
}
</style>