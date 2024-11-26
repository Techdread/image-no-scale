# Image Processing Application

A React-based web application for image processing that maintains aspect ratio while scaling images to fit within specified dimensions, featuring interactive 3D cube visualizations.

## Features

- **Dual Canvas Display**
  - Original image preview (400x300 pixels)
  - Processed image preview (400x300 pixels)
  - White background with black borders

- **Image Processing**
  - Automatic scaling while maintaining aspect ratio
  - Center alignment within canvas
  - White margin addition for aspect ratio differences
  - No image cropping

- **3D Visualization**
  - Two interactive 3D cubes showing both versions of the image
  - Left cube: Original image (stretched) on all faces
  - Right cube: Processed image (aspect ratio maintained) on all faces
  - Auto-rotation for better visualization
  - Independent camera controls for each cube:
    * Rotate: Click and drag
    * Zoom: Mouse wheel
    * Pan: Right-click and drag

- **User Interface**
  - Clean, modern design using shadcn/ui
  - Intuitive file upload interface
  - Save functionality for processed images
  - Responsive layout

## Technology Stack

- React + Vite
- Three.js for 3D visualization
- @react-three/fiber for React integration
- @react-three/drei for 3D controls
- Tailwind CSS
- shadcn/ui components
- HTML5 Canvas API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd image-no-scale
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local server address shown in the terminal

## Usage

1. Click the file input to select an image
2. View both the original and processed versions in the 2D canvases:
   - Left canvas: Stretched original image
   - Right canvas: Aspect ratio maintained image

3. Explore the 3D visualization below:
   - Left cube shows the original image on all faces
   - Right cube shows the processed image on all faces
   - Both cubes auto-rotate for better visualization
   - Interact with each cube independently:
     * Click and drag to rotate
     * Use mouse wheel to zoom
     * Right-click and drag to pan

4. Click "Save Processed Image" to download the processed version as PNG

## Features in Detail

### Image Processing
- Images are automatically scaled to fit within a 400x300 pixel rectangle
- Aspect ratio is preserved during scaling
- Images are centered both horizontally and vertically
- White margins are added where necessary to maintain aspect ratio

### 3D Visualization
- Real-time 3D rendering using Three.js
- Automatic texture mapping on all cube faces
- Independent camera controls for each cube
- Smooth auto-rotation with adjustable speed
- High-quality texture rendering with proper encoding

### Save Functionality
- Processed images are saved in PNG format
- Default filename: "processed-image.png"
- Save button is disabled until an image is uploaded

## Development

Built with Vite for fast development and optimal production builds. Uses Three.js for 3D visualization, Tailwind CSS for styling, and shadcn/ui for consistent UI components.

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm run test
```

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
