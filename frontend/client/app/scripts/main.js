import Application from './components/Application'
import {TweenMax} from 'gsap'
import io from 'socket.io-client'

const left = document.querySelector('.left')
const right = document.querySelector('.right')

const app = new Application()

const socket = io(`//api.${window.location.host}`)
socket.open()
socket.on('rotate', function(direction) {
  if (direction === 'left') {
    app.rotateMesh(-1)
    app.cameraManager.rotate(-1)
    TweenMax.to(left, 0.5, {opacity: 0})
    TweenMax.to(right, 0.5, {opacity: 1, delay: 0.6})
  }

  if (direction === 'right') {
    app.rotateMesh(1)
    app.cameraManager.rotate(1)
    TweenMax.to(right, 0.5, {opacity: 0})
    TweenMax.to(left, 0.5, {opacity: 1, delay: 0.6})
  }
})

