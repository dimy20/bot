#version 330 core
out vec4 FragColor;

in vec3 our_color;
in vec2 text_coord;

uniform sampler2D ourTexture;


void main(){
    //FragColor = vec4(our_color, 1.0f);
	//FragColor = vec4(vertex_position, 1.0f);
	FragColor = texture(ourTexture, text_coord);
};
