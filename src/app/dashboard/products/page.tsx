import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ProductPage = () => {
  return (
    <>
        <div className='flex items-center justify-end'>
            <Button className='flex items-center gap-x-2' asChild>
                <Link href={'/dashboard/products/create'}>
                    <PlusCircleIcon className='w-5 h-5' />
                    Add Product
                </Link>
            </Button>
        </div>
        <Card>
            
        </Card>
    </>
  )
}

export default ProductPage
