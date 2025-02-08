package client

import (
	"net/http"

	"shylinux.com/x/ice"
	"shylinux.com/x/icebergs/base/web"
	kit "shylinux.com/x/toolkits"
)

type chat struct {
	list string `name:"list name auto" help:"大模型对话"`
}

func (s chat) Request(m *ice.Message, arg ...string) {
	m.Optionv(web.SPIDE_STREAM, func(text string) { web.PushNoticeGrow(m.Message, text) })
	m.Cmdy(web.SPIDE, ice.DEV, web.SPIDE_STREAM, http.MethodPost, "http://localhost:11434/api/chat",
		web.SPIDE_DATA, kit.Format(kit.Dict("model", "deepseek-r1", "stream", true,
			"messages", kit.List(kit.Dict("role", "user", "content", arg[0])),
		)),
	)
}
func (s chat) List(m *ice.Message, arg ...string) {
	m.Display("").DisplayCSS("")
}

func init() { ice.CodeModCmd(chat{}) }
