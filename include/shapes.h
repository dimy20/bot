#pragma once

#include "Shader.h"

typedef struct rectangle_s{
	float * vertices;
	unsigned int VBO;
	unsigned int VAO;
	unsigned int EBO;
	Shader * shader;
}rectangle_t;


void init_rectangle(rectangle_t * rec, float * vertices, int len, Shader * shader);
void draw_rectangle(rectangle_t * rec);
