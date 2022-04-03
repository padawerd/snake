
function renderGameState(gameState, scene, size)
{
    for (const sprite of scene.sprites.snake)
    {
        sprite.destroy();
    }
    for (const sprite of scene.sprites.goodPips)
    {
        sprite.destroy();
    }

    scene.sprites.snake = [];
    for (const piece of gameState.snake.pieces)
    {
        renderSnakePiece(piece, scene, size);
    }
    renderPips(gameState, scene, size);
}

// TODO: just destroy last + create new head
/*function renderGameState(gameState, scene)
{
    const headPiece = gameState.snake.pieces[0];
    const tailSprite = scene.sprites.snake.pop();
    if (tailSprite)
    {
        tailSprite.destroy();
    }

    if (headPiece)
    {
        renderSnakePiece(headPiece, scene);
    }   

    renderPips(gameState, scene);
}*/

function renderSnakePiece(snakePiece, scene, size)
{
    const snakeColor = "0xffffff";
    scene.sprites.snake.push(renderRectangle(snakePiece, snakeColor, scene, size));
}

function renderPips(gameState, scene, size)
{
    renderGoodPips(gameState, scene, size);
    renderBadPips(gameState, scene, size);
}

function renderGoodPips(gameState, scene, size)
{
    for (const goodPip of gameState.goodPips)
    {
        renderGoodPip(goodPip, scene, size);
    }
}

function renderBadPips(gameState, scene, size)
{
    for (const badPip of gameState.badPips)
    {
        renderBadPip(badPip, scene, size);
    }
}

function renderGoodPip(pip, scene, size)
{
    const goodPipColor = "0x00ff00";
    scene.sprites.goodPips.push(renderRectangle(pip, goodPipColor, scene, size));
}

function renderBadPip(pip, scene, size)
{
    const badPipColor = "0xff0000";
    scene.sprites.badPips.push(renderRectangle(pip, badPipColor, scene, size));
}

function renderRectangle(coordinates, color, scene, size)
{
    const renderCoordinates = renderingCoordinatesForPiece(coordinates, size);
    return scene.add.rectangle(renderCoordinates.x, 
                               renderCoordinates.y, 
                               size, 
                               size, 
                               color);
}

function renderingCoordinatesForPiece(piece, size)
{   
    const spacing = size / 4;
    const xOffset = size + spacing;
    const yOffset = size + spacing;
    const xSpacing = size + spacing;
    const ySpacing = size + spacing;
    
    return {x: xOffset + xSpacing * piece.x, 
            y: yOffset + ySpacing * piece.y};
}
