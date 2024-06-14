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

    // Tạo cylinder thứ nhất (cột ngang)
const cylinderGeometry1 = new THREE.CylinderGeometry(0.2, 0.2, 150, 32); // radiusTop, radiusBottom, height, segments
const cylinderMaterial1 = new THREE.MeshStandardMaterial({ color: 0xD3D3D3 });
const cylinder1 = new THREE.Mesh(cylinderGeometry1, cylinderMaterial1);
cylinder1.rotation.x = Math.PI / 2;
cylinder1.position.set(30, 20, 0);
scene.add(cylinder1);

// Tạo cylinder thứ hai (cột ngang)
const cylinderGeometry2 = new THREE.CylinderGeometry(0.2, 0.2, 150, 32); // radiusTop, radiusBottom, height, segments
const cylinderMaterial2 = new THREE.MeshStandardMaterial({ color: 0xD3D3D3 });
const cylinder2 = new THREE.Mesh(cylinderGeometry2, cylinderMaterial2);
cylinder2.rotation.x = Math.PI / 2;
cylinder2.position.set(10, 20, 0); // Điều chỉnh vị trí của cylinder thứ hai
scene.add(cylinder2);

// Tạo cylinder thứ ba (cột ngang)
const cylinderGeometry3 = new THREE.CylinderGeometry(0.2, 0.2, 150, 32); // radiusTop, radiusBottom, height, segments
const cylinderMaterial3 = new THREE.MeshStandardMaterial({ color: 0xD3D3D3 });
const cylinder3 = new THREE.Mesh(cylinderGeometry3, cylinderMaterial3);
cylinder3.rotation.x = Math.PI / 2;
cylinder3.position.set(-10, 20, 0); // Điều chỉnh vị trí của cylinder thứ ba
scene.add(cylinder3);

// Tạo cylinder thứ ba (cột ngang)
const cylinderGeometry4 = new THREE.CylinderGeometry(0.2, 0.2, 150, 32); // radiusTop, radiusBottom, height, segments
const cylinderMaterial4 = new THREE.MeshStandardMaterial({ color: 0xD3D3D3 });
const cylinder4 = new THREE.Mesh(cylinderGeometry4, cylinderMaterial4);
cylinder4.rotation.x = Math.PI / 2;
cylinder4.position.set(-30, 20, 0); // Điều chỉnh vị trí của cylinder thứ ba
scene.add(cylinder4);
    

    // Tạo ghế không tựa
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

// Tạo vật liệu cho chân ghế với texture
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

// Tạo vật liệu cho chân giữa ghế với texture
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

// 
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

// Tạo vật liệu cho chân ghế với texture
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

// Tạo vật liệu cho chân giữa ghế với texture
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
    // 
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

// Tạo vật liệu cho chân ghế với texture
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

// Tạo vật liệu cho chân giữa ghế với texture
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


    // Create the rectangular box-shaped wall
    const swallDepth = 2; // Set the depth of the wall
    const swallWidth = 15; // Set the width of the wall
    const swallHeight = 35; // Set the height of the wall
    const swallGeometry = new THREE.BoxGeometry(swallWidth, swallHeight, swallDepth);
    const swallMaterial = new THREE.MeshStandardMaterial({ color: 0xD3D3D3 }); // Brown color
    const swall = new THREE.Mesh(swallGeometry, swallMaterial);
    swall.position.set(32.5, 2.5, -65); // Position the wall in front of the right side of the back wall
    scene.add(swall);

    const xswallDepth = 2; // Set the depth of the wall
    const xswallWidth = 50; // Set the width of the wall
    const xswallHeight = 35; // Set the height of the wall
    const xswallGeometry = new THREE.BoxGeometry(xswallWidth, xswallHeight, xswallDepth);
    const xswallMaterial = new THREE.MeshStandardMaterial({ color: 0xD3D3D3 }); // Brown color
    const xswall = new THREE.Mesh(xswallGeometry, xswallMaterial);
    xswall.position.set(-15, 2.5, -65); // Position the wall in front of the right side of the back wall
    scene.add(xswall);

    const xxswallDepth = 40; // Set the depth of the wall
    const xxswallWidth = 2; // Set the width of the wall
    const xxswallHeight = 35; // Set the height of the wall
    const xxswallGeometry = new THREE.BoxGeometry(xxswallWidth, xxswallHeight, xxswallDepth);
    const xxswallMaterial = new THREE.MeshStandardMaterial({ color: 0xD3D3D3 }); 
    const xxswall = new THREE.Mesh(xxswallGeometry, xxswallMaterial);
    xxswall.position.set(0, 2.5, -45); 
    scene.add(xxswall);

    const xxxswallDepth = 40; // Set the depth of the wall
    const xxxswallWidth = 2; // Set the width of the wall
    const xxxswallHeight = 35; // Set the height of the wall
    const xxxswallGeometry = new THREE.BoxGeometry(xxxswallWidth, xxxswallHeight, xxxswallDepth);
    const xxxswallMaterial = new THREE.MeshStandardMaterial({ color: 0xD3D3D3 }); 
    const xxxswall = new THREE.Mesh(xxxswallGeometry, xxxswallMaterial);
    xxxswall.position.set(0, 2.5, 10); 
    scene.add(xxxswall);

    const xxxxswallDepth = 30; // Set the depth of the wall
    const xxxxswallWidth = 2; // Set the width of the wall
    const xxxxswallHeight = 35; // Set the height of the wall
    const xxxxswallGeometry = new THREE.BoxGeometry(xxxxswallWidth, xxxxswallHeight, xxxxswallDepth);
    const xxxxswallMaterial = new THREE.MeshStandardMaterial({ color: 0xD3D3D3 }); 
    const xxxxswall = new THREE.Mesh(xxxxswallGeometry, xxxxswallMaterial);
    xxxxswall.position.set(0, 2.5, 60); 
    scene.add(xxxxswall);


    //[Block MiddleWallLeft]
    // Tạo mặt phẳng làm tường
    const hv1Width = 50;
    const hv1Height = 50;
    const hv1Geometry = new THREE.PlaneGeometry(hv1Width, hv1Height);
    const hv1Texture = new THREE.TextureLoader().load('assets/textures/hv1.jpg'); // Load ảnh cho tường
    const hv1Material = new THREE.MeshStandardMaterial({ map: hv1Texture });
    const hv1 = new THREE.Mesh(hv1Geometry, hv1Material);
    hv1.rotation.y = -Math.PI/2;
    hv1.scale.multiplyScalar(0.5);
    hv1.position.set(-2, 3, -45); 
    scene.add(hv1);

    // Tạo mặt phẳng làm tường
    const hv2Width = 25;
    const hv2Height = 40;
    const hv2Geometry = new THREE.PlaneGeometry(hv2Width, hv2Height);
    const hv2Texture = new THREE.TextureLoader().load('assets/textures/hv2.jpg'); // Load ảnh cho tường
    const hv2Material = new THREE.MeshStandardMaterial({ map: hv2Texture });
    const hv2 = new THREE.Mesh(hv2Geometry, hv2Material);
    hv2.rotation.y = -Math.PI/2;
    hv2.scale.multiplyScalar(0.4);
    hv2.position.set(-2, 7, 22); 
    scene.add(hv2);
    

     // Tạo mặt phẳng làm tường
     const hv3Width = 25;
     const hv3Height = 40;
     const hv3Geometry = new THREE.PlaneGeometry(hv3Width, hv3Height);
     const hv3Texture = new THREE.TextureLoader().load('assets/textures/hv3.jpg'); // Load ảnh cho tường
     const hv3Material = new THREE.MeshStandardMaterial({ map: hv3Texture });
     const hv3 = new THREE.Mesh(hv3Geometry, hv3Material);
     hv3.rotation.y = -Math.PI/2;
     hv3.scale.multiplyScalar(0.4);
     hv3.position.set(-2, 7, 11); 
     scene.add(hv3);

     

    // Tạo mặt phẳng làm tường
    const hv4Width = 25;
    const hv4Height = 40;
    const hv4Geometry = new THREE.PlaneGeometry(hv4Width, hv4Height);
    const hv4Texture = new THREE.TextureLoader().load('assets/textures/hv4.jpg'); // Load ảnh cho tường
    const hv4Material = new THREE.MeshStandardMaterial({ map: hv4Texture });
    const hv4 = new THREE.Mesh(hv4Geometry, hv4Material);
    hv4.rotation.y = -Math.PI/2;
    hv4.scale.multiplyScalar(0.4);
    hv4.position.set(-2, 7, 0); 
    scene.add(hv4);

    //
    // Tạo mặt phẳng làm tường
    const aWidth = 20;
    const aHeight = 20;
    const aGeometry = new THREE.PlaneGeometry(aWidth, aHeight);
    const aTexture = new THREE.TextureLoader().load('assets/textures/a.jpg'); // Load ảnh cho tường
    const aMaterial = new THREE.MeshStandardMaterial({ map: aTexture });
    const a = new THREE.Mesh(aGeometry, aMaterial);
    a.rotation.y = -Math.PI/2;
    a.scale.multiplyScalar(0.5);
    a.position.set(-2, -2, 55); 
    scene.add(a);

    // Tạo mặt phẳng làm tường
    const bWidth = 20;
    const bHeight = 20;
    const bGeometry = new THREE.PlaneGeometry(bWidth, bHeight);
    const bTexture = new THREE.TextureLoader().load('assets/textures/al.jpg'); // Load ảnh cho tường
    const bMaterial = new THREE.MeshStandardMaterial({ map: bTexture });
    const b = new THREE.Mesh(bGeometry, bMaterial);
    b.rotation.y = -Math.PI/2;
    b.scale.multiplyScalar(0.5);
    b.position.set(-2, 10, 55); 
    scene.add(b);

    // Tạo mặt phẳng làm tường
    const allWidth = 15;
    const allHeight = 44;
    const allGeometry = new THREE.PlaneGeometry(allWidth, allHeight);
    const allTexture = new THREE.TextureLoader().load('assets/textures/all.jpg'); // Load ảnh cho tường
    const allMaterial = new THREE.MeshStandardMaterial({ map: allTexture });
    const all = new THREE.Mesh(allGeometry, allMaterial);
    all.rotation.y = -Math.PI/2;
    all.scale.multiplyScalar(0.5);
    all.position.set(-2, 4, 65); 
    scene.add(all);

    //[Block MiddleWall]
    // Tạo mặt phẳng làm tường
    const oneWidth = 50;
    const oneHeight = 50;
    const oneGeometry = new THREE.PlaneGeometry(oneWidth, oneHeight);
    const oneTexture = new THREE.TextureLoader().load('assets/textures/1.jpg'); // Load ảnh cho tường
    const oneMaterial = new THREE.MeshStandardMaterial({ map: oneTexture });
    const one = new THREE.Mesh(oneGeometry, oneMaterial);
    one.rotation.y = Math.PI/2;
    one.scale.multiplyScalar(0.5);
    one.position.set(2, 3, -45); 
    scene.add(one);

    // Tạo mặt phẳng làm tường
    const twoWidth = 25;
    const twoHeight = 40;
    const twoGeometry = new THREE.PlaneGeometry(twoWidth, twoHeight);
    const twoTexture = new THREE.TextureLoader().load('assets/textures/2.jpg'); // Load ảnh cho tường
    const twoMaterial = new THREE.MeshStandardMaterial({ map: twoTexture });
    const two = new THREE.Mesh(twoGeometry, twoMaterial);
    two.rotation.y = Math.PI/2;
    two.scale.multiplyScalar(0.4);
    two.position.set(2, 7, 22); 
    scene.add(two);
    

     // Tạo mặt phẳng làm tường
     const thrWidth = 25;
     const thrHeight = 40;
     const thrGeometry = new THREE.PlaneGeometry(thrWidth, thrHeight);
     const thrTexture = new THREE.TextureLoader().load('assets/textures/3.jpg'); // Load ảnh cho tường
     const thrMaterial = new THREE.MeshStandardMaterial({ map: thrTexture });
     const thr = new THREE.Mesh(thrGeometry, thrMaterial);
     thr.rotation.y = Math.PI/2;
     thr.scale.multiplyScalar(0.4);
     thr.position.set(2, 7, 11); 
     scene.add(thr);

    // Tạo mặt phẳng làm tường
    const fWidth = 25;
    const fHeight = 40;
    const fGeometry = new THREE.PlaneGeometry(fWidth, fHeight);
    const fTexture = new THREE.TextureLoader().load('assets/textures/4.jpg'); // Load ảnh cho tường
    const fMaterial = new THREE.MeshStandardMaterial({ map: fTexture });
    const f = new THREE.Mesh(fGeometry, fMaterial);
    f.rotation.y = Math.PI/2;
    f.scale.multiplyScalar(0.4);
    f.position.set(2, 7, 0); 
    scene.add(f);

    //[Block LeftWall]
     // Tạo mặt phẳng làm tường
     const ll1Width = 50;
     const ll1Height = 50;
     const ll1Geometry = new THREE.PlaneGeometry(ll1Width, ll1Height);
     const ll1Texture = new THREE.TextureLoader().load('assets/textures/l1.jpg'); // Load ảnh cho tường
     const ll1Material = new THREE.MeshStandardMaterial({ map: ll1Texture });
     const ll1 = new THREE.Mesh(ll1Geometry, ll1Material);
     ll1.rotation.y = Math.PI/2;
     ll1.scale.multiplyScalar(0.3);
     ll1.position.set(-39, 3, -45); 
     scene.add(ll1);

     // Tạo mặt phẳng làm tường
     const ll2Width = 50;
     const ll2Height = 50;
     const ll2Geometry = new THREE.PlaneGeometry(ll2Width, ll2Height);
     const ll2Texture = new THREE.TextureLoader().load('assets/textures/l2.jpg'); // Load ảnh cho tường
     const ll2Material = new THREE.MeshStandardMaterial({ map: ll2Texture });
     const ll2 = new THREE.Mesh(ll2Geometry, ll2Material);
     ll2.rotation.y = Math.PI/2;
     ll2.scale.multiplyScalar(0.3);
     ll2.position.set(-39, 3, -25); 
     scene.add(ll2);

     // Tạo mặt phẳng làm tường
     const d1Width = 50;
     const d1Height = 80;
     const d1Geometry = new THREE.PlaneGeometry(d1Width, d1Height);
     const d1Texture = new THREE.TextureLoader().load('assets/textures/doc1.jpg'); // Load ảnh cho tường
     const d1Material = new THREE.MeshStandardMaterial({ map: d1Texture });
     const d1 = new THREE.Mesh(d1Geometry, d1Material);
     d1.rotation.y = Math.PI/2;
     d1.scale.multiplyScalar(0.3);
     d1.position.set(-39, 3, -5); 
     scene.add(d1);

    // Tạo mặt phẳng làm tường
    const ll3Width = 50;
    const ll3Height = 50;
    const ll3Geometry = new THREE.PlaneGeometry(ll3Width, ll3Height);
    const ll3Texture = new THREE.TextureLoader().load('assets/textures/l3.jpg'); // Load ảnh cho tường
    const ll3Material = new THREE.MeshStandardMaterial({ map: ll3Texture });
    const ll3 = new THREE.Mesh(ll3Geometry, ll3Material);
    ll3.rotation.y = Math.PI/2;
    ll3.scale.multiplyScalar(0.3);
    ll3.position.set(-39, 3, 15); 
    scene.add(ll3);

    // Tạo mặt phẳng làm tường
    const ll4Width = 50;
    const ll4Height = 50;
    const ll4Geometry = new THREE.PlaneGeometry(ll4Width, ll4Height);
    const ll4Texture = new THREE.TextureLoader().load('assets/textures/l4.jpg'); // Load ảnh cho tường
    const ll4Material = new THREE.MeshStandardMaterial({ map: ll4Texture });
    const ll4 = new THREE.Mesh(ll4Geometry, ll4Material);
    ll4.rotation.y = Math.PI/2;
    ll4.scale.multiplyScalar(0.3);
    ll4.position.set(-39, 3, 35); 
    scene.add(ll4);

    //[Block RightWall]
     // Tạo mặt phẳng làm tường
     const v1Width = 50;
     const v1Height = 50;
     const v1Geometry = new THREE.PlaneGeometry(v1Width, v1Height);
     const v1Texture = new THREE.TextureLoader().load('assets/textures/v1.jpg'); // Load ảnh cho tường
     const v1Material = new THREE.MeshStandardMaterial({ map: v1Texture });
     const v1 = new THREE.Mesh(v1Geometry, v1Material);
     v1.rotation.y = -Math.PI/2;
     v1.scale.multiplyScalar(0.3);
     v1.position.set(39, 3, -45); 
     scene.add(v1);

     // Tạo mặt phẳng làm tường
     const v2Width = 50;
     const v2Height = 50;
     const v2Geometry = new THREE.PlaneGeometry(v2Width, v2Height);
     const v2Texture = new THREE.TextureLoader().load('assets/textures/v2.jpg'); // Load ảnh cho tường
     const v2Material = new THREE.MeshStandardMaterial({ map: v2Texture });
     const v2 = new THREE.Mesh(v2Geometry, v2Material);
     v2.rotation.y = -Math.PI/2;
     v2.scale.multiplyScalar(0.3);
     v2.position.set(39, 3, -25); 
     scene.add(v2);

     // Tạo mặt phẳng làm tường
     const d2Width = 50;
     const d2Height = 80;
     const d2Geometry = new THREE.PlaneGeometry(d2Width, d2Height);
     const d2Texture = new THREE.TextureLoader().load('assets/textures/doc2.jpg'); // Load ảnh cho tường
     const d2Material = new THREE.MeshStandardMaterial({ map: d2Texture });
     const d2 = new THREE.Mesh(d2Geometry, d2Material);
     d2.rotation.y = -Math.PI/2;
     d2.scale.multiplyScalar(0.3);
     d2.position.set(39, 3, -5); 
     scene.add(d2);

    // Tạo mặt phẳng làm tường
    const v3Width = 50;
    const v3Height = 50;
    const v3Geometry = new THREE.PlaneGeometry(v3Width, v3Height);
    const v3Texture = new THREE.TextureLoader().load('assets/textures/v3.jpg'); // Load ảnh cho tường
    const v3Material = new THREE.MeshStandardMaterial({ map: v3Texture });
    const v3 = new THREE.Mesh(v3Geometry, v3Material);
    v3.rotation.y = -Math.PI/2;
    v3.scale.multiplyScalar(0.3);
    v3.position.set(39, 3, 15); 
    scene.add(v3);

    // Tạo mặt phẳng làm tường
    const v4Width = 50;
    const v4Height = 50;
    const v4Geometry = new THREE.PlaneGeometry(v4Width, v4Height);
    const v4Texture = new THREE.TextureLoader().load('assets/textures/v4.jpg'); // Load ảnh cho tường
    const v4Material = new THREE.MeshStandardMaterial({ map: v4Texture });
    const v4 = new THREE.Mesh(v4Geometry, v4Material);
    v4.rotation.y = -Math.PI/2;
    v4.scale.multiplyScalar(0.3);
    v4.position.set(39, 3, 35); 
    scene.add(v4);

    
    // wall_lamp
    const loader = new FBXLoader();
    loader.load('assets/models/wall_lamp.fbx', function (object) {
    // Scale and position the model
    object.scale.multiplyScalar(0.008);
    object.position.x = -20; // Chỉnh vị trí theo trục X để làm cho đèn treo chính giữa phòng
    object.position.y = 2; // Gắn ceiling lamp lên trần ceiling
    object.position.z = -64; // Chỉnh vị trí theo trục Z nếu cần thiết
    object.rotation.y=Math.PI/2;
    object.traverse(function (child) {
        if (child.isMesh) {
            // Thêm các tùy chỉnh tại đây nếu cần
        }
    });
    scene.add(object);
});

 // human head
 loader.load('assets/models/human head.fbx', function (object) {
 // Scale and position the model
 object.scale.multiplyScalar(0.2);
 object.position.x = 15; // Chỉnh vị trí theo trục X để làm cho đèn treo chính giữa phòng
 object.position.y = -37; // Gắn ceiling lamp lên trần ceiling
 object.position.z = 40.5; // Chỉnh vị trí theo trục Z nếu cần thiết
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
 // Scale and position the model
 object.scale.multiplyScalar(0.15);
 object.position.x = 32.5; // Chỉnh vị trí theo trục X để làm cho đèn treo chính giữa phòng
 object.position.y = -15; // Gắn ceiling lamp lên trần ceiling
 object.position.z = -64; // Chỉnh vị trí theo trục Z nếu cần thiết
 object.rotation.y=Math.PI/2;
 object.traverse(function (child) {
     if (child.isMesh) {
         // Thêm các tùy chỉnh tại đây nếu cần
     }
 });
 scene.add(object);
});

    // Ceiling lamp
    loader.load('assets/models/ceiling_lamp.fbx', function (object) {
    // Scale and position the model
    object.scale.multiplyScalar(0.05);
    object.position.x = 155; // Chỉnh vị trí theo trục X để làm cho đèn treo chính giữa phòng
    object.position.y = 2.5; // Gắn ceiling lamp lên trần ceiling
    object.position.z = -50; // Chỉnh vị trí theo trục Z nếu cần thiết
    object.
    object.traverse(function (child) {
        if (child.isMesh) {
            // Thêm các tùy chỉnh tại đây nếu cần
        }
    });
    scene.add(object);
});

loader.load('assets/models/ceiling_lamp.fbx', function (object) {
    // Scale and position the model
    object.scale.multiplyScalar(0.05);
    object.position.set(155, 2.5, 10); // Vị trí thứ hai của đèn trên trần
    object.traverse(function (child) {
        if (child.isMesh) {
            // Thêm các tùy chỉnh tại đây nếu cần
        }
    });
    scene.add(object);
});

loader.load('assets/models/ceiling_lamp.fbx', function (object) {
    // Scale and position the model
    object.scale.multiplyScalar(0.05);
    object.position.set(115, 2.5, -65); // Vị trí thứ sáu của đèn trên trần
    object.traverse(function (child) {
        if (child.isMesh) {
            // Thêm các tùy chỉnh tại đây nếu cần
        }
    });
    scene.add(object);
});

loader.load('assets/models/ceiling_lamp.fbx', function (object) {
    // Scale and position the model
    object.scale.multiplyScalar(0.05);
    object.position.set(115, 2.5, 25); // Vị trí thứ bảy của đèn trên trần
    object.traverse(function (child) {
        if (child.isMesh) {
            // Thêm các tùy chỉnh tại đây nếu cần
        }
    });
    scene.add(object);
});

loader.load('assets/models/ceiling_lamp.fbx', function (object) {
    // Scale and position the model
    object.scale.multiplyScalar(0.05);
    object.position.set(115, 2.5, -35); // Vị trí thứ năm của đèn trên trần
    object.traverse(function (child) {
        if (child.isMesh) {
            // Thêm các tùy chỉnh tại đây nếu cần
        }
    });
    scene.add(object);
});


loader.load('assets/models/ceiling_lamp.fbx', function (object) {
    // Scale and position the model
    object.scale.multiplyScalar(0.05);
    object.position.set(155, 2.5, -20); // Vị trí thứ ba của đèn trên trần
    object.traverse(function (child) {
        if (child.isMesh) {
            // Thêm các tùy chỉnh tại đây nếu cần
        }
    });
    scene.add(object);
});

loader.load('assets/models/ceiling_lamp.fbx', function (object) {
    // Scale and position the model
    object.scale.multiplyScalar(0.05);
    object.position.set(115, 2.5, -5); // Vị trí thứ tư của đèn trên trần
    object.traverse(function (child) {
        if (child.isMesh) {
            // Thêm các tùy chỉnh tại đây nếu cần
        }
    });
    scene.add(object);
});


 // pot model
 loader.load('assets/models/stanchion.fbx', function (object) {
    // Scale and position the model
    object.scale.multiplyScalar(0.02);
    object.position.x = -25; // Chỉnh vị trí theo trục X để làm cho đèn treo chính giữa phòng
    object.position.y = -15; // Gắn ceiling lamp lên trần ceiling
    object.position.z = 63; // Chỉnh vị trí theo trục Z nếu cần thiết
    object.rotation.y=Math.PI;
    object.traverse(function (child) {
        if (child.isMesh) {
            // Thêm các tùy chỉnh tại đây nếu cần
        }
    });
    scene.add(object);
   });

   // pot model đx
 loader.load('assets/models/stanchion.fbx', function (object) {
    // Scale and position the model
    object.scale.multiplyScalar(0.02);
    object.position.x = -25; // Chỉnh vị trí theo trục X để làm cho đèn treo chính giữa phòng
    object.position.y = -15; // Gắn ceiling lamp lên trần ceiling
    object.position.z = 51; // Chỉnh vị trí theo trục Z nếu cần thiết
    object.rotation.y=Math.PI;
    object.traverse(function (child) {
        if (child.isMesh) {
            // Thêm các tùy chỉnh tại đây nếu cần
        }
    });
    scene.add(object);
   });

      // pot model left
 loader.load('assets/models/stanchion.fbx', function (object) {
    // Scale and position the model
    object.scale.multiplyScalar(0.02);
    object.position.x = -31; // Chỉnh vị trí theo trục X để làm cho đèn treo chính giữa phòng
    object.position.y = -15; // Gắn ceiling lamp lên trần ceiling
    object.position.z = 57; // Chỉnh vị trí theo trục Z nếu cần thiết
    object.rotation.y=Math.PI/2;
    object.traverse(function (child) {
        if (child.isMesh) {
            // Thêm các tùy chỉnh tại đây nếu cần
        }
    });
    scene.add(object);
   });

    // pot model right
 loader.load('assets/models/stanchion.fbx', function (object) {
    // Scale and position the model
    object.scale.multiplyScalar(0.02);
    object.position.x = -19; // Chỉnh vị trí theo trục X để làm cho đèn treo chính giữa phòng
    object.position.y = -15; // Gắn ceiling lamp lên trần ceiling
    object.position.z = 57; // Chỉnh vị trí theo trục Z nếu cần thiết
    object.rotation.y=Math.PI/2;
    object.traverse(function (child) {
        if (child.isMesh) {
            // Thêm các tùy chỉnh tại đây nếu cần
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
 //
  const ambientLight = new THREE.AmbientLight(0x404040, 3); 
  ambientLight.visible=true;
  scene.add(ambientLight);

  //tạo ánh sáng cho wall_lamp
const lightColor = 0xFFFFFF; // Set light color
const intensity = 40; // Set light intensity
const distance = 40; // Set light distance
const light = new THREE.PointLight(lightColor, intensity, distance);
light.position.set(-19, 3, -58); // Position the light near the wall
scene.add(light);

//tạo ánh sáng cho pot
const potlightColor = 0xFFFFFF; // Set light color
const potintensity = 30; // Set light intensity
const potdistance = 20; // Set light distance
const potlight = new THREE.PointLight(potlightColor, potintensity, potdistance);
potlight.position.set(32.5, -10, -58); // Position the light near the wall
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
const lightColor2 = 0xdaf0ff; // Set light color
const intensity2 = 100; // Set light intensity
const distance2 = 100; // Set light distance
const light2 = new THREE.PointLight(lightColor2, intensity2, distance2);
light2.position.set(22, 0, -68); // Position the light near the wall
scene.add(light2);
 

 // Tạo ánh sáng spotlight LeftWall
 const spotlight1Left = new THREE.SpotLight(0xffffff);
 spotlight1Left.position.set(-30, 2, 35); // Đặt vị trí của spotlight
 spotlight1Left.distance = 25;
 spotlight1Left.angle = Math.PI  ; // Góc chiếu 
 spotlight1Left.visible=false;
 spotlight1Left.intensity = 150; // Đặt cường độ ánh sáng tối đa
 scene.add(spotlight1Left);
 
  const spotlight12Left = new THREE.SpotLight(0xffffff);
  spotlight12Left.position.set(-30, 2, 15); // Đặt vị trí của spotlight
  spotlight12Left.distance = 25;
  spotlight12Left.angle = Math.PI  ; // Góc chiếu 
  spotlight12Left.visible=false;
  spotlight12Left.intensity = 150; // Đặt cường độ ánh sáng tối đa
  scene.add(spotlight12Left);
 
  const spotlight13Left = new THREE.SpotLight(0xffffff);
  spotlight13Left.position.set(-30, 2, -5); // Đặt vị trí của spotlight
  spotlight13Left.distance = 25;
  spotlight13Left.angle = Math.PI  ; // Góc chiếu 
  spotlight13Left.visible=false;
  spotlight13Left.intensity = 150; // Đặt cường độ ánh sáng tối đa
  scene.add(spotlight13Left);
 
  const spotlight14Left = new THREE.SpotLight(0xffffff);
  spotlight14Left.position.set(-30, 2, -25); // Đặt vị trí của spotlight
  spotlight14Left.distance = 25;
  spotlight14Left.angle = Math.PI  ; // Góc chiếu 
  spotlight14Left.visible=false;
  spotlight14Left.intensity = 150; // Đặt cường độ ánh sáng tối đa
  scene.add(spotlight14Left);
 
  const spotlight15Left = new THREE.SpotLight(0xffffff);
  spotlight15Left.position.set(-30, 2, -45); // Đặt vị trí của spotlight
  spotlight15Left.distance = 25;
  spotlight15Left.angle = Math.PI  ; // Góc chiếu 
  spotlight15Left.visible=false;
  spotlight15Left.intensity = 150; // Đặt cường độ ánh sáng tối đa
  scene.add(spotlight15Left);


  // Tạo ánh sáng spotlight MiddleLeftWall
const spotlight1 = new THREE.SpotLight(0xffffff);
spotlight1.position.set(-10, 4, 54.5); // Đặt vị trí của spotlight
spotlight1.distance = 30;
spotlight1.angle = Math.PI  ; // Góc chiếu 
spotlight1.visible=false;
spotlight1.intensity = 150; // Đặt cường độ ánh sáng tối đa
scene.add(spotlight1);

 const spotlight12 = new THREE.SpotLight(0xffffff);
 spotlight12.position.set(-10, 6, 60); // Đặt vị trí của spotlight
 spotlight12.distance = 20;
 spotlight12.angle = Math.PI  ; // Góc chiếu 
 spotlight12.visible=false;
 spotlight12.intensity = 150; // Đặt cường độ ánh sáng tối đa
 scene.add(spotlight12);

 const spotlight13 = new THREE.SpotLight(0xffffff);
 spotlight13.position.set(-10, 6, 22); // Đặt vị trí của spotlight
 spotlight13.distance = 18;
 spotlight13.angle = Math.PI  ; // Góc chiếu 
 spotlight13.visible=false;
 spotlight13.intensity = 150; // Đặt cường độ ánh sáng tối đa
 scene.add(spotlight13);

 const spotlight14 = new THREE.SpotLight(0xffffff);
 spotlight14.position.set(-10, 6, 10); // Đặt vị trí của spotlight
 spotlight14.distance = 18;
 spotlight14.angle = Math.PI  ; // Góc chiếu 
 spotlight14.visible=false;
 spotlight14.intensity = 150; // Đặt cường độ ánh sáng tối đa
 scene.add(spotlight14);

 const spotlight15 = new THREE.SpotLight(0xffffff);
 spotlight15.position.set(-10, 6, -2); // Đặt vị trí của spotlight
 spotlight15.distance = 18;
 spotlight15.angle = Math.PI  ; // Góc chiếu 
 spotlight15.visible=false;
 spotlight15.intensity = 150; // Đặt cường độ ánh sáng tối đa
 scene.add(spotlight15);

 const spotlight16 = new THREE.SpotLight(0xffffff);
 spotlight16.position.set(-10, 4, -45); // Đặt vị trí của spotlight
 spotlight16.distance = 30;
 spotlight16.angle = Math.PI  ; // Góc chiếu 
 spotlight16.visible=false;
 spotlight16.intensity = 150; // Đặt cường độ ánh sáng tối đa
 scene.add(spotlight16);

   // Tạo ánh sáng spotlight MiddleRightWall
const spotlight0 = new THREE.SpotLight(0xffffff);
spotlight0.position.set(10, 6, 54.5); // Đặt vị trí của spotlight
spotlight0.distance = 20;
spotlight0.angle = Math.PI  ; // Góc chiếu 
spotlight0.visible=false;
spotlight0.intensity = 150; // Đặt cường độ ánh sáng tối đa
scene.add(spotlight0);

 const spotlight03 = new THREE.SpotLight(0xffffff);
 spotlight03.position.set(10, 6, 22); // Đặt vị trí của spotlight
 spotlight03.distance = 18;
 spotlight03.angle = Math.PI  ; // Góc chiếu 
 spotlight03.visible=false;
 spotlight03.intensity = 150; // Đặt cường độ ánh sáng tối đa
 scene.add(spotlight03);

 const spotlight04 = new THREE.SpotLight(0xffffff);
 spotlight04.position.set(10, 6, 10); // Đặt vị trí của spotlight
 spotlight04.distance = 18;
 spotlight04.angle = Math.PI  ; // Góc chiếu 
 spotlight04.visible=false;
 spotlight04.intensity = 150; // Đặt cường độ ánh sáng tối đa
 scene.add(spotlight04);

 const spotlight05 = new THREE.SpotLight(0xffffff);
 spotlight05.position.set(10, 6, -2); // Đặt vị trí của spotlight
 spotlight05.distance = 18;
 spotlight05.angle = Math.PI  ; // Góc chiếu 
 spotlight05.visible=false;
 spotlight05.intensity = 150; // Đặt cường độ ánh sáng tối đa
 scene.add(spotlight05);

 const spotlight06 = new THREE.SpotLight(0xffffff);
 spotlight06.position.set(10, 4, -45); // Đặt vị trí của spotlight
 spotlight06.distance = 30;
 spotlight06.angle = Math.PI  ; // Góc chiếu 
 spotlight06.visible=false;
 spotlight06.intensity = 150; // Đặt cường độ ánh sáng tối đa
 scene.add(spotlight06);

// Tạo ánh sáng spotlight RightWall
const spotlight1Right = new THREE.SpotLight(0xffffff);
spotlight1Right.position.set(30, 2, 35); // Đặt vị trí của spotlight
spotlight1Right.distance = 25;
spotlight1Right.angle = Math.PI  ; // Góc chiếu 
spotlight1Right.visible=false;
spotlight1Right.intensity = 150; // Đặt cường độ ánh sáng tối đa
scene.add(spotlight1Right);

 const spotlight12Right = new THREE.SpotLight(0xffffff);
 spotlight12Right.position.set(30, 2, 15); // Đặt vị trí của spotlight
 spotlight12Right.distance = 25;
 spotlight12Right.angle = Math.PI  ; // Góc chiếu 
 spotlight12Right.visible=false;
 spotlight12Right.intensity = 150; // Đặt cường độ ánh sáng tối đa
 scene.add(spotlight12Right);

 const spotlight13Right = new THREE.SpotLight(0xffffff);
 spotlight13Right.position.set(30, 2, -5); // Đặt vị trí của spotlight
 spotlight13Right.distance = 25;
 spotlight13Right.angle = Math.PI  ; // Góc chiếu 
 spotlight13Right.visible=false;
 spotlight13Right.intensity = 150; // Đặt cường độ ánh sáng tối đa
 scene.add(spotlight13Right);

 const spotlight14Right = new THREE.SpotLight(0xffffff);
 spotlight14Right.position.set(30, 2, -25); // Đặt vị trí của spotlight
 spotlight14Right.distance = 25;
 spotlight14Right.angle = Math.PI  ; // Góc chiếu 
 spotlight14Right.visible=false;
 spotlight14Right.intensity = 150; // Đặt cường độ ánh sáng tối đa
 scene.add(spotlight14Right);

 const spotlight15Right = new THREE.SpotLight(0xffffff);
 spotlight15Right.position.set(30, 2, -45); // Đặt vị trí của spotlight
 spotlight15Right.distance = 25;
 spotlight15Right.angle = Math.PI  ; // Góc chiếu 
 spotlight15Right.visible=false;
 spotlight15Right.intensity = 150; // Đặt cường độ ánh sáng tối đa
 scene.add(spotlight15Right);


 


// Create a switchbox 4 switches (a clickable cube) for areaLight
const switchBoxTexture = TextureLoader.load('assets/textures/switchBox.jpg');
const switchBoxMaterial = new THREE.MeshBasicMaterial({map: switchBoxTexture});
const switchBoxGeometry = new THREE.BoxGeometry(0.175, 1.75, 3);
const switchBoxMesh = new THREE.Mesh(switchBoxGeometry, switchBoxMaterial);
switchBoxMesh.position.set(39.8, 5, 65.3); // Position the switch appropriately
scene.add(switchBoxMesh);


// Create a switch (a clickable cube) for areaLight
const areaSwitchGeometry = new THREE.BoxGeometry(0.25, 1, 0.6);
const areaSwitchMaterial = new THREE.MeshBasicMaterial({ color: 0x5C5C5C }); 
const areaSwitchMesh = new THREE.Mesh(areaSwitchGeometry, areaSwitchMaterial);
areaSwitchMesh.position.set(39.75, 5, 64.4); // Position the switch appropriately
scene.add(areaSwitchMesh);

// Create a switch (a clickable cube) for ambientLight
const ambientSwitchGeometry = new THREE.BoxGeometry(0.25, 1, 0.6);
const ambientSwitchMaterial = new THREE.MeshBasicMaterial({ color: 0x00563B }); // green color
const ambientSwitchMesh = new THREE.Mesh(ambientSwitchGeometry, ambientSwitchMaterial);
ambientSwitchMesh.position.set(39.75, 5, 65); // Position the switch appropriately
scene.add(ambientSwitchMesh);

// Create a switch (a clickable cube) for spotlight1
const spotlight1SwitchGeometry = new THREE.BoxGeometry(0.25, 1, 0.6);
const spotlight1SwitchMaterial = new THREE.MeshBasicMaterial({ color: 0x5C5C5C }); // orange color
const spotlight1SwitchMesh = new THREE.Mesh(spotlight1SwitchGeometry, spotlight1SwitchMaterial);
spotlight1SwitchMesh.position.set(39.75, 5, 65.6); // Position the switch appropriately
scene.add(spotlight1SwitchMesh);

// Create a switch (a clickable cube) for spotlight2
const spotlight2SwitchGeometry = new THREE.BoxGeometry(0.25, 1, 0.6);
const spotlight2SwitchMaterial = new THREE.MeshBasicMaterial({ color: 0x5C5C5C }); // Yellow color
const spotlight2SwitchMesh = new THREE.Mesh(spotlight2SwitchGeometry, spotlight2SwitchMaterial);
spotlight2SwitchMesh.position.set(39.75, 5, 66.2); // Position the switch appropriately
scene.add(spotlight2SwitchMesh);


//add wrapper wall light
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
    // Calculate normalized device coordinates
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

// Khai báo biến để lưu vị trí của phòng
const roomPosition = new THREE.Vector3(0, 0, 0);

// Add event listener cho sự kiện keydown
window.addEventListener('keydown', onKeyPress);

function onKeyPress(event) {
    const moveSpeed = 1; // Điều chỉnh tốc độ di chuyển theo nhu cầu

    switch (event.key) {
        case 'ArrowUp':
            // Di chuyển camera về phía trước
            camera.position.z -= moveSpeed;
            roomPosition.z += moveSpeed; // Di chuyển cả phòng
            break;
        case 'ArrowDown':
            // Di chuyển camera về phía sau
            camera.position.z += moveSpeed;
            roomPosition.z -= moveSpeed; // Di chuyển cả phòng
            break;
        case 'ArrowLeft':
            // Di chuyển camera sang trái
            camera.position.x -= moveSpeed;
            roomPosition.x += moveSpeed; // Di chuyển cả phòng
            break;
        case 'ArrowRight':
            // Di chuyển camera sang phải
            camera.position.x += moveSpeed;
            roomPosition.x -= moveSpeed; // Di chuyển cả phòng
            break;
        default:
            // Bỏ qua các phím khác
            break;
    }

    // Cập nhật vị trí của phòng
    scene.position.copy(roomPosition);
}



// Make sure you have the following line in your render loop to update the scene:
function animate() {
    scene.traverse(function (object) {
        if (object.userData.isHumanHead) {
            // Rotate the human head
            object.rotation.y += 0.02; // Adjust the rotation speed as needed
            // Any other animations or updates specific to the human head can be added here
        }
    });
    // Your existing animation/rendering code here...
    renderer.render(scene, camera);
    requestAnimationFrame(animate); // Continuously update the scene
}

// Call the animate function to start rendering
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
