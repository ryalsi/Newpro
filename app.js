import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Stats from 'three/examples/jsm/libs/stats.module';

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

// Lights
const light = new THREE.SpotLight(0xffffff, 1);
light.position.set(5, 5, 5);
light.castShadow = true;
scene.add(light);

// Adding ambient light for overall illumination
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft light
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const loader = new GLTFLoader();

// Handle file selection
const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function (e) {
    const arrayBuffer = e.target.result;
    
    // Load the GLTF model
    loader.parse(arrayBuffer, '', function (gltf) {
      // Clear the previous model if any
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }

      // Traverse and add shadows to meshes
      gltf.scene.traverse(function (child) {
        if (child.isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
      });

      scene.add(gltf.scene);
    }, function (error) {
      console.error('Error loading model:', error);
    });
  };
  reader.readAsArrayBuffer(file);
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const stats = new Stats();
document.body.appendChild(stats.dom);

function animate() {
  requestAnimationFrame(animate);
  
  controls.update();
  
  render();
  
  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
