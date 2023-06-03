import {ToolsAbstract} from './toolsAbstract.js'

class RandSymDel{
    constructor(faker, record, field){
        this.faker = faker;
        this.str = record[field];
    }

    getChangedData(){
        const tools = new ToolsAbstract;
        const res = this.delSym(this.str);
        const result = res.split(' ')
        .map(i=>tools.capitalize(i))
        .join(' ')
        return result
    }

    getRandSymIndex(str){
        for(let x=0; x<999; x++){
            const i = this.faker.number.int({min: 0, max: (str.length||1)-1});
            if (!/[.,() -+]/.test(str[i])) return i
        }
        return 0
    }

    delSym(str){
        const i = this.getRandSymIndex(str);
        const piece1 = str.slice(0,i);
        const piece2 = str.slice(i+1);
        return piece1 + piece2;
    }
}

export { RandSymDel }