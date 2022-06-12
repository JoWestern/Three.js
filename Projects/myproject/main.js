import '/style.css'
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import {DRACOLoader} from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/DRACOLoader.js';
import {RoomEnvironment} from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/environments/RoomEnvironment.js';
import { TWEEN } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/libs/tween.module.min';
import { CSS2DRenderer, CSS2DObject } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS3DRenderer, CSS3DObject } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/renderers/CSS3DRenderer.js';

			let gui;

			let camera, scene, renderer, labelRenderer;

	
			const clock = new THREE.Clock();
			const textureLoader = new THREE.TextureLoader();

			let moon;

			init();
			animate();

			function init() {

				const EARTH_RADIUS = 1;
				const MOON_RADIUS = 0.27;

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 200 );
				camera.position.set( 10, 5, 20 );
				

				scene = new THREE.Scene();

			

				//

				const earthGeometry = new THREE.SphereGeometry( EARTH_RADIUS, 16, 16 );
				const earthMaterial = new THREE.MeshPhongMaterial( {
					specular: 0x333333,
					shininess: 5
				} );
				const earth = new THREE.Mesh( earthGeometry, earthMaterial );
				scene.add( earth );

				const moonGeometry = new THREE.SphereGeometry( MOON_RADIUS, 16, 16 );
				const moonMaterial = new THREE.MeshPhongMaterial( {
					shininess: 5
				} );
				moon = new THREE.Mesh( moonGeometry, moonMaterial );
				scene.add( moon );

				//

				const earthDiv = document.createElement( 'div' );
				earthDiv.className = 'label';
				earthDiv.textContent = 'Earth';
				earthDiv.style.marginTop = '-1em';
				const earthLabel = new CSS2DObject( earthDiv );
				earthLabel.position.set( 0, EARTH_RADIUS, 0 );
				earth.add( earthLabel );
				earthLabel.layers.set( 0 );

				const earthMassDiv = document.createElement( 'div' );
				earthMassDiv.className = 'label';
				earthMassDiv.textContent = '5.97237e24 kg';
				earthMassDiv.style.marginTop = '-1em';
				const earthMassLabel = new CSS2DObject( earthMassDiv );
				earthMassLabel.position.set( 0, - 2 * EARTH_RADIUS, 0 );
				earth.add( earthMassLabel );

				const moonDiv = document.createElement( 'div' );
				moonDiv.className = 'label';
				moonDiv.textContent = 'Moon';
				moonDiv.style.marginTop = '-1em';
				const moonLabel = new CSS2DObject( moonDiv );
				moonLabel.position.set( 0, MOON_RADIUS, 0 );
				moon.add( moonLabel );

				const moonMassDiv = document.createElement( 'div' );
				moonMassDiv.className = 'label';
				moonMassDiv.textContent = '7.342e22 kg';
				moonMassDiv.style.marginTop = '-1em';
				const moonMassLabel = new CSS2DObject( moonMassDiv );
				moonMassLabel.position.set( 0, - 2 * MOON_RADIUS, 0 );
				moon.add( moonMassLabel );
			

				//

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				labelRenderer = new CSS2DRenderer();
				labelRenderer.setSize( window.innerWidth, window.innerHeight );
				labelRenderer.domElement.style.position = 'absolute';
				labelRenderer.domElement.style.top = '0px';
				document.body.appendChild( labelRenderer.domElement );

				const controls = new OrbitControls( camera, labelRenderer.domElement );
				controls.minDistance = 5;
				controls.maxDistance = 100;			

			}


			function animate() {

				requestAnimationFrame( animate );

				const elapsed = clock.getElapsedTime();

				moon.position.set( Math.sin( elapsed ) * 5, 0, Math.cos( elapsed ) * 5 );

				renderer.render( scene, camera );
				labelRenderer.render( scene, camera );

			}

			//

			
