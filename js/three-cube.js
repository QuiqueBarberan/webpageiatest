// Inicializa la escena del cubo cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cube-container');
    if (!container) {
        console.warn('three-cube: no se encontró el elemento #cube-container. Nada que inicializar.');
        return;
    }

    if (typeof THREE === 'undefined') {
        console.error('three-cube: THREE no está definido. Asegúrate de incluir three.js antes de este script.');
        return;
    }

    if (typeof THREE.OrbitControls === 'undefined') {
        if (typeof OrbitControls !== 'undefined') {
            THREE.OrbitControls = OrbitControls; // intentar adjuntar si el bundle expone OrbitControls global
        } else {
            console.warn('three-cube: OrbitControls no encontrado. Los controles no estarán disponibles.');
        }
    }

    // Escena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Dimensiones
    const HEIGHT = 300; // altura fija del contenedor
    const WIDTH = Math.max(container.clientWidth, 100);

    // Cámara
    const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    renderer.setSize(WIDTH, HEIGHT);
    container.appendChild(renderer.domElement);

    // Geometría y Material del Cubo
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x007bff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 0);
    scene.add(directionalLight);

    // Controles (si están disponibles)
    let controls = null;
    if (THREE.OrbitControls) {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 3;
        controls.maxDistance = 10;
    }

    // Animación
    function animate() {
        requestAnimationFrame(animate);
        if (controls) controls.update();
        renderer.render(scene, camera);
    }

    animate();

    // Manejo del redimensionamiento
    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        const width = Math.max(container.clientWidth, 100);
        const height = HEIGHT;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }
});
