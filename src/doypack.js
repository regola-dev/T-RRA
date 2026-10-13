import * as THREE from 'three';

// v = height (bottom 0, top 1), u = horizontal position (-1 to 1).
// Front and back share the same perimeter; the gusset closes the expanded base.
export function pouchPoint(u,v,front=true){
 const edge=Math.abs(u), belly=Math.pow(Math.max(0,1-u*u),.65);
 const shoulder=1-THREE.MathUtils.smoothstep(v,.77,.88);
 const depth=(.36+.085*Math.exp(-Math.pow((v-.12)/.19,2)))*shoulder;
 const crease=.016*Math.sin(v*24+u*15)*Math.pow(edge,5)*shoulder;
 const diagonal=.035*Math.exp(-Math.pow((v-(.75-.22*(1-edge)))/.027,2))*Math.pow(edge,3)*shoulder;
 const x=u*1.025*(.963+.037*v-.012*Math.sin(v*Math.PI));
 const y=(v-.5)*3.1+.055*edge*edge*(1-v)**8;
 const z=.013+belly*depth+crease-diagonal;
 return new THREE.Vector3(x,y,(front?1:-1)*z);
}

export function createPanel(front){
 const geometry=new THREE.PlaneGeometry(2,1,64,84);
 const position=geometry.attributes.position,uv=geometry.attributes.uv;
 for(let i=0;i<position.count;i++){
  const p=pouchPoint(uv.getX(i)*2-1,uv.getY(i),front);
  position.setXYZ(i,p.x,p.y,p.z);
 }
 if(!front){const index=geometry.index;for(let i=0;i<index.count;i+=3){const b=index.getX(i+1);index.setX(i+1,index.getX(i+2));index.setX(i+2,b);}}
 geometry.computeVertexNormals();return geometry;
}

function gridGeometry(columns,rows,point){
 const positions=[],indices=[];
 for(let j=0;j<=rows;j++)for(let i=0;i<=columns;i++){const p=point(i/columns,j/rows);positions.push(p.x,p.y,p.z);}
 for(let j=0;j<rows;j++)for(let i=0;i<columns;i++){const a=j*(columns+1)+i,b=a+1,c=a+columns+1,d=c+1;indices.push(a,b,d,a,d,c);}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}

export function createGusset(){
 return gridGeometry(64,20,(s,t)=>{
  const u=s*2-1,a=pouchPoint(u,0,true),b=pouchPoint(u,0,false);
  // Recessed folded bottom between the two rounded standing edges.
  return new THREE.Vector3(a.x,a.y+.105*Math.sin(t*Math.PI)*Math.pow(1-u*u,.6),THREE.MathUtils.lerp(a.z,b.z,t));
 });
}
export function createSeal(edge){
 return gridGeometry(84,1,(s,t)=>{
  const a=pouchPoint(edge,s,true),b=pouchPoint(edge,s,false);
  return a.lerp(b,t);
 });
}
export function createTop(){return gridGeometry(64,1,(s,t)=>pouchPoint(s*2-1,1,true).lerp(pouchPoint(s*2-1,1,false),t));}
