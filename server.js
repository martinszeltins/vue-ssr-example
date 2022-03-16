import express from 'express'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const server = express()

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

let vueHtml = ''

renderToString(app).then((html) => {
    vueHtml = `
        <!DOCTYPE html>
        <html>
            <body>
                <div id="app">${html}</div>
            </body>
        </html>
    `
})

server.get('/', (request, response) => {
    response.send(vueHtml)
})

server.listen(3000, () => {
    console.log('Server runnig at http://localhost:3000')
})