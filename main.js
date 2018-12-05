///=============================================SETUP OF SCREEN===================================================
let activeR, activeL = false;
const centerPoint = new THREE.Vector3(0, 0, 0);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

//==========================================BOX CREATION===========================================================
const geometry = new THREE.BoxGeometry(1, 1, 0.75);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

const intialSetCube = [];
const cubesOnScreen = [];

for (let i = 0; i < 10; i++) {
  cube.position.x = -1;
  cube.position.y = 0;
  cube.position.z = 1;
  intialSetCube.push(cube);
}

//==================================================================================================================


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

camera.position.z = 5;

//================================================PLAYER GEOMETRY=================================================
const geometryPlayer = new THREE.BoxGeometry(1.5, 0.1, 0.05);
const materialPlayer = new THREE.MeshBasicMaterial({ color: 0x522C04 });
const cubePlayer = new THREE.Mesh(geometryPlayer, materialPlayer);
//cubePlayer.translateOnAxis(new THREE.Vector3(-0.275, -0.07, 1.538), 3);

window.addEventListener('keydown', function (e) {
  if (e.key == 'ArrowLeft' && activeL === false) {
    console.log("left button presses");
    e.preventDefault();
    cubePlayer.position.set(-1, -0.5, 4);
    checkPlane();
    // planeLeft.material = new THREE.MeshBasicMaterial({ color: 0x741B47, side: THREE.DoubleSide });
    activeR = false;
    activeL = true;

  }
  else if (e.key == 'ArrowRight' && activeR === false) {
    console.log("right button pressed");
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

///=============================================INSTANTIATION===================================================

const randomColor = () => {
  const hexValue = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];  //Hexadecimal goes up to 0-9 the A-F
  let hexColor = "#";
  for (let i = 0; i < 6; i++) { //loops 6 times
    hexColor += hexValue[(Math.floor(Math.random() * 16))];
  }
  return hexColor.toString();
};

const instantiateCubeLeft = () => {
  intialSetCube[0].position.x = -1;
  intialSetCube[0].material = new THREE.MeshBasicMaterial({ color: randomColor() });
  cubesOnScreen.push(intialSetCube[0]);
}

const instantiateCubeRight = () => {
  intialSetCube[0].position.x = 1;
  intialSetCube[0].material = new THREE.MeshBasicMaterial({ color: randomColor() });
  cubesOnScreen.push(intialSetCube[0]);
}
setInterval(() => {
  let randomNum = Math.ceil(Math.random() * 10);
  console.log(randomNum);
  for (let i = 0; i < intialSetCube.length; i++) {

    /*
    * Params for left/right
    * @boolean left = true
    * @boolean right = false
    */

    if (randomNum >= 0 && randomNum < 5) {
      instantiateCubeLeft()
      scene.add(cubesOnScreen[i]);
      //  console.log("left");
    }
    else if (randomNum >= 5 && randomNum <= 10) {
      instantiateCubeRight()
      scene.add(cubesOnScreen[i]);
      //  console.log("right");

    }
  }
}, 10000)



const Movement = () => {
  if (cubesOnScreen[0].position.z < 3) {
    console.log("clone " + cubesOnScreen[0] + "is moving");
    let zValue = + 0.001;
    cubesOnScreen[0].translateZ(zValue);
  }
  else if (cubesOnScreen[0].position.z >= 3) {
    cubesOnScreen.pop(0);
    console.log("deleted cube");

  }

}
const animate = () => {
  requestAnimationFrame(animate);
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;
  Movement();
  renderer.render(scene, camera);
};

// if (currentCube.position.z <
//  3.2) {

//    //currentCube.position.z += 0.01
//  }
// else if (currentCube.position.z > 3.2) {
//  scene.remove(currentCube);

//}

animate();
    ///=============================================PLAYER CONTROLS===================================================


// const checkSquare = () => {
//   let currentSquare = instantiateCubeLeft();
//   if (currentSquare.position.z == 3) {
//     scene.remove(currentSquare);
//   }

// }



// Tuesday

// Player - movability between two lanes (based on keystroke (left/right))
// Played - 3D-fied

// Enemy - Remove when condition met (z.axis?) or collision (with player)?

// Planes - into infinity? EXTRA

// EXTRAS

// Create array with 10 test words
// Player - change lane if input === word
// Player - change word if input !== word
// Player - add score

// ======================
// API Fetch - dictionary 



