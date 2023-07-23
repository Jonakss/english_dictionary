import { WordResult } from '../types';

const search = async (word: string) => {
    if (word === '') return []
    return await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(res => {
            return res.status == 404? [] : res.json()
        })
        .then(word => word)
        .catch(error => {
            console.log(`ERROR - ${error}`);
            return []
        });
}
export { search };
export default search;