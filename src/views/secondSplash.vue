<template>
  <div class="parent">
    <div class="container">
      <video autoplay muted loop playsinline id="bg-video">
        <source src="../assets/شسيسيشسيسشيس.mp4" type="video/mp4" />
      </video>
      <div class="glass-box">
        <div class="circle">
          <img src="../assets/earth-icon.png" alt="Earth Icon" />
        </div>
        <h2>Trade with us</h2>
        <p>Anywhere in the world</p>
        <a @click.prevent="goToMain" href="#" class="btn">Start Trading</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToMain = () => {
  router.push('/main')
}
</script>

<style scoped>
/* نفس تنسيقاتك تماماً */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.parent {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  width: fit-content;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

body {
  font-family: 'Arial', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #fff;
}

#bg-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  filter: brightness(50%);
  z-index: -2;
}

.glass-box {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  color: #fff;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.circle img {
  width: 200px;
  height: 200px;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #fff;
}

p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #fff;
}

.btn {
  background-color: #7f0d0d;
  color: #fcfcfc;
  padding: 15px 30px;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 30px;
  text-decoration: none;
  transition: 0.3s;
}

.btn:hover {
  background-color: oklch(71.303% 0.1945 47.872);
}
</style>
