import { WordResult } from '../types';
import tie from './tie.json';

const search = async(word:string) => {
    if(word === '') return []
    return await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res.json())
    .then(word => word)
    .catch(error => {
        console.log(`ERROR - ${error}`);
        return undefined
    });
}
export { search };
export default search;