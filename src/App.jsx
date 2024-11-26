import { useState } from 'react'
import ImageProcessor from './components/ImageProcessor'
import Sidebar from './components/Sidebar'
import MultiImageCube from './components/MultiImageCube'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('image-processing')
  const [originalImageUrl, setOriginalImageUrl] = useState(null)
  const [processedImageUrl, setProcessedImageUrl] = useState(null)

  const renderContent = () => {
    switch (activeTab) {
      case 'image-processing':
      case '3d-visualization':
        return (
          <ImageProcessor 
            showCubesOnly={activeTab === '3d-visualization'}
            originalImageUrl={originalImageUrl}
            processedImageUrl={processedImageUrl}
            setOriginalImageUrl={setOriginalImageUrl}
            setProcessedImageUrl={setProcessedImageUrl}
          />
        )
      case 'multi-image-cube':
        return <MultiImageCube />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 ml-16">
        <header className="bg-white shadow-sm py-4">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            {activeTab === 'image-processing' ? 'Image Processing' : 
             activeTab === '3d-visualization' ? '3D Visualization' : 
             'Multi-Image Cube'}
          </h1>
        </header>
        <main className="container mx-auto py-8">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App
