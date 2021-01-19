'use strict';

const DIRECTIONS={
    /*"upLeft":0,
    "up":1,
    "upRight":2,
    "left":3,*/
    "right":4,
    "botLeft":5,
    "bot":6,
    "botRight":7
}

const MIN_TOTAL_SECUENCE=4;
var dnaExample = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
//var dnaExample = ["TTACAA","CAGTAC","TTAAGT","AGTAGG","CCCCTA","TCACTG"];

console.log(mutant(dnaExample));


function mutant(dna){

    let rows = dna.length;
    let cols = dna[0].length;
    let i=0;
    let j=0;

    let isMutant = false;

    return iterateGenes(dna,i,j,cols,rows,isMutant);
    
};

/**
 * 
 * @param {person DNA} dna 
 * @param {current row in the iteration} current_row 
 * @param {current col in the iteration} current_col 
 * @param {total rows} rows 
 * @param {total colums} cols 
 * @param {DNA state} isMutant 
 */
function iterateGenes(dna, current_row, current_col,rows,cols,isMutant){

    if (current_col >= cols) 
        return [0,isMutant]; 

    if (current_row >= rows) 
        return [1,isMutant]; 

    /**
     * logic for search a mutant
     */
    console.log("("+current_row+","+current_col+")"+dna[current_row].charAt(current_col)+"::");

    if(search_gene(dna,current_row,current_col,rows,cols,dna[current_row].charAt(current_col))){
        current_row=rows;
        current_col=cols;
        isMutant=true;
    }

    let arrIsMutant = iterateGenes(dna, current_row, current_col + 1,rows,cols,isMutant);
    if (arrIsMutant[0] == 1) {
        return arrIsMutant;  
    }

    return iterateGenes(dna,current_row + 1, 0,rows,cols,isMutant); 
}

function search_gene(dna,i,j,rows,cols,base){

    

    let keepSearching = true;
    let isMutant = false;

    for(var nameDir in DIRECTIONS){
        let indexRow = i;
        let indexCol = j;
        let quantity =0;
        let valDir = DIRECTIONS[nameDir];
        if(canSearch(indexRow,indexCol,rows,cols,valDir)){
            while(keepSearching && isValidPosition(indexRow,indexCol,rows,cols)){
                if(dna[indexRow].charAt(indexCol)==base ){
                    quantity++;

                    switch(valDir){
                        /*case DIRECTIONS["upLeft"]:
                            indexRow--;
                            indexCol--;
                        break;
                        case DIRECTIONS["up"]:
                            indexRow--;
                        break;
                        case DIRECTIONS["upRight"]:
                            indexRow--;
                            indexCol++;
                        break;
                        case DIRECTIONS["left"]:
                            indexCol--;
                        break;*/
                        case DIRECTIONS["right"]:
                            indexCol++;
                        break;
                        case DIRECTIONS["botLeft"]:
                            indexRow++;
                            indexCol--;
                        break;
                        case DIRECTIONS["bot"]:
                            indexRow++;
                        break;
                        case DIRECTIONS["botRight"]:
                            indexRow++;
                            indexCol++;
                        break;
                        default:
                        break; 
                    }
                    
                }else{
                    isMutant=false;
                    break;
                }
    
                if(quantity>=MIN_TOTAL_SECUENCE){
                    console.log("Finded letter"+base+" Orientation "+nameDir);
                    isMutant=true;
                    break;
                }
            }
        }
        if(isMutant){
            break;
        }
    }
    
    return isMutant;
}

function compareBase(currentValue,base){
    return currentValue == base;
}

function canSearch(curRow,curCol,rows,cols,dir){

    const fixLimit = MIN_TOTAL_SECUENCE-1;
    switch(dir){
        /*case DIRECTIONS["upLeft"]:
            return curRow-fixLimit>=0 && curCol-fixLimit>=0;
        break;
        case DIRECTIONS["up"]:
            return curRow-fixLimit>=0;
        break;
        case DIRECTIONS["upRight"]:
            return curRow-fixLimit>=0 && curCol+fixLimit<cols;
        break;
        case DIRECTIONS["left"]:
            return curCol-fixLimit>=0;
        break;*/
        case DIRECTIONS["right"]:
            return curCol+fixLimit<cols;
        break;
        case DIRECTIONS["botLeft"]:
            return curRow+fixLimit<rows && curCol-fixLimit>=0;
        break;
        case DIRECTIONS["bot"]:
            return curRow+fixLimit<rows
        break;
        case DIRECTIONS["botRight"]:
            return curRow+fixLimit<rows && curCol+fixLimit<cols;
        break;
        default:
            return false;
        break;
    }
    
}

function isValidPosition(i,j,rows,cols){
    return (i >= 0 || i <rows) || (j>=0 || j< cols);
}






