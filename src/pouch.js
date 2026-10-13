import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

export function createPouch(container){
 let renderer;
 try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});}catch{container.innerHTML='<img class="fallback" src="/assets/presencia.jpg" alt="Empaque Presencia"><p>Tu dispositivo no pudo iniciar el visor 3D. Te mostramos el empaque original.</p>';return null;}
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor(0,0);container.append(renderer.domElement);
 renderer.domElement.setAttribute('aria-label','Modelo 3D del pouch Presencia. Arrastrá para girar y usá la rueda o dos dedos para acercar.');
 const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(33,1,.1,100);camera.position.set(0,.15,8.1);
 const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.enablePan=false;controls.minDistance=4.8;controls.maxDistance=11;controls.target.set(0,0,0);controls.minPolarAngle=.55;controls.maxPolarAngle=2.6;controls.autoRotate=!matchMedia('(prefers-reduced-motion: reduce)').matches;controls.autoRotateSpeed=.45;
 scene.add(new THREE.HemisphereLight(0xffffff,0x43554a,2.5));const key=new THREE.DirectionalLight(0xfff7e5,4);key.position.set(-3,4,5);scene.add(key);const rim=new THREE.DirectionalLight(0xb4d8c5,3);rim.position.set(4,1,-3);scene.add(rim);
 const pouch=new THREE.Group();scene.add(pouch);pouch.rotation.z=-.065;
 // Flexible pouch geometry: tapered sides, inflated center, sealed top, gusseted base.
 const width=2.05,height=3.1,nx=42,ny=60;
 function surface(front){const geom=new THREE.PlaneGeometry(width,height,nx,ny);const pos=geom.attributes.position;for(let i=0;i<pos.count;i++){const x=pos.getX(i),y=pos.getY(i);const u=x/(width/2),v=(y+height/2)/height;const inflate=Math.pow(Math.max(0,1-u*u),.55)*Math.sin(Math.PI*v)*.26;const wrinkle=.017*Math.sin(u*32+v*28)*Math.pow(Math.abs(u),5);pos.setXYZ(i,x*(.96+.04*Math.sin(v*Math.PI)),y,(front?1:-1)*(.055+inflate+wrinkle));}geom.computeVertexNormals();return geom;}
 const paper=new THREE.MeshStandardMaterial({color:0xeaece7,roughness:.76,metalness:.025,side:THREE.DoubleSide});pouch.add(new THREE.Mesh(surface(true),paper),new THREE.Mesh(surface(false),paper));
 const sideMaterial=new THREE.MeshStandardMaterial({color:0xd4d8ce,roughness:.85});for(const x of [-1.0,1.0]){const seam=new THREE.Mesh(new THREE.BoxGeometry(.035,3.05,.11),sideMaterial);seam.position.x=x;pouch.add(seam);}
 for(const y of [1.31,1.22,1.16]){const zip=new THREE.Mesh(new THREE.CylinderGeometry(.023,.023,1.94,24),paper);zip.rotation.z=Math.PI/2;zip.position.set(0,y,.11);pouch.add(zip);}
 const base=new THREE.Mesh(new THREE.CylinderGeometry(.17,.21,1.96,32),paper);base.rotation.z=Math.PI/2;base.scale.x=.2;base.scale.z=1.25;base.position.y=-1.49;pouch.add(base);
 const loader=new THREE.TextureLoader();loader.load('/assets/label.jpg',texture=>{texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=renderer.capabilities.getMaxAnisotropy();const g=new THREE.PlaneGeometry(1.46,2.15,36,48);const p=g.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i)-.28;const u=x/(width/2),v=(y+height/2)/height;p.setXYZ(i,x,y,.065+Math.pow(Math.max(0,1-u*u),.55)*Math.sin(Math.PI*v)*.26);}g.computeVertexNormals();pouch.add(new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:texture,roughness:.8,side:THREE.FrontSide})));});
 const back=new THREE.Mesh(new THREE.PlaneGeometry(1.2,.9),new THREE.MeshStandardMaterial({color:0xcdd2c5,roughness:1}));back.position.set(0,-.25,-.324);back.rotation.y=Math.PI;pouch.add(back);
 const clock=new THREE.Clock();let interacting=false;controls.addEventListener('start',()=>{interacting=true;controls.autoRotate=false;});
 const observer=new ResizeObserver(()=>{const {width:w,height:h}=container.getBoundingClientRect();renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();});observer.observe(container);
 let visible=true;const visibility=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});visibility.observe(container);
 renderer.setAnimationLoop(()=>{if(!visible)return;if(!interacting&&!matchMedia('(prefers-reduced-motion: reduce)').matches)pouch.position.y=Math.sin(clock.getElapsedTime()*.8)*.04;controls.update();renderer.render(scene,camera);});
 return {zoom(delta){camera.position.multiplyScalar(delta);camera.position.clampLength(4.8,11);controls.update();},reset(){camera.position.set(0,.15,8.1);controls.target.set(0,0,0);pouch.rotation.set(0,0,-.065);controls.update();},dispose(){renderer.setAnimationLoop(null);observer.disconnect();visibility.disconnect();controls.dispose();renderer.dispose();}};
}
