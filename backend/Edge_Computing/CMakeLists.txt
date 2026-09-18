# Configuração de build do C++

cmake_minimum_required(VERSION 3.15)
project(ClinifyEdge VERSION 1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Habilita suporte a threads (exigência da httplib)
find_package(Threads REQUIRED)

# Inclui os arquivos de cabeçalho na mesma pasta (httplib.h e json.hpp)
include_directories(${CMAKE_CURRENT_SOURCE_DIR})

# Define o executável
add_executable(clinify_edge main.cpp)
target_link_libraries(clinify_edge PRIVATE Threads::Threads)

# Vincula bibliotecas de rede se estiver no Windows
if(WIN32)
    target_link_libraries(clinify_edge PRIVATE ws2_32 wsock32)
endif()