import { LettersPlaceChanging } from './lettersPlaceChanging.js'
import { DigitsPlaceChanging } from './digitsPlaceChanging.js'
import { faker } from '@faker-js/faker'
import { RandSymDel } from './randSymDel.js'
import { RandSymAdder } from './randSymAdd.js'

class PseudoRandChanging{
    constructor(allRecords, quontity){
        const firstRec = allRecords[0];
        this.faker = this.setFaker(firstRec.index);
        this.allRecords = [...allRecords.map(i=>({...i}))];
        this.keys = ['name', 'address', 'phone'];
        this.quontity = quontity;
    }

    getPlusOne(quontity, faker){
        let plusOne = 0;
        (faker.number.float({min:0,max:1})<=quontity%1) && (plusOne=1);
        return plusOne
    }

    setFaker(seed){
        faker.seed([seed]);
        return faker
    }

    getResult(){
        for(let i=0; i<Math.floor(this.quontity); i++){
            this.allRecords = this.allRecords.map(i=>this.getChangedRecord(i));
        }
        this.oneMoreIteration();
        return this.allRecords;
    }

    oneMoreIteration(){
        if(this.quontity%1){
            this.allRecords = this.allRecords.map(i=>
                (this.getPlusOne(this.quontity, this.faker))?
                    this.getChangedRecord(i): i
            );
        }
    }

    getChangedRecord(record){
        record = {...record};
        const field = this.getRandField();
        const errMaker = this.getRandErrMaker(field);
        record[field] = new errMaker(this.faker, record, field).getChangedData();
        return record
    }

    getRandField(){
        return this.faker.helpers.arrayElement(this.keys);
    }

    getRandErrMaker(field){
        const errMakers = [ this.getSymPlaceChngClass(field), RandSymDel, RandSymAdder ];
        const errMaker = this.faker.helpers.arrayElement(errMakers);
        return errMaker
    }

    getSymPlaceChngClass(field){
        return (field === 'phone')? 
            DigitsPlaceChanging :
            LettersPlaceChanging
    }
}

export { PseudoRandChanging }