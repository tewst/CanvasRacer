(function (Crafty) {

    Crafty.defineScene('loading', function () {
        Crafty.background('#000000');

        Crafty.e('2D, DOM, Text')
            .attr({ w: 100, h: 20, x: 150, y: 120 })
            .text('Loading...')
            .css({ 'text-align': 'center'})
            .textColor('#CCCCCC');


        Crafty.e('Loading, 2D, DOM, Text')
            .attr({ w: 100, h: 20, x: 50, y: 300})
            .textColor('#FFFFFF')

        Crafty.load([
                //backgrounds
                'images/backgrounds/game_over.PNG'
                , 'images/backgrounds/menu.jpg'
                //sprites
                , 'images/sprites/cars/cars.png'
                //textures
                , 'images/textures/m_g_asphalt03.jpg'
                , 'images/textures/asphalt_texture.png'
                , 'images/textures/tex_trava.bmp'
                , 'images/sprites/objects/trafficlights_shlp.png'
            ],

            function () {
                /*when loaded*/
                Crafty.sprite(130, 300, "images/sprites/cars/cars.png", {
                    mycar: [0, 0], car1: [1, 0], car2: [2, 0], car3: [3, 0], car4: [4, 0]
                });

                Crafty.sprite("images/textures/asphalt_texture.png", {
                    asphalt: [0, 0, 100, 100]
                });

                Crafty.sprite('images/sprites/objects/trafficlights_shlp.png', {
                    trafficlight: [0, 0, 15, 100]
                });


                Crafty.c('LevelSpeed', {
                    speed: 4
                });

                Crafty.c('Grass', {
                    init: function () {
                        var y = -256;

                        this
                            .requires("2D, Canvas, Image, LevelSpeed")
                            .attr({
                                w: Crafty.viewport.width,
                                h: Crafty.viewport.height * 2
                            })
                            .image("images/textures/tex_trava.bmp", "repeat")
                            .bind('EnterFrame', function () {
                                this.y += this.speed;

                                if (this.y > 0)
                                    this.y = y;
                            })
                        ;
                    }
                });

                Crafty.c('Road', {
                    init: function () {

                        var padding = 50,
                            y = -256;

                        this.requires("2D, Canvas, Image, LevelSpeed")
                            .attr({
                                x: padding,
                                w: Crafty.viewport.width - padding * 2,
                                h: Crafty.viewport.height * 2
                            })
                            .image("images/textures/m_g_asphalt03.jpg", "repeat")
                            .bind('EnterFrame', function (obj) {
                                this.y += this.speed;

                                if (this.y > 0)
                                    this.y = y;

                                //TODO увеличить
                                //каждые 50 метров создаем дорожный столб
                                if (obj.frame % 500 === 0) {
                                    Crafty.e('TrafficLight')
                                        .setRandomPos()
                                }

                            })

                    }
                });

                Crafty.c('Asphalt', {
                    defaultY: -340,
                    init: function () {
                        this
                            .requires('2D, Canvas, asphalt, LevelSpeed')
                            .attr({
                                w: 100,
                                h: 100,
                                x: Crafty.viewport.width / 2,
                                z: 1
                            })
                            .bind('EnterFrame', function () {
                                this.y += this.speed;

                                if (this.y > Crafty.viewport.height)
                                    this.y = this.defaultY;
                            })
                        ;
                    }
                });

                //TEST for loading scene
                setTimeout(function () {

                    Crafty.enterScene('menu');

                }, 100);

            },
            function (e) {
                /*progress*/
                console.log(e)

                Crafty('Loading').text('progress: ' + e.percent)
            },
            function (e) {
                console.log('error loading');
            }
        );
    });

}(Crafty));