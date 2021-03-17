const buff = new Buffer("B");
// 66 = > 01000010 => 65
//        00000001

const x = buff.readUInt8(0);


function break_into_bits(n){
    const bits = [];
    for(let i =0; i<8; i++){
    if((n & (1 << i)) != 0) bits.push(1) 
    else bits.push(0);
     }
    return bits;
}

function is_set(n){
    let mask = [];
    for(let i =0; i<8;i++){
    }
    return null;
}

console.log(0x7f);
console.log(break_into_bits(0x7f));


