<template>
  <div class="item-icon-wrapper w-full h-full flex items-center justify-center">
    <!-- Fishing Rod -->
    <svg v-if="itemType === 'fishing_rod'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="pixel-art-icon">
      <rect x="4" y="4" width="2" height="16" fill="#A0522D"/> <!-- Rod Vertical -->
      <rect x="6" y="4" width="14" height="2" fill="#A0522D"/> <!-- Rod Horizontal -->
      <rect x="18" y="6" width="2" height="10" fill="#cccccc"/> <!-- Line -->
      <rect x="18" y="16" width="2" height="2" fill="#888888"/> <!-- Hook -->
      <rect x="16" y="18" width="2" height="2" fill="#888888"/> <!-- Hook -->
    </svg>

    <!-- Poison Leveling (Skull) -->
    <svg v-else-if="itemType === 'poison_leveling'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="pixel-art-icon">
      <rect x="8" y="6" width="8" height="2" fill="#ff199b"/> <!-- Top -->
      <rect x="6" y="8" width="12" height="8" fill="#ff199b"/> <!-- Main -->
      <rect x="10" y="16" width="4" height="2" fill="#ff199b"/> <!-- Jaw connector -->
      <rect x="8" y="18" width="8" height="2" fill="#ff199b"/> <!-- Jaw -->
      <rect x="8" y="10" width="2" height="4" fill="#34348c"/> <!-- Left Eye -->
      <rect x="14" y="10" width="2" height="4" fill="#34348c"/> <!-- Right Eye -->
      <rect x="10" y="14" width="4" height="2" fill="#34348c"/> <!-- Nose -->
    </svg>

    <!-- Poison Delay (Clock) -->
    <svg v-else-if="itemType === 'poison_delay'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="pixel-art-icon">
      <rect x="4" y="4" width="16" height="16" rx="2" fill="#f2b973"/> <!-- Clock body -->
      <rect x="6" y="6" width="12" height="12" rx="1" fill="#efeffe"/> <!-- Clock face -->
      <rect x="11" y="8" width="2" height="6" fill="#34348c"/> <!-- Minute hand -->
      <rect x="14" y="11" width="4" height="2" fill="#34348c"/> <!-- Hour hand -->
    </svg>

    <!-- Poison Recovery (Pill) -->
    <svg v-else-if="itemType === 'poison_recovery'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="pixel-art-icon">
      <rect x="4" y="10" width="16" height="6" rx="3" fill="#78b8f1"/> <!-- Left Half -->
      <rect x="12" y="10" width="8" height="6" rx="0" fill="#efeffe" transform="translate(-1,0)"/> <!-- Right Half (overlap slightly) -->
       <path d="M12 10 V 16" stroke="#34348c" stroke-width="2"/> <!-- Dividing line -->
    </svg>
    
    <!-- Poison Reveal Fishes (Magnifying Glass) -->
     <svg v-else-if="itemType === 'poison_reveal_fishes'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="pixel-art-icon">
      <circle cx="10" cy="10" r="7" stroke="#78b8f1" stroke-width="3" fill="#efeffe"/> <!-- Lens -->
      <rect x="16" y="16" width="4" height="4" rx="1" fill="#A0522D" transform="rotate(45 16 16) translate(0, -2)"/> <!-- Handle -->
    </svg>

    <!-- Default (Question Mark) -->
    <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="pixel-art-icon">
       <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="'Press Start 2P', cursive" font-size="16" fill="#34348c">?</text>
    </svg>

  </div>
</template>

<script setup lang="ts">
declare interface Props {
  itemType: string
}

defineProps<Props>()
</script>

<style scoped>
.pixel-art-icon {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  width: 100%;
  height: 100%;
}
.item-icon-wrapper {
  /* Adjust size constraints if needed */
  max-width: 48px;
  max-height: 48px;
}
</style> 