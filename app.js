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
let cube = new THREE.Mesh(geometry, material);
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

// Functions to add complex 3D objects
function addSphere() {
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(2, 0, 0); // Position the sphere to the right of the cube
    scene.add(sphere);
}

function addCone() {
    const coneGeometry = new THREE.ConeGeometry(1, 2, 32);
    const coneMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.set(-2, 0, 0); // Position the cone to the left of the cube
    scene.add(cone);
}

function addTorus() {
    const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(0, 2, 0); // Position the torus above the cube
    scene.add(torus);
}

// Event listeners for adding complex 3D objects
document.getElementById("addSphereButton").addEventListener("click", addSphere);
document.getElementById("addConeButton").addEventListener("click", addCone);
document.getElementById("addTorusButton").addEventListener("click", addTorus);
