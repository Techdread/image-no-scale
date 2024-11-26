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
  const textureLoader = new THREE.TextureLoader();
  
  // Load both textures
  const originalTexture = originalImageUrl ? textureLoader.load(originalImageUrl) : null;
  const processedTexture = processedImageUrl ? textureLoader.load(processedImageUrl) : null;

  // Configure textures if they exist
  [originalTexture, processedTexture].forEach(texture => {
    if (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
      texture.encoding = THREE.sRGBEncoding;
    }
  });

  return (
    <div className="flex gap-4">
      <div style={{ width: '400px', height: '300px' }}>
        <h4 className="text-sm font-medium mb-2 text-center">Original Image Cube</h4>
        <Canvas
          camera={{ position: [5, 5, 5], fov: 75 }}
          style={{ background: '#f0f0f0' }}
        >
          <Scene texture={originalTexture} />
        </Canvas>
      </div>
      <div style={{ width: '400px', height: '300px' }}>
        <h4 className="text-sm font-medium mb-2 text-center">Processed Image Cube</h4>
        <Canvas
          camera={{ position: [5, 5, 5], fov: 75 }}
          style={{ background: '#f0f0f0' }}
        >
          <Scene texture={processedTexture} />
        </Canvas>
      </div>
    </div>
  );
};

export default ImageCuboid;
