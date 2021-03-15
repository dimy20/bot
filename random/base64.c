#include <sys/random.h>
#include <stdio.h>
int main(){
    u_int8_t bytes[16];
    getentropy(bytes,16);
    return base64(bytes);
};
