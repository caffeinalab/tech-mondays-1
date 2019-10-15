import {BoxGeometry, MeshNormalMaterial, Mesh} from 'three'

import CameraManager from './CameraManager'
import SceneManager from './SceneManager'
import RendererManager from './RendererManager'
import { TweenMax } from 'gsap'

export default class Application {
  constructor() {
    this.rendererManager = new RendererManager()
    this.sceneManager = new SceneManager()
    this.cameraManager = new CameraManager()

    this.onInit()
  }

  rotateMesh(direction) {
    TweenMax.to(this.mesh.rotation, 1, {y: -1 * direction})
  }

  onInit() {
    this.cameraManager.onInit()
    this.sceneManager.onInit()

    const geometry = new BoxGeometry(0.4, 0.4, 0.4)
    const material = new MeshNormalMaterial()
    this.mesh = new Mesh(geometry, material)

    this.sceneManager.add(this.mesh)

    this.mesh.rotation.x += 0.0
    this.mesh.rotation.y += 0.0

    // init renderer
    this.rendererManager.onInit(
      this.sceneManager.scene,
      this.cameraManager.camera
    )

    this.onResize()

    window.addEventListener('resize', this.onResize)
    window.requestAnimationFrame(this.onRAF)
  }

  onRAF = time => {
    this.rendererManager.onRAF(time)
    window.requestAnimationFrame(this.onRAF)
  }

  onResize = () => {
    this.cameraManager && this.cameraManager.onResize()
    this.rendererManager && this.rendererManager.onResize()
  }
}
