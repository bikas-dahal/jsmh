import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const OrderPage = () => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                Orders
            </CardTitle>
            <CardDescription>
                List of all orders from your customers
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            Customer
                        </TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                    <TableCell>
                        <p className="font-medium">
                            {/* {item.User?.name} */}
                            Ram Kumar
                        </p>
                        <p className="hidden md:flex text-sm text-muted-foreground">
                            {/* {item.User?.email} */}
                            4lTbD@example.com
                        </p>
                        </TableCell>
                        <TableCell>Order</TableCell>
                        <TableCell>
                            {/* {item.status} */}
                            Completed
                        </TableCell>
                        <TableCell>
                        {/* {new Intl.DateTimeFormat("en-US").format(item.createdAt)} */}
                        2021-09-09
                        </TableCell>
                        <TableCell className="text-right">
                        {/* ${new Intl.NumberFormat("en-US").format(item.amount / 100)} */}
                        $100
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>

    </Card>
  )
}

export default OrderPage
