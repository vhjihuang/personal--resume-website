import { ref } from 'vue'

export const useContactForm = () => {
  const form = ref({
    name: '',
    email: '',
    message: ''
  })

  const isSubmitting = ref(false)
  const submitError = ref('')

  const validateForm = () => {
    if (!form.value.name || !form.value.email || !form.value.message) {
      return 'Please fill in all fields'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
      return 'Please enter a valid email address'
    }
    return ''
  }

  const handleSubmit = async () => {
    try {
      isSubmitting.value = true
      submitError.value = ''

      const error = validateForm()
      if (error) {
        submitError.value = error
        return
      }

      // 这里添加发送表单的逻辑
      console.log('Form submitted:', form.value)

      // 重置表单
      form.value = {
        name: '',
        email: '',
        message: ''
      }
    } catch (error) {
      submitError.value = 'An error occurred while submitting the form'
      console.error('Error submitting form:', error)
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    form,
    isSubmitting,
    submitError,
    handleSubmit
  }
} 