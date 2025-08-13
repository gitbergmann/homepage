import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function main() {
    const group = new THREE.Group();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    let rotate = true; // auto rotate

    /**
     * Set up renderer.
     */
    function initRenderer(): void {
        renderer.setSize(300, 300);
        renderer.setAnimationLoop(animate);
        const container = document.getElementById('cube');
        container?.appendChild(renderer.domElement);
    }

    /**
     * Set up all the small cubes
     * that make up the big cube.
     */
    function initCubes(): void {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const offset = 0.02;
        const center_offset = 1.02;

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                for (let z = 0; z < 3; z++) {
                    const materials = [
                        new THREE.MeshStandardMaterial({ color: 2 === x ? "hotpink" : "black" }), // right 
                        new THREE.MeshStandardMaterial({ color: 0 === x ? "orange" : "black" }), // left 
                        new THREE.MeshStandardMaterial({ color: 2 === y ? "beige" : "black" }), // top
                        new THREE.MeshStandardMaterial({ color: 0 === y ? "yellow" : "black" }), // bottom
                        new THREE.MeshStandardMaterial({ color: 2 === z ? "green" : "black" }), // front 
                        new THREE.MeshStandardMaterial({ color: 0 === z ? "blue" : "black" }), // back
                    ];

                    const cube = new THREE.Mesh(geometry, materials);
                    cube.position.set(x + x * offset - center_offset, y + y * offset - center_offset, z + z * offset - center_offset)
                    group.add(cube);
                }
            }
        }
        scene.add(group);
    }

    /**
     * Set up ambient, spot and point lights.
     */
    function initLights(): void {
        const ambientLight = new THREE.AmbientLight('white', Math.PI / 2);
        const spotLight = new THREE.SpotLight("white", Math.PI, 0, 0.15, 1, 0);
        const pointLight = new THREE.PointLight('white', Math.PI, 0, 0);
        spotLight.position.set(10, 10, 10);
        pointLight.position.set(-10, -10, - 10);
        scene.add(ambientLight, pointLight, spotLight);
    }


    /**
     * Render and rotate the cube.
     */
    function animate(): void {
        if (rotate) {
            group.rotation.x += 0.01;
            group.rotation.y += 0.01;
        }

        renderer.render(scene, camera);
    }

    /**
     * Set up orbit controls,
     * and stop auto rotation on user interaction.
     * 
     * @param camera 
     * @param domElement 
     */
    function initControls(domElement: HTMLElement): void {
        const controls = new OrbitControls(camera, domElement);

        // Stop auto rotation on user control
        controls.addEventListener('start', () => {
            rotate = false;
        });
        controls.addEventListener('end', () => {
            rotate = true;
        });
    }

    /**
     * Init.
     */
    function init(): void {
        camera.position.z = 5;

        initRenderer();
        initCubes();
        initLights();
        initControls(renderer.domElement)
    }
    init();
}
main();