package client

import "shylinux.com/x/ice"

type client struct {
	ice.Hash

	list string `name:"list hash auto" help:"client"`
}

func (s client) List(m *ice.Message, arg ...string) {
	s.Hash.List(m, arg...)
}

func init() { ice.Cmd("web.chat.client.client", client{}) }