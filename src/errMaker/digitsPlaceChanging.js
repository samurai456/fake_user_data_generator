import { ToolsAbstract } from './toolsAbstract.js'

class DigitsPlaceChanging extends ToolsAbstract {
    constructor(faker, record, field){
        super();
        this.faker = faker;
        this.digits = record[field];
    }

    getSliceInd4Digits(faker, strDigits){
        for(let x=0; x<999; x++){
            const i = this.getStrSliceIndex(faker, strDigits);
            if (this.isDigit(strDigits[i]) && this.isDigit(strDigits[i+1])){
                return i
            }
        }
        return 0;
    }

    getChangedData(){
        const target = this.digits;
        const sliceInd = this.getSliceInd4Digits(this.faker, target);
        const result = this.changeSymPlace(target, sliceInd);
        return result
    }
}

export { DigitsPlaceChanging }