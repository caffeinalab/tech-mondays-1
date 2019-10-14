import {PerspectiveCamera} from 'three'
import {TweenMax} from 'gsap'

export default class Camera {
  constructor() {
    this.camera = null
  }

  onInit() {
    this.camera = new PerspectiveCamera(70, this.ratio, 0.1, 300)
    this.camera.position.set(0, 0, 1)
    this.camera.rotation.set(0, 0, 0)
  }

  rotate(direction) {
    console.log(direction)
    const {camera} = this

    TweenMax.to(camera.position, 1, {
      x: 0.4 * direction,
      y: camera.position.y,
      z: camera.position.z
    })
  }

  onResize() {
    this.camera.aspect = this.ratio
    this.camera.updateProjectionMatrix()
  }

  get ratio() {
    return window.innerWidth / window.innerHeight
  }
}
