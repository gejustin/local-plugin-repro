package main

import (
	"fmt"
	go_lib_1 "repro/libs/go-lib-1"
)

func Hello(name string) string {
	result := "Hello " + name + go_lib_1.GoLib1(name)
	return result
}

func main() {
	fmt.Println(Hello("go-app-1"))
}
