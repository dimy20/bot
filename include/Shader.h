#pragma once

#include <string>
#include <fstream>
#include <sstream>
#include <iostream>

#include <glad/glad.h>

class Shader{
	// program id
	unsigned int m_id;

	public:
		Shader(const std::string& vertex_path, const std::string& fragment_path);
		// use/activate the shader
		void use();

		// utility uniform functions
		void setBool(const std::string &name, bool value) const;  
		void setInt(const std::string &name, int value) const;   
		void setFloat(const std::string &name, float value) const;
};
