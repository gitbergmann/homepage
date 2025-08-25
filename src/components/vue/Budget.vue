<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { CirclePlus } from 'lucide-vue-next';
import CreateEntry from './CreateEntry.vue';

interface Entry {
    id: number;
    date: Date,
    description: string,
    amount: number
}

interface Props {
    title: string;
    rent: string;
    electricity: string;
    groceries: string;
    remove: string;
}

const { title, rent, electricity, groceries, remove } = defineProps<Props>();
const emit = defineEmits(['open-create-popup', 'delete-entry']);

const show = ref(true);
const showCreatePopup = ref(false);

const first = new Date();
first.setDate(1);
const entries: Entry[] = reactive([
    { id: 1, date: first, description: rent, amount: 1203 },
    { id: 2, date: new Date(Date.now() - 24 * 3600 * 1000 * 5), description: electricity, amount: 23.80 },
    { id: 3, date: new Date(), description: groceries, amount: 123.45 },
]);
entries.sort((a, b) => b.date.getTime() - a.date.getTime());

const amount = computed(() => {
    return entries.reduce((sum, entry) => addFloats(sum, entry.amount), 0);
})

/**
 * Formate date to dd.mm.yyyy
 * 
 * @param date 
 */
function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

/**
 * Asks for confirmation before emitting delete.
 * 
 * @param id 
 * @param date 
 * @param category 
 * @param amount 
 */
function handleDelete(id: number): void {
    entries.splice(entries.findIndex(entry => entry.id === id), 1);
}

/**
 * Add entry and sort.
 * 
 * @param date 
 * @param description 
 * @param amount 
 */
function handleCreate(date: Date, description: string, amount: number) {
    entries.push({ id: Math.random(), date, description, amount });
    entries.sort((a, b) => b.date.getTime() - a.date.getTime());
}

/**
 * Prevent floating point imprecision.
 * 
 * @param a 
 * @param b 
 * @returns {number}
 */
function addFloats(a: number, b: number): number {
    return (Math.round(a * 100) + Math.round(b * 100)) / 100;
}
</script>

<template>
    <div class="border rounded p-2 border-gray-700 w-full max-w-80 mx-auto mb-4">
        <div :class="`flex justify-between ${show && entries.length ? 'border-b mb-2 pb-2' : ''} border-gray-700`">
            <div @click="show = !show" class="cursor-pointer">
                <span class="mr-2 capitalize">{{ title }}</span>
                <span>{{ amount.toFixed(2) }}</span>€
            </div>
            <button @click="showCreatePopup = true" class="dark:text-white cursor-pointer hover:text-green-300">
                <CirclePlus />
            </button>
        </div>
        <ul v-show="show">
            <li v-for="(entry) in entries" :key="entry.id" class="mb-2 group">
                <div class="flex justify-between">
                    <span>{{ entry.description }}</span>
                    <span>{{ entry.amount.toFixed(2) }}€</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-500 text-sm">
                        {{ formatDate(entry.date) }}
                    </span>
                    <span @click="handleDelete(entry.id)"
                        class="text-gray-500 text-sm cursor-pointer hidden touch:block group-hover:block">
                        {{ remove }}
                    </span>
                </div>
            </li>
        </ul>
        <CreateEntry v-if="showCreatePopup" @create-entry="handleCreate" @close-create="showCreatePopup = false" />
    </div>
</template>