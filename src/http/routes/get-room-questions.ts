import { z } from 'zod/v4'
import { eq, desc } from 'drizzle-orm'
import { db } from '../../db/conection.ts'
import { schema } from '../../db/schema/index.ts'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'

export const getRoomQuestions: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request) => {
      const { roomId } = request.params as { roomId: string }

      const result = await db
        .select({
          id: schema.questions.id,
          question: schema.questions.question,
          answer: schema.questions.answer,
          createdAt: schema.questions.createdAt,
        })
        .from(schema.questions)
        .where(eq(schema.questions.roomId, roomId))
        .orderBy(desc(schema.questions.createdAt))

      return result
    }
  )
}
