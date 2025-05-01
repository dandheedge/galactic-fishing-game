<template>
  <div class="item-icon-wrapper w-full h-full flex items-center justify-center">
    <!-- Display icon using CSS sprite -->
    <div
      v-if="iconStyle"
      class="item-sprite pixel-art-icon"
      :style="iconStyle"
      role="img"
      :aria-label="itemType"
    ></div>
    <!-- Fallback display when item type not found -->
    <div
      v-else
      class="item-sprite pixel-art-icon default-icon"
      :style="defaultIconStyle"
      role="img"
      aria-label="Unknown item"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

declare interface Props {
  itemType: string
}

const props = defineProps<Props>()

// --- Configuration --- You might need to adjust these ---
const SPRITESHEET_URL = '/sprites.png';
const ICON_WIDTH_PX = 32; // Width of a single icon in the spritesheet
const ICON_HEIGHT_PX = 32; // Height of a single icon in the spritesheet

// --- Item Coordinate Mapping --- 

// Map itemType string to [columnIndex, rowIndex] (0-indexed)
const itemCoordinates: { [key: string]: [number, number] } = {
  // Row 0
  'poison_reveal_fishes': [2, 4],
  'poison_leveling': [1, 0],
  'poison_delay': [5, 0],
  'poison_recovery': [3, 0],
  'fishing_rod': [0, 6],
};

// Default icon to use when the itemType isn't found in the mapping
const DEFAULT_ICON: [number, number] = [4, 4]; // Using the empty cup as default

// --------------------------------------------------------

const iconStyle = computed(() => {
  const coords = itemCoordinates[props.itemType];
  if (!coords) {
    console.warn(`No coordinates found for itemType: ${props.itemType}`);
    return null; // Return null to trigger the fallback icon
  }

  const [columnIndex, rowIndex] = coords;
  const backgroundPositionX = -(columnIndex * ICON_WIDTH_PX);
  const backgroundPositionY = -(rowIndex * ICON_HEIGHT_PX);

  return {
    backgroundImage: `url(${SPRITESHEET_URL})`,
    backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
    width: `${ICON_WIDTH_PX}px`,
    height: `${ICON_HEIGHT_PX}px`,
  };
});

// Style for the default icon
const defaultIconStyle = computed(() => {
  const [columnIndex, rowIndex] = DEFAULT_ICON;
  const backgroundPositionX = -(columnIndex * ICON_WIDTH_PX);
  const backgroundPositionY = -(rowIndex * ICON_HEIGHT_PX);

  return {
    backgroundImage: `url(${SPRITESHEET_URL})`,
    backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
    width: `${ICON_WIDTH_PX}px`,
    height: `${ICON_HEIGHT_PX}px`,
  };
});

</script>

<style scoped>
.pixel-art-icon {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

.item-sprite {
  background-repeat: no-repeat;
  /* Ensure the div size matches the icon size from the sprite */
  flex-shrink: 0; /* Prevent shrinking if in a flex container */
}

.item-icon-wrapper {
   max-width: 32px;
   max-height: 32px;
}

.default-icon {
  opacity: 0.8;
}

@media (max-width: 479px) {
  .item-icon-wrapper {
    max-width: 48px;
    max-height: 48px;
  }
}
</style> 