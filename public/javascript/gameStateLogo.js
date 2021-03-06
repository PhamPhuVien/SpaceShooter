////////////////////////////////////////////////////////////////
// Show Logo And Waiting To Start The Game.
// Scene Life-cycle: Init - Preload - Create - Update -
//                   - Render - Shutdown - Destroy.
////////////////////////////////////////////////////////////////

var StateLogo = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

        function StateLogo() {
            Phaser.Scene.call(this, { key: 'statelogo' });
        },

    preload: function () {
        console.log('Init StateLogo');

        // Load Image.
        this.load.image('iLogoKixeye', 'assets/Logo_Kixeye.png');
        this.load.image('iBGLogoScreen', 'assets/BG_LogoScreen.png');
        this.load.image('iParticleRed', 'assets/Paticle_Red.png');
        this.load.image('iButtonHelp', 'assets/buttonHelp.png');
        this.load.image('iTutorial', 'assets/Tutorial.png');

        // Load Sound Background.
        this.load.audio('sBackground', 'assets/Sound/soundBackgroundMoutain.mp3');
    },

    create: function () {
        // Add Sound Background.
        this.sfxBackground = this.sound.add('sBackground');
        this.sfxBackground.loop = true;
        this.sfxBackground.setVolume(0.5);
        this.sfxBackground.play();

        // Add Background Image.
        this.add.image(400, 300, 'iBGLogoScreen');

        // Add Particle And Emit.
        var particles = this.add.particles('iParticleRed');
        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        // Add Logo.
        var logo = this.physics.add.image(400, 300, 'iLogoKixeye');

        logo.setVelocity(150, 300);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        // Move Particle Base On Logo.
        emitter.startFollow(logo);

        // Add Text.
        this.textStartGame = this.add.text(200, 570, 'Press SPACE To Start The Game!', { font: '22px Arial Black', fill: '#f50' });

        // Keyboard Input.
        this.keyboardEvent = this.input.keyboard.createCursorKeys();

        // Count Frame.
        this.countFrame = 0;

        // Add Tutorial.
        imageTutorial = this.add.image(400, 120, 'iTutorial');
        imageTutorial.visible = false;

        // Add Button Help.
        var isButtonHelpPressed = false;

        buttonHelp = this.add.sprite(770, 576, 'iButtonHelp').setInteractive();
        buttonHelp.setScale(0.3);

        buttonHelp.on('pointerover', function (event) {
            buttonHelp.setScale(0.25);
        });

        buttonHelp.on('pointerout', function (event) {
            buttonHelp.setScale(0.3);

            if (isButtonHelpPressed) {
                logo.setVelocity(150, 320);

                imageTutorial.visible = false;
                isButtonHelpPressed = false;
            }
        });

        buttonHelp.on('pointerdown', function (event) {
            logo.x = 400;
            logo.setVelocity(0);
            imageTutorial.visible = true;
            isButtonHelpPressed = true;
        });
    },

    update: function () {
        // Press Spacebar To Start Game.
        if (this.keyboardEvent.space.isDown) {
            this.scene.start('stateInGame');
        }

        // Update Change Text Color.
        this.countFrame++;

        if (this.countFrame > 20) {
            var color = Phaser.Math.Between(0xff00ff, 0x00ff00);

            this.textStartGame.tint = color;
            this.countFrame = 0;
        }
    }
});