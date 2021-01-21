'use strict';
const constants = require("../configuration/constants");
let mysqlAccessData = require("../connection/MysqlComponent");


module.exports.save = async(dna,mutant)=>{
    /**
     * La función savePerson de mysql hace lo siguiente:
     * - Si el DNA existe no lo inserta
     * - Caso contrario inserta el registro
     */
    let dnaObject = await mysqlAccessData.query(`SELECT savePerson('${JSON.stringify(dna)}',${mutant}) as status FROM DUAL LIMIT 1`);
    if(dnaObject.length>0){
        if(dnaObject[0].status == 'INSERTED'){
            return true;
        }else{
            return false;    
        }
    }else{
        return false;
    }
    
};


module.exports.calculateStats = async()=>{
    let statsObject = await mysqlAccessData.query(`SELECT  stats() as stats FROM DUAL LIMIT 1`);
    
    if(statsObject.length>0){
        let statsJson = JSON.parse(statsObject[0].stats);

        return {
            count_mutant_dna:statsJson.count_mutant_dna,
            count_human_dna:statsJson.count_human_dna,
            ratio: statsJson.rate
        }

    }else{
        return {
            "message":"Error in the operation"
        }

    }

};

module.exports.mutant = async(dna)=>{
    let rows = dna.length;
    let cols = dna[0].length;

    return await iterateGenes(dna,0,0,cols,rows,false);
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
let iterateGenes = async(dna, current_row, current_col,rows,cols,isMutant)=>{

    if (current_col >= cols) 
        return [0,isMutant]; 

    if (current_row >= rows) 
        return [1,isMutant]; 

    /**
     * logic for search a mutant
     * console.log("("+current_row+","+current_col+")"+dna[current_row].charAt(current_col)+"::");
     */
    

    if(await search_gene(dna,current_row,current_col,rows,cols,dna[current_row].charAt(current_col))){
        current_row=rows;
        current_col=cols;
        isMutant=true;
    }

    let arrIsMutant = await iterateGenes(dna, current_row, current_col + 1,rows,cols,isMutant);
    if (arrIsMutant[0] == 1) {
        return arrIsMutant;  
    }

    return await iterateGenes(dna,current_row + 1, 0,rows,cols,isMutant); 
}


let search_gene= async(dna,i,j,rows,cols,base)=>{
    let keepSearching = true;
    let isMutant = false;

    for(var nameDir in constants.DIRECTIONS){
        let indexRow = i;
        let indexCol = j;
        let quantity =0;
        let valDir = constants.DIRECTIONS[nameDir];
        if(await canSearch(indexRow,indexCol,rows,cols,valDir)){
            while(keepSearching && await isValidPosition(indexRow,indexCol,rows,cols)){
                if(dna[indexRow].charAt(indexCol)==base ){
                    quantity++;

                    switch(valDir){
                        case constants.DIRECTIONS["right"]:
                            indexCol++;
                        break;
                        case constants.DIRECTIONS["botLeft"]:
                            indexRow++;
                            indexCol--;
                        break;
                        case constants.DIRECTIONS["bot"]:
                            indexRow++;
                        break;
                        case constants.DIRECTIONS["botRight"]:
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
    
                if(quantity>=constants.MIN_TOTAL_SECUENCE){
                    console.log("Finded letter "+base+" Orientation "+nameDir);
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

let  canSearch = async(curRow,curCol,rows,cols,dir)=>{

    const fixLimit = constants.MIN_TOTAL_SECUENCE-1;
    switch(dir){
        case constants.DIRECTIONS["right"]:
            return curCol+fixLimit<cols;
        break;
        case constants.DIRECTIONS["botLeft"]:
            return curRow+fixLimit<rows && curCol-fixLimit>=0;
        break;
        case constants.DIRECTIONS["bot"]:
            return curRow+fixLimit<rows
        break;
        case constants.DIRECTIONS["botRight"]:
            return curRow+fixLimit<rows && curCol+fixLimit<cols;
        break;
        default:
            return false;
        break;
    }
    
}

let isValidPosition= async(i,j,rows,cols)=>{
    return (i >= 0 || i <rows) || (j>=0 || j< cols);
}






