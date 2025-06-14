
"use client";

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  images: string[];
  altText: string;
  dataAiHint?: string;
}

const ProductImageGallery = ({ images, altText, dataAiHint = "product" }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  if (!images || images.length === 0) {
    return <div className="aspect-square w-full bg-muted rounded-lg flex items-center justify-center text-muted-foreground">No Image Available</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square w-full relative overflow-hidden rounded-lg shadow-md">
        <Image
          src={selectedImage}
          alt={altText}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          data-ai-hint={`${dataAiHint} large`}
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={cn(
                "aspect-square relative overflow-hidden rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all",
                selectedImage === image ? 'border-primary shadow-lg' : 'border-transparent hover:border-muted-foreground/50'
              )}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${altText} - thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="10vw"
                data-ai-hint={`${dataAiHint} thumbnail`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
