import {WebGLRenderer} from 'three'

export default class RendererManager {
  constructor() {
    this._renderer = null
  }

  onInit(scene, camera) {
    this._scene = scene
    this._camera = camera
    this._renderer = new WebGLRenderer({ antialias: true })
    console.log('aaa', this._renderer.domElement)
    document.body.appendChild(this._renderer.domElement)
  }

  onRAF() {
    this._renderer.render(this._scene, this._camera)
  }

  onResize() {
    this._renderer.setSize(window.innerWidth, window.innerHeight)
  }
}
