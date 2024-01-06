import { type Ref, ref, type UnwrapRef } from 'vue'

export function createRef<T>(initialValue: T): Ref<UnwrapRef<T>> {
  return ref(initialValue) as Ref<UnwrapRef<T>>
}
