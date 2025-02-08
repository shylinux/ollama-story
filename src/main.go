package main

import "shylinux.com/x/ice"
import _ "shylinux.com/x/ollama-story/src/server"
import _ "shylinux.com/x/ollama-story/src/client"

func main() { print(ice.Run()) }
