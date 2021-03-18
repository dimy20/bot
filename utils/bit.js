//breaks uInt8 into bits
function break_into_bits(n){
    const bits = [];
    for(let i =0; i<8; i++){
    if((n & (1 << i)) != 0) bits.push(1) 
    else bits.push(0);
     }
    return bits;
}
module.exports = {
    break_into_bits
}

