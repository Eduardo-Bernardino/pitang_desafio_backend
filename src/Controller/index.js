import prisma from '../prismaClient.js'
import Joi from 'joi'
import Store from './store.js'

const schema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  birthDate: Joi.date(),
  appointmentday: Joi.date(),
  situation: Joi.boolean()
})
class Controller {
  async index (request, response) {
    const registrys = await prisma.schedule.findMany({})

    response.json(registrys)
  }

  async store (request, response) {
    Store(request, response, schema)
  }

  async update (request, response) {
    const { id } = request.params
    const { body } = request

    if (schema) {
      const validation = schema.validate(body, { abortEarly: false })

      if (validation.error) {
        return response.status(400).json(validation.error.details)
      }
    }

    try {
      const registry = await prisma.schedule.update({
        where: { id },
        data: body
      })

      response.json(registry)
    } catch (error) {
      console.error(error)

      response.status(400).send({ message: 'Update Failed' })
    }
  }

  async remove (request, response) {
    const { id } = request.params
    try {
      await prisma.schedule.delete({ where: { id } })
    } catch (error) {
      console.error(error)
      return response.json({ message: 'Something wrong happened' })
    }
    response.json({ message: 'Deleted' })
  }

  async getOne (request, response) {
    const { id } = request.params
    const schedule = await prisma.schedule.findUnique({ where: { id } })
    if (!schedule) {
      return response.status(404).json({ message: 'Not found!' })
    }
    response.json(schedule)
  }
}

export default Controller
