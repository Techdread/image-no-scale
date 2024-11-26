# Image Processing Application

A React-based web application for image processing that maintains aspect ratio while scaling images to fit within specified dimensions.

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

- **User Interface**
  - Clean, modern design using shadcn/ui
  - Intuitive file upload interface
  - Save functionality for processed images
  - Responsive layout

## Technology Stack

- React + Vite
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
2. View both the original and processed versions side by side
3. Click "Save Processed Image" to download the processed image as PNG

## Features in Detail

### Image Processing
- Images are automatically scaled to fit within a 400x300 pixel rectangle
- Aspect ratio is preserved during scaling
- Images are centered both horizontally and vertically
- White margins are added where necessary to maintain aspect ratio

### Save Functionality
- Processed images are saved in PNG format
- Default filename: "processed-image.png"
- Save button is disabled until an image is uploaded

## Development

Built with Vite for fast development and optimal production builds. Uses Tailwind CSS for styling and shadcn/ui for consistent UI components.

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
