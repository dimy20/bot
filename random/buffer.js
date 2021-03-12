const zlib = require('zlib');

function some_buffer(size){
    const buffer = new ArrayBuffer(size);
    for(let i = 0 ; i < size ; i++){
        buffer[i] = 2;
}
    
    console.log(buffer['3']);
}
const array= new Uint8Array(2);
array[0] = '0x20';
console.log(array[0]);
some_buffer(5);
