import type { WordResult } from '../types'

const search = async (word: string): Promise<WordResult> => {
  if (word === '') return []
  return await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(async res => {
      return res.status === 404 ? [] : await res.json()
    })
    .then(word => word)
    .catch((error: string) => {
      console.log(`ERROR - ${error}`)
      return []
    })
}
export { search }
export default search
