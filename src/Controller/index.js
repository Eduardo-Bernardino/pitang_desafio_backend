import prisma from '../prismaClient.js'
class Controller {
    async index(request, response) {
      const schedule = await prisma.schedule.findMany()

     response.json({schedule})
    }

    store(request, response) {
      response.json({ message: "store" })
    }
  
    update(request, response) {
      response.json({ message: "update" })
    }
  
    remove(request, response) {
      response.json({ message: "remove" })
    }
  
    async getOne(request, response) {
      const { id } = request.params;
      const schedule = await prisma.schedule.findUnique({ where: {id} })
      if(!schedule){
        return response.status(404).json({message: "Not found!"})
      }
      response.json(schedule)
    }
  }
  
export default Controller;