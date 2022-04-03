// must be divisible by 4
const pieceSize = 20;
const gridSize = 10;

const sideLength = canvasSize(pieceSize, gridSize);
console.log(sideLength);

const config = {
    width: sideLength,
    height: sideLength,
    backgroundColor: "0x0000ff",
    scene: {
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function create()
{
    initializeInputHandling(this);
    initializeSprites(this);
    initializeGameState(this);
    setupSnake(this.gameState);
    setupPips(this.gameState);
}

function initializeInputHandling(scene)
{
    cursors = scene.input.keyboard.createCursorKeys();
}

function initializeSprites(scene)
{
    scene.sprites = {snake: [],
        goodPips: [],
        badPips: []};
}

function initializeGameState(scene)
{
    scene.gameState = {ticks: 0};
    scene.gameState.gridSize = gridSize;
}

function setupSnake(gameState) {
    gameState.snake = {};
    gameState.snake.pieces = [{x: 0, y: 0}, {x: -1, y: 0}];
    gameState.snake.direction = "E";
}

function setupPips(gameState)
{
    gameState.goodPips = [{x: 5, y: 5}];
    gameState.badPips = [{x: 6, y: 6}];
}

function update()
{
    handleInput(this.gameState, cursors);
    onTick(this.gameState);
    renderGameState(this.gameState, this, pieceSize);
}

function canvasSize(pieceSize, gridSize)
{
    return (((pieceSize / 4) + pieceSize) * gridSize) + pieceSize / 4;
}
