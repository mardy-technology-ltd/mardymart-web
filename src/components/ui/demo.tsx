import React from "react"
import { CardCarousel } from "@/components/ui/card-carousel"

const CardCarouselDemo = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
      alt: "Home & Kitchen Deals",
    },
    {
      src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80",
      alt: "Beauty & Personal Care",
    },
    {
      src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
      alt: "Gadgets & Electronics",
    },
    {
      src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&auto=format&fit=crop&q=80",
      alt: "Kids & Toys Gifts",
    },
  ]

  return (
    <div className="w-full my-8">
      <CardCarousel
        images={images}
        autoplayDelay={2000}
        showPagination={true}
        showNavigation={true}
      />
    </div>
  )
}

export default CardCarouselDemo

