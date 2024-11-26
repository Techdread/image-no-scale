import { useRef } from 'react';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import ImageCuboid from './ImageCuboid';

const ImageProcessor = ({ 
  showCubesOnly = false,
  originalImageUrl,
  processedImageUrl,
  setOriginalImageUrl,
  setProcessedImageUrl
}) => {
  const originalCanvasRef = useRef(null);
  const processedCanvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setOriginalImageUrl(e.target.result);
          drawImage(img);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateDimensions = (img, maxWidth, maxHeight) => {
    let width = img.width;
    let height = img.height;
    
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
    
    const x = (maxWidth - width) / 2;
    const y = (maxHeight - height) / 2;
    
    return { width, height, x, y };
  };

  const drawImage = (img) => {
    // Draw original image (stretched)
    const originalCtx = originalCanvasRef.current.getContext('2d');
    originalCtx.fillStyle = 'white';
    originalCtx.fillRect(0, 0, 400, 300);
    originalCtx.drawImage(img, 0, 0, 400, 300);

    // Draw processed image (maintaining aspect ratio)
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

    // Update processed image URL
    setProcessedImageUrl(processedCanvasRef.current.toDataURL('image/png'));
  };

  const handleSave = () => {
    const link = document.createElement('a');
    link.download = 'processed-image.png';
    link.href = processedCanvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-8">
      {!showCubesOnly && (
        <>
          <div className="flex justify-center">
            <Button className="relative" onClick={() => document.getElementById('imageInput').click()}>
              <input
                type="file"
                id="imageInput"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              Upload Image
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Original Image</h3>
              <canvas
                ref={originalCanvasRef}
                width={400}
                height={300}
                className="border border-gray-200 rounded-lg w-full"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Processed Image</h3>
              <canvas
                ref={processedCanvasRef}
                width={400}
                height={300}
                className="border border-gray-200 rounded-lg w-full"
              />
              {processedImageUrl && (
                <div className="mt-4 flex justify-end">
                  <Button onClick={handleSave}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {(showCubesOnly || originalImageUrl) && (
        <div className="mt-8">
          <ImageCuboid
            originalImageUrl={originalImageUrl}
            processedImageUrl={processedImageUrl}
          />
        </div>
      )}
    </div>
  );
};

export default ImageProcessor;
