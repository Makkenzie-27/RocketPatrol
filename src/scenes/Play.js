class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
     }

     preload(){
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.spritesheet('explosion', './assets/explosion.png', 
        {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
     }

     create(){

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.starfield = this.add.tileSprite(
            0,0,640,480, 'starfield'
        ).setOrigin(0,0);

        this.p1Rocket = new Rocket(
            this, 
            game.config.width/2, 
            game.config.height - borderUISize, 
            'rocket').setOrigin(0.5, 0);

        this.ship1 = new Ship(
            this,
            100,
            200,
            'spaceship'

        );

        this.ship2 = new Ship(
            this,
            300,
            240,
            'spaceship'

        );

        this.ship3 = new Ship(
            this,
            380,
            300,
            'spaceship'

        );



         // green UI background
         this.add.rectangle(
            0, 
            borderUISize + borderPadding, 
            game.config.width, 
            borderUISize*2,
            0x00FF00,
            ).setOrigin(0,0);


        // white borders
	    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

     }

    update(){
        this.starfield.tilePositionX -= 4;
        this.p1Rocket.update();
         
        this.ship1.update();
        this.ship2.update();
        this.ship3.update();

        this.checkCollision(this.p1Rocket, this.ship1);
        this.checkCollision(this.p1Rocket, this.ship2);
        this.checkCollision(this.p1Rocket, this.ship3);

    }

    checkCollision(rocket, ship) {

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
          }
          if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
          }
          if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
          }
          
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });       
      }

    
}