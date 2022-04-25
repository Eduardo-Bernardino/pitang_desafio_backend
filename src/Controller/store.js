import prisma from '../prismaClient.js'

const Store = async (request, response, schema) => {
  try {
    const { name, birthDate, appointmentday, situation } = request.body
    const appointment = appointmentday
    const [WithoutTime] = appointment.split('T')

    const auxDay = await prisma.schedule.findMany({
      select: {
        appointmentday: true
      }
    })
    const days = auxDay.map((item) => {
      const aux = item.appointmentday.toISOString().split('T')[0]
      return aux
    })

    const manyDays = await prisma.schedule.findMany({
      where: {
        appointmentday: appointment
      }
    })

    const manyDaysWithOutTime = days.filter(day => day === WithoutTime)

    if (manyDays.length >= 2) {
      response.status(400).json({ message: 'the number of appointments for that horary has already reached the limit' })
    } else {
      if (manyDaysWithOutTime.length >= 20) {
        response.status(400).json({ message: 'the number of appointments for that day has already reached the limit' })
      } else {
        const body = {
          name: name,
          birthDate: birthDate,
          appointmentday: appointmentday,
          situation: situation
        }

        if (schema) {
          const validation = schema.validate(body, { abortEarly: false })

          if (validation.error) {
            return response.status(400).json(validation.error.details)
          }
        }

        try {
          const registry = await prisma.schedule.create({
            data: body
          })

          response.json(registry)
        } catch (error) {
          console.error(error)

          response.status(400).send({ message: 'Insertion Failed' })
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export default Store
