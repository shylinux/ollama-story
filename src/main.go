package main

import (
	"shylinux.com/x/ice"
	_ "shylinux.com/x/icebergs/misc/md"
	_ "shylinux.com/x/ollama-story/src/client"
	_ "shylinux.com/x/ollama-story/src/server"
)

func main() { print(ice.Run()) }
