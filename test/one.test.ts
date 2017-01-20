/**
 * Created by oleg on 1/20/17.
 */


import bayou from 'bayou';
import * as fs from 'fs';

const strm = fs.createWriteStream('./fixtures/dundee.log');


bayou({
    both: [strm]
});

bayou({
    both: [strm]
});


console.log('smashing');