cmake_minimum_required(VERSION 3.15)
project(ClinifyEdge VERSION 1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Define Windows 10/11 para disponibilizar CreateFile2 e passar a verificação da httplib
if(WIN32)
    add_definitions(-D_WIN32_WINNT=0x0A00)
endif()

find_package(Threads REQUIRED)

include_directories(${CMAKE_CURRENT_SOURCE_DIR})

add_executable(clinify_edge main.cpp)
target_link_libraries(clinify_edge PRIVATE Threads::Threads)

if(WIN32)
    target_link_libraries(clinify_edge PRIVATE ws2_32 wsock32)
endif()