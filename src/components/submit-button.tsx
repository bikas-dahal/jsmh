'use client'

import { useFormStatus } from "react-dom"
import { Button } from '@/components/ui/button'

interface ButtonProps {
    text: string
    variants?: | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link"

}

export const SubmitButton = ({ text, variants }: ButtonProps) => {
    const { pending } = useFormStatus()

    if (pending) {
        return (
            <Button variant={variants} disabled>
                <span className="sr-only">Loading...</span>
                <svg aria-hidden="true" className="mr-2 h-4 w-4 animate-spin fill-blue-600 text-gray-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0C22.386 0 0 22.386 0 50s22.386 50 50 50 50-22.386 50-50S77.614 0 50 0zm0 92.857c-22.386 0-40.714-18.328-40.714-40.714S27.614 11.429 50 11.429 90.714 29.757 90.714 50 72.386 92.857 50 92.857z" fill="currentColor"></path>
                </svg>
                Please Wait...
            </Button>
        )
    }

    return (
        <Button variant={variants} type="submit">{text}</Button>
    )
}