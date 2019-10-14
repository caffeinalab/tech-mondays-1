import Application from './components/Application'
import {TweenMax} from 'gsap'

const left = document.querySelector('.left')
const right = document.querySelector('.right')

const app = new Application()
const ws = new WebSocket(`ws://api.${window.location.host}/socket.io/?EIO=3&transport=websocket`)
ws.addEventListener('message', function(event) {
  if (event.data.includes('left')) {
    app.cameraManager.rotate(1)
    TweenMax.to(right, 0.5, {opacity: 0})
    TweenMax.to(left, 0.5, {opacity: 1, delay: 0.6})
  }

  if (event.data.includes('right')) {
    app.cameraManager.rotate(-1)
    TweenMax.to(left, 0.5, {opacity: 0})
    TweenMax.to(right, 0.5, {opacity: 1, delay: 0.6})
  }
})

