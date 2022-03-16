import { createSSRApp } from 'vue'

export function createApp() {
    return createSSRApp({
        template: `
            <button @click="count++">
                {{ count }}
            </button>
        `,
    
        data: () => ({
            count: 1
        }),
    })
}