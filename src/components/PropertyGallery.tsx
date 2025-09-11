import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface PropertyGalleryProps {
  images: string[];
  title: string;
  hasVideo?: boolean;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ 
  images, 
  title, 
  hasVideo = false 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-muted-foreground/20 rounded-full flex items-center justify-center mx-auto">
            <Maximize2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="relative group">
        <div className="aspect-video bg-muted rounded-2xl overflow-hidden relative">
          <motion.img
            key={currentIndex}
            src={images[currentIndex] || '/property-hero.jpg'}
            alt={`${title} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Video Play Button */}
          {hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full w-20 h-20 p-0"
              >
                <Play className="h-10 w-10 ml-1" />
              </Button>
            </div>
          )}

          {/* Fullscreen Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={openFullscreen}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Maximize2 className="h-5 w-5" />
          </Button>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === currentIndex
                    ? 'border-primary'
                    : 'border-transparent hover:border-muted-foreground'
                }`}
              >
                <img
                  src={image || '/placeholder.svg'}
                  alt={`${title} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeFullscreen}
          >
            <div className="relative max-w-7xl max-h-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={closeFullscreen}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="relative">
                <img
                  src={images[currentIndex] || '/placeholder.svg'}
                  alt={`${title} - Fullscreen ${currentIndex + 1}`}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />

                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </>
                )}
              </div>

              {/* Fullscreen Thumbnails */}
              {images.length > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToImage(index);
                      }}
                      className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentIndex
                          ? 'border-white'
                          : 'border-white/50 hover:border-white/80'
                      }`}
                    >
                      <img
                        src={image || '/placeholder.svg'}
                        alt={`${title} - Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};