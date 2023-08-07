import type { WordResult } from '../types'

const search = async (word: string): Promise<WordResult> => {
  if (word === '') { await Promise.resolve(null) } // Si no hay palabra, resuelve una promesa con un array vacío

  return await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(async res => {
      if (res.status === 404) {
        await Promise.resolve(null) // Si la palabra no se encuentra, resuelve una promesa con un array vacío
      } else {
        return await res.json() // Parsea la respuesta como JSON y resuelve la promesa con el resultado
      }
    })
    .catch(async (error: string) => {
      console.log(`ERROR - ${error}`)
      await Promise.resolve(null) // Si hay algún error, resuelve una promesa con un array vacío
    })
}

export { search }
export default search
