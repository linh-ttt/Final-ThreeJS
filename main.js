import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';
import { AudioLoader, AudioListener, Audio } from 'three';

let scene, camera, renderer, controls;

function init() {
    // Text
    const textloader = new FontLoader();
    textloader.load('Oswald_Bold.json', (droidFont)=>{
        const geometry = new TextGeometry('ART GALLERY',{
            font: droidFont,
            size:3,
            height:0.5,
        });
        const textMaterial = new THREE.MeshPhongMaterial({ color: 0x000000});
        const textMesh = new THREE.Mesh(geometry, textMaterial);
        textMesh.castShadow=true;
        textMesh.position.y +=10;
        textMesh.position.z = 70;
        textMesh.position.x =1;
        textMesh.rotation.y = Math.PI/2;
        scene.add(textMesh);
    });
    const text2loader = new FontLoader();
    text2loader.load('Oswald_Bold.json', (droidFont)=>{
        const geometry = new TextGeometry('Van Gogh',{
            font: droidFont,
            size:2,
            height:0.5,
        });
        const text2Material = new THREE.MeshPhongMaterial({ color: 0x000000});
        const text2Mesh = new THREE.Mesh(geometry, text2Material);
        text2Mesh.castShadow=true;
        text2Mesh.position.y +=5;
        text2Mesh.position.z = 70;
        text2Mesh.position.x =1;
        text2Mesh.rotation.y = Math.PI/2;
        scene.add(text2Mesh);
    });

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x5C5C5C);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(30, 3, 80);
    camera.lookAt(0,5,0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    

    const TextureLoader = new THREE.TextureLoader();
    // Create the floor
    const floorTexture = TextureLoader.load('assets/textures/floor.jpg');
    const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });  // Brown color
    const floorGeometry = new THREE.PlaneGeometry(80, 150);
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.set(0,-15,0);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Create the walls
    const wallMaterial = new THREE.MeshStandardMaterial({color: 0xD3D3D3 });
    
    // Back wall
    const backWallTexture = new THREE.TextureLoader().load('assets/textures/wallBack.JPG'); 
    const backWallGeometry = new THREE.PlaneGeometry(80, 35);  
    const backWallMaterial = new THREE.MeshStandardMaterial({ map: backWallTexture }); 
    const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
    backWall.position.set(0, 2.5, -75);  // Position correctly behind the floor
    scene.add(backWall);

     // Left wall
     const leftWallGeometry = new THREE.PlaneGeometry(150, 35);
     const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
     leftWall.rotation.y = Math.PI / 2;
     leftWall.position.set(-40, 2.5, 0);
     scene.add(leftWall);
 
     // Right wall
     const rightWallGeometry = new THREE.PlaneGeometry(150, 35);
     const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
     rightWall.rotation.y = -Math.PI / 2;
     rightWall.position.set(40, 2.5, 0);
     scene.add(rightWall);

    // Ceiling
    const ceilingTexture = TextureLoader.load('assets/textures/ceiling.jpg');
    const ceilingMaterial = new THREE.MeshStandardMaterial({ map: ceilingTexture });  
    const ceilingGeometry = new THREE.PlaneGeometry(80, 150);  // Match floor geometry
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 20;  // Position the ceiling at height 10
    scene.add(ceiling);

// tạo cột dọc trên trần nhà
    function createCylinder(xPos) {
        const geometry = new THREE.CylinderGeometry(0.2, 0.2, 150, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0xD3D3D3 });
        const cylinder = new THREE.Mesh(geometry, material);
        cylinder.rotation.x = Math.PI / 2;
        cylinder.position.set(xPos, 20, 0);
        scene.add(cylinder);
    }
    
    createCylinder(30); // Cylinder thứ nhất
    createCylinder(10); // Cylinder thứ hai
    createCylinder(-10); // Cylinder thứ ba
    createCylinder(-30); // Cylinder thứ tư
    
    

// Tạo ghế không tựa thứ nhất
const chairWidth = 5;
const chairHeight = 0.5;
const chairDepth = 15;

const chairGeometry = new THREE.BoxGeometry(chairWidth, chairHeight, chairDepth);
const chairMaterial = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('assets/textures/chair.jpg') });
const chair = new THREE.Mesh(chairGeometry, chairMaterial);
chair.position.set(15,-12,5)
scene.add(chair);

// Tạo chân ghế
const legWidth = 0.4;
const legHeight = 3;
const legDepth = 0.1;
const legTexture = new THREE.TextureLoader().load('assets/textures/leg.jpg');
const legMaterial = new THREE.MeshStandardMaterial({ map: legTexture });
const legGeometry = new THREE.BoxGeometry(legWidth, legHeight, legDepth);

const leg1 = new THREE.Mesh(legGeometry, legMaterial);
leg1.position.set(13.5, -13.5, 12);
scene.add(leg1);

const leg2 = leg1.clone();
leg2.position.set(16.5, -13.5, 12);
scene.add(leg2);

const leg3 = leg1.clone();
leg3.position.set(16.5, -13.5, -2);
scene.add(leg3);

const leg4 = leg2.clone();
leg4.position.set(13.5, -13.5, -2);
scene.add(leg4);

// Tạo chân giữa ghế
const leggWidth = 0.4;
const leggHeight = 3;
const leggDepth = 0.1;
const leggTexture = new THREE.TextureLoader().load('assets/textures/leg.jpg');
const leggMaterial = new THREE.MeshStandardMaterial({ map: leggTexture });
const leggGeometry = new THREE.BoxGeometry(leggWidth, leggHeight, leggDepth);
const legg = new THREE.Mesh(leggGeometry, leggMaterial);

legg.position.set(15, -14.8, 12);
legg.rotation.z = Math.PI / 2;
scene.add(legg);

const leg5 = legg.clone();
leg5.position.set(15, -14.8, -2);
scene.add(leg5);


// Tạo ghế không tựa thứ 2
const cWidth = 5;
const cHeight = 0.5;
const cDepth = 15;
const cGeometry = new THREE.BoxGeometry(cWidth, cHeight, cDepth);
const cMaterial = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('assets/textures/chair.jpg') });
const c = new THREE.Mesh(cGeometry, cMaterial);
c.position.set(-22.5,-12,15)
scene.add(c);

// Tạo chân ghế
const lWidth = 0.4;
const lHeight = 3;
const lDepth = 0.1;
const lTexture = new THREE.TextureLoader().load('assets/textures/leg.jpg');
const lMaterial = new THREE.MeshStandardMaterial({ map: lTexture });
const lGeometry = new THREE.BoxGeometry(lWidth, lHeight, lDepth);

const l1 = new THREE.Mesh(lGeometry, lMaterial);
l1.position.set(-21, -13.5, 22);
scene.add(l1);

const l2 = l1.clone();
l2.position.set(-24, -13.5, 22);
scene.add(l2);

const l3 = l1.clone();
l3.position.set(-24, -13.5, 8);
scene.add(l3);

const l4 = l2.clone();
l4.position.set(-21, -13.5, 8);
scene.add(l4);

// Tạo chân giữa ghế
const lgWidth = 0.4;
const lgHeight = 3;
const lgDepth = 0.1;
const lgTexture = new THREE.TextureLoader().load('assets/textures/leg.jpg');
const lgMaterial = new THREE.MeshStandardMaterial({ map: lgTexture });
const lgGeometry = new THREE.BoxGeometry(lgWidth, lgHeight, lgDepth);
const lg = new THREE.Mesh(lgGeometry, lgMaterial);

lg.position.set(-22.5, -14.8, 22);
lg.rotation.z = Math.PI / 2;
scene.add(lg);

const l5 = lg.clone();
l5.position.set(-22.5, -14.8, 8);
scene.add(l5);

//tạo ghế không tựa thứ 3
const chWidth = 5;
const chHeight = 0.5;
const chDepth = 15;
const chGeometry = new THREE.BoxGeometry(chWidth, chHeight, chDepth);
const chMaterial = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('assets/textures/chair.jpg') });
const ch = new THREE.Mesh(chGeometry, chMaterial);
ch.position.set(-27.5,-12,15)
scene.add(ch);

// Tạo chân ghế
const leWidth = 0.4;
const leHeight = 3;
const leDepth = 0.1;
const leTexture = new THREE.TextureLoader().load('assets/textures/leg.jpg');
const leMaterial = new THREE.MeshStandardMaterial({ map: leTexture });
const leGeometry = new THREE.BoxGeometry(leWidth, leHeight, leDepth);

const le1 = new THREE.Mesh(leGeometry, leMaterial);
le1.position.set(-26, -13.5, 22);
scene.add(le1);

const le2 = le1.clone();
le2.position.set(-29, -13.5, 22);
scene.add(le2);

const le3 = le1.clone();
le3.position.set(-29, -13.5, 8);
scene.add(le3);

const le4 = le2.clone();
le4.position.set(-26, -13.5, 8);
scene.add(le4);

// Tạo chân giữa ghế
const lgeWidth = 0.4;
const lgeHeight = 3;
const lgeDepth = 0.1;
const lgeTexture = new THREE.TextureLoader().load('assets/textures/leg.jpg');
const lgeMaterial = new THREE.MeshStandardMaterial({ map: lgeTexture });
const lgeGeometry = new THREE.BoxGeometry(lgeWidth, lgeHeight, lgeDepth);
const lge = new THREE.Mesh(lgeGeometry, lgeMaterial);

lge.position.set(-27.5, -14.8, 22);
lge.rotation.z = Math.PI / 2;
scene.add(lge);

const le5 = lg.clone();
le5.position.set(-27.5, -14.8, 8);
scene.add(le5);

//create pedestal
const bottomTexture = TextureLoader.load('assets/textures/bottomP.jpeg');
const topTexture = TextureLoader.load('assets/textures/topP.jpg');

const bottomPGeometry= new THREE.BoxGeometry(7, 1, 7);
const bottomPMaterial = new THREE.MeshStandardMaterial({ map: bottomTexture }); // Brown color
const bottomP = new THREE.Mesh(bottomPGeometry, bottomPMaterial);
bottomP.position.set(15, -14.5, 40); // Position the wall in front of the right side of the back wall
scene.add(bottomP);

const topPGeometry= new THREE.BoxGeometry(6, 6, 6);
const topPMaterial = new THREE.MeshStandardMaterial({ map: topTexture }); // Brown color
const topP = new THREE.Mesh(topPGeometry, topPMaterial);
topP.position.set(15, -12, 40); // Position the wall in front of the right side of the back wall
scene.add(topP);

//tạo tường phụ
function createBoxWall(width, height, depth, position, color) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ color: color });
    const wall = new THREE.Mesh(geometry, material);
    wall.position.set(...position);
    scene.add(wall);
}

createBoxWall(15, 35, 2, [32.5, 2.5, -65], 0xD3D3D3);
createBoxWall(50, 35, 2, [-15, 2.5, -65], 0xD3D3D3);
createBoxWall(2, 35, 40, [0, 2.5, -45], 0xD3D3D3);
createBoxWall(2, 35, 40, [0, 2.5, 10], 0xD3D3D3);
createBoxWall(2, 35, 30, [0, 2.5, 60], 0xD3D3D3);

//dán tranh
function createWall(width, height, texturePath, position, rotation, scale) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const texture = new THREE.TextureLoader().load(texturePath);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const wall = new THREE.Mesh(geometry, material);
    wall.rotation.y = rotation;
    wall.scale.set(scale,scale,scale);
    wall.position.set(...position);
    scene.add(wall);
}

createWall(50, 50, 'assets/textures/hv1.jpg', [-2, 3, -45], -Math.PI/2, 0.5);
createWall(25, 40, 'assets/textures/hv2.jpg', [-2, 7, 22], -Math.PI/2, 0.4);
createWall(25, 40, 'assets/textures/hv3.jpg', [-2, 7, 11], -Math.PI/2, 0.4);
createWall(25, 40, 'assets/textures/hv4.jpg', [-2, 7, 0], -Math.PI/2, 0.4);
createWall(20, 20, 'assets/textures/a.jpg', [-2, -2, 55], -Math.PI/2, 0.5);
createWall(20, 20, 'assets/textures/al.jpg', [-2, 10, 55], -Math.PI/2, 0.5);
createWall(15, 44, 'assets/textures/all.jpg', [-2, 4, 65], -Math.PI/2, 0.5);
createWall(50, 50, 'assets/textures/1.jpg', [2, 3, -45], Math.PI/2, 0.5);
createWall(25, 40, 'assets/textures/2.jpg', [2, 7, 22], Math.PI/2, 0.4);
createWall(25, 40, 'assets/textures/3.jpg', [2, 7, 11], Math.PI/2, 0.4);
createWall(25, 40, 'assets/textures/4.jpg', [2, 7, 0], Math.PI/2, 0.4);
createWall(50, 50, 'assets/textures/l1.jpg', [-39, 3, -45], Math.PI/2, 0.3);
createWall(50, 50, 'assets/textures/l2.jpg', [-39, 3, -25], Math.PI/2, 0.3);
createWall(50, 80, 'assets/textures/doc1.jpg', [-39, 3, -5], Math.PI/2, 0.3);
createWall(50, 50, 'assets/textures/l3.jpg', [-39, 3, 15], Math.PI/2, 0.3);
createWall(50, 50, 'assets/textures/l4.jpg', [-39, 3, 35], Math.PI/2, 0.3);
createWall(50, 50, 'assets/textures/v1.jpg', [39, 3, -45], -Math.PI/2, 0.3);
createWall(50, 50, 'assets/textures/v2.jpg', [39, 3, -25], -Math.PI/2, 0.3);
createWall(50, 80, 'assets/textures/doc2.jpg', [39, 3, -5], -Math.PI/2, 0.3);
createWall(50, 50, 'assets/textures/v3.jpg', [39, 3, 15], -Math.PI/2, 0.3);
createWall(50, 50, 'assets/textures/v4.jpg', [39, 3, 35], -Math.PI/2, 0.3);


    
// wall_lamp
const loader = new FBXLoader();
loader.load('assets/models/wall_lamp.fbx', function (object) {
// Scale and position the model
object.scale.multiplyScalar(0.008);
object.position.x = -20; 
object.position.y = 2; 
object.position.z = -64; 
object.rotation.y=Math.PI/2;
object.traverse(function (child) {
    if (child.isMesh) {
    }
});
scene.add(object);
});

 // human head
 loader.load('assets/models/human head.fbx', function (object) {
 object.scale.multiplyScalar(0.2);
 object.position.x = 15; 
 object.position.y = -37; 
 object.position.z = 40.5; 
 object.rotation.y=Math.PI/2;
 object.userData.isHumanHead = true;
 object.traverse(function (child) {
     if (child.isMesh) {
         
     }
 });
 scene.add(object);
});



 // pot model
 loader.load('assets/models/pot/pot.fbx', function (object) {
 object.scale.multiplyScalar(0.15);
 object.position.x = 32.5; 
 object.position.y = -15; 
 object.position.z = -64; 
 object.rotation.y=Math.PI/2;
 object.traverse(function (child) {
     if (child.isMesh) {
     }
 });
 scene.add(object);
});

// Ceiling lamp
loader.load('assets/models/ceiling_lamp.fbx', function (object) {
object.scale.multiplyScalar(0.05);
object.position.x = 155; 
object.position.y = 2.5; 
object.position.z = -50; 
object.traverse(function (child) {
    if (child.isMesh) {
    }
});
scene.add(object);
});

loader.load('assets/models/ceiling_lamp.fbx', function (object) {
object.scale.multiplyScalar(0.05);
object.position.set(155, 2.5, 10); // Vị trí thứ hai của đèn trên trần
object.traverse(function (child) {
    if (child.isMesh) {
    }
});
scene.add(object);
});

loader.load('assets/models/ceiling_lamp.fbx', function (object) {
    object.scale.multiplyScalar(0.05);
    object.position.set(115, 2.5, -65); // Vị trí thứ sáu của đèn trên trần
    object.traverse(function (child) {
        if (child.isMesh) {
        }
    });
    scene.add(object);
});

loader.load('assets/models/ceiling_lamp.fbx', function (object) {
    object.scale.multiplyScalar(0.05);
    object.position.set(115, 2.5, 25); // Vị trí thứ bảy của đèn trên trần
    object.traverse(function (child) {
        if (child.isMesh) {
        }
    });
    scene.add(object);
});

loader.load('assets/models/ceiling_lamp.fbx', function (object) {
    object.scale.multiplyScalar(0.05);
    object.position.set(115, 2.5, -35); // Vị trí thứ năm của đèn trên trần
    object.traverse(function (child) {
        if (child.isMesh) {
        }
    });
    scene.add(object);
});


loader.load('assets/models/ceiling_lamp.fbx', function (object) {
    object.scale.multiplyScalar(0.05);
    object.position.set(155, 2.5, -20); // Vị trí thứ ba của đèn trên trần
    object.traverse(function (child) {
        if (child.isMesh) {
        }
    });
    scene.add(object);
});

loader.load('assets/models/ceiling_lamp.fbx', function (object) {
    object.scale.multiplyScalar(0.05);
    object.position.set(115, 2.5, -5); // Vị trí thứ tư của đèn trên trần
    object.traverse(function (child) {
        if (child.isMesh) {
        }
    });
    scene.add(object);
});


 // pot model
 loader.load('assets/models/stanchion.fbx', function (object) {
    // Scale and position the model
    object.scale.multiplyScalar(0.02);
    object.position.x = -25; 
    object.position.y = -15; 
    object.position.z = 63; 
    object.rotation.y=Math.PI;
    object.traverse(function (child) {
        if (child.isMesh) {
        }
    });
    scene.add(object);
   });

   // pot model đx
 loader.load('assets/models/stanchion.fbx', function (object) {

    object.scale.multiplyScalar(0.02);
    object.position.x = -25; 
    object.position.y = -15; 
    object.position.z = 51; 
    object.rotation.y=Math.PI;
    object.traverse(function (child) {
        if (child.isMesh) {
        }
    });
    scene.add(object);
   });

      // pot model left
 loader.load('assets/models/stanchion.fbx', function (object) {
    object.scale.multiplyScalar(0.02);
    object.position.x = -31; 
    object.position.y = -15; 
    object.position.z = 57; 
    object.rotation.y=Math.PI/2;
    object.traverse(function (child) {
        if (child.isMesh) {
        }
    });
    scene.add(object);
   });

    // pot model right
 loader.load('assets/models/stanchion.fbx', function (object) {
    object.scale.multiplyScalar(0.02);
    object.position.x = -19; 
    object.position.y = -15; 
    object.position.z = 57; 
    object.rotation.y=Math.PI/2;
    object.traverse(function (child) {
        if (child.isMesh) {
        }
    });
    scene.add(object);
   });


// Load texture
const textureUnicorn = new THREE.TextureLoader().load('assets/models/flying-unicorn-FBX/flying-unicorn.png');
// Load model FBX
loader.load('assets/models/flying-unicorn-FBX/flying-unicorn.FBX', function (object) {
    object.scale.multiplyScalar(1.5);
    object.position.set(-25, -15, 57);
    object.traverse(function (child) {
        if (child.isMesh) {
            child.material.map = textureUnicorn;
            child.material.needsUpdate = true; 
        }
    });
    scene.add(object);
});

// Load audio
const audioLoader = new AudioLoader();
const listener = new AudioListener();
camera.add(listener);

const createAudio = (audioPath, loop, volume) => {
    const sound = new Audio(listener);
    audioLoader.load(audioPath, (buffer) => {
        sound.setBuffer(buffer);
        sound.setLoop(loop);
        sound.setVolume(volume);
        sound.play();
    });
};


createAudio('assets/audio.wav', true, 5);


  // Add lights
   // Area Light
   const areaLight = new THREE.RectAreaLight(0xffffff, 30, 10, 10);
   areaLight.position.set(30, 17.5, 10);
   areaLight.lookAt(0, 0, 0);
   areaLight.visible=false;
   scene.add(areaLight);
   const area2Light = new THREE.RectAreaLight(0xffffff, 30, 10, 10);
   area2Light.position.set(-30, 17.5, -10);
   area2Light.visible=false;
   area2Light.lookAt(0, 0, 0);
   scene.add(area2Light);
 //ambient
  const ambientLight = new THREE.AmbientLight(0x404040, 3); 
  ambientLight.visible=true;
  scene.add(ambientLight);

  //tạo ánh sáng cho wall_lamp
const lightColor = 0xFFFFFF;
const intensity = 40; 
const distance = 40; 
const light = new THREE.PointLight(lightColor, intensity, distance);
light.position.set(-19, 3, -58); 
scene.add(light);

//tạo ánh sáng cho pot
const potlightColor = 0xFFFFFF;
const potintensity = 30; 
const potdistance = 20; 
const potlight = new THREE.PointLight(potlightColor, potintensity, potdistance);
potlight.position.set(32.5, -10, -58); 
scene.add(potlight);

//tạo ánh sáng cho unicorn
const CornpointLight = new THREE.PointLight(0xc4a484, 150, 200);
CornpointLight.position.set(-25, 5, 57);
CornpointLight.rotation.y=Math.PI/2;
scene.add(CornpointLight);

//tạo ánh sáng cho human head
const HeadpointLight = new THREE.PointLight(0xc4a484, 20, 10000);
HeadpointLight.position.set(16, 2, 57);
HeadpointLight.rotation.y=Math.PI/2;
scene.add(HeadpointLight);


//tạo ánh sáng cho backWall window
const lightColor2 = 0xdaf0ff;
const intensity2 = 100; 
const distance2 = 100; 
const light2 = new THREE.PointLight(lightColor2, intensity2, distance2);
light2.position.set(22, 0, -68); 
scene.add(light2);
 

 // Tạo ánh sáng spotlight LeftWall
 const spotlight1Left = new THREE.SpotLight(0xffffff);
 spotlight1Left.position.set(-30, 2, 35);
 spotlight1Left.distance = 25;
 spotlight1Left.angle = Math.PI  ; 
 spotlight1Left.visible=false;
 spotlight1Left.intensity = 150; 
 scene.add(spotlight1Left);
 
  const spotlight12Left = new THREE.SpotLight(0xffffff);
  spotlight12Left.position.set(-30, 2, 15); 
  spotlight12Left.distance = 25;
  spotlight12Left.angle = Math.PI  ; 
  spotlight12Left.visible=false;
  spotlight12Left.intensity = 150; 
  scene.add(spotlight12Left);
 
  const spotlight13Left = new THREE.SpotLight(0xffffff);
  spotlight13Left.position.set(-30, 2, -5); 
  spotlight13Left.distance = 25;
  spotlight13Left.angle = Math.PI  ; 
  spotlight13Left.visible=false;
  spotlight13Left.intensity = 150; 
  scene.add(spotlight13Left);
 
  const spotlight14Left = new THREE.SpotLight(0xffffff);
  spotlight14Left.position.set(-30, 2, -25); 
  spotlight14Left.distance = 25;
  spotlight14Left.angle = Math.PI  ; 
  spotlight14Left.visible=false;
  spotlight14Left.intensity = 150; 
  scene.add(spotlight14Left);
 
  const spotlight15Left = new THREE.SpotLight(0xffffff);
  spotlight15Left.position.set(-30, 2, -45); 
  spotlight15Left.distance = 25;
  spotlight15Left.angle = Math.PI  ; 
  spotlight15Left.visible=false;
  spotlight15Left.intensity = 150; 
  scene.add(spotlight15Left);


  // Tạo ánh sáng spotlight MiddleLeftWall
const spotlight1 = new THREE.SpotLight(0xffffff);
spotlight1.position.set(-10, 4, 54.5); 
spotlight1.distance = 30;
spotlight1.angle = Math.PI  ; 
spotlight1.visible=false;
spotlight1.intensity = 150; 
scene.add(spotlight1);

 const spotlight12 = new THREE.SpotLight(0xffffff);
 spotlight12.position.set(-10, 6, 60); 
 spotlight12.distance = 20;
 spotlight12.angle = Math.PI  ; 
 spotlight12.visible=false;
 spotlight12.intensity = 150; 
 scene.add(spotlight12);

 const spotlight13 = new THREE.SpotLight(0xffffff);
 spotlight13.position.set(-10, 6, 22); 
 spotlight13.distance = 18;
 spotlight13.angle = Math.PI  ; 
 spotlight13.visible=false;
 spotlight13.intensity = 150; 
 scene.add(spotlight13);

 const spotlight14 = new THREE.SpotLight(0xffffff);
 spotlight14.position.set(-10, 6, 10); 
 spotlight14.distance = 18;
 spotlight14.angle = Math.PI  ; 
 spotlight14.visible=false;
 spotlight14.intensity = 150; 
 scene.add(spotlight14);

 const spotlight15 = new THREE.SpotLight(0xffffff);
 spotlight15.position.set(-10, 6, -2); 
 spotlight15.distance = 18;
 spotlight15.angle = Math.PI  ; 
 spotlight15.visible=false;
 spotlight15.intensity = 150; 
 scene.add(spotlight15);

 const spotlight16 = new THREE.SpotLight(0xffffff);
 spotlight16.position.set(-10, 4, -45); 
 spotlight16.distance = 30;
 spotlight16.angle = Math.PI  ;
 spotlight16.visible=false;
 spotlight16.intensity = 150; 
 scene.add(spotlight16);

   // Tạo ánh sáng spotlight MiddleRightWall
const spotlight0 = new THREE.SpotLight(0xffffff);
spotlight0.position.set(10, 6, 54.5); 
spotlight0.distance = 20;
spotlight0.angle = Math.PI  ; 
spotlight0.visible=false;
spotlight0.intensity = 150; 
scene.add(spotlight0);

 const spotlight03 = new THREE.SpotLight(0xffffff);
 spotlight03.position.set(10, 6, 22); 
 spotlight03.distance = 18;
 spotlight03.angle = Math.PI  ; 
 spotlight03.visible=false;
 spotlight03.intensity = 150; 
 scene.add(spotlight03);

 const spotlight04 = new THREE.SpotLight(0xffffff);
 spotlight04.position.set(10, 6, 10); 
 spotlight04.distance = 18;
 spotlight04.angle = Math.PI  ; 
 spotlight04.visible=false;
 spotlight04.intensity = 150; 
 scene.add(spotlight04);

 const spotlight05 = new THREE.SpotLight(0xffffff);
 spotlight05.position.set(10, 6, -2); 
 spotlight05.distance = 18;
 spotlight05.angle = Math.PI  ; 
 spotlight05.visible=false;
 spotlight05.intensity = 150; 
 scene.add(spotlight05);

 const spotlight06 = new THREE.SpotLight(0xffffff);
 spotlight06.position.set(10, 4, -45); 
 spotlight06.distance = 30;
 spotlight06.angle = Math.PI  ; 
 spotlight06.visible=false;
 spotlight06.intensity = 150; 
 scene.add(spotlight06);

// Tạo ánh sáng spotlight RightWall
const spotlight1Right = new THREE.SpotLight(0xffffff);
spotlight1Right.position.set(30, 2, 35); 
spotlight1Right.distance = 25;
spotlight1Right.angle = Math.PI  ; 
spotlight1Right.visible=false;
spotlight1Right.intensity = 150; 
scene.add(spotlight1Right);

 const spotlight12Right = new THREE.SpotLight(0xffffff);
 spotlight12Right.position.set(30, 2, 15); 
 spotlight12Right.distance = 25;
 spotlight12Right.angle = Math.PI  ;  
 spotlight12Right.visible=false;
 spotlight12Right.intensity = 150; 
 scene.add(spotlight12Right);

 const spotlight13Right = new THREE.SpotLight(0xffffff);
 spotlight13Right.position.set(30, 2, -5); 
 spotlight13Right.distance = 25;
 spotlight13Right.angle = Math.PI  ; 
 spotlight13Right.visible=false;
 spotlight13Right.intensity = 150; 
 scene.add(spotlight13Right);

 const spotlight14Right = new THREE.SpotLight(0xffffff);
 spotlight14Right.position.set(30, 2, -25); 
 spotlight14Right.distance = 25;
 spotlight14Right.angle = Math.PI  ; 
 spotlight14Right.visible=false;
 spotlight14Right.intensity = 150;
 scene.add(spotlight14Right);

 const spotlight15Right = new THREE.SpotLight(0xffffff);
 spotlight15Right.position.set(30, 2, -45); 
 spotlight15Right.distance = 25;
 spotlight15Right.angle = Math.PI  ; 
 spotlight15Right.intensity = 150; 
 scene.add(spotlight15Right);


// Create a switchbox 4 switches (a clickable cube) for areaLight
const switchBoxTexture = TextureLoader.load('assets/textures/switchBox.jpg');
const switchBoxMaterial = new THREE.MeshBasicMaterial({map: switchBoxTexture});
const switchBoxGeometry = new THREE.BoxGeometry(0.175, 1.75, 3);
const switchBoxMesh = new THREE.Mesh(switchBoxGeometry, switchBoxMaterial);
switchBoxMesh.position.set(39.8, 5, 65.3); 
scene.add(switchBoxMesh);

// Create a switch (a clickable cube) for areaLight
const areaSwitchGeometry = new THREE.BoxGeometry(0.25, 1, 0.6);
const areaSwitchMaterial = new THREE.MeshBasicMaterial({ color: 0x5C5C5C }); 
const areaSwitchMesh = new THREE.Mesh(areaSwitchGeometry, areaSwitchMaterial);
areaSwitchMesh.position.set(39.75, 5, 64.4); 
scene.add(areaSwitchMesh);

// Create a switch (a clickable cube) for ambientLight
const ambientSwitchGeometry = new THREE.BoxGeometry(0.25, 1, 0.6);
const ambientSwitchMaterial = new THREE.MeshBasicMaterial({ color: 0x00563B }); 
const ambientSwitchMesh = new THREE.Mesh(ambientSwitchGeometry, ambientSwitchMaterial);
ambientSwitchMesh.position.set(39.75, 5, 65); 
scene.add(ambientSwitchMesh);

// Create a switch (a clickable cube) for spotlight1
const spotlight1SwitchGeometry = new THREE.BoxGeometry(0.25, 1, 0.6);
const spotlight1SwitchMaterial = new THREE.MeshBasicMaterial({ color: 0x5C5C5C }); 
const spotlight1SwitchMesh = new THREE.Mesh(spotlight1SwitchGeometry, spotlight1SwitchMaterial);
spotlight1SwitchMesh.position.set(39.75, 5, 65.6); 
scene.add(spotlight1SwitchMesh);

// Create a switch (a clickable cube) for spotlight2
const spotlight2SwitchGeometry = new THREE.BoxGeometry(0.25, 1, 0.6);
const spotlight2SwitchMaterial = new THREE.MeshBasicMaterial({ color: 0x5C5C5C });
const spotlight2SwitchMesh = new THREE.Mesh(spotlight2SwitchGeometry, spotlight2SwitchMaterial);
spotlight2SwitchMesh.position.set(39.75, 5, 66.2); 
scene.add(spotlight2SwitchMesh);


//add light wrap ArtGallery wall
function createGradientTexture() {
    var canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    var context = canvas.getContext('2d');
    var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
}

var lightRayMaterial = new THREE.MeshBasicMaterial({
    map: createGradientTexture(),
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide,
    depthWrite: false
});

function createLightRay(width, height, position) {
    var geometry = new THREE.PlaneGeometry(width, height);
    var lightRay = new THREE.Mesh(geometry, lightRayMaterial);
    lightRay.position.set(1.05, 2.5, 60);
    lightRay.rotation.y = -Math.PI / 2;
    return lightRay;
}

var numberOfRays = 1;
var rayWidth = 30;
var rayHeight = 35;
var spacing = 5;

for (var i = -numberOfRays / 2; i < numberOfRays / 2; i++) {
    var xPosition = i * spacing;
    var lightRay = createLightRay(rayWidth, rayHeight, new THREE.Vector3(xPosition, 0, 0));
    scene.add(lightRay);
}


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Event listener for mouse clicks
window.addEventListener('click', onMouseClick);

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections with the switches
    const areaIntersects = raycaster.intersectObject(areaSwitchMesh);
    const ambientIntersects = raycaster.intersectObject(ambientSwitchMesh);
    const spotlight1Intersects = raycaster.intersectObject(spotlight1SwitchMesh);
    const spotlight2Intersects = raycaster.intersectObject(spotlight2SwitchMesh);

    if (areaIntersects.length > 0) {
        // Toggle areaLight
        areaLight.visible = !areaLight.visible;
        area2Light.visible = !area2Light.visible;
        // Change area switch color
        const newAreaColor = areaLight.visible ? 0x702963:0x5C5C5C; 
        areaSwitchMesh.material.color.setHex(newAreaColor);
        event.stopPropagation();
    }

    else if (ambientIntersects.length > 0) {
        // Toggle ambientLight
        ambientLight.visible = !ambientLight.visible;
        // Change ambient switch color
        const newAmbientColor = ambientLight.visible ?   0x00563B:0x5C5C5C; 
        ambientSwitchMesh.material.color.setHex(newAmbientColor);
        event.stopPropagation();
    }

    else if (spotlight1Intersects.length > 0) {
        // Toggle spotlight1
        // Toggle visibility of left wall spotlights
        spotlight1Left.visible = !spotlight1Left.visible;
        spotlight12Left.visible = !spotlight12Left.visible;
        spotlight13Left.visible = !spotlight13Left.visible;
        spotlight14Left.visible = !spotlight14Left.visible;
        spotlight15Left.visible = !spotlight15Left.visible;

        // Toggle visibility of middle wall spotlights
        spotlight1.visible = !spotlight1.visible;
        spotlight12.visible = !spotlight12.visible;
        spotlight13.visible = !spotlight13.visible;
        spotlight14.visible = !spotlight14.visible;
        spotlight15.visible = !spotlight15.visible;
        spotlight16.visible = !spotlight16.visible;
        // Change spotlight1 switch color
        const newSpotlight1Color = spotlight1.visible ? 0xBF5700:0x5C5C5C;
        spotlight1SwitchMesh.material.color.setHex(newSpotlight1Color);
        event.stopPropagation();
    }

    else if (spotlight2Intersects.length > 0) {
        // Toggle spotlight2
         // Toggle visibility of right wall spotlights
         spotlight0.visible = !spotlight0.visible;
         spotlight03.visible = !spotlight03.visible;
         spotlight04.visible = !spotlight04.visible;
         spotlight05.visible = !spotlight05.visible;
         spotlight06.visible = !spotlight06.visible;
         spotlight1Right.visible = !spotlight1Right.visible;
         spotlight12Right.visible = !spotlight12Right.visible;
         spotlight13Right.visible = !spotlight13Right.visible;
         spotlight14Right.visible = !spotlight14Right.visible;
         spotlight15Right.visible = !spotlight15Right.visible;
        // Change spotlight2 switch color
        const newSpotlight2Color = spotlight0.visible ? 0xFFBF00:0x5C5C5C;
        spotlight2SwitchMesh.material.color.setHex(newSpotlight2Color);
        event.stopPropagation();
    }
}

// Biến lưu vị trí của phòng
const roomPosition = new THREE.Vector3(0, 0, 0);

// Add event listener cho sự kiện keydown
window.addEventListener('keydown', onKeyPress);

function onKeyPress(event) {
    const moveSpeed = 1; 
    switch (event.key) {
        case 'ArrowUp': // Di chuyển camera về phía trước
            camera.position.z -= moveSpeed;
            roomPosition.z += moveSpeed; // Di chuyển cả phòng
            break;
        case 'ArrowDown': // Di chuyển camera về phía sau
            camera.position.z += moveSpeed;
            roomPosition.z -= moveSpeed; // Di chuyển cả phòng
            break;
        case 'ArrowLeft': // Di chuyển camera sang trái
            camera.position.x -= moveSpeed;
            roomPosition.x += moveSpeed; // Di chuyển cả phòng
            break;
        case 'ArrowRight': // Di chuyển camera sang phải
            camera.position.x += moveSpeed;
            roomPosition.x -= moveSpeed; // Di chuyển cả phòng
            break;
        default: // Bỏ qua các phím khác
            break;
    }
    scene.position.copy(roomPosition); // Cập nhật vị trí phòng
}

function animate() {
    scene.traverse(function (object) {
        if (object.userData.isHumanHead) {
            object.rotation.y += 0.02;
        }
    });
    renderer.render(scene, camera);
    requestAnimationFrame(animate); 
}

animate();


    // Add controls
    controls = new OrbitControls(camera, renderer.domElement);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

document.getElementById('startButton').addEventListener('click', () => {
document.getElementById('menu').style.display = 'none';
init();
});
animate();
