<!-- App.vue -->
<template>
  <div id="app">
    <header class="app-header">
      <h1>E-Commerce Catalog</h1>
    </header>
    
    <main class="app-main">
      <ProductDisplay />
    </main>
    
    <footer class="app-footer">
      <p>&copy; 2025 E-Commerce Catalog. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import ProductDisplay from './components/ProductDisplay.vue'

export default {
  name: 'App',
  components: {
    ProductDisplay
  }
}
</script>

<style>
/* Reset CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  background-color: #f8f8f8;
  color: #333;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: #002772;
  color: white;
  padding: 1.5rem 2rem;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  font-size: 1.8rem;
  font-weight: 600;
}

.app-main {
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-footer {
  background-color: #002772;
  color: white;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  margin-top: auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .app-main {
    padding: 1rem;
  }
}
</style>