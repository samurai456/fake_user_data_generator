
class ToolsAbstract {
    getStrLen(word){
        const lastSym = word.at(-1);
        const len = (lastSym===',' || lastSym==='.') ?
            word.length-1:
            word.length;
        return len;
    }

    getStrSliceIndex(faker, str){
        const strLen = this.getStrLen(str);
        if(strLen<=2) return 0;
        const sliceInd = this.faker.number.int({min: 0, max: strLen-2});
        return sliceInd;
    }
    
    getRandIndex(faker, words){
        for(let x=0; x<999; x++){
            const i = faker.number.int({min: 0, max: (words.length||0)-1});
            const wordLength = this.getStrLen(words[i]);
            if(wordLength>1) return i;
        }
        return 0;
    }

    capitalize(word){
        const firstSym = word[0]||''.toUpperCase();
        const rest = word.toLowerCase().slice(1);
        return firstSym + rest;
    }

    containsUpper(word){
        return /[A-ZÓÚÄÍÅÖÜÁÉÑ]/.test(word);
    }

    isDigit(str){
        return /^[0-9]*$/.test(str);
    }

    changeSymPlace(str, i){
        const piece1 = str.slice(0, i);
        const piece2 = str.slice(i+2);
        const symA = str[i]||'';
        const symB = str[i+1]||'';
        return piece1 + symB + symA + piece2;
    }

    capitalizeIfContains(str){
        if(this.containsUpper(str)) return this.capitalize(str);
        return str;
    }
}

export { ToolsAbstract }