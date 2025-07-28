<template>
  <div class="parent">
    <div class="container">
      <!-- فيديو الخلفية -->
      <video autoplay muted loop playsinline id="bg-video">
        <source src="../assets/شسيسيشسيسشيس.mp4" type="video/mp4" />
      </video>

      <!-- الصندوق البلوري -->
      <div class="glass-box">
        <h1>Welcome</h1>
        <p>To The Official Platform For<br />Trading With The Binary System</p>
        <router-link class="btn" to="/splash2">Start Trading</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// لا حاجة لسكريبت هنا، التوجيه تم بـ <router-link>
</script>

<style scoped>
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
}

/* فيديو الخلفية */
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

/* الصندوق البلوري */
.glass-box {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  color: #fff;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.glass-box h1 {
  font-size: 3rem;
  margin-bottom: 15px;
  color: #ff8400;
}

.glass-box p {
  font-size: 1.2rem;
  margin-bottom: 45px;
}

/* الزر */
.btn {
  background-color: #7f0d0d;
  color: #ffffff;
  padding: 15px 30px;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  text-decoration: none;
  transition: 0.2s;
}

.btn:hover {
  background-color: #ff9900;
}
</style>
