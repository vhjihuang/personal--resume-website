<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import MobileLoader from './MobileLoader.vue'

const { t } = useI18n({
  useScope: 'global'
})

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitError = ref('')

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    submitError.value = ''
    
    if (!form.value.name || !form.value.email || !form.value.message) {
      submitError.value = t('contact.form.errors.required')
      return
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.value.email)) {
      submitError.value = t('contact.form.errors.invalidEmail')
      return
    }
    
    console.log('Form submitted:', form.value)
    
    form.value = {
      name: '',
      email: '',
      message: ''
    }
    submitError.value = t('contact.form.success')
  } catch (error) {
    submitError.value = t('contact.form.errors.submitError')
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-400 mb-1">{{ t('contact.form.name') }}</label>
      <input 
        type="text" 
        v-model="form.name" 
        :placeholder="t('contact.form.name')"
        class="w-full px-4 py-3 bg-[#1a2f50] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 transition-all duration-300 hover:bg-[#243b63] focus:bg-[#243b63] focus:scale-[1.02]"
      >
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-400 mb-1">{{ t('contact.form.email') }}</label>
      <input 
        type="email" 
        v-model="form.email" 
        :placeholder="t('contact.form.email')"
        class="w-full px-4 py-3 bg-[#1a2f50] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
      >
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-400 mb-1">{{ t('contact.form.message') }}</label>
      <textarea 
        v-model="form.message" 
        :placeholder="t('contact.form.message')" 
        rows="4"
        class="w-full px-4 py-3 bg-[#1a2f50] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 resize-none"
      ></textarea>
    </div>
    <button 
      type="submit" 
      class="w-full px-6 py-3 text-sm font-medium text-white transition-transform rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 hover:scale-[1.02] active:scale-[0.98] motion-safe:hover:animate-float"
      :disabled="isSubmitting"
    >
      <span v-if="!isSubmitting">{{ t('contact.form.send') }}</span>
      <MobileLoader v-else size="small" class="mx-auto" />
      <i class="uil uil-message ml-2"></i>
    </button>
    <p v-if="submitError" class="text-red-400 text-sm mt-2">{{ submitError }}</p>
  </form>
</template> 