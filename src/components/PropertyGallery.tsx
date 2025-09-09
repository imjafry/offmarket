import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Play, Maximize } from 'lucide-react';
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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] rounded-2xl overflow-hidden">
        {/* Main Image */}
        <div 
          className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden"
          onClick={() => openLightbox(0)}
        >
          <img
            src={images[0] || '/placeholder.svg'}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {hasVideo && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Button 
                size="lg" 
                className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full w-16 h-16 p-0"
              >
                <Play className="h-8 w-8" />
              </Button>
            </div>
          )}
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm">
            Trending
          </div>
        </div>

        {/* Secondary Images */}
        {images.slice(1, 5).map((image, index) => (
          <div
            key={index + 1}
            className="relative group cursor-pointer overflow-hidden"
            onClick={() => openLightbox(index + 1)}
          >
            <img
              src={image}
              alt={`${title} - ${index + 2}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="text-white text-center">
                  <Maximize className="h-8 w-8 mx-auto mb-2" />
                  <span className="text-lg font-semibold">+{images.length - 5}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-6xl max-h-[90vh] w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setLightboxIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Image */}
              <img
                src={images[lightboxIndex]}
                alt={`${title} - ${lightboxIndex + 1}`}
                className="w-full h-full object-contain rounded-lg"
              />

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                {lightboxIndex + 1} / {images.length}
              </div>

              {/* Thumbnails */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2 max-w-lg mx-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setLightboxIndex(index)}
                    className={`w-16 h-12 rounded-lg overflow-hidden ${
                      index === lightboxIndex ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-100'
                    } transition-all`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};