package client

import (
	"net/http"

	"shylinux.com/x/ice"
	"shylinux.com/x/icebergs/base/web"
	kit "shylinux.com/x/toolkits"
)

type chat struct {
	client client
	list   string `name:"list list" help:"大模型对话" icon:"src/main.png"`
}

func (s chat) Request(m *ice.Message, arg ...string) {
	m.Optionv(web.SPIDE_STREAM, func(text string) { web.PushNoticeGrow(m.Message, m.Option("which"), text) })
	m.Cmdy(web.SPIDE, ice.DEV, web.SPIDE_STREAM, http.MethodPost, "http://localhost:11434/api/chat",
		web.SPIDE_DATA, kit.Format(kit.Dict("model", m.Option("model"), "stream", true,
			"messages", kit.List(kit.Dict("role", "user", "content", arg[0])),
		)),
	)
}
func (s chat) List(m *ice.Message, arg ...string) {
	m.Cmdy(s.client).Display("").DisplayCSS("")
}

func init() { ice.Cmd("web.chat.ollama.chat", chat{}) }
