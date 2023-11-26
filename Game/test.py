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


                '''if event.type == pygame.KEYDOWN:
        if event.key == pygame.K_LEFT:
            horizontalSpeed[0] = 0
            horizontalSpeed[1] = -10
        if event.key == pygame.K_RIGHT:
            horizontalSpeed[0] = 0
            horizontalSpeed[1] = 10
        if event.key == pygame.K_UP :
            verticalSpeed[0] = 0
            verticalSpeed[1] = -10
        if event.key == pygame.K_p:
            Paused.paused(gameDisplay, display_width, display_height, True)
    '''
            




    background(0, 0)
    goal(0, display_height - goal_height, display_width - goal_width, display_height - goal_height)

    '''if event.type == pygame.KEYDOWN:
        if event.key == pygame.K_LEFT:
            horizontalSpeed[0] = 0
            horizontalSpeed[1] = -10
        if event.key == pygame.K_RIGHT:
            horizontalSpeed[0] = 0
            horizontalSpeed[1] = 10
        if event.key == pygame.K_UP :
            verticalSpeed[0] = 0
            verticalSpeed[1] = -10
        if event.key == pygame.K_p:
            Paused.paused(gameDisplay, display_width, display_height, True)
    '''