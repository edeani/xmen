'use strict';
var mutantService = require("./services/MutantService");

module.exports.mutant = async (event) => {
  let requestBodyMutant = JSON.parse(event.body);

  let dna = requestBodyMutant.dna;

  let isMutantArr = await mutantService.mutant(dna);
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
