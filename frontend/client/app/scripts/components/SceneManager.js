import {Scene} from 'three'

export default class SceneManager {
  constructor() {
    this._scene = null
  }

  onInit() {
    this._scene = new Scene()
  }

  get scene() {
    return this._scene
  }

  add(mesh) {
    this._scene.add(mesh)
  }
}
