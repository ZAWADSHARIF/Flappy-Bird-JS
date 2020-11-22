const gameDisplay = document.querySelector('.gameDisplay')
const gameMenu = document.querySelector('.gameMenu')
const play = document.querySelector('#play')
const players = document.querySelector('#player')
const highScore = document.querySelector('#highScore')

const gameArea = document.querySelector('.gameArea')
const scoreBord = document.querySelector('.scoreBord')

const soundBtn = document.querySelector('.soundBtn')

play.addEventListener("click", startGame)

let player = {
    ready: false,
    speed: 2,
    gravity: 3,
    fly: 60,
    wallGap: 200
}

document.addEventListener('keydown', birdFly)

function random_Num(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function startGame() {

    player.ready = true

    gameMenu.classList.add('hide')
    gameArea.classList.remove('hide')

    const bird = document.createElement('div')
    bird.classList.add('bird')
    gameArea.appendChild(bird)
    player.y = bird.offsetTop



    // down wall 
    createDownWall()

    // cloud
    createCloud()

    requestAnimationFrame(gamePlay)
}

function birdFly(e) {

    let bird = document.querySelector('.bird')

    // console.log(e.keyCode);

    if ((e.keyCode === 32 || e.keyCode === 38) && player.ready && player.y >= 0) {
        player.y -= player.fly

        bird.style.top = player.y + 'px'
    }
}

const gravity = function () {

    let bird = document.querySelector('.bird')
    let floor = gameDisplay.getBoundingClientRect()

    // console.log(player.y);

    if (player.y <= 576) {
        player.y += player.gravity
        bird.style.top = player.y + 'px'

    }

}

function createCloud() {

    for (x = 0; x < 7; x++) {

        const cloud = document.createElement('div')
        cloud.setAttribute('class', 'cloud')

        cloud.x = random_Num(200, 1000) * -1
        cloud.y = random_Num(20, 150)

        cloud.style.top = cloud.y + 'px'
        cloud.style.right = cloud.x + 'px'

        gameArea.appendChild(cloud)
    }
}

function moveCloud() {

    const allCloud = document.querySelectorAll('.cloud')
    let cloud_y = random_Num(20, 150)

    allCloud.forEach(function (item) {

        item.x += (player.speed - 1.5)
        item.style.right = item.x + 'px'

        if (item.x >= 800) {

            item.x = random_Num(200, 1000) * -1

            item.style.top = cloud_y + 'px'

        }
    })
}

function createDownWall() {


    for (x = 0; x < 4; x++) {
        const downWall = document.createElement('div')
        const upWall = document.createElement('div')

        downWall.setAttribute('class', 'downWall')
        upWall.setAttribute('class', 'upWall')


        let down_Wall_Y = random_Num(300, 500)
        let up_wall_Y = ((600 - down_Wall_Y) + player.wallGap) * -1

        downWall.x = ((x + 1) * 300) * -1
        upWall.x = ((x + 1) * 300) * -1

        downWall.style.top = down_Wall_Y + 'px'
        upWall.style.top = up_wall_Y + 'px'
        downWall.style.right = downWall.x + 'px'
        upWall.style.right = upWall.x + 'px'

        gameArea.appendChild(downWall)
        gameArea.appendChild(upWall)

    }
}

function moveWall() {
    const allDownWall = document.querySelectorAll('.downWall')
    let down_Wall_Y = random_Num(300, 500)

    allDownWall.forEach(function (item) {

        if( hitDownWall(item) ) {
            // console.log('HIT DOWN WALL');

            gameOver()
        }

        item.x += player.speed
        item.style.right = item.x + 'px'

        if (item.x >= 800) {

            item.x = -400

            item.style.top = down_Wall_Y + 'px'

        }
    })

    const allUpWall = document.querySelectorAll('.upWall')

    allUpWall.forEach(function (item) {

        if( hitUpWall(item) ) {
            // console.log("HIT UP WALL");

            gameOver()
        }

        item.x += player.speed
        item.style.right = item.x + 'px'

        if (item.x >= 800) {
            item.x = -400

            let up_wall_Y = ((600 - down_Wall_Y) + player.wallGap) * -1
            item.style.top = up_wall_Y + 'px'

        }
    })
}

function hitDownWall(downWall) {
    let hero = document.querySelector('.bird').getBoundingClientRect()
    let enemy = downWall.getBoundingClientRect()
    // let downEnemy = document.querySelectorAll('.downWall').getBoundingClientRect()
    // let upEnemy = document.querySelectorAll('.upWall').getBoundingClientRect()

    return !(
        (hero.bottom-5 <= enemy.top) || (hero.right <= enemy.left) || (hero.left-5 >= enemy.right)
    )

}

function hitUpWall(upWall) {
    let hero = document.querySelector('.bird').getBoundingClientRect()
    let enemy = upWall.getBoundingClientRect()
    // let downEnemy = document.querySelectorAll('.downWall').getBoundingClientRect()
    // let upEnemy = document.querySelectorAll('.upWall').getBoundingClientRect()

    return !(
        (hero.top-5 >= enemy.bottom) || (hero.right <= enemy.left) || (hero.left-5 >= enemy.right)
    )

}

function gamePlay() {

    if (player.ready) {

        gravity()
        moveWall()
        moveCloud()


    }

    // let birder = document.querySelector('.bird')
    // console.log('right' + birder.getBoundingClientRect().right);
    // console.log('left' + birder.getBoundingClientRect().left);

    requestAnimationFrame(gamePlay)
}

function gameOver() {

    player.ready = false

    console.log("GAME OVER");
}