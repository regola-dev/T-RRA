import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {createPanel,createGusset,createSeal,createTop,pouchPoint} from './doypack.js';

export function createPouch(container, labelUrl='/assets/label-hd.png'){
 let renderer;
 try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});}catch{container.innerHTML='<img class="fallback" src="/assets/presencia.jpg" alt="Empaque Presencia"><p>Tu dispositivo no pudo iniciar el visor 3D. Te mostramos el empaque original.</p>';return null;}
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor(0,0);container.append(renderer.domElement);
 renderer.domElement.setAttribute('aria-label','Modelo 3D del pouch Presencia. Arrastrá para girar y usá la rueda o dos dedos para acercar.');
 const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(33,1,.1,100);camera.position.set(0,.15,8.1);
 const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.enablePan=false;controls.minDistance=4.8;controls.maxDistance=11;controls.target.set(0,0,0);controls.minPolarAngle=.55;controls.maxPolarAngle=2.6;controls.autoRotate=!matchMedia('(prefers-reduced-motion: reduce)').matches;controls.autoRotateSpeed=.45;
 scene.add(new THREE.HemisphereLight(0xffffff,0x43554a,1.7));const key=new THREE.DirectionalLight(0xfff7e5,2.7);key.position.set(-3,4,5);scene.add(key);const rim=new THREE.DirectionalLight(0xb4d8c5,2);rim.position.set(4,1,-3);scene.add(rim);
 const pouch=new THREE.Group();scene.add(pouch);pouch.rotation.z=-.065;
 const paper=new THREE.MeshStandardMaterial({color:0xece9de,roughness:.78,metalness:0,side:THREE.DoubleSide});
 const frontMaterial=paper.clone();const front=new THREE.Mesh(createPanel(true),frontMaterial);
 pouch.add(front,new THREE.Mesh(createPanel(false),paper),new THREE.Mesh(createGusset(),paper),new THREE.Mesh(createSeal(-1),paper),new THREE.Mesh(createSeal(1),paper),new THREE.Mesh(createTop(),paper));
 // Flat heat-sealed mouth, subtle zipper tracks on both faces, no cylindrical base.
 for(const face of [true,false])for(const v of [.855,.867,.892]){
  const points=Array.from({length:65},(_,i)=>{const p=pouchPoint((i/64*2-1)*.965,v,face);p.z+=(face?1:-1)*.006;return p;});
  const track=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),64,.007,6,false),paper);pouch.add(track);
 }
 // The high-resolution label is mapped directly onto the flexible front, so it follows its folds.
 new THREE.ImageLoader().load(labelUrl,image=>{const canvas=document.createElement('canvas');const scale=renderer.capabilities.maxTextureSize>=3072?2:1;canvas.width=1024*scale;canvas.height=1536*scale;const ctx=canvas.getContext('2d');ctx.scale(scale,scale);ctx.fillStyle='#ece9de';ctx.fillRect(0,0,1024,1536);ctx.drawImage(image,150,375,724,1065);const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=renderer.capabilities.getMaxAnisotropy();frontMaterial.color.set(0xffffff);frontMaterial.map=texture;frontMaterial.needsUpdate=true;});
 const clock=new THREE.Clock();let interacting=false;controls.addEventListener('start',()=>{interacting=true;controls.autoRotate=false;});
 const observer=new ResizeObserver(()=>{const {width:w,height:h}=container.getBoundingClientRect();renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();});observer.observe(container);
 let visible=true;const visibility=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});visibility.observe(container);
 renderer.setAnimationLoop(()=>{if(!visible)return;if(!interacting&&!matchMedia('(prefers-reduced-motion: reduce)').matches)pouch.position.y=Math.sin(clock.getElapsedTime()*.8)*.04;controls.update();renderer.render(scene,camera);});
 return {zoom(delta){camera.position.multiplyScalar(delta);camera.position.clampLength(4.8,11);controls.update();},reset(){camera.position.set(0,.15,8.1);controls.target.set(0,0,0);pouch.rotation.set(0,0,-.065);controls.update();},dispose(){renderer.setAnimationLoop(null);observer.disconnect();visibility.disconnect();controls.dispose();renderer.dispose();}};
}
