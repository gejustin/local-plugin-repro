package go_lib_1

import (
	"testing"
)

func TestGoLib1(t *testing.T) {
	result := GoLib1("works")
	if result != "GoLib1 works" {
		t.Error("Expected GoLib1 to append 'works'")
	}
}
