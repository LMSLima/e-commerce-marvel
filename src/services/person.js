import axios from 'axios'

class PersonService {
  async getAllPersons() {
    try {
      const response = await axios.get(`all.json`)
      const marvelCharacters = response.data.filter(
        (char) => char.biography.publisher === 'Marvel Comics',
      )
      return marvelCharacters
    } catch (error) {
      console.error('Erro ao buscar personagens da Marvel:', error)
      throw error
    }
  }
}

export default new PersonService()
