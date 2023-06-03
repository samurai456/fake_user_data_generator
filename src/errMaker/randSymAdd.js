import {ToolsAbstract} from './toolsAbstract.js'

class RandSymAdder{
    constructor(faker, record, field){
        this.faker = faker;
        this.str = record[field];
        this.field = field;
    }

    getChangedData(){
        const tools = new ToolsAbstract;
        const res = this.addRandSym(this.str);
        const result = res.split(' ')
        .map(i=>tools.capitalize(i))
        .join(' ')
        return result
    }

    addRandSym(str){
        let sym;
        if(this.field==='phone') sym = `${this.faker.number.int()}`[0];
        else sym = this.faker.string.alpha();
        const i = this.getRandInd(str);
        const piece1 = str.slice(0,i);
        const piece2 = str.slice(i);
        return piece1 + sym.toLowerCase() + piece2;
    }

    getRandInd(str){
        for(let x=0; x<999; x++){
            const i = this.faker.number.int({min: 0, max: (str.length||1)-1});
            if (!/[.,() -+]/.test(str.at(i-1)) ||
            !/[.,() -+]/.test(str.at(i+1))){
                return i
            }
        }
        return 0;
    }
}

export { RandSymAdder }