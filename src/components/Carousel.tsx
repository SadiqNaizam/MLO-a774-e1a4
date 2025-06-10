import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
// import { Button } from "@/components/ui/button"; // For custom Prev/Next controls
// import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  slides: React.ReactNode[];
  options?: Parameters<typeof useEmblaCarousel>[0];
  autoplayOptions?: Parameters<typeof Autoplay>[0];
  containerClassName?: string;
  slideClassName?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options = { loop: true },
  autoplayOptions = { delay: 4000, stopOnInteraction: false },
  containerClassName = "overflow-hidden",
  slideClassName = "flex-[0_0_100%] min-w-0 p-2", // Default padding for slides
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);

  console.log("Rendering Carousel with", slides.length, "slides");

  // const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  // const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Doraemon theme: Style prev/next buttons if implemented
  return (
    <div className={`embla ${containerClassName}`} ref={emblaRef}>
      <div className="embla__container flex">
        {slides.map((slideContent, index) => (
          <div className={`embla__slide ${slideClassName}`} key={index}>
            {slideContent}
          </div>
        ))}
      </div>
      {/* Optional: Custom Navigation Buttons */}
      {/* <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
        <Button variant="outline" size="icon" onClick={scrollPrev}><ChevronLeft /></Button>
      </div>
      <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
        <Button variant="outline" size="icon" onClick={scrollNext}><ChevronRight /></Button>
      </div> */}
    </div>
  );
};

export default Carousel;