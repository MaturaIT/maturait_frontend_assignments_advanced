import { type Ref } from 'vue'
import { type Router } from 'vue-router'

export const updateQuery = (router: Router, name: string, value: Ref<any>): void => {
  const currentQuery = { ...router.currentRoute.value.query }
  currentQuery[name] = value.value

  router.push({ name: 'products', query: currentQuery })
}
