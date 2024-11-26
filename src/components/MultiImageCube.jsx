import { useState, useRef, useMemo } from 'react';
import { Button } from './ui/button';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Upload, X } from 'lucide-react';

const MAX_IMAGES = 6;
const FACE_DIMENSIONS = [
  { width: 400, height: 300 },  // Front
  { width: 400, height: 300 },  // Back
  { width: 400, height: 200 },  // Top
  { width: 400, height: 200 },  // Bottom
  { width: 200, height: 300 },  // Left
  { width: 200, height: 300 },  // Right
];

const calculateDimensions = (img, maxWidth, maxHeight) => {
  let width = img.width;
  let height = img.height;
  
  // Calculate the aspect ratio
  const aspectRatio = width / height;
  
  // For left/right faces (width = 200)
  if (maxWidth === 200) {
    // First try to fit the width
    width = maxWidth;
    height = width / aspectRatio;
    
    // If height exceeds maxHeight, scale based on height
    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }
  } else {
    // For other faces, use original logic
    if (width > height) {
      if (width > maxWidth) {
        height = height * (maxWidth / width);
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = width * (maxHeight / height);
        height = maxHeight;
      }
    }
  }
  
  const x = (maxWidth - width) / 2;
  const y = (maxHeight - height) / 2;
  
  return { width, height, x, y };
};

const processImage = (imageUrl, dimensions) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      const ctx = canvas.getContext('2d');

      // Fill with white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Calculate dimensions maintaining aspect ratio
      const processedDimensions = calculateDimensions(img, dimensions.width, dimensions.height);

      // For left and right faces, adjust y position to add margins on sides instead of top/bottom
      const x = processedDimensions.x;
      const y = dimensions.width === 200 ? (dimensions.height - processedDimensions.height) / 2 : processedDimensions.y;

      // Draw image centered and maintaining aspect ratio
      ctx.drawImage(
        img,
        x,
        y,
        processedDimensions.width,
        processedDimensions.height
      );

      resolve(canvas.toDataURL('image/png'));
    };
    img.src = imageUrl;
  });
};

const MultiCuboid = ({ textures }) => {
  const meshRef = useRef();
  
  const materials = useMemo(() => 
    textures.map((texture, index) => {
      if (!texture) {
        return new THREE.MeshStandardMaterial({ 
          color: 'white',
          side: THREE.DoubleSide 
        });
      }

      const textureMap = new THREE.TextureLoader().load(texture);
      textureMap.encoding = THREE.sRGBEncoding;
      return new THREE.MeshStandardMaterial({ 
        map: textureMap,
        side: THREE.DoubleSide
      });
    }), [textures]
  );

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]}>
      <boxGeometry args={[4, 3, 2]} />
      {materials.map((material, index) => (
        <primitive object={material} attach={`material-${index}`} key={index} />
      ))}
    </mesh>
  );
};

const Scene = ({ textures }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <MultiCuboid textures={textures} />
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

const ImagePreview = ({ src, onRemove, index, dimensions }) => (
  <div className="relative">
    <img 
      src={src} 
      alt={`Face ${index + 1}`} 
      style={{
        width: `${dimensions.width / 4}px`,
        height: `${dimensions.height / 4}px`,
      }}
      className="object-cover border border-gray-200 rounded-lg"
    />
    <button
      onClick={onRemove}
      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
    >
      <X className="w-4 h-4" />
    </button>
  </div>
);

const MultiImageCube = () => {
  const [images, setImages] = useState(Array(MAX_IMAGES).fill(null));
  const [processedImages, setProcessedImages] = useState(Array(MAX_IMAGES).fill(null));
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const remainingSlots = images.filter(img => !img).length;
    const filesToProcess = files.slice(0, remainingSlots);

    for (const file of filesToProcess) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageUrl = e.target.result;
        setImages(prevImages => {
          const firstNullIndex = prevImages.indexOf(null);
          if (firstNullIndex !== -1) {
            const newImages = [...prevImages];
            newImages[firstNullIndex] = imageUrl;
            
            // Process the image
            processImage(imageUrl, FACE_DIMENSIONS[firstNullIndex]).then(processedUrl => {
              setProcessedImages(prevProcessed => {
                const newProcessed = [...prevProcessed];
                newProcessed[firstNullIndex] = processedUrl;
                return newProcessed;
              });
            });

            return newImages;
          }
          return prevImages;
        });
      };
      reader.readAsDataURL(file);
    }

    event.target.value = '';
  };

  const removeImage = (index) => {
    setImages(prevImages => {
      const newImages = [...prevImages];
      newImages[index] = null;
      return newImages;
    });
    setProcessedImages(prevProcessed => {
      const newProcessed = [...prevProcessed];
      newProcessed[index] = null;
      return newProcessed;
    });
  };

  const getFaceLabel = (index) => {
    const faces = ['Front', 'Back', 'Top', 'Bottom', 'Left', 'Right'];
    return faces[index];
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-xl font-bold">Upload Images for Cube Faces</h2>
        <Button 
          onClick={() => fileInputRef.current?.click()}
          disabled={!images.includes(null)}
        >
          <Upload className="w-4 h-4 mr-2" />
          Add Images ({images.filter(Boolean).length}/{MAX_IMAGES})
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
      </div>

      <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          <h3 className="font-semibold">Front/Back Faces (4:3)</h3>
          <div className="grid grid-cols-2 gap-4">
            {[0, 1].map((index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <span className="text-sm font-medium text-gray-600">
                  {getFaceLabel(index)}
                </span>
                {images[index] ? (
                  <ImagePreview 
                    src={processedImages[index] || images[index]} 
                    onRemove={() => removeImage(index)}
                    index={index}
                    dimensions={FACE_DIMENSIONS[index]}
                  />
                ) : (
                  <div 
                    style={{
                      width: `${FACE_DIMENSIONS[index].width / 4}px`,
                      height: `${FACE_DIMENSIONS[index].height / 4}px`,
                    }}
                    className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-gray-400 text-sm">Empty</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Top/Bottom Faces (4:2)</h3>
          <div className="grid grid-cols-2 gap-4">
            {[2, 3].map((index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <span className="text-sm font-medium text-gray-600">
                  {getFaceLabel(index)}
                </span>
                {images[index] ? (
                  <ImagePreview 
                    src={processedImages[index] || images[index]} 
                    onRemove={() => removeImage(index)}
                    index={index}
                    dimensions={FACE_DIMENSIONS[index]}
                  />
                ) : (
                  <div 
                    style={{
                      width: `${FACE_DIMENSIONS[index].width / 4}px`,
                      height: `${FACE_DIMENSIONS[index].height / 4}px`,
                    }}
                    className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-gray-400 text-sm">Empty</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Left/Right Faces (2:3)</h3>
          <div className="grid grid-cols-2 gap-4">
            {[4, 5].map((index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <span className="text-sm font-medium text-gray-600">
                  {getFaceLabel(index)}
                </span>
                {images[index] ? (
                  <ImagePreview 
                    src={processedImages[index] || images[index]} 
                    onRemove={() => removeImage(index)}
                    index={index}
                    dimensions={FACE_DIMENSIONS[index]}
                  />
                ) : (
                  <div 
                    style={{
                      width: `${FACE_DIMENSIONS[index].width / 4}px`,
                      height: `${FACE_DIMENSIONS[index].height / 4}px`,
                    }}
                    className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-gray-400 text-sm">Empty</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[300px] border border-gray-200 rounded-lg overflow-hidden">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <Scene textures={processedImages} />
        </Canvas>
      </div>
    </div>
  );
};

export default MultiImageCube;
