import {Redis} from '@upstash/redis'

const redis_url = process.env.REDIS_URL

export const redis = new Redis({
    url: redis_url,
    token: process.env.REDIS_TOKEN
})