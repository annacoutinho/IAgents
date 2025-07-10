import { fastifyCors } from '@fastify/cors'
import 'dotenv/config'
import { fastify } from 'fastify'
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import {sql} from './db/conection.ts'
import { env } from './env.ts'
import { getRoomsRoute } from './http/routes/get-room.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: process.env.FRONTEND_ORIGIN,
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/helth', () => {
  return 'Ok'
})

app.register(getRoomsRoute)

app.listen({port: env.PORT})
