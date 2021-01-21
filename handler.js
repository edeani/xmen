'use strict';
/**
 * Services
 */
var personService = require("./services/PersonService");


module.exports.mutant = async (event) => {
  let requestBodyMutant = JSON.parse(event.body);

  let dna = requestBodyMutant.dna;

  let isMutantArr = await personService.mutant(dna);
  if(isMutantArr != undefined || isMutantArr!=null){
    await personService.save(dna,isMutantArr[1]);
  }
  if(isMutantArr[1]){
    
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'OK',
        }
      )
    }
  }else{
    return {
      statusCode: 403,
      body: JSON.stringify(
        {
          message: 'Forbidden'
        }
      ),
  }
 
  };

  

  
};


module.exports.stats = async(event)=>{
  let statsObj = await personService.calculateStats();
  return {
    statusCode: 200,
    body: JSON.stringify(statsObj)
  }
};
