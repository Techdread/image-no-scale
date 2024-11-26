import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Cuboid = ({ width = 4, height = 3, depth = 2, texture = null }) => {
  const meshRef = useRef();

  // Create materials array with texture on all sides
  const materials = Array(6).fill(null).map(() => 
    texture ? 
      new THREE.MeshStandardMaterial({ 
        map: texture,
        side: THREE.DoubleSide // Ensure texture is visible from both sides
      }) : 
      new THREE.MeshStandardMaterial({ color: 'white' })
  );

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]}>
      <boxGeometry args={[width, height, depth]} />
      {materials.map((material, index) => (
        <meshStandardMaterial 
          key={index} 
          attach={`material-${index}`} 
          map={material.map}
          side={THREE.DoubleSide}
        />
      ))}
    </mesh>
  );
};

const Scene = ({ texture }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Cuboid texture={texture} />
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={2}
      />
    </>
  );
};

const ImageCuboid = ({ originalImageUrl, processedImageUrl }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="h-[300px] border border-gray-200 rounded-lg overflow-hidden">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <Scene texture={originalImageUrl ? new THREE.TextureLoader().load(originalImageUrl) : null} />
        </Canvas>
      </div>
      <div className="h-[300px] border border-gray-200 rounded-lg overflow-hidden">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <Scene texture={processedImageUrl ? new THREE.TextureLoader().load(processedImageUrl) : null} />
        </Canvas>
      </div>
    </div>
  );
};

export default ImageCuboid;
