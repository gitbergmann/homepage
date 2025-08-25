<script setup lang="ts">
import { computed, ref } from 'vue';
import Input from './Input.vue';
import Button from './Button.vue';

const emit = defineEmits(['create-entry', 'close-create']);

const lang = computed(() => window.location.pathname.startsWith('/en/') ? 'en' : 'de');

const translations = {
    de: {
        date: "Datum",
        amount: "Menge",
        description: "Beschreibung",
        descriptionPlaceholder: "Strümpfe",
        save: "Speichern",
        save1: "Speichern +1",
        cancel: "Abbrechen"
    },
    en: {
        date: "Date",
        amount: "Amount",
        description: "Description",
        descriptionPlaceholder: "Socks",
        save: "Save",
        save1: "Save +1",
        cancel: "Cancel"
    }
};

const amount = ref(0);
const description = ref("");

/**
 * Make sure the date is in the correct format
 * for the input.
 */
const date = ref(new Date());
const dateString = computed({
    get() {
        return date.value.toISOString().substring(0, 10)
    },
    set(val) {
        date.value = new Date(val)
    }
});


/**
 * Handle save by emitting create-entry.
 * Emits close-create if plusOne is false.
 * 
 * @param plusOne 
 */
function handleSave(plusOne: boolean = false): void {
    emit('create-entry', date.value, description.value, Number(amount.value));

    if (plusOne) {
        amount.value = 0;
        description.value = "";
    }
    else {
        emit('close-create');
    }
}
</script>

<template>
    <div class="fixed top-0 left-0 right-0 bottom-0 h-screen w-full">
        <div class="absolute top-0 left-0 right-0 bottom-0 h-screen w-full bg-black opacity-40 z-0"></div>
        <div
            class="absolute top-1/2 left-1/2 -translate-1/2 z-10 w-full max-w-128 bg-black p-4 rounded border border-gray-700">
            <form>
                <Input :label="translations[lang].date" v-model="dateString" type="date" />
                <Input :label="translations[lang].description" v-model.trim="description" :placeholder="translations[lang].descriptionPlaceholder" type="text" />
                <Input :label="translations[lang].amount" v-model="amount" type="number" step="1" min="0" />

                <div class="mt-4 flex justify-between">
                    <button class="bg-gray-400 px-4 py-1 rounded cursor-pointer hover:bg-gray-500"
                        @click.prevent="$emit('close-create')">{{translations[lang].cancel}}</button>
                    <div>
                        <Button @click.prevent="handleSave(true)" :label="translations[lang].save1" class="mr-2" />
                        <Button @click.prevent="handleSave()" :label="translations[lang].save" />
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>