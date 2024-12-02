// Initialize the game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',  // This is the ID of the div where we will embed the game
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

// Game variables
let player;
let cursors;
let blocks;
let score = 0;
let scoreText;

function preload() {
    // No need to preload images as we are using emojis
}

function create() {
    // Create player as text object with emoji
    player = this.add.text(400, 550, '🟦', { fontSize: '40px' }).setOrigin(0.5);

    // Set up keyboard input
    cursors = this.input.keyboard.createCursorKeys();

    // Group for falling blocks (using emoji as text)
    blocks = this.physics.add.group({
        key: 'block',
        repeat: 5,
        setXY: { x: 100, y: 0, stepX: 150 }
    });

    // Create falling blocks as text objects with emojis
    blocks.children.iterate(function (block) {
        block.setVelocityY(Phaser.Math.Between(100, 200));  // Set random falling speed
        block.setInteractive();
        block.setText('🟥').setFontSize(40);  // Use emoji for the block
        block.setOrigin(0.5);
    });

    // Display score
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    // Collisions
    this.physics.add.collider(player, blocks, hitBlock, null, this);
}

function update() {
    // Player movement
    if (cursors.left.isDown) {
        player.x -= 5;
    } else if (cursors.right.isDown) {
        player.x += 5;
    }

    // Make blocks fall and reset their position when they go off-screen
    blocks.children.iterate(function (block) {
        if (block.y > 600) {
            block.setY(-50);
            block.setX(Phaser.Math.Between(0, 750));
            score += 10; // Increment score when block reaches the bottom
            scoreText.setText('Score: ' + score);
        }
    });
}

function hitBlock(player, block) {
    // Handle collision with block (Game Over)
    this.physics.pause();
    player.setTint(0xff0000);
    scoreText.setText('Game Over! Score: ' + score);
}
