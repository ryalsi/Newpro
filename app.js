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

// Position the camera
camera.position.z = 5;

// Create a default light
const light = new THREE.AmbientLight(0x404040, 1); // Ambient light
scene.add(light);

// Handle file input for loading models
const fileInput = document.getElementById('fileInput');
const loadModelButton = document.getElementById('loadModelButton');
let loadedModel = null;

// Set up GLTFLoader
const loader = new THREE.GLTFLoader();

// Function to handle model loading
function loadModel(file) {
    // Read the file and load it using GLTFLoader
    const reader = new FileReader();
    reader.onload = function (event) {
        const contents = event.target.result;
        loader.parse(contents, '', function (gltf) {
            if (loadedModel) {
                scene.remove(loadedModel); // Remove any existing model
            }
            loadedModel = gltf.scene;
            scene.add(loadedModel);
        }, function (error) {
            console.error('Error loading model', error);
        });
    };
    reader.readAsArrayBuffer(file);
}

// Open file dialog when button is clicked
loadModelButton.addEventListener("click", function() {
    fileInput.click();
});

// Load the selected model when a file is chosen
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        loadModel(file);
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    controls.update(); // Update controls
    renderer.render(scene, camera);
}
animate();
