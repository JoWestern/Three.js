import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// loading
const textureloader = new THREE.TextureLoader()

const normalTexture = textureloader.load('/textures/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry(.5, 32, 32)
const boxGeometry = new THREE.BoxBufferGeometry(22, 28, 8)

const towerGeometry1 = new THREE.BoxGeometry(0.3, 0.5, 0.2)
const towerGeometry2 = new THREE.BoxGeometry(0.3, 0.55, 0.2)
const towerGeometry3 = new THREE.BoxGeometry(0.3, 0.35, 0.2)
const towerGeometry4 = new THREE.BoxGeometry(0.3, 0.28, 0.2)

// Material, wrapping paper for object
// BasicMaterial: No lightsource needed
// StandardMaterial: Light needed
const towerMaterial1 = new THREE.MeshStandardMaterial({color: 0xADD8E6})
const towerMaterial2 = new THREE.MeshStandardMaterial({color: 0x000FFF})
const towerMaterial3 = new THREE.MeshStandardMaterial({color: 0x00FF00})
const towerMaterial4 = new THREE.MeshStandardMaterial({color: 0xF000FF})

// Mesh
const tower1 = new THREE.Mesh(towerGeometry1, towerMaterial1)
const tower2 = new THREE.Mesh(towerGeometry2, towerMaterial2)
const tower3 = new THREE.Mesh(towerGeometry3, towerMaterial3)
const tower4 = new THREE.Mesh(towerGeometry4, towerMaterial4)

tower1.position.x = -0.15
tower1.position.y = 0.025

tower2.position.x = 0.15
tower2.position.y = 0.05

tower3.position.x = -0.15
tower3.position.y = -0.05
tower3.position.z = 0.20

tower4.position.x = 0.15
tower4.position.z = 0.2
tower4.position.y = -0.085

var sculpt = new THREE.Group();
sculpt.add(tower1);
sculpt.add(tower2);
sculpt.add(tower3);
sculpt.add(tower4);
scene.add(sculpt);


// Materials

    //Sphere
    const material = new THREE.MeshStandardMaterial()
    material.metalness = 0.7 
    material.roughness = 0.2 
    material.normalMap = normalTexture;
    material.color = new THREE.Color(0x292929)

    //Box
    const boxMaterial = new THREE.MeshStandardMaterial({color: 0x00ff00}) 
    boxMaterial.metalness = 0.7 
    boxMaterial.roughness = 0.2 
    boxMaterial.normalMap = normalTexture;
    boxMaterial.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry, material)
const box = new THREE.Mesh(boxGeometry, boxMaterial)

//scene.add(sphere)
scene.add(box)



// gui folder
const light1 = gui.addFolder('Light 1')
const light2 = gui.addFolder('Light 2')
const object1 = gui.addFolder('object')

// Lights
const pointLight = new THREE.PointLight(0x00ff00, 0.1)
pointLight.position.x = 0.82
pointLight.position.y = -0.8
pointLight.position.z = -0.33
pointLight.intensity = 10
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0x00fff0, 2)
pointLight2.position.set(-1.13,1.02,-0,79)
pointLight2.intensity = 7
scene.add(pointLight2)

const ambiLight = new THREE.AmbientLight(0xFFFFFF)
ambiLight.intensity = 10
scene.add(ambiLight)

// Make gui controls
light1.add(pointLight.position, 'x').min(-3).max(3).step(0.01)
light1.add(pointLight.position, 'y').min(-3).max(3).step(0.01)
light1.add(pointLight.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight, 'intensity').min(0).max(10).step(0.01)

light2.add(pointLight2.position, 'x').min(-3).max(3).step(0.01)
light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

object1.add(sphere.position, 'x').min(-3).max(3).step(0.01)
object1.add(sphere.position, 'y').min(-3).max(3).step(0.01)
object1.add(sphere.position, 'z').min(-3).max(3).step(0.01)

// color object
const light1Color = {
    color: 0xff0000
}

// color change in gui
light1.addColor(light1Color, 'color')
    .onChange(() => {
        pointLight.color.set(light1Color.color)
    })

// Light helper
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper)
// scene.add(pointLightHelper2)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)


let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}


const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //sphere.rotation.y = 0.3 * elapsedTime

    
    sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x)
    sphere.rotation.z += 0.5 * (targetY - sphere.rotation.x)

    sculpt.rotation.y += 0.005
    
    
    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()