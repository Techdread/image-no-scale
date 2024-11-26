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

const ImageCuboid = ({ imageUrl }) => {
  const textureLoader = new THREE.TextureLoader();
  const texture = imageUrl ? textureLoader.load(imageUrl) : null;

  // Configure texture if it exists
  if (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    texture.encoding = THREE.sRGBEncoding;
  }

  return (
    <div style={{ width: '400px', height: '300px' }}>
      <Canvas
        camera={{ position: [5, 5, 5], fov: 75 }}
        style={{ background: '#f0f0f0' }}
      >
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
      </Canvas>
    </div>
  );
};

export default ImageCuboid;
