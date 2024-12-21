'use client'

import Image from "next/image"
import { useState } from "react"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageSliderProps {
    images: string[]    
}

export const ImageSlider = ({ images }: ImageSliderProps) => {

    const [currentImage, setCurrentImage] = useState(0)

    const handlePrevImage = () => {
        setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const handleNextImage = () => {
        setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const handleImageClick = (index: number) => {
        setCurrentImage(index)
    }


    return (
        <>
            <div className="grid gap-6 md:gap-3 items-start">
                <div className="relative overflow-hidden rounded-lg">
                    <Image
                    width={600}
                    height={600}
                    src={images[currentImage]}
                    alt="Product image"
                    className="object-cover w-[600px] h-[600px]"
                    />

                    <div className="absolute inset-0 flex items-center justify-between px-4">
                    <Button onClick={handlePrevImage} variant="ghost" size="icon">
                        <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button onClick={handleNextImage} variant="ghost" size="icon">
                        <ChevronRight className="w-6 h-6" />
                    </Button>
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-4">
                    {images.map((image, index) => (
                    <div
                        className={cn(
                        index === currentImage
                            ? "border-2 border-primary"
                            : "border border-gray-200",
                        "relative overflow-hidden rounded-lg cursor-pointer"
                        )}
                        key={index}
                        onClick={() => handleImageClick(index)}
                    >
                        <Image
                        src={image}
                        alt="Product Image"
                        width={100}
                        height={100}
                        className="object-cover w-[100px] h-[100px]"
                        />
                    </div>
                    ))}
                </div>
                </div>
        </>
    )
}