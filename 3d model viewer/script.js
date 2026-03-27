// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Set up renderer
renderer.setSize(document.getElementById('model-container').offsetWidth, document.getElementById('model-container').offsetHeight);
renderer.setClearColor(0x000000, 0);
document.getElementById('model-container').appendChild(renderer.domElement);

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// Add orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Create a simple cube as a placeholder
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ 
    color: 0x4a90e2,
    shininess: 100,
    specular: 0x444444
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position camera
camera.position.z = 5;

// Handle window resize
window.addEventListener('resize', () => {
    const container = document.getElementById('model-container');
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Add button controls
document.getElementById('rotate-left').addEventListener('click', () => {
    cube.rotation.y -= Math.PI / 4;
});

document.getElementById('rotate-right').addEventListener('click', () => {
    cube.rotation.y += Math.PI / 4;
});

document.getElementById('zoom-in').addEventListener('click', () => {
    camera.position.z = Math.max(2, camera.position.z - 0.5);
});

document.getElementById('zoom-out').addEventListener('click', () => {
    camera.position.z = Math.min(10, camera.position.z + 0.5);
}); 