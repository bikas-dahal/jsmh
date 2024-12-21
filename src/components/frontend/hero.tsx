import prisma from "@/lib/prisma"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import Image from "next/image"

export const Hero = async () => {


    const data = await prisma.banner.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <Carousel>
            <CarouselContent>
                {data.map((banner) => (
                    <CarouselItem key={banner.id}>
                        <div className="relative h-[60vh] lg:h-[80vh]" >
                            <Image src={banner.imageString} alt={banner.title} fill className="object-cover object-center w-full h-full rounded-xl" />
                        
                            <div className="absolute top-6 left-6 bg-opacity-75 bg-black text-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105">
                                <h1 className="text-xl lg:text-4xl font-bold">{banner.title}</h1>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="ml-15" />
            <CarouselNext className="mr-15" />
        </Carousel>
    )
}