const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,  // Use window dimensions for responsiveness
    height: window.innerHeight,
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    transparent: true, // Prevent black background during loading
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);

let player;
let cursors;
let blocks;
let score = 0;
let scoreText;

function preload() {
    // Debugging: Check if preload is being called
    console.log("Preloading...");
    // No external images needed, we’re using emojis
}

function create() {
    console.log("Game created");
    // Create player as a blue square emoji
    player = this.add.text(400, 550, '🟦', { fontSize: '40px' }).setOrigin(0.5);

    // Set up keyboard input
    cursors = this.input.keyboard.createCursorKeys();

    // Create falling blocks as red square emojis
    blocks = this.physics.add.group({
        key: 'block',
        repeat: 5,
        setXY: { x: 100, y: 0, stepX: 150 }
    });

    blocks.children.iterate(function (block) {
        block.setVelocityY(Phaser.Math.Between(100, 200));  // Random fall speed
        block.setInteractive();
        block.setText('🟥').setFontSize(40);  // Use emoji for blocks
        block.setOrigin(0.5);
    });

    // Display score at the top
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    // Handle collisions between player and blocks
    this.physics.add.collider(player, blocks, hitBlock, null, this);
}

function update() {
    // Debugging: Check if update is being called
    // console.log("Update called");

    // Player movement controls
    if (cursors.left.isDown) {
        player.x -= 5;  // Move player left
    } else if (cursors.right.isDown) {
        player.x += 5;  // Move player right
    }

    // Ensure player stays within the bounds of the screen
    player.x = Phaser.Math.Clamp(player.x, 0, window.innerWidth - player.width);

    // Handle falling blocks and reset position when they go off-screen
    blocks.children.iterate(function (block) {
        if (block.y > window.innerHeight) {
            block.setY(-50);  // Reset position of block when it falls off the screen
            block.setX(Phaser.Math.Between(0, window.innerWidth - 50));
            score += 10;  // Increase score
            scoreText.setText('Score: ' + score);
        }
    });
}

function hitBlock(player, block) {
    // Handle player collision with block (Game Over)
    this.physics.pause();
    player.setTint(0xff0000);  // Change player color to red
    scoreText.setText('Game Over! Score: ' + score);  // Display final score
}
