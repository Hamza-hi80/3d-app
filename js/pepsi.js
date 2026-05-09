var scene, camera, renderer, clock, mixer, actions = [], mode, model;

init();

function init() {
  const assetPath = './';

  clock = new THREE.Clock();

  // Canvas
  const canvas = document.getElementById('threeContainer');

  // Create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x004B93);

  // Set up the camera
  camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.set(0, 1.5, 4);

  // Add lighting
  const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xFFFFFF, 2);
  light.position.set(0, 10, 2);
  scene.add(light);

  // Set up the renderer
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  // Add OrbitControls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1, 0);
  controls.enablePan = false;
  controls.update();

  // Pop cap button
  mode = 'closed';
  const btn = document.getElementById('btn');
  btn.addEventListener('click', function() {
    if (actions.length > 0) {
      actions.forEach(function(action) {
        action.timeScale = 1;
        action.reset();
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
        action.play();
      });
    }
  });

  // Wireframe toggle
  const btnWire = document.getElementById('btnWire');
  btnWire.addEventListener('click', function() {
    if (model) {
      model.traverse(function(child) {
        if (child.isMesh && child.material) {
          child.material.wireframe = !child.material.wireframe;
        }
      });
    }
  });

  // Lighting toggle
  let lightMode = 0;
  const btnLight = document.getElementById('btnLight');
  btnLight.addEventListener('click', function() {
    lightMode = (lightMode + 1) % 3;
    if (lightMode === 0) {
      ambient.intensity = 1;
      light.intensity = 2;
    } else if (lightMode === 1) {
      ambient.intensity = 0.3;
      light.intensity = 4;
    } else {
      ambient.intensity = 1.5;
      light.intensity = 0.5;
    }
  });

  // Load the glTF model
  const loader = new THREE.GLTFLoader();
  loader.load(assetPath + 'assets/models/pepsi_bottle.glb', function(gltf) {
    model = gltf.scene;
    scene.add(model);

    // Set up animations
    mixer = new THREE.AnimationMixer(model);
    const animations = gltf.animations;

    animations.forEach(function(clip) {
      const action = mixer.clipAction(clip);
      actions.push(action);
    });
  });

  // Handle resizing
  window.addEventListener('resize', resize, false);

  // Start the animation loop
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  if (mixer) {
    mixer.update(clock.getDelta());
  }
  renderer.render(scene, camera);
}

function resize() {
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
}
