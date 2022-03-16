import express from 'express'
import { createApp } from './app.js'
import { renderToString } from 'vue/server-renderer'

const server = express()
const app    = createApp()

server.use(express.static('.'))

let vueHtml = ''

renderToString(app).then((html) => {
    vueHtml = `
        <!DOCTYPE html>
        <html>
            <body>
                <div id="app">${html}</div>

                <script type="importmap">
                    {
                        "imports": {
                            "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
                        }
                    }
                </script>

                <script type="module" src="/client.js"></script>
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