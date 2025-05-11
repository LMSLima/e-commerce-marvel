<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <header class="header">
    <div class="header-container">
      <router-link to="/" class="logo-link">
        <img 
          src="https://i.ibb.co/0RbmVJw9/logo-spiderman.png" 
          alt="Marvel Logo" 
          class="logo"
        />
      </router-link>

      <button 
        class="hamburger-btn"
        :class="{ 'active': isMenuOpen }"
        @click="toggleMenu"
        aria-label="Menu"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <div class="mobile-menu" :class="{ 'open': isMenuOpen }">
        <div class="menu-content">
          <nav class="nav-links">
            <router-link 
              to="/list-person" 
              class="nav-link"
              @click="closeMenu"
            >
              Personagens
            </router-link>
            
            <router-link 
              to="/cart" 
              class="nav-link cart-link"
              @click="closeMenu"
            >
              Carrinho
            </router-link>
          </nav>
        </div>
      </div>

      <div 
        class="menu-overlay" 
        :class="{ 'active': isMenuOpen }"
        @click="closeMenu"
      ></div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #f52929;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.logo-link {
  display: flex;
  align-items: center;
}

.logo {
  height: 30px;
  width: auto;
}

/* Botão Hamburguer */
.hamburger-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 24px;
  width: 30px;
  padding: 0;
  position: relative;
  z-index: 1001;
}

.hamburger-line {
  display: block;
  width: 100%;
  height: 3px;
  background-color: white;
  transition: all 0.3s ease;
}

.hamburger-btn.active .hamburger-line:nth-child(1) {
  transform: translateY(10px) rotate(45deg);
}

.hamburger-btn.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.active .hamburger-line:nth-child(3) {
  transform: translateY(-10px) rotate(-45deg);
}

/* Menu Mobile */
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background-color: #f52929;
  z-index: 1000;
  transition: right 0.3s ease;
  padding-top: 70px;
}

.mobile-menu.open {
  right: 0;
}

.menu-content {
  padding: 1rem;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #f8f8f8;
}

.cart-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 1px solid white;
  border-radius: 4px;
}

/* Overlay */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.menu-overlay.active {
  opacity: 1;
  visibility: visible;
}

@media (min-width: 768px) {
  .hamburger-btn {
    display: none;
  }
  
  .mobile-menu {
    display: none;
  }
  
  .menu-overlay {
    display: none;
  }
  
  .header-container {
    padding: 1rem 2rem;
  }
}

@media (max-width: 767px) {
  .desktop-menu {
    display: none;
  }
}
</style>