/// MAIN SCREEN 
const centerPoint = new THREE.Vector3(0, 0, 0);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const geometryPlane = new THREE.PlaneGeometry(5, 5, 4);
const materialPlane = new THREE.MeshBasicMaterial({ color: 0x741B47, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometryPlane, materialPlane);
plane.rotation.x = 360;
plane.translateOnAxis(new THREE.Vector3(-1, 0.5, 0.25), 3);
scene.add(plane);

const geometryPlane2 = new THREE.PlaneGeometry(5, 5, 4);
const materialPlane2 = new THREE.MeshBasicMaterial({ color: 0xC27BA0, side: THREE.DoubleSide });
const plane2 = new THREE.Mesh(geometryPlane2, materialPlane2);
plane2.rotation.x = 360;
plane2.translateOnAxis(new THREE.Vector3(1, 0.5, 0.25), 3);
scene.add(plane2);

// cube.position.copy(geometry);
// cube.quaternion.copy(geometry);
// cube.matrixAutoUpdate = false;




camera.position.z = 5;

const animate = () => {
  requestAnimationFrame(animate);
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;
  renderer.render(scene, camera);
};


const randomColor = () => {
  const hexValue = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];  //Hexadecimal goes up to 0-9 the A-F
  let hexColor = "#";
  for (let i = 0; i < 6; i++) { //loops 6 times
    hexColor += hexValue[(Math.floor(Math.random() * 16))];
  }
  return hexColor.toString();
};


const instantiateCubeLeft = () => {
  let clonedCube = cube.clone();
  clonedCube.position.x = -1;
  clonedCube.position.y = 0;
  clonedCube.position.z = 3.2;
  clonedCube.material = new THREE.MeshBasicMaterial({ color: randomColor() });
  scene.add(clonedCube);

}

const instantiateCubeRight = () => {
  let clonedCube = cube.clone();
  clonedCube.position.x = 1;
  clonedCube.position.y = 0;
  clonedCube.position.z = 3.2;
  clonedCube.material = new THREE.MeshBasicMaterial({ color: randomColor() });
  scene.add(clonedCube);

}

setInterval(() => {
  let randomNum = Math.ceil(Math.random() * 10);
  console.log(randomNum);
  for (let i = 0; i < 10; i++) {

    let j = 5;

    if (randomNum >= 0 && randomNum < 5) {
      instantiateCubeLeft()
      console.log("left");
    }
    else if (randomNum >= 5 && randomNum < 10) {
      instantiateCubeRight()
      console.log("right");
    }
    j--
  }

}, 1000)





// const checkSquare = () => {
//   let currentSquare = instantiateCubeLeft();
//   if (currentSquare.position.z == 3) {
//     scene.remove(currentSquare);
//   }

// }


// var animate = function () {
//   var quaternion = new THREE.Quaternion();
//   quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

//   var vector = new THREE.Vector3(1, 0, 0);
//   vector.applyQuaternion(quaternion);
//   cube.quaternion.slerp(endQuaternion, 0.01);
// };

animate();

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

