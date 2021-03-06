let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}


let game = new Phaser.Game(config);

//UI Sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//keyboard controls
let keyLEFT, keyRIGHT, keyF, keyR;