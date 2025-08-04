<!-- ProductDisplay.vue -->
<template>
  <div :class="['product-container', productClass]">
    <!-- Loading State -->
    <div v-if="loading" class="loader">
      <div class="spinner"></div>
      <p>Loading product...</p>
    </div>
    
    <!-- Men's Product -->
    <div v-else-if="product && product.category === 'men\'s clothing'" class="product-details men-section">
      <div class="product-content">
        <div class="product-image-container">
          <img :src="product.image" :alt="product.title" class="product-image" @load="imageLoaded" v-show="!imageLoading">
          <div v-if="imageLoading" class="image-placeholder"></div>
        </div>
        
        <div class="product-info">
          <h2 class="product-title">{{ product.title }}</h2>
          <div class="product-category">{{ formatCategory(product.category) }}</div>
          
          <div class="product-rating">
            <div class="stars">
              <span v-for="i in 5" :key="i" :class="['star', { 'filled': i <= Math.round(product.rating.rate) }]">★</span>
            </div>
            <span class="rating-text">{{ product.rating.rate }}/5</span>
          </div>
          
          <div class="product-description">{{ product.description }}</div>
          
          <div class="product-price">${{ product.price.toFixed(2) }}</div>
          
          <div class="product-actions">
            <button class="buy-now-btn">Buy Now</button>
            <button class="next-product-btn" @click="fetchNextProduct">Next Product</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Women's Product -->
    <div v-else-if="product && product.category === 'women\'s clothing'" class="product-details women-section">
      <div class="product-content">
        <div class="product-image-container">
          <img :src="product.image" :alt="product.title" class="product-image" @load="imageLoaded" v-show="!imageLoading">
          <div v-if="imageLoading" class="image-placeholder"></div>
        </div>
        
        <div class="product-info">
          <h2 class="product-title">{{ product.title }}</h2>
          <div class="product-category">{{ formatCategory(product.category) }}</div>
          
          <div class="product-rating">
            <div class="stars">
              <span v-for="i in 5" :key="i" :class="['star', { 'filled': i <= Math.round(product.rating.rate) }]">★</span>
            </div>
            <span class="rating-text">{{ product.rating.rate }}/5</span>
          </div>
          
          <div class="product-description">{{ product.description }}</div>
          
          <div class="product-price">${{ product.price.toFixed(2) }}</div>
          
          <div class="product-actions">
            <button class="buy-now-btn">Buy Now</button>
            <button class="next-product-btn" @click="fetchNextProduct">Next Product</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Unavailable Product -->
    <div v-else class="product-details unavailable-section">
      <div class="unavailable-content">
        <div class="unavailable-icon">❌</div>
        <h3 class="unavailable-title">This product is unavailable to show</h3>
        <button class="next-product-btn" @click="fetchNextProduct">Next Product</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDisplay',
  data() {
    return {
      currentIndex: 1,
      product: null,
      loading: false,
      error: null,
      imageLoading: true
    }
  },
  computed: {
    productClass() {
      if (!this.product) return 'unavailable-section';
      
      if (this.product.category === "men's clothing") {
        return 'men-section';
      } else if (this.product.category === "women's clothing") {
        return 'women-section';
      } else {
        return 'unavailable-section';
      }
    }
  },
  created() {
    this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      this.loading = true;
      this.error = null;
      this.imageLoading = true;
      
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${this.currentIndex}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const data = await response.json();
        
        if (data.category === "men's clothing" || data.category === "women's clothing") {
          this.product = data;
        } else {
          this.product = null;
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        this.error = err.message;
        this.product = null;
      } finally {
        this.loading = false;
      }
    },
    imageLoaded() {
      this.imageLoading = false;
    },
    fetchNextProduct() {
      this.currentIndex = this.currentIndex >= 20 ? 1 : this.currentIndex + 1;
      this.fetchProduct();
    },
    fetchPreviousProduct() {
      this.currentIndex = this.currentIndex <= 1 ? 20 : this.currentIndex - 1;
      this.fetchProduct();
    },
    formatCategory(category) {
      if (category === "men's clothing") return "Men's Clothing";
      if (category === "women's clothing") return "Women's Clothing";
      return category;
    }
  }
}
</script>

<style scoped>
/* Base Styles */
.product-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.product-content, .unavailable-content {
  display: flex;
  height: 100%;
}

/* Product Image */
.product-image-container {
  width: 50%;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
}

.product-image {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 8px;
}

.image-placeholder {
  width: 100%;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  animation: pulse 1.5s infinite;
}

/* Product Info */
.product-info {
  width: 50%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.product-category {
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 1.5rem;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.stars {
  display: flex;
  gap: 0.1rem;
}

.star {
  color: #ccc;
  font-size: 1.2rem;
}

.star.filled {
  color: #FFD700;
}

.rating-text {
  font-size: 1rem;
}

.product-description {
  line-height: 1.6;
  margin-bottom: 2rem;
  flex-grow: 1;
}

.product-price {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.product-actions {
  display: flex;
  gap: 1rem;
}

/* Buttons */
.buy-now-btn, .next-product-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.next-product-btn {
  background: transparent;
  border: 2px solid currentColor;
}

/* Men's Section */
.men-section {
  background: linear-gradient(to bottom, #D6E6FF, #FFFFFF);
}

.men-section .product-info {
  color: #002772;
}

.men-section .buy-now-btn {
  background-color: #002772;
  color: white;
}

.men-section .buy-now-btn:hover {
  background-color: #001a4a;
}

.men-section .next-product-btn {
  color: #002772;
  border-color: #002772;
}

.men-section .next-product-btn:hover {
  background-color: rgba(0, 39, 114, 0.1);
}

/* Women's Section */
.women-section {
  background: linear-gradient(to bottom, #FDE2FF, #FFFFFF);
}

.women-section .product-info {
  color: #720060;
}

.women-section .buy-now-btn {
  background-color: #720060;
  color: white;
}

.women-section .buy-now-btn:hover {
  background-color: #5a004b;
}

.women-section .next-product-btn {
  color: #720060;
  border-color: #720060;
}

.women-section .next-product-btn:hover {
  background-color: rgba(114, 0, 96, 0.1);
}

/* Unavailable Section */
.unavailable-section {
  background-color: #DCDCDC;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.unavailable-content {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.unavailable-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #3F3F3F;
}

.unavailable-title {
  font-size: 1.5rem;
  color: #3F3F3F;
  margin-bottom: 2rem;
}

.unavailable-section .next-product-btn {
  background-color: #3F3F3F;
  color: white;
  border: none;
}

.unavailable-section .next-product-btn:hover {
  background-color: #2a2a2a;
}

/* Loading State */
.loader {
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: #f8f8f8;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 39, 114, 0.2);
  border-top-color: #002772;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loader p {
  color: #002772;
  font-size: 1.1rem;
}

/* Animations */
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.3; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-content, .unavailable-content {
    flex-direction: column;
  }
  
  .product-image-container, .product-info {
    width: 100%;
  }
  
  .product-image-container {
    height: 300px;
    padding: 1rem;
  }
  
  .product-info {
    padding: 1.5rem;
  }
  
  .product-title {
    font-size: 1.5rem;
  }
  
  .product-actions {
    flex-direction: column;
  }
  
  .buy-now-btn, .next-product-btn {
    width: 100%;
  }
}
</style>