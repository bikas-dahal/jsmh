import prisma from "@/lib/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

async function getData() {
    const data = await prisma.order.findMany({
      select: {
        amount: true,
        id: true,
        User: {
          select: {
            firstName: true,
            profileImage: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 7,
    });
  
    return data;
  }

export async function RecentSales () {
    const data = await getData();
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent sales</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
                {data.map((item) => (
                <div key={item.id} className="flex items-center gap-4" >
                    <Avatar className="hidden sm:flex h-9 w-9">
                    <AvatarImage src={item.User?.profileImage} alt="Avatar Image" />
                    <AvatarFallback>
                        {item.User?.firstName.slice(0, 3)}
                        {/* RK */}
                    </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                    <p className="text-sm font-medium">
                        {item.User?.firstName}
                        {/* Ram Kumar */}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {item.User?.email}
                        {/* 2h */}
                    </p>
                    </div>
                    <p className="ml-auto font-medium text-emerald-500 tracking-wide">
                    +${new Intl.NumberFormat("en-US").format(item.amount / 100)}
                    </p> 
                </div>
                ))}
            </CardContent>
        </Card>
    )
}