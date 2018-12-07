//===================================================CREATING OBJECTS========================================== 
const centerPoint = new THREE.Vector3(0, 0, 0);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

const geometryPlaneLeft = new THREE.PlaneGeometry(5, 5, 4);
const materialPlaneLeft = new THREE.MeshBasicMaterial({ color: 0x741B47, side: THREE.DoubleSide });
const planeLeft = new THREE.Mesh(geometryPlaneLeft, materialPlaneLeft);
planeLeft.rotation.x = 360;
planeLeft.translateOnAxis(new THREE.Vector3(-1, 0.5, 0.25), 3);
scene.add(planeLeft);

const geometryPlaneRight = new THREE.PlaneGeometry(5, 5, 4);
const materialPlaneRight = new THREE.MeshBasicMaterial({ color: 0xC27BA0, side: THREE.DoubleSide });
const planeRight = new THREE.Mesh(geometryPlaneRight, materialPlaneRight);
planeRight.rotation.x = 360;
planeRight.translateOnAxis(new THREE.Vector3(1, 0.5, 0.25), 3);
scene.add(planeRight);

//========================================================VARIABLES========================================== 

//platform boolean
let activeR = false;
let activeL = false;

// booleans for enemies
let isThereLeft = false;
let isThereRight = false;
let newCubeR = new THREE.MeshBasicMaterial(geometry, material);
let newCubeL = new THREE.MeshBasicMaterial(geometry, material);

let health = 100;
let score = 0

const geometryPlayer = new THREE.BoxGeometry(1.5, 0.1, 0.05);
const materialPlayer = new THREE.MeshBasicMaterial({ color: 0x522C04 });
const cubePlayer = new THREE.Mesh(geometryPlayer, materialPlayer);
cubePlayer.position.set(1, -0.5, 4);

//===================================================PLAYER MOVEMENT========================================== 

window.addEventListener('keydown', function (e) {
  if (e.key == 'ArrowLeft' && activeL === false) {
    e.preventDefault();
    cubePlayer.position.set(-1, -0.5, 4);
    checkPlane();
    activeR = false;
    activeL = true;

  }
  else if (e.key == 'ArrowRight' && activeR === false) {
    e.preventDefault();
    cubePlayer.position.set(1, -0.5, 4);
    checkPlane();
    activeR = true;
    activeL = false;
  }
});

const checkPlane = () => {
  if (activeR === true) {
    planeRight.material = new THREE.MeshBasicMaterial({ color: 0x741B47, side: THREE.DoubleSide });
    planeLeft.material = new THREE.MeshBasicMaterial({ color: 0xC27BA0, side: THREE.DoubleSide });
  }
  else if (activeR == false) {

    planeLeft.material = new THREE.MeshBasicMaterial({ color: 0x741B47, side: THREE.DoubleSide });
    planeRight.material = new THREE.MeshBasicMaterial({ color: 0xC27BA0, side: THREE.DoubleSide });
  }
}
scene.add(cubePlayer);

camera.position.z = 5;

//===================================================CLONING SQUARES========================================== 

const randomColor = () => {
  const hexValue = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];  //Hexadecimal goes up to 0-9 the A-F
  let hexColor = "#";
  for (let i = 0; i < 6; i++) { //loops 6 times
    hexColor += hexValue[(Math.floor(Math.random() * 16))];
  }
  return hexColor.toString();
}

const deleteCube = (cube) => {
  scene.remove(cube)
  cube.geometry.dispose();
  cube.material.dispose();
}

const instantiateCubeLeft = () => {
  if (!isThereLeft) {
    let clonedCube = cube.clone();
    clonedCube.position.x = -1;
    clonedCube.position.y = 0;
    clonedCube.position.z = 0;
    clonedCube.material = new THREE.MeshBasicMaterial({ color: randomColor() });
    newCubeL = clonedCube;
    scene.add(clonedCube);
    isThereLeft = true
  }
}

const instantiateCubeRight = () => {
  if (!isThereRight) {
    let clonedCube = cube.clone();
    clonedCube.position.x = 1;
    clonedCube.position.y = 0;
    clonedCube.position.z = 0;
    clonedCube.material = new THREE.MeshBasicMaterial({ color: randomColor() });
    newCubeR = clonedCube;
    scene.add(clonedCube);
    isThereRight = true
  }
}

setInterval(() => {
  let randomNum = Math.ceil(Math.random() * 10);
  for (let i = 0; i < 10; i++) {
    if (randomNum >= 0 && randomNum < 5) {
      instantiateCubeLeft()
    }
    else if (randomNum >= 5 && randomNum < 10) {
      instantiateCubeRight()
    }
  }
}, 1000)

//===================================================MOVEMENT CLONES========================================== 

const MovementR = () => {
  if (newCubeR.position.z < 6) {
    let zValue = + 0.05;
    newCubeR.translateZ(zValue);
    isThereRight = true;
    if (newCubeR.position.z >= 3.2 && newCubeR.position.z <= 4 && activeR === true) {
      health -= 1;
      const hitSound = new THREE.AudioListener();
    }
    else if (newCubeR.position.z >= 3.2 && newCubeR.position.z <= 4 && activeL === true) {
      score += 10;
    }
  }
  else if (newCubeR.position.z >= 6) {
    isThereRight = false;
  }
}

const MovementL = () => {
  if (newCubeL.position.z < 6) {
    let zValue = + 0.05;
    newCubeL.translateZ(zValue);
    isThereRight = true;
    if (newCubeL.position.z >= 3.2 && newCubeL.position.z <= 4 && activeL === true) {
      health -= 1;
    }
    else if (newCubeL.position.z >= 3.2 && newCubeL.position.z <= 4 && activeR === true) {
      score += 10;
    }
  }
  else if (newCubeL.position.z >= 6) {
    isThereLeft = false;
  }
}

//===================================================SCORE & HEALTH========================================== 

const showPoints = () => {
  const text2 = document.createElement('div');
  text2.style.position = 'absolute';
  //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
  text2.style.width = 200;
  text2.style.height = 200;
  text2.style.backgroundColor = "blue";
  text2.innerHTML = "Score: " + score + " Health: " + health;
  text2.style.top = 200 + 'px';
  text2.style.left = 200 + 'px';
  document.body.appendChild(text2);
}

//===================================================ANIMATE & RENDER========================================== 

const listener = new THREE.AudioListener();
camera.add(listener);
const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load('/Assets/ModernClassica_Circle_styled.flac', function (buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
  sound.play();
});

const animate = () => {
  requestAnimationFrame(animate);
  MovementR();
  MovementL();
  showPoints();
  console.log("score" + score + " Health" + health);
  if (health <= 0) {
    window.history.go(-1);
  }
  renderer.render(scene, camera);
};

animate();
