<script setup>
</script>

<template>
  <div class="header">
    <div class="header-container">
      <div class="header-left">
        <router-link class="btn" to="/">
          <img src="https://i.ibb.co/0RbmVJw9/logo-spiderman.png" alt="Logo" width="60" class="img" />
        </router-link>
      </div>
      <div class="header-right">
        <router-link to="/list-person">
          <button class="btn" @click="toggleSidebar">Personagens</button>
        </router-link>
        <div class="auth-buttons">
          <router-link to="/cart">
            <button @click="logout" class="btn btn-i">Carrinho</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  width: 100%;
  max-width: 1460px;
  height: 4em;
  margin: 0 auto;
  padding: 0 1em;
  display: flex;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
}

.header {
  width: 100%;
  background-color: #f52929;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 2em;
}

button {
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  outline: none;
  box-shadow: none;
  appearance: none;
  cursor: pointer;
  color: white;
}

.btn {
  text-decoration: none;
  color: white;
  margin: auto;
}

.btn-i {
  border: white 1.5px solid;
  border-radius: 0.5em;
  width: 7em;
  height: 2.5em;
  padding: 0 1.5em;
  line-height: 2.5em;
  text-align: center;
}

.auth-buttons {
  display: flex;
  gap: 2em;
}

.user-avatar-container {
  display: flex;
  justify-content: center;
}

.user-avatar-button {
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-menu {
  position: absolute;
  background-color: white;
  color: #00546B;
  padding: 1em;
  border-radius: 0.5em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  top: 50px;
  right: 0;
}

.user-menu p {
  cursor: pointer;
  margin: 0.5em 0;
}

.user-menu p:hover {
  color: #005c53;
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 600px;
  height: 100%;
  background-color: #B6B6B6;
  color: white;
  padding: 1em;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
}

.sidebar h3 {
  margin-bottom: 1em;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin-bottom: 1em;
}

.sidebar ul li a {
  text-decoration: none;
  color: white;
}

.sidebar ul li a:hover {
  color: #00B5E2;
}
</style>