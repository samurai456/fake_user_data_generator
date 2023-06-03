import { ToolsAbstract } from './toolsAbstract.js'

class LettersPlaceChanging extends ToolsAbstract {
    constructor(faker, record, field){
        super();
        this.faker = faker;
        this.record = record;
        this.field = field;
    }

    getChangedData(){
        const words = this.record[this.field].split(' ');
        const i = this.getRandIndex(this.faker, words);
        const sliceInd = this.getStrSliceIndex(this.faker, words[i])
        words[i] = this.changeSymPlace(words[i], sliceInd);
        if (this.containsUpper(words[i])){
            words[i] = this.capitalize(words[i]);
        }
        return words.join(' ');
    }
}

export { LettersPlaceChanging }