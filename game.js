// Phaser game configuration
const config = {
  type: Phaser.AUTO, // Use WebGL or Canvas rendering automatically
  width: window.innerWidth, // Set to full window width
  height: window.innerHeight, // Set to full window height
  parent: 'game-container', // Parent div for the game canvas
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  scale: {
    mode: Phaser.Scale.FIT, // Scale to fit the screen
    autoCenter: Phaser.Scale.CENTER_BOTH // Center the game canvas
  }
};

// Create a new Phaser game
const game = new Phaser.Game(config);

let player;
let cursors;

function preload() {
  // Just for debugging - check if preload is called
  console.log("Preloading...");
}

function create() {
  // Debugging: Check if create is called
  console.log("Game created successfully!");

  // Create a simple player as a blue square emoji
  player = this.add.text(400, 550, '🟦', { fontSize: '40px' }).setOrigin(0.5);

  // Setup for keyboard input
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  // Debugging: Check if update is being called
  // console.log("Update loop running...");

  // Move the player based on arrow key input
  if (cursors.left.isDown) {
    player.x -= 5;
  } else if (cursors.right.isDown) {
    player.x += 5;
  }

  // Prevent the player from going off-screen
  player.x = Phaser.Math.Clamp(player.x, 0, window.innerWidth - player.width);
}
