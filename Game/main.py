import pygame
import random
import time
import Things
import intro
import buttons
import displayText
import Paused

 
pygame.init()
clock = pygame.time.Clock()
sound = pygame.mixer.Sound("sound/sound.wav")
pygame.mixer.music.load('sound/music.mp3')
pygame.mixer.music.play(-1)
backImg = pygame.image.load('images/background.png')
ballImg = pygame.image.load('images/football.png')
goalLeftImg = pygame.image.load('images/goalLeft.png')
goalRightImg = pygame.image.load('images/goalRight.png')
boyFirstLeftNormalImg = pygame.image.load('images/boyFirstNormalLeft.png')
boyFirstRightNormalImg = pygame.image.load('images/boyFirstNormalRight.png')
boyFirstLeftKickImg = pygame.image.load('images/boyFirstKickLeft.png')
boyFirstRightKickImg = pygame.image.load('images/boyFirstKickRight.png')
display_width = 1200
display_height = 600
gameDisplay = pygame.display.set_mode((display_width, display_height))
#gameDisplay = pygame.display.set_mode((0, 0), pygame.FULLSCREEN)
display_width, display_height = pygame.display.get_surface().get_size()
pygame.display.set_caption('FootBall Children Game')
pygame.display.set_icon(ballImg)

white = (255, 255, 255)
black = (0, 0, 0)
red = (255, 0, 0)
green = (0, 255, 0)
blue = (0, 0, 255)
bright_red = (255, 128, 0)
bright_green = (0, 255, 128)

goal_width = goalLeftImg.get_rect().size[0]
goal_height = goalLeftImg.get_rect().size[1]

gravityAcceleration = 0.5
horizontalAcceleration = 0
verticalSpeed = [0, 0]
horizontalSpeed = [0, 0]
ballrect = ballImg.get_rect()
ball_width = ballrect.size[0]
ball_height = ballrect.size[1]
ball_x = 600
ball_y = 300
## boy
boyGravityAcceleration = 0.5
boyVerticalSpeed = [0, 0]
boyRect = boyFirstRightNormalImg.get_rect()
boy_width = boyRect.size[0]
boy_height = boyRect.size[1]
boy_x = 1000
boy_y = display_height - boy_height
boy_x_change = 0
boy_y_change = 0

# Load second player images base setting
girlFirstLeftNormalImg = pygame.image.load('images/Football Girl (left).png')
girlFirstRightNormalImg = pygame.image.load('images/Football Girl (Right).png')
girlFirstLeftKickImg = pygame.image.load('images/Football Girl (left).png')
girlFirstRightKickImg = pygame.image.load('images/Football Girl (Right).png')
# Second player variables base setting
girlGravityAcceleration = 0.5
girlVerticalSpeed = [0, 0]
girlRect = girlFirstRightNormalImg.get_rect()
girl_width = girlRect.size[0]
girl_height = girlRect.size[1]
girl_x = 100  # Set the initial X position for the second player
girl_y = display_height - girl_height
girl_x_change = 0
girl_y_change = 0



score_left = 0
score_right = 0
timer_seconds = 20


def background(x, y):
    gameDisplay.blit(backImg, (x, y))


def goal(x1, y1, x2, y2):
    gameDisplay.blit(goalLeftImg, (x1, y1))
    gameDisplay.blit(goalRightImg, (x2, y2))


def ball(x, y):
    gameDisplay.blit(ballImg, (x, y))

##
def firstBoy(type, x, y):
    if type == 'normal left':
        gameDisplay.blit(boyFirstLeftNormalImg, (x, y))
    elif type == 'normal right':
        gameDisplay.blit(boyFirstRightNormalImg, (x, y))
    elif type == 'kick left':
        gameDisplay.blit(boyFirstLeftKickImg, (x, y))
    elif type == 'kick right':
        gameDisplay.blit(boyFirstRightKickImg, (x, y))
##
def firstGirl(type, x, y):
    if type == 'normal left':
        gameDisplay.blit(girlFirstLeftNormalImg, (x, y))
    elif type == 'normal right':
        gameDisplay.blit(girlFirstRightNormalImg, (x, y))
    elif type == 'kick left':
        gameDisplay.blit(girlFirstLeftKickImg, (x, y))
    elif type == 'kick right':
        gameDisplay.blit(girlFirstRightKickImg, (x, y))
##

intro.game_intro(gameDisplay, display_width, display_height, sound)

start_ticks=pygame.time.get_ticks()

timer_font = pygame.font.Font('freesansbold.ttf', 30)


crashed = False
while not crashed:
    background(0, 0)
    goal(0, display_height - goal_height, display_width - goal_width, display_height - goal_height)
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            crashed = True
    
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                boy_x_change = -15
            if event.key == pygame.K_RIGHT:
                boy_x_change = 15
            if event.key == pygame.K_UP:
                boy_y_change = -15
            if event.key == pygame.K_DOWN:
                if boy_y < display_height - boy_height:
                    boy_y_change = 15
        if event.type == pygame.KEYUP:
            if event.key == pygame.K_LEFT or event.key == pygame.K_RIGHT:
                boy_x_change = 0
            if event.key == pygame.K_UP or event.key == pygame.K_DOWN:
                boy_y_change = 0

            if event.key == pygame.K_p:
                Paused.paused(gameDisplay, display_width, display_height, True)



    ## Girl
    # Inside the game loop, after handling input for the first player

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                crashed = True

        # Input handling for the second player
        keys = pygame.key.get_pressed()
        if keys[pygame.K_a]:
            girl_x_change = -15
        if keys[pygame.K_d]:
            girl_x_change = 15
        if keys[pygame.K_w]:
            girl_y_change = -15
        if keys[pygame.K_s]:
            girl_y_change = 15

            # Second player key release
        if event.type == pygame.KEYUP:
            if event.key == pygame.K_a or event.key == pygame.K_d:
                girl_x_change = 0
            if event.key == pygame.K_w or event.key == pygame.K_s:
                girl_y_change = 0

        ##
        # Update girl player's position and movement
    girl_x += girl_x_change
    girl_y += girl_y_change

    girlVerticalSpeed[0] = girlGravityAcceleration + girlVerticalSpeed[1]
    girl_y += girlVerticalSpeed[0]
    girlVerticalSpeed[1] = girlVerticalSpeed[0]

    # Update boy player's position and movement
    boy_x += boy_x_change
    boy_y += boy_y_change

    boyVerticalSpeed[0] = boyGravityAcceleration + boyVerticalSpeed[1]
    boy_y += boyVerticalSpeed[0]
    boyVerticalSpeed[1] = boyVerticalSpeed[0]


    # Check boundaries for the second player
    if girl_x < 0:
        girl_x = 0
    if girl_x > (display_width - girl_height):
        girl_x = display_width - girl_height
    if girl_y < 0:
        girl_y = 0
        girlVerticalSpeed = [0, 0]
    if girl_y > display_height - girl_height:
        girl_y = display_height - girl_height
        girlVerticalSpeed = [-girlVerticalSpeed[0] * 0.7, -girlVerticalSpeed[1] * 0.7]
    ##
    # crashed = False
    # while not crashed:
    #     for event in pygame.event.get():
    #         if event.type == pygame.QUIT:
    #             crashed = True
    #         elif event.type == pygame.KEYDOWN:
    #             if event.key == pygame.K_LEFT:
    #                 boy_x_change = -15
    #             if event.key == pygame.K_RIGHT:
    #                 boy_x_change = 15
    #             if event.key == pygame.K_UP:
    #                 boy_y_change = -15
    #             if event.key == pygame.K_DOWN:
    #                 if boy_y < display_height - boy_height:
    #                     boy_y_change = 15
    #         if event.type == pygame.MOUSEBUTTONDOWN:
    #             touch_x, touch_y = event.pos

    # boy_x = touch_x - boy_width / 2
    # boy_y = touch_y - boy_height / 2
    # girl_x = touch_x - girl_width / 2
    # girl_y = touch_y - girl_height / 2

    # Display the second player
    #if ball_x >= (display_width / 2):
        #firstGirl('normal right', girl_x, girl_y)
    #elif ball_x < (display_width / 2):
        #firstGirl('normal left', girl_x, girl_y)

    ##Frist boy
    if boy_x < 0:
        boy_x = 0
    if boy_x > (display_width - boy_height):
        boy_x = display_width - boy_height
    if boy_y < 0:
        boy_y = 0
        boyVerticalSpeed = [0, 0]
    if boy_y > display_height - boy_height:
        boy_y = display_height - boy_height
        boyVerticalSpeed = [-boyVerticalSpeed[0] * 0.7, -boyVerticalSpeed[1] * 0.7]
    ##Gril
    if girl_x < 0:
        girl_x = 0
    if girl_x > (display_width - girl_height):
        girl_x = display_width - girl_height
    if girl_y < 0:
        girl_y = 0
        girlVerticalSpeed = [0, 0]
    if girl_y > display_height - girl_height:
        girl_y = display_height - girl_height
        girlVerticalSpeed = [-girlVerticalSpeed[0] * 0.7, -girlVerticalSpeed[1] * 0.7]

    #ball
    verticalSpeed[0] = gravityAcceleration + verticalSpeed[1]
    ball_y += verticalSpeed[0]
    verticalSpeed[1] = verticalSpeed[0]

    horizontalSpeed[0] = horizontalAcceleration + horizontalSpeed[1]
    ball_x += horizontalSpeed[0]
    horizontalSpeed[1] = horizontalSpeed[0]

    if ball_x < 0:
        ball_x = 0
        horizontalSpeed = [-horizontalSpeed[0] * 0.7, -horizontalSpeed[1] * 0.7]
    if ball_x > (display_width - ballrect.right):
        ball_x = display_width - ballrect.right
        horizontalSpeed = [-horizontalSpeed[0] * 0.7, -horizontalSpeed[1] * 0.7]
    if ball_y < 0:
        ball_y = 0
        verticalSpeed = [0, 0]
    if ball_y > (display_height - ballrect.bottom):
        ball_y = display_height - ballrect.bottom
        verticalSpeed = [-verticalSpeed[0] * 0.7, -verticalSpeed[1] * 0.7]
        if (ball_y == (display_height - ballrect.height)):
            horizontalSpeed = [horizontalSpeed[0] * 0.95, horizontalSpeed[1] * 0.95]

    # Boy Player touch the ball
    if ball_x > boy_x + boy_width - 10 and ball_x < boy_x + boy_width + 10 and ball_y + (
            ball_height / 2) > boy_y and ball_y + (ball_height / 2) < boy_y + boy_height:
        horizontalSpeed[0] = 0
        horizontalSpeed[1] = 10
        verticalSpeed[0] = 0
        verticalSpeed[1] = -10
        firstBoy('kick right', boy_x, boy_y)
    if ball_x + ball_width < boy_x + 10 and ball_x + ball_width > boy_x - 10 and ball_y + (
            ball_height / 2) > boy_y and ball_y + (ball_height / 2) < boy_y + boy_height:
        horizontalSpeed[0] = 0
        horizontalSpeed[1] = -10
        verticalSpeed[0] = 0
        verticalSpeed[1] = -10
        firstBoy('kick left', boy_x, boy_y)
    if ball_x + (ball_width / 2) > boy_x and ball_x + (ball_width / 2) < boy_x + boy_width and ball_y + (
    ball_height) < boy_y + 10 and ball_y + (ball_height) > boy_y - 10:
        horizontalSpeed[0] = 0
        horizontalSpeed[1] = 10
        verticalSpeed[0] = 0
        verticalSpeed[1] = -10
        firstBoy('kick right', boy_x, boy_y)

    #Girl Player touch the ball
    if (
        ball_x > girl_x + girl_width - 10 and ball_x < girl_x + girl_width + 10 and ball_y + (ball_height / 2) > girl_y and ball_y + (ball_height / 2) < girl_y + girl_height
    ):
        horizontalSpeed[0] = 0
        horizontalSpeed[1] = 10  # Follow the user to control the kick ball speed
        verticalSpeed[0] = 0
        verticalSpeed[1] = -10  # Follow the user to control the jump speed
        firstGirl('kick right', girl_x, girl_y)

    if (
        ball_x + ball_width < girl_x + 10 and ball_x + ball_width > girl_x - 10 and ball_y + (ball_height / 2) > girl_y and ball_y + (ball_height / 2) < girl_y + girl_height
    ):
        horizontalSpeed[0] = 0
        horizontalSpeed[1] = -10  # Follow the user to control the kick ball speed
        verticalSpeed[0] = 0
        verticalSpeed[1] = -10  # Follow the user to control the jump speed
        firstGirl('kick left', girl_x, girl_y)

    if (
        ball_x + (ball_width / 2) > girl_x and ball_x + (ball_width / 2) < girl_x + girl_width and ball_y + ball_height < girl_y + 10 and ball_y + ball_height > girl_y - 10
    ):
        horizontalSpeed[0] = 0
        horizontalSpeed[1] = 10 # Follow the user to control the kick ball speed
        verticalSpeed[0] = 0
        verticalSpeed[1] = -10  # Follow the user to control the jump speed
        firstGirl('kick right', girl_x, girl_y)
        ##
    # Ball go in to the player 2 net
    if ball_x > 0 and ball_x < goal_width - ballrect.right and ball_y < display_height and ball_y > display_height - goal_height:
        score_left += 1
        start_ticks=pygame.time.get_ticks()
        Paused.paused(gameDisplay, display_width, display_height, 'Player 1 scores', True)
        ball_x = 600
        ball_y = 300 - (ballrect.right / 2)
        gravityAcceleration = 0.3
        horizontalAcceleration = 0
        verticalSpeed = [0, 0]
        horizontalSpeed = [0, 0]
    # Ball go in to the player 1 net
    if ball_x > (
            display_width - goal_width) and ball_x < display_width and ball_y < display_height and ball_y > display_height - goal_height:
        score_right += 1
        start_ticks=pygame.time.get_ticks()
        Paused.paused(gameDisplay, display_width, display_height, 'Player 2 scores', True)
        ball_x = 600
        ball_y = 300 - (ballrect.right / 2)
        gravityAcceleration = 0.3
        horizontalAcceleration = 0
        verticalSpeed = [0, 0]
        horizontalSpeed = [0, 0]

    
    seconds=(pygame.time.get_ticks()-start_ticks)/1000
    largeText = pygame.font.Font('freesansbold.ttf', 30)
    TextSurf, TextRect = displayText.display_text(str(score_left) + " | " + str(round(timer_seconds-seconds)) + " | " + str(score_right), largeText)
    TextRect.center = ((display_width / 2), 20)
    gameDisplay.blit(TextSurf, TextRect) 

    if seconds > timer_seconds:
        start_ticks=pygame.time.get_ticks()
        Paused.paused(gameDisplay, display_width, display_height, 'no time', True)


    ## Boy direction control in game
    gameDisplay.blit(ballImg, (ball_x, ball_y))

    if boy_x_change > 0:
        firstBoy('normal right', boy_x, boy_y)
    elif boy_x_change < 0:
        firstBoy('normal left', boy_x, boy_y)
    else:
        # If boy is not moving horizontally, you may want to display a default image
        firstBoy('normal left', boy_x, boy_y)


    #gameDisplay.blit(ballImg, (ball_x, ball_y))
    #if ball_x < (display_width / 2):
    #    firstBoy('normal right', boy_x, boy_y)
    #elif ball_x >= (display_width / 2):
     #   firstBoy('normal left', boy_x, boy_y)


    ## Girl direction control in game
    gameDisplay.blit(ballImg, (ball_x, ball_y))

    if girl_x_change > 0:
        firstGirl('normal right', girl_x, girl_y)
    elif girl_x_change < 0:
        firstGirl('normal left', girl_x, girl_y)
    else:
        # If boy is not moving horizontally, you may want to display a default image
        firstGirl('normal right', girl_x, girl_y)


    #gameDisplay.blit(ballImg, (ball_x, ball_y))
    #if ball_x >= (display_width / 2):
    #    firstGirl('normal right', girl_x, girl_y)
    #elif ball_x < (display_width / 2):
    #    firstGirl('normal left', girl_x, girl_y)

    pygame.display.update()
    clock.tick(60)

pygame.quit()

