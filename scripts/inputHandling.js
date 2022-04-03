function handleInput(gameState, cursors)
{
    if (cursors.up.isDown)
    {
        gameState.snake.direction = 'N';
    }
    else if (cursors.right.isDown)
    {
        gameState.snake.direction = 'E';
    }

    if (cursors.down.isDown)
    {
        gameState.snake.direction = 'S';
    }
    else if (cursors.left.isDown)
    {
        gameState.snake.direction = 'W';
    }
}

/**
 * TODO: (?) - this is lame because it checks each tick, not each move (which feels snappy),
 * but which means if i am going left + hit up+right very quickly, i'm still able to go back on myself.
 * doesnt seem worth giving up the ability to queue direction changes, or overcomplicating things.
function changeDirectionTo(direction, gameState)
{
    const currentDirection = gameState.snake.direction;

    switch (direction)
    {
        case "N":
            if (currentDirection != "S")
            {
                gameState.snake.direction = 'N';
            }
            break;
        case "E":
            if (currentDirection != "W")
            {
                gameState.snake.direction = 'E';
            }
            break;
        case "S":
            if (currentDirection != "N")
            {
                gameState.snake.direction = 'S';
            }
            break;
        case "W":
            if (currentDirection != "E")
            {
                gameState.snake.direction = 'W';
            }
            break;
    }
}
*/
