// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("webglCanvas") });
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.7);
document.getElementById('container').appendChild(renderer.domElement);

// Set up OrbitControls to interact with the scene
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Create a basic cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position the camera
camera.position.z = 5;

// Variables for transformations
let rotationSpeed = 0.01;
let scaleFactor = 1.1;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the cube
    cube.rotation.x += rotationSpeed;
    cube.rotation.y += rotationSpeed;

    controls.update(); // Update controls

    renderer.render(scene, camera);
}
animate();

// Button functionality
document.getElementById("rotateButton").addEventListener("click", function () {
    rotationSpeed = rotationSpeed ? 0 : 0.01; // Toggle rotation
});

document.getElementById("scaleButton").addEventListener("click", function () {
    cube.scale.set(scaleFactor, scaleFactor, scaleFactor);
});

document.getElementById("resetButton").addEventListener("click", function () {
    cube.rotation.set(0, 0, 0); // Reset rotation
    cube.scale.set(1, 1, 1); // Reset scale
});
