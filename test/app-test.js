'use strict';

const expect= require('chai').expect;
const handler = require('../handler');
const fs = require('fs');
const path = require('path');

let rawdata = fs.readFileSync(path.resolve('test/test-environment.json'));
let configConn = JSON.parse(rawdata);


global.config_  =  {
    connectionDatabase:configConn
};

describe('Is mutant', function(){
    it('Test is mutant', async function(){
        let event = {
            body:'{'+
                '"dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]'
            +'}'
        };

        expect((await handler.mutant(event)).statusCode).to.equal(200);
    });

    
});

describe('Is not mutant', function(){
    it('Test is not mutant', async function(){
        let event = {
            body:'{'+
                '"dna":["TTGCGT","CAGTAC","TTATGT","AGAAGG","GCCCTA","TCACTG"]'
            +'}'
        };

        expect((await handler.mutant(event)).statusCode).to.equal(403);
    });

    
});

describe('stats--test', function(){
    it('Test stats', async function(){
        let event = {          
        };

        expect(JSON.parse((await handler.stats(event)).body).count_human_dna).gte(0);

    });

    
});