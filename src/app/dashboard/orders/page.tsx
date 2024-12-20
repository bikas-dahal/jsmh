import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>

    </Card>
  )
}

export default OrderPage
