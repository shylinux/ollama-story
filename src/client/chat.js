Volcanos(chat.ONIMPORT, {
	_init: function(can, msg) {
		can.ui = can.page.Append(can, can._output, [
			{view: "message"},
			{view: "request", list: [
				{type: "textarea", onkeydown: function(event) {
					if (event.key == "Enter") {
						can.onaction.request(event, can, event.target.value), event.target.value = "", can.onkeymap.prevent(event)
					}
				}},
			]},
		])
		can.ui.response = can.page.Append(can, can.ui.message, [{view: "response", list: [{text: "有什么问题尽管问吧！"}]}])._target
	},
	_grow: function(can, msg, text) { var data = JSON.parse(text)
		can.page.Append(can, can.ui.response, [{text: data.message.content}]), can.ui.message.scrollBy(0, 1000)
	},
	layout: function(can) {
		can.page.style(can, can.ui.message, html.MAX_HEIGHT, can.ConfHeight()-140)
	}
})
Volcanos(chat.ONACTION, {
	request: function(event, can, text) {
		can.page.Append(can, can.ui.message, [{view: "request", list: [{text: text}]}])
		can.ui.response = can.page.Append(can, can.ui.message, [{view: "response"}])._target
		can.runAction(event, "request", [text], function(msg) {})
	},
})