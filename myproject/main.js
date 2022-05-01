import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scence == container
const scene = new THREE.Scene();

// Mimics human eyeball.
// @param: FOV, Aspect Ratio, 2 x View Frustrum
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)

// Full screen canvas
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

// Render == draw
// renderer.render(scene, camera)


// Object geometry
// @param: radius, tube, radialSegments, tubularSegments

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

tower1.position.x = -0.3
tower1.position.y = 0.025

tower2.position.y = 0.05

tower3.position.x = -0.3
tower3.position.y = -0.05
tower3.position.z = 0.20

tower4.position.z = 0.2
tower4.position.y = -0.085

var sculpt = new THREE.Group();
sculpt.add(tower1);
sculpt.add(tower2);
sculpt.add(tower3);
sculpt.add(tower4);
scene.add(sculpt);

// Light
// PointLight: Light from a point
// AmbientLight: Light everything
const pointLight = new THREE.AmbientLight(0xffffff) 
pointLight.position.set(5, 5, 5)

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200, 50)

scene.add(lightHelper)
scene.add(pointLight)

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
  const starMaterial = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(starGeometry, starMaterial)

  // Random star position
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ))

  star.position.set(x, y, z)
  scene.add(star)
}

// Add 200 stars
Array(200).fill().forEach(addStar)

// Add background image
const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture

// Add Axel
const axelTexture = new THREE.TextureLoader().load('axelrave.png')
const axel = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: axelTexture})
)
scene.add(axel)

// Add Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('NormalMap.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
)
scene.add(moon)

moon.position.z = 30;
moon.position.setX(-10)

axel.position.z = -5
axel.position.x = 2

// Move Camera on scroll
function moveCamera() {

  // Gets dimensions of viewport, top shows how far from top
  const t = document.body.getBoundingClientRect().top
  moon.rotation.y += 0.05
  


  axel.rotation.y += 0.01
  axel.rotation.x += 0.01
  axel.position.z += -1
  
  
 
  
  
  
}

// Trigger scrolling
document.body.onscroll = moveCamera
camera.position.z = -100
moveCamera()

var orbit = new THREE.Group();
orbit.add(moon);
scene.add(orbit);


function animate() {
  requestAnimationFrame( animate )

  orbit.rotation.y += 0.005;

  controls.update()

  renderer.render(scene, camera)
}

animate()