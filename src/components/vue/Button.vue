<script setup lang="ts">

defineProps<{ label: string }>();

</script>

<template>
    <button class="rounded px-2 sm:px-4 py-1 border border-gray-700 cursor-pointer hover:bg-gray-900 disabled:hover:bg-black disabled:cursor-not-allowed disabled:text-gray-700">{{ label }}</button>
</template>