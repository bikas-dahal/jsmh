import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export async function RecentSales () {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent sales</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
                {/* {data.map((item) => ( */}
                <div className="flex items-center gap-4" >
                    <Avatar className="hidden sm:flex h-9 w-9">
                    <AvatarImage src={'/globe.svg'} alt="Avatar Image" />
                    <AvatarFallback>
                        {/* {item.User?.firstName.slice(0, 3)} */}
                        RK
                    </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                    <p className="text-sm font-medium">
                        {/* {item.User?.name} */}
                        Ram Kumar
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {/* {item.User?.email} */}
                        2h
                    </p>
                    </div>
                    <p className="ml-auto font-medium">
                    {/* +${new Intl.NumberFormat("en-US").format(item.amount / 100)} */}
                    {/* +{item.amount / 100} */}
                    +$100
                    </p>
                </div>
                {/* ))} */}
            </CardContent>
        </Card>
    )
}