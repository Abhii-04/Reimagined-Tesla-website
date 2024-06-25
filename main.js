import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
const loader = new GLTFLoader();
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { PMREMGenerator } from 'three';

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;


//lighting
const hdriLoader = new RGBELoader();
const pmremGenerator = new THREE.PMREMGenerator(renderer)
hdriLoader.load('Public/road.hdr', (texture) => {

    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    texture.dispose();
    scene.environment = envMap;
    console.log("HDRI loading complete.")
}, (err) => {
    console.error('An error occurred loading the HDRI:', err);
});;

document.getElementById('Model').appendChild(renderer.domElement);

var gltfModel;

Promise.all([
    new Promise((resolve) => loader.load('Public/ModelX/scene.gltf', resolve, null, (err) => console.error(err))),
    new Promise((resolve) => loader.load('Public/CyberTruck/scene.gltf', resolve, null, (err) => console.error(err))),
    new Promise((resolve) => loader.load('Public/Roadster/scene.gltf', resolve, null, (err) => console.error(err))),
]).then((loadedModels) => {
    // Store loaded models in the gltfModels object
    loader.model1 = loadedModels[0].scene;
    loader.model2 = loadedModels[1].scene;
    loader.model3 = loadedModels[2].scene;
    scene.add(loader.model1);
    gltfModel = loader.model1;})
  
// Ambient light
const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4); // Soft white ambient light
scene.add(ambientLight);

// Directional light (simulates sunlight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(100, 100, 0); // Position the light slightly above and to the side
scene.add(directionalLight);
directionalLight.castShadow = true;

camera.position.z = 700;
camera.position.x = 50;
camera.position.y = 50;

function animate() {
    camera.lookAt(new THREE.Vector3(0,0,0));
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

renderer.domElement.addEventListener('wheel', onScroll, false);

function onScroll(event) {
    const scrollAmount = event.deltaY * 0.0015;
    gltfModel.rotation.y -= scrollAmount;
}

function changeModel(change) {
    if (change==1) {
        scene.clear();
        scene.add(loader.model1);
        gltfModel=loader.model1;
    } else if (change==2) {
        //cybertruck
        scene.clear();
        loader.model2.scale.set(30, 30,30);
        scene.add(loader.model2);
        gltfModel = loader.model2;
    } else {
        //roadster
        scene.clear();
        loader.model3.scale.set(42, 42, 42);
        scene.add(loader.model3);
        gltfModel = loader.model3;
    }
}

window.changeModel = changeModel