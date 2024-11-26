import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Download } from 'lucide-react';

const ImageProcessor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const originalCanvasRef = useRef(null);
  const processedCanvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setSelectedImage(img);
          drawImage(img);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const drawImage = (img) => {
    // Draw original image
    const originalCtx = originalCanvasRef.current.getContext('2d');
    originalCtx.fillStyle = 'white';
    originalCtx.fillRect(0, 0, 400, 300);
    const originalDimensions = calculateDimensions(img, 400, 300);
    originalCtx.drawImage(
      img,
      originalDimensions.x,
      originalDimensions.y,
      originalDimensions.width,
      originalDimensions.height
    );

    // Draw processed image
    const processedCtx = processedCanvasRef.current.getContext('2d');
    processedCtx.fillStyle = 'white';
    processedCtx.fillRect(0, 0, 400, 300);
    const processedDimensions = calculateDimensions(img, 400, 300);
    processedCtx.drawImage(
      img,
      processedDimensions.x,
      processedDimensions.y,
      processedDimensions.width,
      processedDimensions.height
    );
  };

  const calculateDimensions = (img, maxWidth, maxHeight) => {
    let width = img.width;
    let height = img.height;
    const ratio = Math.min(maxWidth / width, maxHeight / height);

    width *= ratio;
    height *= ratio;

    const x = (maxWidth - width) / 2;
    const y = (maxHeight - height) / 2;

    return { width, height, x, y };
  };

  const handleSave = () => {
    if (!processedCanvasRef.current) return;

    const link = document.createElement('a');
    link.download = 'processed-image.png';
    link.href = processedCanvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Original Image</h3>
          <canvas
            ref={originalCanvasRef}
            width={400}
            height={300}
            className="border border-black bg-white"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Processed Image</h3>
          <canvas
            ref={processedCanvasRef}
            width={400}
            height={300}
            className="border border-black bg-white"
          />
        </div>
      </div>

      <div className="mt-6">
        <Button
          onClick={handleSave}
          disabled={!selectedImage}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Save Processed Image
        </Button>
      </div>
    </div>
  );
};

export default ImageProcessor;
