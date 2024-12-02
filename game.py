import pygame
import random
import sys

# Initialize pygame
pygame.init()

# Screen dimensions
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Dodge the Falling Blocks")

# Colors
WHITE = (255, 255, 255)
RED = (255, 0, 0)
BLUE = (0, 0, 255)

# Player settings
player_width = 50
player_height = 50
player_x = WIDTH // 2
player_y = HEIGHT - player_height - 10
player_speed = 5

# Block settings
block_width = 50
block_height = 50
block_speed = 5

clock = pygame.time.Clock()

def draw_player(x, y):
    pygame.draw.rect(screen, BLUE, (x, y, player_width, player_height))

def draw_block(x, y):
    pygame.draw.rect(screen, RED, (x, y, block_width, block_height))

def main():
    global player_x
    block_x = random.randint(0, WIDTH - block_width)
    block_y = -block_height
    block_velocity = block_speed

    # Game loop
    while True:
        screen.fill(WHITE)
        
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        # Get key press events
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT] and player_x > 0:
            player_x -= player_speed
        if keys[pygame.K_RIGHT] and player_x < WIDTH - player_width:
            player_x += player_speed

        # Update block position
        block_y += block_velocity
        if block_y > HEIGHT:
            block_y = -block_height
            block_x = random.randint(0, WIDTH - block_width)

        # Collision detection
        if (player_x < block_x + block_width and
            player_x + player_width > block_x and
            player_y < block_y + block_height and
            player_y + player_height > block_y):
            print("Game Over!")
            pygame.quit()
            sys.exit()

        # Draw everything
        draw_player(player_x, player_y)
        draw_block(block_x, block_y)

        # Update the screen
        pygame.display.update()

        # Control the frame rate
        clock.tick(60)

if __name__ == "__main__":
    main()
