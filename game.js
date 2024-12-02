// Phaser game configuration
const config = {
  type: Phaser.AUTO, // Automatically choose WebGL or Canvas rendering
  width: window.innerWidth, // Use full screen width
  height: window.innerHeight, // Use full screen height
  parent: 'game-container', // Parent div for the game canvas
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  transparent: true, // Prevent black background during loading
  scale: {
    mode: Phaser.Scale.FIT, // Scale the game to fit the screen
    autoCenter: Phaser.Scale.CENTER_BOTH // Center the game canvas
  }
};

// Create a new Phaser game
const game = new Phaser.Game(config);

let player;
let cursors;
let blocks;
let score = 0;
let scoreText;

function preload() {
  // Preload assets (no need for external images since we're using emojis)
  console.log("Preloading game assets...");
}

function create() {
  console.log("Game created successfully!");

  // Create the player as a blue square emoji (🟦)
  player = this.add.text(400, 550, '🟦', { fontSize: '40px' }).setOrigin(0.5);

  // Set up keyboard input controls (left and right arrows)
  cursors = this.input.keyboard.createCursorKeys();

  // Create a group for the falling blocks (red square emoji)
  blocks = this.physics.add.group({
    key: 'block',
    repeat: 5,
    setXY: { x: 100, y: 0, stepX: 150 }
  });

  // Set properties for each block
  blocks.children.iterate(function (block) {
    block.setVelocityY(Phaser.Math.Between(100, 200)); // Random vertical velocity
    block.setInteractive();
    block.setText('🟥').setFontSize(40); // Use red square emoji for blocks
    block.setOrigin(0.5); // Center the blocks
  });

  // Display the score at the top-left corner
  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

  // Handle collisions between the player and the blocks
  this.physics.add.collider(player, blocks, hitBlock, null, this);
}

function update() {
  // Player movement based on arrow keys
  if (cursors.left.isDown) {
    player.x -= 5; // Move player left
  } else if (cursors.right.isDown) {
    player.x += 5; // Move player right
  }

  // Keep the player within the screen bounds
  player.x = Phaser.Math.Clamp(player.x, 0, window.innerWidth - player.width);

  // Reset falling blocks when they go off-screen and update score
  blocks.children.iterate(function (block) {
    if (block.y > window.innerHeight) {
      block.setY(-50); // Reset block to top
      block.setX(Phaser.Math.Between(0, window.innerWidth - 50)); // Random x position
      score += 10; // Increase score
      scoreText.setText('Score: ' + score); // Update score display
    }
  });
}

// Handle collision between player and block (Game Over)
function hitBlock(player, block) {
  this.physics.pause(); // Pause the game
  player.setTint(0xff0000); // Change player color to red (indicating game over)
  scoreText.setText('Game Over! Final Score: ' + score); // Display final score
  console.log("Game Over! Final Score: " + score);
}
