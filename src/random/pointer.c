#include <stdio.h>
int main(){
    char char_arr[5] ={'a','b','c','d','e'};
    int int_arr[5]= {1,2,3,4,5};
    // since char_arr is a pointer pointing to the base memory adress located at the begining of the
    // 5 bytes memory block declared above, typescasting this pointer to a typeless pointer works as follows
    void *void_ptr = (void *) char_arr;
    for(int i = 0; i<5;i++){
        printf("[char pointer] points to %p, which contains char vale %c\n", void_ptr, *((char*) void_ptr));
        void_ptr =(void * )((char *) void_ptr + 1);
    }
}
