"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const textureSlides = [
  { src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format", caption: "Velvet finish cream" },
  { src: "https://images.unsplash.com/photo-1617897903246-71924e6cd92c?w=800&auto=format", caption: "Cooling jade stone" },
  { src: "https://images.unsplash.com/photo-1620916566390-51b23567c2d8?w=800&auto=format", caption: "Pearlescent serum drops" },
  { src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&auto=format", caption: "Silk touch accessories" },
];

export const TextureCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay()]);

  return (
    <div className="w-full overflow-hidden">
      <div ref={emblaRef} className="cursor-grab active:cursor-grabbing">
        <div className="flex gap-4">
          {textureSlides.map((slide, idx) => (
            <div key={idx} className="flex-[0_0_75%] md:flex-[0_0_40%] relative rounded-2xl overflow-hidden group">
              <div className="relative h-[320px] md:h-[400px]">
                <Image src={slide.src} alt={slide.caption} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-blur inline-block px-4 py-2 rounded-full backdrop-blur-md bg-white/20">
                    <p className="text-white font-medium text-sm md:text-base tracking-wide">{slide.caption}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};