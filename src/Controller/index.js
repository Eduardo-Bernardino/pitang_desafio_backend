class Controller {
    store(request, response) {
      response.json({ message: "store" })
    }
  
    index(request, response) {
      response.json({ message: "index" })
    }
  
    update(request, response) {
      response.json({ message: "update" })
    }
  
    remove(request, response) {
      response.json({ message: "remove" })
    }
  
    getOne(request, response) {
      response.json({ message: "getOne" })
    }
  }
  
export default Controller;