let scene, camera, renderer, model;
let loaderMap = {
  'glb': new THREE.GLTFLoader(),
  'gltf': new THREE.GLTFLoader(),
  'obj': new THREE.OBJLoader(),
  'stl': new THREE.STLLoader(),
};

// Initialize the Three.js scene
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, 500);
  document.getElementById('viewer').appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  // Camera position and controls
  camera.position.z = 3;

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

// Handle file upload and model loading
document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const fileExtension = file.name.split('.').pop().toLowerCase();
  const reader = new FileReader();

  reader.onload = function(e) {
    const content = e.target.result;

    // Remove any previous model from the scene
    if (model) {
      scene.remove(model);
    }

    // Load the model based on its extension
    load3DModel(fileExtension, content);
  };

  reader.readAsArrayBuffer(file); // Read file as binary data
});

// Load the 3D model based on its file type
function load3DModel(extension, content) {
  const loader = loaderMap[extension];

  if (!loader) {
    alert("Unsupported file format");
    return;
  }

  if (extension === 'obj') {
    loader.load(
      URL.createObjectURL(new Blob([content])),
      function(obj) {
        model = obj;
        model.scale.set(0.5, 0.5, 0.5); // Scale the model for visibility
        model.position.set(0, 0, 0); // Center the model
        scene.add(model);
      },
      undefined,
      function(error) {
        console.error('Error loading OBJ model:', error);
      }
    );
  } else if (extension === 'stl') {
    const geometry = loader.parse(content);
    const material = new THREE.MeshStandardMaterial({ color: 0x999999 });
    model = new THREE.Mesh(geometry, material);
    model.scale.set(0.5, 0.5, 0.5); // Scale the model for visibility
    model.position.set(0, 0, 0); // Center the model
    scene.add(model);
  } else {
    loader.parse(content, function(gltf) {
      model = gltf.scene;
      model.scale.set(0.5, 0.5, 0.5); // Scale the model for visibility
      model.position.set(0, 0, 0); // Center the model
      scene.add(model);
    }, undefined, function(error) {
      console.error('Error loading glTF model:', error);
    });
  }
}

// Initialize the scene
init();
