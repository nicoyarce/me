import "./style.css";
import * as THREE from "three";
import backgroundFile from "./background.jpg";
import pictureFile from "./nico.jpg";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setX(-3);
camera.position.setZ(30);

const geometry1 = new THREE.IcosahedronGeometry(1);
const material1 = new THREE.MeshStandardMaterial({
    color: 0x165654,
    // wireframe: true,
});
const figure1 = new THREE.Mesh(geometry1, material1);
figure1.position.set(3, 0.5, 1);
scene.add(figure1);

const geometry2 = new THREE.OctahedronGeometry(1);
const material2 = new THREE.MeshStandardMaterial({
    color: 0x8fc992,
});
const figure2 = new THREE.Mesh(geometry2, material2);
figure2.position.set(-3, -1, -4);
scene.add(figure2);

const geometry3 = new THREE.TetrahedronGeometry(1);
const material3 = new THREE.MeshStandardMaterial({
    color: 0x03428c,
});
const figure3 = new THREE.Mesh(geometry3, material3);
figure3.position.set(-2, -1, 2);
scene.add(figure3);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0.5, 0, 1);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 200);
// const cameraHelper = new THREE.CameraHelper(camera);
// scene.add(lightHelper, gridHelper, cameraHelper);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}
Array(200).fill().forEach(addStar);

function reloadBackground() {
    const background = new THREE.TextureLoader().load(
        backgroundFile,
        function (tex) {
            // tex and texture are the same in this example, but that might not always be the case
            const targetAspect = window.innerWidth / window.innerHeight;
            const imageAspect =
                tex.image.naturalWidth / tex.image.naturalHeight;
            const factor = imageAspect / targetAspect;
            // When factor larger than 1, that means texture 'wilder' than target。
            // we should scale texture height to target height and then 'map' the center  of texture to target， and vice versa.
            scene.background.offset.x = factor > 1 ? (1 - 1 / factor) / 2 : 0;
            scene.background.repeat.x = factor > 1 ? 1 / factor : 1;
            scene.background.offset.y = factor > 1 ? 0 : (1 - factor) / 2;
            scene.background.repeat.y = factor > 1 ? 1 : factor;
        }
    );
    scene.background = background;
}
reloadBackground();

const foto = new THREE.TextureLoader().load(pictureFile);
const nico = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 0.09),
    new THREE.MeshBasicMaterial({ map: foto })
);
nico.position.set(1, 1, -2.5);
nico.rotation.set(0, -0.4, 0);
scene.add(nico);

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t * -0.005;
    camera.position.x = t * -0.001;
    camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

function animate() {
    requestAnimationFrame(animate);
    figure1.rotation.x += 0.001;
    figure1.rotation.y += 0.001;
    figure1.rotation.z += 0.001;

    figure2.rotation.y += 0.005;

    figure3.rotation.x -= 0.001;
    figure3.rotation.y -= 0.001;
    figure3.rotation.z -= 0.001;

    renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    reloadBackground();
}

animate();
