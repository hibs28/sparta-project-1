/// MAIN SCREEN 

const centerPoint = new THREE.Vector3(0, 0, 0);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const geometryPlane = new THREE.PlaneGeometry(5, 5, 4);
const materialPlane = new THREE.MeshBasicMaterial({ color: 0x741B47, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometryPlane, materialPlane);
plane.rotation.x = 360;
plane.translateOnAxis(new THREE.Vector3(-1, 0.5, 0), 3);
scene.add(plane);

const geometryPlane2 = new THREE.PlaneGeometry(5, 5, 4);
const materialPlane2 = new THREE.MeshBasicMaterial({ color: 0xC27BA0, side: THREE.DoubleSide });
const plane2 = new THREE.Mesh(geometryPlane2, materialPlane2);
plane2.rotation.x = 360;
plane2.translateOnAxis(new THREE.Vector3(1, 0.5, 0), 3);
scene.add(plane2);


// cube.position.copy(geometry);
// cube.quaternion.copy(geometry);
// cube.matrixAutoUpdate = false;




camera.position.z = 5;

const animate = () => {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
};


for (let i = 0; i < 10; i++) {
  let clonedCube = cube.clone();

  clonedCube.position.x = Math.random() * -6;
  clonedCube.position.y = Math.random() * 2;
  clonedCube.position.z = Math.random() * -3;
  scene.add(clonedCube);

}




// var animate = function () {
//   var quaternion = new THREE.Quaternion();
//   quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

//   var vector = new THREE.Vector3(1, 0, 0);
//   vector.applyQuaternion(quaternion);
//   cube.quaternion.slerp(endQuaternion, 0.01);
// };

animate();
