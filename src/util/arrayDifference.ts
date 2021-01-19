


export default function arrayDifference(a1: any[], a2: any[], compareFunction?: (a, b)=>boolean) {
    if(compareFunction && typeof compareFunction==="function"){
        return a1.filter(item => !a2.some(a2Item=>compareFunction(item, a2Item)));
    }else {
        // if we dont have a custom compare function we can use the fast set 
        const a2Set = new Set(a2);
        return a1.filter(function(x) { return !a2Set.has(x); });
    }
    
}

  
/* function arraySymmetricDifference(a1, a2) {
    return arrayDifference(a1, a2).concat(arrayDifference(a2, a1));
} */