import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";


async function getData() {
    const data = await prisma.banner.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  
    return data;
  }

export default async function BannerPage() {
    unstable_noStore();
    const data = await getData();

    // console.log(data.map((item) => item.imageString));

    return (
      <>
        <div className="flex items-center justify-end">
          <Button asChild className="flex gap-x-2">
            <Link href="/dashboard/banner/create">
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Add Banner</span>
            </Link>
          </Button>
        </div>
  
        <Card className="mt-5">
          <CardHeader className="">
            <CardTitle>Banners</CardTitle>
            <CardDescription>Manage your banners</CardDescription>
          </CardHeader>
          <CardContent>

            {data.length === 0 ? (
              <div className="text-sm text-semibold grid place-items-center">
                No Banners found.
                <br />
                <Button variant={'outline'} asChild className="text-blue-500 mt-4">
                    <Link href="/dashboard/banner/create" className="text-blue-500">Create one</Link>
                </Button>
              </div>
            ) : (
                <>
                <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
  
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Image
                        alt="Product Image"
                        src={item.imageString}
                        width={64}
                        height={64}
                        className="rounded-lg object-cover h-16 w-16"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
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
                            <Link href={`/dashboard/banner/${item.id}/delete`}>
                              Delete
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
                </>
            )}

            
          </CardContent>
        </Card>
      </>
    );
  }