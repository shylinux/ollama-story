package client

import (
	"shylinux.com/x/ice"
	"shylinux.com/x/icebergs/base/cli"
)

type client struct {
	list string `name:"list NAME auto" help:"大模型"`
}

func (s client) List(m *ice.Message, arg ...string) {
	if len(arg) == 0 {
		m.SplitIndex(s.cmdx(m, "list"))
	} else if len(arg) == 1 {
		m.Echo(s.cmdx(m, "show", arg[0]))
	}
}
func (s client) cmdx(m *ice.Message, arg ...string) string {
	return m.Cmdx(cli.SYSTEM, "ollama", arg)
}

func init() { ice.Cmd("web.chat.ollama.client", client{}) }
