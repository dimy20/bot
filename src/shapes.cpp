#include <glad/glad.h>
#include <cstring>
#include <cstdlib>
#include <iostream>
#include "shapes.h"
unsigned int indices[] = {  // note that we start from 0!
	0, 1, 3,   // first triangle
	1, 2, 3    // second triangle
};  

void init_rectangle(rectangle_t * rec, float * vertices, int len, Shader * shader){
	rec->shader = shader;
	rec->vertices = (float *)malloc(sizeof(float) * len);

	if(!rec->vertices){
		std::cerr << "failed to malloc " << std::endl;
		exit(EXIT_FAILURE);
	};

	memcpy(rec->vertices, vertices, sizeof(float) * len);

	// get a vertex bufffer
	glGenVertexArrays(1, &rec->VAO);
	glGenBuffers(1, &rec->VBO);
	glGenBuffers(1, &rec->EBO);

	glBindVertexArray(rec->VAO);

	glBindBuffer(GL_ARRAY_BUFFER, rec->VBO);
	glBufferData(GL_ARRAY_BUFFER, sizeof(float) * len, vertices, GL_STATIC_DRAW);

	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, rec->EBO);
	glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(indices), indices, GL_STATIC_DRAW);

	// position attribute
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 8 * sizeof(float), (void*)0);
    glEnableVertexAttribArray(0);
    // color attribute
    glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, 8 * sizeof(float), (void*)(3 * sizeof(float)));
    glEnableVertexAttribArray(1);
    // texture coord attribute
    glVertexAttribPointer(2, 2, GL_FLOAT, GL_FALSE, 8 * sizeof(float), (void*)(6 * sizeof(float)));
    glEnableVertexAttribArray(2);

};

void draw_rectangle(rectangle_t * rec){
	rec->shader->use();
	glBindVertexArray(rec->VAO);
	glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, 0);
};
