// Basic Three.js Setup
let scene, camera, renderer;
let model; // To store the loaded 3D model

// Initialize Three.js scene
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, 500);
  document.getElementById('viewer').appendChild(renderer.domElement);

  // Add a simple light
  const light = new THREE.AmbientLight(0x404040); // Ambient light
  scene.add(light);

  // Position the camera
  camera.position.z = 5;

  // Start the animation loop
  animate();
}

// Render loop
function animate() {
  requestAnimationFrame(animate);
  if (model) {
    model.rotation.x += 0.01;
    model.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}

// Handle file upload and 3D model loading
document.getElementById('fileInput').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const fileExtension = file.name.split('.').pop().toLowerCase();
  const reader = new FileReader();

  reader.onload = function(e) {
    const content = e.target.result;

    // Remove any existing model in the scene
    if (model) {
      scene.remove(model);
    }

    // Load the model based on its extension
    load3DModel(fileExtension, content);
  };

  // Read the file as binary
  reader.readAsArrayBuffer(file);
}

function load3DModel(extension, content) {
  const loaderMap = {
    'glb': new THREE.GLTFLoader(),
    'gltf': new THREE.GLTFLoader(),
    'obj': new THREE.OBJLoader(),
    'stl': new THREE.STLLoader(),
  };

  const loader = loaderMap[extension];

  if (loader) {
    if (extension === 'obj') {
      loader.load(content, function(obj) {
        model = obj;
        scene.add(model);
      });
    } else if (extension === 'stl') {
      const geometry = loader.parse(content);
      const material = new THREE.MeshStandardMaterial({ color: 0x999999 });
      model = new THREE.Mesh(geometry, material);
      scene.add(model);
    } else {
      loader.parse(content, function(gltf) {
        model = gltf.scene;
        scene.add(model);
      });
    }
  } else {
    alert("Unsupported file format.");
  }
}

// Initialize the scene when the page is ready
init();
