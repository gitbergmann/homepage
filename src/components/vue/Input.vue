<script setup lang="ts">
import { useAttrs } from 'vue';

const { label, modelValue } = defineProps<{ label: string, modelValue: string | number }>();
const attrs = useAttrs();

defineEmits<{
    (e: 'update:modelValue', value: string | number | null): void;
}>();

</script>

<template>
    <label class="block mb-2">
        {{ label }}
        <input class="block mt-1 border border-gray-700 rounded p-1" v-bind="attrs" :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    </label>
</template>