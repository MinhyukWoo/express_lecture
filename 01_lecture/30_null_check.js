const zeroNumber = 0;
const falseBoolean = false;
const emptyString = "";
const undefinedValue = undefined;
const nullValue = null;

const array = [zeroNumber, falseBoolean, emptyString, undefinedValue, nullValue]
for (item of array){
    if (item == null){
        console.log(item, "은 존재하지 않는 값입니다.");
    }
    else{
        console.log(item, "은 존재하는 값입니다.");
    }
}