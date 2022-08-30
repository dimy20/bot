#include <iostream>
#include <glad/glad.h>
#include <GLFW/glfw3.h>
#include <cstring>
#include <cassert>
#include <fstream>
#include <cmath>
#include <string>

#include "Shader.h"
#include "stb_image.h"
#include "shapes.h"



void processInput(GLFWwindow * window){
	if(glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS){
		glfwSetWindowShouldClose(window, true);
	}
};

void framebuffer_size_callback(GLFWwindow* window, int width, int height){
    glViewport(0, 0, width, height);
}

typedef struct triangle_s{
	float * vertices;
	unsigned int VBO;
	unsigned int VAO;
	unsigned int shader_program;
}triangle_t;

unsigned char * load_texture(const char * filename, int * w, int * h, int * channels){
	unsigned char *data = stbi_load(filename, w, h, channels, 0); 
	return data;
};

void init_triangle(triangle_t * tri, float * vertices, int len){
	tri->vertices = (float *)malloc(sizeof(float) * len);

	if(!tri->vertices) throw std::bad_alloc();

	memcpy(tri->vertices, vertices, sizeof(float) * len);

	// get a vertex bufffer
	glGenVertexArrays(1, &tri->VAO);
	glGenBuffers(1, &tri->VBO);

	glBindVertexArray(tri->VAO);

	glBindBuffer(GL_ARRAY_BUFFER, tri->VBO);
	glBufferData(GL_ARRAY_BUFFER, sizeof(float) * len, vertices, GL_STATIC_DRAW);

	glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 6 * sizeof(float), (void*)0);
	glEnableVertexAttribArray(0);

	void * offset = (void *)(sizeof(float) * 3);
	glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, 6 * sizeof(float), offset);
	glEnableVertexAttribArray(1);
};

void draw_triangle(triangle_t * tri){
	assert(tri != nullptr);
	//glUseProgram(shaderProgram);
	glBindVertexArray(tri->VAO);
	glDrawArrays(GL_TRIANGLES, 0, 3);
};


int main(){

	glfwInit();
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
    //glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
	GLFWwindow * window = glfwCreateWindow(800, 600, "LearnOpenGL", NULL, NULL);
	if(!window){
		std::cerr << "Failed to create GLFW window" << std::endl;
		glfwTerminate();
		exit(EXIT_FAILURE);
	}
	glfwMakeContextCurrent(window);

	// verify that glad loads correctly
	if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress)){
		std::cerr << "Failed to initialize GLAD" << std::endl;
		return -1;
	}

	glViewport(0, 0, 800, 600);
	// updates viewport when window is resized
	glfwSetFramebufferSizeCallback(window, framebuffer_size_callback);  


	Shader shader("../shaders/vertex_shader.glsl", "../shaders/fragment_shader.glsl");
	/*


	unsigned int indices[] = {  // note that we start from 0!
		0, 1, 3,   // first triangle
		1, 2, 3    // second triangle
	};  

	unsigned int VAO;
	glGenVertexArrays(1, &VAO);  

	unsigned int VBO;
	glGenBuffers(1, &VBO);

	unsigned int EBO;
	glGenBuffers(1, &EBO);

	glBindVertexArray(VAO);

	//  copy our vertices array in a buffer for OpenGL to use

	glBindBuffer(GL_ARRAY_BUFFER, VBO);
	glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

	// order
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, EBO);
	glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(indices), indices, GL_STATIC_DRAW);


	glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
	glEnableVertexAttribArray(0);

	*/
	// element buffer objects
	float vertices3[] = {
		// positions         // colors
		 0.5f, -0.5f, 0.0f,  1.0f, 0.0f, 0.0f,   // bottom right
		-0.5f, -0.5f, 0.0f,  0.0f, 1.0f, 0.0f,   // bottom left
		 0.0f,  0.5f, 0.0f,  0.0f, 0.0f, 1.0f    // top 
	};

	triangle_t tri3;
	//init_triangle(&tri3, vertices3, 18);

	float offset = 0.5f;

	// textures
	
	int w, h, channels;
	const char * texture_path = "container.jpg";
	unsigned char * t_data = load_texture(texture_path, &w, &h, &channels);
	if(!t_data){
		std::cerr << "failed to load texture : " << texture_path << std::endl;
		exit(EXIT_FAILURE);
	}



	unsigned int texture;
    glGenTextures(1, &texture);
    glBindTexture(GL_TEXTURE_2D, texture); // all upcoming GL_TEXTURE_2D operations now have effect on this texture object
    // set the texture wrapping parameters
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);	// set texture wrapping to GL_REPEAT (default wrapping method)
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
    // set texture filtering parameters
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR_MIPMAP_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);

	glTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, w, h, 0, GL_RGB, GL_UNSIGNED_BYTE, t_data);
	glGenerateMipmap(GL_TEXTURE_2D);



	stbi_image_free(t_data);

	float rec_vertices[] = {
		// positions          // colors           // texture coords
		 0.5f,  0.5f, 0.0f,   1.0f, 0.0f, 0.0f,   1.0f, 1.0f,   // top right
		 0.5f, -0.5f, 0.0f,   0.0f, 1.0f, 0.0f,   1.0f, 0.0f,   // bottom right
		-0.5f, -0.5f, 0.0f,   0.0f, 0.0f, 1.0f,   0.0f, 0.0f,   // bottom left
		-0.5f,  0.5f, 0.0f,   1.0f, 1.0f, 0.0f,   0.0f, 1.0f    // top left 
	};

	rectangle_t rec;
	init_rectangle(&rec, rec_vertices, sizeof(rec_vertices) / sizeof(float), &shader);

	while(!glfwWindowShouldClose(window)){
		// handles input
		processInput(window);

		// redering commands
		glClearColor(0.2f, 0.3f, 0.3f, 1.0f); // sets state
		glClear(GL_COLOR_BUFFER_BIT); // use that state

		//glUseProgram(shaderProgram);
		/*
		glBindVertexArray(VAO);
		glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, 0);
		*/
		//glDrawArrays(GL_TRIANGLES, 0, 3);
		//k

		/*
		float time_value = glfwGetTime();
		float green_value = sin(time_value) / 2.0f + 5.0f;
		int vertexColorLocation = glGetUniformLocation(shaderProgram, "our_color");
		if(vertexColorLocation == -1) std::cerr << "could no find uniform\n" ;
		glUniform4f(vertexColorLocation, 0.0f, green_value, 0.0f, 1.0f);
		*/


		glActiveTexture(GL_TEXTURE0);
		glBindTexture(GL_TEXTURE_2D, texture);
		draw_rectangle(&rec);
		//draw_triangle(&tri3);
	//	draw_triangle(&tri2);

		//shader.setFloat("x_offset", offset);
		// check and call events and swap the buffers
		glfwSwapBuffers(window);
		glfwPollEvents();    

	}

	glfwTerminate();

	return 0;
}
