import { Image, Box, Grid2X2 } from 'lucide-react';
import { cn } from '../lib/utils';

const Sidebar = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'image-processing',
      icon: Image,
      title: 'Image Processing'
    },
    {
      id: '3d-visualization',
      icon: Box,
      title: '3D Visualization'
    },
    {
      id: 'multi-image-cube',
      icon: Grid2X2,
      title: 'Multi-Image Cube'
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-16 bg-white shadow-md flex flex-col items-center py-4 space-y-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:bg-gray-100",
              activeTab === tab.id ? "bg-gray-100 text-blue-600" : "text-gray-600"
            )}
            title={tab.title}
          >
            <Icon className="w-6 h-6" />
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;
