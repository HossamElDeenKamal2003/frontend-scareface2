```vue
<template>
  <div class="relative w-full min-h-screen overflow-x-hidden">
    <!-- Background Video -->
    <video
      autoplay
      loop
      muted
      playsinline
      class="fixed inset-0 w-full h-full object-cover z-0 brightness-90"
    >
      <source src="../assets//شسيسيشسيسشيس.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Left Sidebar - for md and up -->
    <aside
      class="hidden md-flex fixed top-50 left-28 translate-y--50 w-60px h-65vh bg-dark-red rounded-xl flex-col items-center py-4 space-y-5 shadow-lg z-50"
    >
      <router-link
    v-for="({ icon: Icon, route }, i) in icons"
    :key="i"
    :to="route"
    class="text-white hover:text-yellow-400 cursor-pointer"
  >
    <component :is="Icon" :size="24" />
  </router-link>
    </aside>

    <!-- Right Sidebar - for md and up -->
    <aside
      class="hidden md-flex fixed top-50 right-28 translate-y--50 w-60px h-65vh bg-dark-red rounded-xl flex-col items-center py-4 space-y-4 shadow-lg z-50"
    >
      <div v-for="(friend, i) in friends" :key="i" class="relative flex flex-col items-center">
        <img
          :src="friend.img"
          :alt="`Friend ${i + 1}`"
          class="w-10 h-10 rounded-full border-2 border-white shadow"
        />
        <span
          :class="[
            'absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-black',
            {
              'bg-green': friend.status === 'online',
              'bg-orange': friend.status === 'in-game',
              'bg-gray': friend.status === 'offline',
            },
          ]"
        ></span>
        <div class="flex space-x-2 mt-2">
          <a href="https://t.me/OwnerUsername" target="_blank" rel="noopener noreferrer">
            <Send class="w-5 h-5 text-blue hover-text-blue-light" />
          </a>
          <MessageCircle
            class="w-5 h-5 text-green hover-text-green-light cursor-pointer"
            @click="toggleChat"
          />
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="relative z-10 flex justify-center items-start px-4 sm-px-8 pt-16 pb-12 min-h-screen">
      <div class="w-full max-w-7xl bg-dark-red-semi backdrop-blur-lg rounded-30px shadow-2xl md-px-10 px-4" style="background-color: rgba(255, 255, 255, 0.1); backdrop-filter: blur(15px);">
        <div class="relative text-white font-sans rounded-30px px-6 sm-px-12 py-12">
          <!-- Header -->
          <div class="mb-8">
            <h1 class="text-2xl sm-text-3xl font-bold">
              <span style="color: white;" class="text-yellow">Scar</span><span style="color: red;">Face</span>
            </h1>
            <div class="mt-4 flex flex-col sm-flex-row items-stretch sm-items-center gap-4">
              <input
                type="text"
                placeholder="Search games..."
                class="flex-1 bg-dark-red text-sm px-4 py-2 rounded-full text-white border border-red-border focus-outline-none focus-ring"
              />
              <span
                class="text-base text-yellow-light font-medium bg-red-light px-3 py-1 rounded-full shadow-inner text-center sm-w-auto"
              >
                {{ currentTime }}
              </span>
            </div>
          </div>
          <div class="conatianer" style="display: flex;">
          <section class="bg-red-dark p-5 sm-p-6 rounded-2xl flex flex-col md-flex-row gap-5 sm-gap-6 items-center shadow-lg" style="margin-bottom: 20px;">
            <div class="flex-1 text-center md-text-left">
              <span
                v-if="games[0].tag"
                class="inline-block bg-yellow-dark text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider"
              >
                {{ games[0].tag }}
              </span>
              <h2 class="text-2xl sm-text-3xl font-extrabold mt-4 mb-3 text-yellow-light">
                {{ games[0].title }}
              </h2>
              <p class="text-sm sm-text-base text-gray-300 leading-relaxed">
                {{ games[0].description }}
              </p>
              <p class="text-sm text-yellow mt-4">+{{ games[0].reviews }} Reviews</p>
            </div>
            <div class="flex-shrink-0 w-240px sm-w-300px">
              <img
                :src="games[0].image"
                :alt="games[0].title"
                class="rounded-2xl object-cover shadow-lg"
              />
            </div>
          </section>

          <!-- Suggestions -->
          <section class="mt-6 flex gap-3 flex-wrap" style="display: flex; gap: 5px; margin-bottom: 20px; justify-content: center;flex-wrap: wrap; flex-direction: column;" gap="5px">
            <div
              v-for="(s, i) in suggestions"
              :key="i"
              class="bg-red-medium rounded-xl px-4 py-2 text-white shadow hover-bg-red-darker transition w-full sm-w-auto"
              style="width: max-content;"
            >
              <p class="font-semibold text-sm">{{ s.name }}</p>
              <p v-if="s.type" class="text-xs text-gray-400">({{ s.type }})</p>
            </div>
          </section>

          </div>
          <div class="cards flex gap-6" style="gap: 2px; width: 100%;">
          <div class="cards flex gap-6" style="width: 100%;">
    <!-- Game Carousel Section -->
    <section class="mt-8 relative w-[70%]">
      <h3 class="text-lg sm:text-xl font-semibold text-yellow-300 mb-3">New Games</h3>

      <!-- Arrows -->
      <button
        @click="scrollLeft"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#2a0e0e]/80 text-white p-2 rounded-full shadow hover:bg-yellow-500 transition"
      >
        ←
      </button>
      <button
        @click="scrollRight"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#2a0e0e]/80 text-white p-2 rounded-full shadow hover:bg-yellow-500 transition"
      >
        →
      </button>

      <!-- Scrolling Cards Container -->
      <div
        ref="scrollContainer"
        class="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth"
        style="width: 145%;"
        @mouseenter="pauseScroll"
        @mouseleave="startScroll"
      >
        <template v-for="n in 2">
          <div
            v-for="(game, i) in games"
            :key="`${n}-${i}`"
            class="w-1/2 min-w-[50%] relative h-[220px] rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex-shrink-0"
          >
            <img
              :src="game.image"
              :alt="game.title"
              class="object-cover absolute inset-0 w-full h-full"
            />
            <div class="absolute bottom-0 left-0 w-full px-4 py-2 bg-gradient-to-t from-black/60 to-transparent">
              <h4 class="text-base sm:text-lg font-semibold text-white">{{ game.title }}</h4>
              <p v-if="game.description" class="text-xs sm:text-sm text-gray-200">
                {{ game.description }}
              </p>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>

    <!-- Statistic Sidebar -->
    <div class="bg-gradient-to-br from-[#471c1c] to-[#2a0e0e] p-6 rounded-3xl shadow-2xl w-[300px] text-white relative mt-8"
          style="height: 425px; border-radius: 15px; padding: 10px;"
    >
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-white text-lg font-semibold">Your Statistic</h3>
        <span class="text-white text-xl font-bold">&rarr;</span>
      </div>

      <!-- Central Circle -->
      <div style="display: flex; justify-content: center; margin-bottom: 1.5rem;">
          <!-- Outer circle with gradient border -->
          <div
            style="
              background: linear-gradient(135deg, red, purple, yellow);
              padding: 4px;
              border-radius: 50%;
              display: inline-flex;
              align-items: center;
              justify-content: center;
            "
          >
            <!-- Inner circle -->
            <div
              style="
                width: 160px;
                height: 160px;
                border-radius: 50%;
                background-color: #1a1a1a;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: white;
                text-align: center;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
              "
            >
              <p style="font-size: 0.75rem; text-transform: uppercase;">Total hours</p>
              <p style="font-size: 2rem; font-weight: bold;">12,340h</p>
            </div>
          </div>
        </div>


      <!-- Game Stats -->
      <div class="flex justify-between items-center px-2">
        <div class="flex flex-col items-center gap-1">
          <img src="" class="w-10 h-10 rounded-full shadow" alt="dota" />
          <p class="text-sm">2,340h</p>
        </div>
        <div class="flex flex-col items-center gap-1">
          <img src="" class="w-10 h-10 rounded-full shadow" alt="valorant" />
          <p class="text-sm">5,420h</p>
        </div>
        <div class="flex flex-col items-center gap-1">
          <img src="" class="w-10 h-10 rounded-full shadow" alt="pubg" />
          <p class="text-sm">4,580h</p>
        </div>
      </div>
    </div>
          </div>
          <!-- New Games -->
        

          <!-- Statistics -->
          <section class="mt-10 relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-yellow-500 bg-dark-overlay backdrop-blur-md">
    <div class="relative z-10 p-6">
      <h3 class="text-lg sm:text-xl font-bold text-yellow-light mb-4">Your Statistics</h3>

      <div class="overflow-x-auto rounded-lg shadow-inner">
        <table class="min-w-full divide-y divide-yellow-300 text-white">
          <thead class="bg-[#2a0e0e] text-yellow-300 text-left">
            <tr>
              <th style="text-align: center;" class="px-4 py-2">DATE</th>
              <th style="text-align: center;" class="px-4 py-2">PROFIT</th>
              <th style="text-align: center;" class="px-4 py-2">GROWTH</th>
              <th style="text-align: center;" class="px-4 py-2">BALANCE</th>
              <th style="text-align: center;" class="px-4 py-2">TRADE</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-yellow-800">
            <tr
              v-for="(item, index) in paginatedStats"
              :key="index"
              class="hover:bg-yellow-900/20 transition"
            >
              <td style="text-align: center;" class="px-4 py-2">{{ item.game }}</td>
              <td class="px-4 py-2" style="color: green; text-align: center;">{{ item.platform }}</td>
              <td class="px-4 py-2" style="color: green; text-align: center;">{{ item.hours }}</td>
              <td style="text-align: center;" class="px-4 py-2">{{ item.rank }}</td>
              <td style="text-align: center;" class="px-4 py-2">{{ item.lastPlayed }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-end mt-4 gap-2">
        <button
          class="px-3 py-1 bg-yellow-700 text-white rounded hover:bg-yellow-600"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Prev
        </button>
        <button
          class="px-3 py-1 bg-yellow-700 text-white rounded hover:bg-yellow-600"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>
  </section>
        </div>
      </div>
    </div>

    <!-- Chat Popup -->
    <div v-if="isChatOpen" class="fixed bottom-16 right-4 w-80 bg-dark-red rounded-lg p-4 shadow-lg z-50">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-yellow-light">Chat with Site Owner</h3>
        <button @click="toggleChat" class="text-gray-400 hover-text-white">✕</button>
      </div>
      <div class="h-48 overflow-y-auto mb-4 bg-red-medium p-3 rounded-lg">
        <p class="text-sm text-gray-300">No messages yet...</p>
      </div>
      <div class="flex">
        <input
          type="text"
          placeholder="Type a message..."
          class="flex-1 bg-dark-red text-white rounded-l-lg px-4 py-2 border border-red-border focus-outline-none focus-ring"
        />
        <button class="bg-yellow text-black rounded-r-lg px-4 py-2 hover-bg-yellow-light">
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount,computed } from 'vue';
import { Home, Gamepad2, Download, Users, Settings, Plus, Send, MessageCircle } from 'lucide-vue-next';

const currentTime = ref('');
const isChatOpen = ref(false);

const icons = [
  { icon: Home, route: '/' },
  { icon: Gamepad2, route: '/chart' },
  { icon: Download, route: '/courses' },
  { icon: Users, route: '/users' },
  { icon: Settings, route: '/settings' },
];

const scrollContainer = ref(null)
let scrollInterval

// Scroll auto
const startScroll = () => {
  scrollInterval = setInterval(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollLeft += 3
    }
  }, 30) // adjust speed
}
const statsTable = ref([
  { game: '20jul', platform: '102$', hours: '+85%', rank: '1200$', lastPlayed: '17' },
  { game: '20jul', platform: '102$', hours: '+85%', rank: '1200$', lastPlayed: '17' },
  { game: '20jul', platform: '102$', hours: '+85%', rank: '1200$', lastPlayed: '17' },
  { game: '20jul', platform: '102$', hours: '+85%', rank: '1200$', lastPlayed: '17' },
  { game: '20jul', platform: '102$', hours: '+85%', rank: '1200$', lastPlayed: '17' },
  { game: '20jul', platform: '102$', hours: '+85%', rank: '1200$', lastPlayed: '17' },
  { game: '20jul', platform: '102$', hours: '+85%', rank: '1200$', lastPlayed: '17' },
  { game: '20jul', platform: '102$', hours: '+85%', rank: '1200$', lastPlayed: '17' },
  { game: '20jul', platform: '102$', hours: '+85%', rank: '1200$', lastPlayed: '17' },
  { game: '20jul', platform: '102$', hours: '+85%', rank: '1200$', lastPlayed: '17' },
  { game: '20jul', platform: '102$', hours: '+85%', rank: '1200$', lastPlayed: '17' },
  { game: '20jul', platform: '102$', hours: '+85%', rank: '1200$', lastPlayed: '17' },
])

const currentPage = ref(1)
const rowsPerPage = 10

const totalPages = computed(() => Math.ceil(statsTable.value.length / rowsPerPage))

const paginatedStats = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage
  return statsTable.value.slice(start, start + rowsPerPage)
})
const pauseScroll = () => clearInterval(scrollInterval)

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft -= 200
  }
}

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft += 200
  }
}

onMounted(() => {
  startScroll()
})

onBeforeUnmount(() => {
  pauseScroll()
})

const games = [
  {
    title: 'Valorant',
    description: 'Valorant is a multiplayer computer game developed and published by Riot Games. It is a team-based first-person shooter.',
    tag: 'Popular',
    reviews: 53,
    image: '../assets/whats.jpeg',
  },
  {
    title: 'Uncharted 4', 
    description: 'The sequel to Uncharted 3: Drake’s Deception and the final installment of Nathan Drake’s adventures.',
    image: '../assets/whats.jpeg',
  },
  {
    title: 'Dishonored: Standard Edition',
    image: '../assets/whats.jpeg',
  },
  {
    title: 'Elden Ring',
    image: '../assets/whats.jpeg',
  },
];


const stats = [
  { name: 'Dota 2', hours: 2340, icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGSp1lcxxdQRXn5_xp4AUObaG6ufGUJ7zQijorrBc0O8q1xPimr4VUvjbp9AR1Wdqbfr8&usqp=CAU' },
  { name: 'CS:GO', hours: 5420, icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:4VUvjbp9AR1Wdqbfr8&usqp=CAU' },
  { name: 'LOL', hours: 4580, icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:4VUvjbp9AR1Wdqbfr8&usqp=CAU' },
];

const suggestions = [
  { name: 'Unravel 2', type: 'Standard Edition + Starter Pass' },
  { name: 'Subway Surf', type: 'Standard Edition + Starter Pass' },
  { name: 'Red Dead Redemption 3', type: 'Standard Edition + Starter Pass' },
];

const friends = [
  { img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-881954-2379004.jpg&fm=jpg', status: 'in-game' },
  { img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-881954-2379004.jpg&fm=jpg', status: 'online' },
  { img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-881954-2379004.jpg&fm=jpg', status: 'offline' },
  { img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-881954-2379004.jpg&fm=jpg', status: 'online' },
  { img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-881954-2379004.jpg&fm=jpg', status: 'in-game' },
];

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};

onMounted(() => {
  const now = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  currentTime.value = now;
});
</script>

<style scoped>
/* General container */
.relative { position: relative; }
.w-full { width: 100%; }
.min-h-screen { min-height: 100vh; }
.overflow-x-hidden { overflow-x: hidden; }

/* Background Video */
.fixed { position: fixed; }
.inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
.h-full { height: 100%; }
.object-cover { object-fit: cover; }
.z-0 { z-index: 0; }
.brightness-90 { filter: brightness(0.9); }

/* Left Sidebar (md and up) */
.hidden { display: none; }
.md-flex { display: none; }
@media (min-width: 768px) { .md-flex { display: flex; } }
.top-50 { top: 50%; }
.left-28 { left: 7rem; } /* 28 * 0.25rem */
.translate-y--50 { transform: translateY(-50%); }
.w-60px { width: 60px; }
.h-65vh { height: 65vh; }
.bg-dark-red { background-color: #2a0e0e; }
.rounded-xl { border-radius: 0.75rem; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.space-y-5 > * + * { margin-top: 1.25rem; }
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
.z-50 { z-index: 50; }
.text-white { color: #ffffff; }
.hover-text-yellow:hover { color: #facc15; }
.cursor-pointer { cursor: pointer; }
.mt-auto { margin-top: auto; }

/* Right Sidebar (md and up) */
.right-28 { right: 7rem; }
.space-y-4 > * + * { margin-top: 1rem; }
.w-10 { width: 2.5rem; }
.h-10 { height: 2.5rem; }
.rounded-full { border-radius: 9999px; }
.border-2 { border-width: 2px; }
.border-white { border-color: #ffffff; }
.shadow { box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); }
.w-2\.5 { width: 0.625rem; }
.h-2\.5 { height: 0.625rem; }
.border-black { border-color: #000000; }
.bg-green { background-color: #34d399; }
.bg-orange { background-color: #fb923c; }
.bg-gray { background-color: #6b7280; }
.space-x-2 { display: flex; gap: 0.5rem; }
.mt-2 { margin-top: 0.5rem; }
.w-5 { width: 1.25rem; }
.h-5 { height: 1.25rem; }
.text-blue { color: #60a5fa; }
.hover-text-blue-light:hover { color: #93c5fd; }
.text-green { color: #34d399; }
.hover-text-green-light:hover { color: #6ee7b7; }

/* Bottom Navigation (mobile) */
.md-hidden { display: flex; }
@media (min-width: 768px) { .md-hidden { display: none; } }
.bottom-0 { bottom: 0; }
.left-0 { left: 0; }
.right-0 { right: 0; }
.border-t { border-top-width: 1px; }
.border-red-border { border-color: #3a1a1a; }
.justify-around { justify-content: space-around; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.shadow-inner { box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06); }

/* Creative Friends Bar (mobile) */
.bottom-16 { bottom: 4rem; }
.left-4 { left: 1rem; }
.right-4 { right: 1rem; }
.bg-dark-red-translucent { background-color: rgba(42, 14, 14, 0.741); }
.backdrop-blur-md { backdrop-filter: blur(8px); }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.rounded-2xl { border-radius: 1rem; }
.shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
.overflow-x-auto { overflow-x: auto; }
.flex { display: flex; }
.gap-4 { gap: 1rem; }
.flex-shrink-0 { flex-shrink: 0; }
.w-12 { width: 3rem; }
.h-12 { height: 3rem; }
.shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
.transition-transform { transition: transform 0.3s; }
.group:hover .group-hover-scale-110 { transform: scale(1.1); }
.w-4 { width: 1rem; }
.h-4 { height: 1rem; }

/* Main Content */
.z-10 { z-index: 10; }
.justify-center { justify-content: center; }
.items-start { align-items: flex-start; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.sm-px-8 { padding-left: 1rem; padding-right: 1rem; }
@media (min-width: 640px) { .sm-px-8 { padding-left: 2rem; padding-right: 2rem; } }
.pt-16 { padding-top: 4rem; }
.pb-12 { padding-bottom: 3rem; }
.max-w-7xl { max-width: 80rem; }
.bg-dark-red-semi { background-color: rgba(42, 14, 14, 0.4); }
.rounded-30px { border-radius: 1.875rem; }
.shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
.md-px-10 { padding-left: 1rem; padding-right: 1rem; }
@media (min-width: 768px) { .md-px-10 { padding-left: 2.5rem; padding-right: 2.5rem; } }
.font-sans { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.sm-px-12 { padding-left: 1.5rem; padding-right: 1.5rem; }
@media (min-width: 640px) { .sm-px-12 { padding-left: 3rem; padding-right: 3rem; } }
.py-12 { padding-top: 3rem; padding-bottom: 3rem; }

/* Header */
.mb-8 { margin-bottom: 2rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.sm-text-3xl { font-size: 1.5rem; line-height: 2rem; }
@media (min-width: 640px) { .sm-text-3xl { font-size: 1.875rem; line-height: 2.25rem; } }
.font-bold { font-weight: 700; }
.text-yellow { color: #facc15; }
.mt-4 { margin-top: 1rem; }
.sm-flex-row { flex-direction: column; }
@media (min-width: 640px) { .sm-flex-row { flex-direction: row; } }
.items-stretch { align-items: stretch; }
.sm-items-center { align-items: stretch; }
@media (min-width: 640px) { .sm-items-center { align-items: center; } }
.gap-4 { gap: 1rem; }
.flex-1 { flex: 1 1 0%; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.border-red-border { border-color: #3a1a1a; }
.focus-outline-none { outline: none; }
.focus-ring { transition: ring 0.2s; }
.focus-ring:focus { outline: none; box-shadow: 0 0 0 2px #facc15; }
.text-yellow-light { color: #fef08a; }
.font-medium { font-weight: 500; }
.bg-red-light { background-color: #332020; }
.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.text-center { text-align: center; }
.sm-w-auto { width: 100%; }
@media (min-width: 640px) { .sm-w-auto { width: auto; } }

/* Featured Game */
.bg-red-dark { background-color: #401010; }
.p-5 { padding: 1.25rem; }
.sm-p-6 { padding: 1.25rem; }
@media (min-width: 640px) { .sm-p-6 { padding: 1.5rem; } }
.md-flex-row { flex-direction: column; }
@media (min-width: 768px) { .md-flex-row { flex-direction: row; } }
.sm-gap-6 { gap: 1.25rem; }
@media (min-width: 640px) { .sm-gap-6 { gap: 1.5rem; } }
.text-center { text-align: center; }
.md-text-left { text-align: center; }
@media (min-width: 768px) { .md-text-left { text-align: left; } }
.bg-yellow-dark { background-color: #eab308; }
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.font-semibold { font-weight: 600; }
.uppercase { text-transform: uppercase; }
.tracking-wider { letter-spacing: 0.05em; }
.font-extrabold { font-weight: 800; }
.mb-3 { margin-bottom: 0.75rem; }
.text-yellow-light { color: #fef9c3; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
.sm-text-base { font-size: 0.875rem; line-height: 1.25rem; }
@media (min-width: 640px) { .sm-text-base { font-size: 1rem; line-height: 1.5rem; } }
.text-gray-300 { color: #d1d5db; }
.leading-relaxed { line-height: 1.625; }
.text-yellow { color: #facc15; }
.w-240px { width: 15rem; }
.sm-w-300px { width: 15rem; }
@media (min-width: 640px) { .sm-w-300px { width: 18.75rem; } }

/* Suggestions */
.mt-6 { margin-top: 1.5rem; }
.flex-wrap { flex-wrap: wrap; }
.bg-red-medium { background-color: #331111; }
.transition { transition: all 0.3s; }
.hover-bg-red-darker:hover { background-color: #402020; }
.text-gray-400 { color: #9ca3af; }

/* New Games */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.sm-text-xl { font-size: 1.125rem; line-height: 1.75rem; }
@media (min-width: 640px) { .sm-text-xl { font-size: 1.25rem; line-height: 1.75rem; } }
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.sm-grid-cols-2 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
@media (min-width: 640px) { .sm-grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
.lg-grid-cols-3 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
@media (min-width: 1024px) { .lg-grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.gap-5 { gap: 1.25rem; }
.h-220px { height: 13.75rem; }
.sm-h-250px { height: 13.75rem; }
@media (min-width: 640px) { .sm-h-250px { height: 15.625rem; } }
.hover-shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
.overflow-hidden { overflow: hidden; }
.bg-gradient-to-t { background-image: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent); }
.text-gray-200 { color: #e5e7eb; }

/* Statistics */
.mt-10 { margin-top: 2.5rem; }
.ring-yellow { box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.3); }
.bg-dark-overlay { background-color: rgba(28, 11, 11, 0.8); }
.text-yellow-300 { color: #fef08a; }
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
.sm-text-5xl { font-size: 2.25rem; line-height: 2.5rem; }
@media (min-width: 640px) { .sm-text-5xl { font-size: 3rem; line-height: 1; } }
.font-black { font-weight: 900; }
.drop-shadow-lg { filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.04)) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1)); }
.tracking-wide { letter-spacing: 0.025em; }
.mb-6 { margin-bottom: 1.5rem; }
.mt-1 { margin-top: 0.25rem; }
.bg-red-semi { background-color: rgba(45, 16, 16, 0.667); }
.ring-yellow-semi { box-shadow: 0 0 0 1px rgba(250, 204, 21, 0.1); }
.hover-scale-105:hover { transform: scale(1.05); }
.transition-all { transition: all 0.3s; }
.duration-300 { transition-duration: 300ms; }
.border-yellow-semi { border-color: rgba(250, 204, 21, 0.3); }

/* Chat Popup */
.w-80 { width: 20rem; }
.rounded-lg { border-radius: 0.5rem; }
.justify-between { justify-content: space-between; }
.rounded-l-lg { border-top-left-radius: 0.5rem; border-bottom-left-radius: 0.5rem; }
.rounded-r-lg { border-top-right-radius: 0.5rem; border-bottom-right-radius: 0.5rem; }
.bg-yellow { background-color: #facc15; }
.text-black { color: #000000; }
.hover-bg-yellow-light:hover { background-color: #fef08a; }
.h-48 { height: 12rem; }
.overflow-y-auto { overflow-y: auto; }
.hover-text-white:hover { color: #ffffff; }
img{
    width: inherit;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
```