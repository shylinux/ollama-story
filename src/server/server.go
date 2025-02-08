package server

import "shylinux.com/x/ice"

type server struct {
	ice.Hash
	list string `name:"list hash auto" help:"大模型"`
}

func (s server) List(m *ice.Message, arg ...string) {
	s.Hash.List(m, arg...)
}

func init() { ice.Cmd("web.chat.ollama.server", server{}) }
