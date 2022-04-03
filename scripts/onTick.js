function onTick(gameState)
{
    const delay = 15;
    gameState.ticks += 1;
    if (gameState.ticks % delay == 0)
    {
        if (!isGameOver(gameState))
        {
            moveSnakePieces(gameState);
            updateForGoodPips(gameState);
        } 
        else 
        {
            endGame(gameState);
        }
    }
} 

function moveSnakePieces(gameState)
{
    const oldTail = Object.assign({}, gameState.snake.pieces[gameState.snake.pieces.length - 1]);

    moveRest(gameState);
    moveHead(gameState);
    addPieceIfNecessary(gameState, oldTail);
}

function moveHead(gameState)
{
    const headPiece = gameState.snake.pieces[0];
    switch (gameState.snake.direction)
    {
        case "N":
            headPiece.y -= 1;
            break;
        case "E":
            headPiece.x += 1;
            break;
        case "S":
            headPiece.y += 1;
            break;
        case "W":
            headPiece.x -= 1;
            break;
    }
}

function moveRest(gameState)
{
    if (gameState.snake.pieces.length > 1)
    {
        for (let i = gameState.snake.pieces.length - 1; i > 0; --i)
        {
            gameState.snake.pieces[i].x = gameState.snake.pieces[i - 1].x;
            gameState.snake.pieces[i].y = gameState.snake.pieces[i - 1].y;
        }
    }

}

function addPieceIfNecessary(gameState, oldTail)
{
    if (isSameCoordinates(gameState.lastConsumedGoodPipCoordinate, oldTail))
    {
        gameState.snake.pieces.push(oldTail);
        gameState.lastConsumedGoodPipCoordinate = false;
    }
}

function removeGoodPip(gameState, coordinates)
{
    gameState.goodPips = gameState.goodPips.filter(pip => !isSameCoordinates(pip, coordinates));
}

// TODO: check for rest, not just head
function placeNewGoodPip(gameState, head)
{
    let candidateCoordinates = head;
    while (checkOverlaps(candidateCoordinates, gameState.snake.pieces))
    {
        candidateCoordinates = getRandomCoordinates();
    }
    gameState.goodPips.push(candidateCoordinates);
}

function getRandomCoordinates()
{
    const maxSize = 9;
    return {x: Math.floor(Math.random() * (maxSize)),
        y: Math.floor(Math.random() * (maxSize))};
}

function updateForGoodPips(gameState)
{
    const head = gameState.snake.pieces[0];
    if (checkOverlaps(head, gameState.goodPips))
    {
        gameState.lastConsumedGoodPipCoordinate = Object.assign({}, head);
        removeGoodPip(gameState, head);
        placeNewGoodPip(gameState, head);
    }
}

function isGameOver(gameState)
{
    const head = gameState.snake.pieces[0];
    console.log(gameState.gridSize);
    console.log(head);
    const outsideBounds = head.x < 0 || 
                          head.x >= gameState.gridSize  ||
                          head.y < 0 ||
                          head.y >= gameState.gridSize;

    const overlappedBadPip = checkOverlaps(gameState.snake.pieces[0], gameState.badPips);

    return outsideBounds || overlappedBadPip;
}

function checkOverlaps(single, many)
{
    return many.filter(i => isSameCoordinates(i, single))
               .length > 0;
}

function isSameCoordinates(lhs, rhs)
{
    if (lhs && rhs)
    {
        return lhs.x == rhs.x && lhs.y == rhs.y;
    }
}

function endGame(gameState)
{
    //TODO: something!
    alert("game over - refresh to play again");
    this.scene.pause();

}
