// const theme = document.getElementById('theme')

// const switchTheme = () => {
//     document.getElementById('meta')[3].content = theme.value
// }

// theme.addEventListener('change', switchTheme)


const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const bird = new Image()
const bg = new Image()
const fg = new Image()
const pipeUp = new Image()
const pipeBottom = new Image()

bird.src = './img/bird.png'
bg.src = './img/bg.png'
fg.src = './img/fg.png'
pipeUp.src = './img/pipeUp.png'
pipeBottom.src = './img/pipeBottom.png'

//аудио

const fly = new Audio()
const score = new Audio()

fly.src = './audio/fly.mp3'
score.src = './audio/score.mp3'

// Позиционирование птички
let xpos = 10
let ypos = 150
let grav = 1.5
let gap = 120
let count = 0

// Создание труб
const pipe = []
pipe[0] = {
    x: canvas.width,
    y: 0
}

const MoveUp = () => {
    ypos -= 35
}

document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
        MoveUp()
        fly.play()
    }
})

const draw = () => {
    context.drawImage(bg, 0, 0)
    context.drawImage(fg, 0, canvas.height - fg.height)
    context.drawImage(bird, xpos, ypos)

    for (let i = 0; i < pipe.length; i++) {
        context.drawImage(pipeUp, pipe[i].x, pipe[i].y)
        context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap)
        pipe[i].x--


        if (pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }
        if (xpos + bird.width >= pipe[i].x
            && xpos <= pipe[i].x + pipeUp.width
            && (ypos <= pipe[i].y + pipeUp.height
                || ypos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || ypos + bird.height >= canvas.height - fg.height) {
            location.reload()
        }
        if (pipe[i].x == 5) {
            count++
            score.play()
        }

    }
    ypos += grav
    context.fillText('Score: ' + count, 10, canvas.height - 20)
    context.fillStyle = '#000'
    context.font = '24px Verdana'
    requestAnimationFrame(draw)
}

pipeBottom.onload = draw