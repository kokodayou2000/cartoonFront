import { computed } from 'vue'

function parseJSON(value: string) {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '')
  }
  catch (error) {
    return undefined
  }
}

export function useLocalStorage<T>(key: string, initalValue: T) {
  const readValue = () => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? parseJSON(item) : initalValue
    }
    catch (error) {
      return initalValue
    }
  }
  const storedValue = computed(() => readValue())
  const setValue = (value: T) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value
      window.localStorage.setItem(key, JSON.stringify(newValue))
    }
    catch (error) {}
  }
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key)
    }
    catch (error) {}
  }
  return {
    value: storedValue,
    setValue,
    removeItem,
  }
}
