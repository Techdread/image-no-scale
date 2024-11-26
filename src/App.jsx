import ImageProcessor from './components/ImageProcessor'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm py-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Image Processing App
        </h1>
      </header>
      <main className="container mx-auto py-8">
        <ImageProcessor />
      </main>
    </div>
  )
}

export default App
