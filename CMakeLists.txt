cmake_minimum_required(VERSION 3.14)
project(toy VERSION 1.0)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_BUILD_TYPE Debug)
#set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)



add_subdirectory(glfw)

add_executable(main src/main.cpp
					src/glad.c
					src/Shader.cpp
					src/stb_image.cpp
					src/shapes.cpp)
target_include_directories(main PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/include glfw)
target_link_libraries(main PRIVATE glfw GL)



