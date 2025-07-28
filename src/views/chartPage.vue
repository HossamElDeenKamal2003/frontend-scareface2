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
      <source src="../assets/شسيسيشسيسشيس.mp4" type="video/mp4" />
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
        class="text-white hover-text-yellow cursor-pointer"
        :size="24"
      />
      <Plus class="text-white mt-auto hover-text-yellow cursor-pointer" :size="24" />
    </aside>

    <!-- Right Sidebar - for md and up -->
    <aside
      class="hidden md-flex fixed top-50 right-28 translate-y--50 w-60px h-65vh bg-dark-red rounded-xl flex-col items-center py-4 space-y-4 shadow-lg z-50"
    >
      <div v-for="(friend, i) in friends" :key="i" class="relative flex flex-col items-center mb-2">
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

    <!-- Bottom Navigation - for mobile -->
    

    <!-- Main Content -->
    <div class="relative z-10 flex justify-center items-start px-4 sm-px-8 pt-16 pb-12 min-h-screen">
      <div class="w-full max-w-7xl bg-dark-red-semi backdrop-blur-lg rounded-30px shadow-2xl md-px-10 px-4">
        <div class="relative text-white font-sans rounded-30px px-6 sm-px-12 py-12">
          <!-- Header -->
          <div class="mb-8 text-center">
            <h1 class="text-2xl sm-text-3xl font-bold">
              Trading Dashboard, <span class="text-yellow">Scarface</span>
            </h1>
            <div class="mt-4 flex flex-col sm-flex-row items-stretch sm-items-center gap-4">
              <input
                type="text"
                placeholder="Search assets..."
                class="flex-1 bg-dark-red text-sm px-4 py-2 rounded-full text-white border border-red-border focus-outline-none focus-ring"
              />
              <span
                class="text-base text-yellow-light font-medium bg-red-light px-3 py-1 rounded-full shadow-inner text-center sm-w-auto"
              >
                {{ currentTime }}
              </span>
            </div>
          </div>

          <!-- Candlestick Chart -->
          <section class="bg-red-dark p-5 sm-p-6 rounded-2xl shadow-lg mb-6">
            <h2 class="text-2xl sm-text-3xl font-extrabold mb-4 text-yellow-light">Market Chart</h2>
            <div class="flex gap-4 mb-4">
              <button
                @click="loadPastData"
                class="bg-yellow text-black px-4 py-2 rounded-full hover-bg-yellow-light flex items-center"
              >
                <ChevronLeft :size="20" />
                Load Past
              </button>
              <button
                @click="loadFutureData"
                class="bg-yellow text-black px-4 py-2 rounded-full hover-bg-yellow-light flex items-center"
              >
                Load Future
                <ChevronRight :size="20" />
              </button>
            </div>
            <div class="relative h-500px">
              <Chart
                type="candlestick"
                :data="chartData"
                :options="chartOptions"
                class="w-full h-full"
              />
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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {
  Home,
  Gamepad2,
  Download,
  Users,
  Settings,
  Plus,
  Send,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-vue-next';
import { Chart } from 'vue-chartjs';
import { Chart as ChartJS, registerables, TimeScale } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';
import router from '../router';

// Register Chart.js modules
ChartJS.register(...registerables, CandlestickController, CandlestickElement, TimeScale);
const icons = [
  { icon: Home, route: '/' },
  { icon: Gamepad2, route: '/chart' },
  { icon: Download, route: '/downloads' },
  { icon: Users, route: '/users' },
  { icon: Settings, route: '/settings' },
];
// --- Chart State ---
const isChatOpen = ref(false);
const currentTime = ref('');
const intervalId = ref(null);

// Generate dummy candlestick data
const generateCandlestickData = (startDate, count) => {
  const data = [];
  let price = 100;
  let currentTime = new Date(startDate);

  for (let i = 0; i < count; i++) {
    const open = price;
    const change = (Math.random() - 0.5) * 10;
    const high = open + Math.random() * 5;
    const low = open - Math.random() * 5;
    const close = open + change;
    price = close;

    data.push({
      x: new Date(currentTime),
      o: open,
      h: high,
      l: low,
      c: close,
    });

    currentTime.setMinutes(currentTime.getMinutes() + 1);
  }

  return data;
};

// Pre-fill chart with initial data
const initialTime = new Date(Date.now() - 100 * 60 * 1000); // 100 minutes ago
const chartData = ref({
  datasets: [
    {
      label: 'Quotex Candlestick Chart',
      data: generateCandlestickData(initialTime, 100),
      borderColor: '#FFD700',
      backgroundColor: (context) => {
        const { c, o } = context.raw || {};
        return c >= o ? '#FFD700' : '#FF4500';
      },
      wickColor: '#FFFFFF',
    },
  ],
});

// Time range control
const timeRange = ref({
  min: chartData.value.datasets[0].data[0].x,
  max: chartData.value.datasets[0].data.at(-1).x,
});

// Chart options
const chartOptions = ref({
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'minute',
        displayFormats: { minute: 'HH:mm' },
      },
      adapters: {
        date: { locale: enUS },
      },
      min: timeRange.value.min,
      max: timeRange.value.max,
      grid: { color: 'rgba(255, 255, 255, 0.1)' },
      ticks: { color: '#FFF' },
    },
    y: {
      grid: { color: 'rgba(255, 255, 255, 0.1)' },
      ticks: { color: '#FFF' },
    },
  },
  plugins: {
    legend: {
      labels: { color: '#FFF' },
    },
  },
  maintainAspectRatio: false,
});

// Load older candles
const loadPastData = () => {
  const first = chartData.value.datasets[0].data[0];
  const pastStart = new Date(first.x.getTime() - 60 * 1000 * 50);
  const newData = generateCandlestickData(pastStart, 50);
  chartData.value.datasets[0].data = [...newData, ...chartData.value.datasets[0].data];
  timeRange.value.min = chartData.value.datasets[0].data[0].x;
};

// Load future candles (one-time)
const loadFutureData = () => {
  const last = chartData.value.datasets[0].data.at(-1);
  const futureStart = new Date(last.x.getTime() + 60 * 1000);
  const newData = generateCandlestickData(futureStart, 50);
  chartData.value.datasets[0].data = [...chartData.value.datasets[0].data, ...newData];
  timeRange.value.max = chartData.value.datasets[0].data.at(-1).x;
};

// Start infinite loop to push new candles
onMounted(() => {
  // update clock display
  currentTime.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  intervalId.value = setInterval(() => {
    const last = chartData.value.datasets[0].data.at(-1);
    const newTime = new Date(last.x.getTime() + 60 * 1000);
    const newCandle = generateCandlestickData(newTime, 1)[0];

    chartData.value.datasets[0].data.push(newCandle);
    chartData.value.datasets[0].data.shift(); // keep size fixed

    timeRange.value.min = chartData.value.datasets[0].data[0].x;
    timeRange.value.max = chartData.value.datasets[0].data.at(-1).x;

    chartOptions.value.scales.x.min = timeRange.value.min;
    chartOptions.value.scales.x.max = timeRange.value.max;
  }, 2000); // every 2 seconds
});

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});

// UI: Friends, Chat, Icons
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};


const friends = [
  { img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', status: 'in-game' },
  { img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', status: 'online' },
  { img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', status: 'offline' },
  { img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', status: 'online' },
  { img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', status: 'in-game' },
];
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
.left-28 { left: 7rem; }
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
.mb-2 { margin-bottom: 0.5rem; }
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

/* Candlestick Chart */
.bg-red-dark { background-color: #401010; }
.p-5 { padding: 1.25rem; }
.sm-p-6 { padding: 1.25rem; }
@media (min-width: 640px) { .sm-p-6 { padding: 1.5rem; } }
.mb-6 { margin-bottom: 1.5rem; }
.text-yellow-light { color: #fef9c3; }
.h-500px { height: 31.25rem; }
.flex { display: flex; }
.bg-yellow { background-color: #facc15; }
.text-black { color: #000000; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.rounded-full { border-radius: 9999px; }
.hover-bg-yellow-light:hover { background-color: #fef08a; }
.items-center { align-items: center; }

/* Chat Popup */
.w-80 { width: 20rem; }
.rounded-lg { border-radius: 0.5rem; }
.justify-between { justify-content: space-between; }
.rounded-l-lg { border-top-left-radius: 0.5rem; border-bottom-left-radius: 0.5rem; }
.rounded-r-lg { border-top-right-radius: 0.5rem; border-bottom-right-radius: 0.5rem; }
.h-48 { height: 12rem; }
.overflow-y-auto { overflow-y: auto; }
.hover-text-white:hover { color: #ffffff; }
</style>
```