import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MoreHorizontal, PlusCircleIcon } from 'lucide-react'
import Image from 'next/image'
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
        <Card className="mt-5">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            <TableRow >
                  <TableCell>
                    <Image
                      alt="Product Image"
                      src={'/file.svg'}
                      height={64}
                      width={64}
                      className="rounded-md object-cover h-16 w-16"
                    />
                  </TableCell>
                  <TableCell>
                    {/* {item.name} */}
                    Product Name
                  </TableCell>
                  <TableCell>
                    {/* {item.status} */}
                    Active
                  </TableCell>
                  <TableCell>
                    {/* ${new Intl.NumberFormat("en-US").format(item.price / 100)} */}
                    $100
                  </TableCell>
                  <TableCell>
                    {/* {new Intl.DateTimeFormat("en-US").format(item.createdAt)} */}
                    2021-09-09
                  </TableCell>
                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/products/`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/products/delete`}>
                            Delete
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

export default ProductPage
