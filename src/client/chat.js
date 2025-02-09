Volcanos(chat.ONIMPORT, {
	_init: function(can, msg) { can.ui = can.onappend.layout(can), can.ui.responseList = []
		msg.Table(function(value) { can.onimport.item(can, {
			name: value.NAME, nick: value.NAME+" ("+value.SIZE+")",
		}, function(event, item, show, target) {
			can.onimport.tabsCache(can, item, target, function() { can.onimport.content(can, target) })
			can.db.model = item.name, can.ui.message = target._message
			can.onappend._status(can, msg), can.onimport.layout(can)
		}) })
	},
	content: function(can, target) {
		var ui = can.page.Append(can, can.ui.content, [
			{view: "message", list: [
				{view: "response", list: [
					{text: can.user.trans(can, "Please Ask Anything!", "有什么问题尽管问吧！")},
				]},
			]},
			{view: "request", list: [
				{type: html.TEXTAREA, onkeydown: function(event) {
					if (event.key == code.ENTER) {
						can.onaction.request(event, can, event.target.value), event.target.value = "", can.onkeymap.prevent(event)
					}
				}},
			]},
		]); target._message = ui.message
	},
	_grow: function(can, msg, which, text) {
		var target = can.ui.responseList[parseInt(which)-1], data = JSON.parse(text)
		can.page.Append(can, target, [{text: data.message.content}]), can.ui.message.scrollBy(0, 1000)
	},
	layout: function(can) {
		can.ui.layout(can.ConfHeight(), can.ConfWidth(), 0, function() {
			can.page.style(can, can.ui.message, html.MAX_HEIGHT, can.ConfHeight()-130)
		})
	}
})
Volcanos(chat.ONACTION, {
	request: function(event, can, text) {
		can.page.Append(can, can.ui.message, [{view: "request", list: [{text: text}]}])
		var response = can.page.Append(can, can.ui.message, [{view: "response"}])._target; can.ui.responseList.push(response)
		can.request(event, {which: ""+can.ui.responseList.length, model: can.db.model})
		can.runAction(event, "request", [text], function(msg) {})
	},
})
