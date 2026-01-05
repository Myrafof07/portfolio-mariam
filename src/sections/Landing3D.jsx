import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";

function InstancedCubes({ count = 800, area = [70, 35, 70] }) {
  const meshRef = useRef(null);
  const groupRef = useRef(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  const positions = useMemo(() => {
    const [ax, ay, az] = area;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * ax;
      arr[i * 3 + 1] = (Math.random() - 0.5) * ay;
      arr[i * 3 + 2] = (Math.random() - 0.5) * az;
    }
    return arr;
  }, [count, area]);


  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      color.setHSL(0.70 + Math.random() * 0.10, 0.60, 0.55); 
      arr.set(color.toArray(), i * 3);
    }
    return arr;
  }, [count, color]);

  
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    
    mesh.instanceColor = new THREE.InstancedBufferAttribute(colors, 3);

    for (let i = 0; i < count; i++) {
      const s = 0.15 + Math.random() * 0.4;
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [count, positions, colors, dummy]);

 
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial vertexColors roughness={0.65} metalness={0.1} />
      </instancedMesh>
    </group>
  );
}

export default function Landing3D() {
  return (
    <section className="relative h-[60vh] md:h-screen w-full">
      <Canvas
        camera={{ position: [0, 0, 35], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        
        <color attach="background" args={["#0b1220"]} />

        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={0.8} />

        
        <Suspense fallback={null}>
          <InstancedCubes count={800} area={[70, 35, 70]} />
        </Suspense>
      </Canvas>

      
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b1220]" />
    </section>
  );
}

