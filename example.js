import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const app = createSSRApp({
    template: `
        <button @click="count++">
            {{ count }}
        </button>
    `,

    data: () => ({
        count: 1
    }),
})

renderToString(app).then((html) => {
    console.log(html)
})