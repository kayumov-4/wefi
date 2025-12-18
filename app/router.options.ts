// app/router.options.ts
import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // если переход с ?scroll=bottom → вниз страницы
    if (to.query.scroll === 'bottom') {
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          resolve({ left: 0, top: document.body.scrollHeight })
        })
      })
    }

    // если указан hash (#bottom) → нативное поведение
    if (to.hash) {
      return { el: to.hash }
    }

    // стандартное поведение
    if (savedPosition) {
      return savedPosition
    }
    return { left: 0, top: 0 }
  },
}
