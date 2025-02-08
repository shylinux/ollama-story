Volcanos(chat.ONIMPORT, {
	_init: function(can, msg) {
		can.db.model = msg.Append("NAME")
		can.ui = can.page.Append(can, can._output, [
			{view: chat.MESSAGE},
			{view: chat.REQUEST, list: [
				{type: html.TEXTAREA, onkeydown: function(event) {
					if (event.key == code.ENTER) {
						can.onaction.request(event, can, event.target.value), event.target.value = "", can.onkeymap.prevent(event)
					}
				}},
			]},
		])
		can.ui.response = can.page.Append(can, can.ui.message, [{view: chat.RESPONSE, list: [{text: "有什么问题尽管问吧！"}]}])._target
	},
	_grow: function(can, msg, which, text) { var data = JSON.parse(text)
		can.page.Append(can, can.ui.response, [{text: data.message.content}]), can.ui.message.scrollBy(0, 1000)
	},
	layout: function(can) {
		can.page.style(can, can.ui.message, html.MAX_HEIGHT, can.ConfHeight()-140)
	}
})
Volcanos(chat.ONACTION, {
	request: function(event, can, text) {
		can.page.Append(can, can.ui.message, [{view: chat.REQUEST, list: [{text: text}]}])
		can.ui.response = can.page.Append(can, can.ui.message, [{view: chat.RESPONSE}])._target
		can.request(event, {which: "respone", model: can.db.model})
		can.runAction(event, chat.REQUEST, [text], function(msg) {})
	},
})