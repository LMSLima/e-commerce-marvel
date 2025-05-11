import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const useCartStore = defineStore('cart', () => {
  const state = reactive({
    items: JSON.parse(localStorage.getItem('superheroCart')) || [],
    shippingInfo: null
  });

  const saveToLocalStorage = () => {
    localStorage.setItem('superheroCart', JSON.stringify(state.items));
  };
  const removeFromCart = (id) => {
    state.items = state.items.filter(item => item.id !== id);
    saveToLocalStorage();
  };
  const addToCart = (hero) => {
    const existingItem = state.items.find(item => item.id === hero.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      state.items.push({
        id: hero.id,
        name: hero.name,
        image: hero.images?.sm || hero.images?.lg,
        price: calculateHeroPrice(hero), 
        quantity: 1
      });
    }

    saveToLocalStorage();
  };

  const calculateHeroPrice = (hero) => {
    const powerSum = Object.values(hero.powerstats).reduce((a, b) => a + (parseInt(b) || 0), 0);
    return powerSum * 10;
  };

  const cartItems = computed(() => state.items);
  const cartTotal = computed(() => {
    return state.items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  });

  return {
    items: cartItems,
    total: cartTotal,
    addToCart,
    calculateHeroPrice,
    removeFromCart
  };
});