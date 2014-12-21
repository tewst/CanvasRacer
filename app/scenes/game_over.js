(function (Crafty) {
	'use strict';

	Crafty.defineScene('game-over', levelInit, levelOut);

	function levelInit() {
		Crafty.background('#000 url(content/images/game_over.png) no-repeat center center');
		Crafty.stage.elem.style.backgroundSize = 'contain';

		/* share facebook btn
		 Crafty
		 .e('Button')
		 .attr({
		 x: 150,
		 y: 0,
		 w: 50,
		 h: 50
		 })
		 .bind('Click', function () {
		 var apiId = '306589012770148';

		 var href = 'http://www.facebook.com/plugins/like.php?href=' +
		 window.location.href +
		 '&width&layout=button&action=like&show_faces=false&share=true&height=35&appId=' + apiId;

		 window.open(href);
		 })
		 .setText('FB SHARE')
		 /**/

		/* vk btn */
		Crafty
			.e('2D, Canvas, share, Mouse')
			.attr({
				x: Crafty.viewport.width - 50,
				y: 0,
				w: 50,
				h: 50
			})
			.bind('Click', function () {
				var href = 'http://vkontakte.ru/share.php?url=' + window.location.href;
				window.open(href);
			})
		;

		Crafty
			.e('Button')
			.attr({
				x: 150,
				y: 150,
				w: 50,
				h: 50
			})
			.bind('Click', function () {
				Crafty.scene('level');
			})
			.setText('Again')
		;

		/* Сохраняем данные.
		 * Почему так? Все просто - браузерам необходимо явно разрешение на запрос геолокации.*/
		Crafty
			.e('Button')
			.attr({
				x: 150,
				y: 450,
				w: 50,
				h: 50
			})
			.bind('Click', function () {
				Crafty.parse.saveUserRecords(Crafty.player.getPoints(), Crafty.player.getLocation());
			})
			.setText('Save My Record')
		;

		Crafty
			.e('2D, Canvas, Text')
			.attr({
				x: 20,
				y: 20,
				z: 9,
				h: 100,
				w: 100
			})
			.textColor('#CCCCCC')
			.text('YOUR RECORD: ' + Crafty.player.getPoints())
		;

		Crafty.e('2D, Canvas, Text')
			.attr({
				x: 40,
				y: 60
			})
			.textColor('#FFFFFF')
			.text('Top records: ');

		Crafty.parse.getUserRecords(3, function (obj) {

			Crafty
				.e('2D, Canvas, Text')
				.attr({
					x: 40,
					y: 80 + 20 * obj.index,
					z: 9,
					h: 100,
					w: 100
				})
				.textColor('#FFFFFF')
				.text('Points ' + obj.points + ' , from ' + obj.city);
		});


	}

	function levelOut() {

	}


	//Crafty.e("InputChangeEvents");

//TODO использовать для сообщений
	Crafty.c('InputChangeEvents', {
		init: function () {
			var input = document.createElement('input');
			input.type = 'text';
			input.style.width = '100px';
			input.style.padding = '2px';
			input.setAttribute('value', Crafty.player.name);
			input.name = 'PlayerName';

			this.requires('HTML, Keyboard')
				.attr({
					x: 20,
					y: 20
				})
				.bind('change', function () {
					if (Crafty.player.name.length < 4) {
						alert('your name: too short!');
						return false;
					}

					Crafty.e('Timer').setTimeCallback(3, function () {
						Crafty.enterScene('level');
					}, function () {
						console.log('эта функция необязательна');
					});
				})
				.replace(input.outerHTML)
				.bind('KeyDown', function (e) {
					var text = this._element.children[0].value.trim();
					var textLength = text.length;
					var keyCode = e.keyCode;

					if (textLength > 10) {
						if (text !== Crafty.player.name) {
							this._element.children[0].value = Crafty.player.name;
						}
						return false;
					}

					switch (keyCode) {
						case Crafty.keys.UP_ARROW:
						case Crafty.keys.RIGHT_ARROW:
						case Crafty.keys.DOWN_ARROW:
						case Crafty.keys.LEFT_ARROW:
							//...
							break;

						case Crafty.keys.ENTER:
							this.change();
							break;

						default:
							//...
							break;
					}

				})

		},
		change: function (e) {
			this.trigger('change');
		}
	});


}(Crafty));