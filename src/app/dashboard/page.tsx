import { Chart } from "@/components/dashboard/chart";
import { RecentSales } from "@/components/dashboard/recent-sale";
import { DashboardStats } from "@/components/dashboard/stats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";

export default async function Dashboard() {

    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const data = await prisma.order.findMany({
        where: {
            createdAt: {
                gte: lastWeek,
            }
        },
        select: {
            amount: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "asc",
        },
    })

    // console.log('data', data);

    const result = data.map((item) => {
        return {
            date: new Intl.DateTimeFormat("en-US").format(new Date(item.createdAt)),
            revenue: item.amount / 100,
        }
    })

    console.log('result', result);

    return (
        <>
            <DashboardStats  />
            <div className="grid gap-4 md:gp-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
                <Card className="xl:col-span-2">
                <CardHeader>
                    <CardTitle>Transactions</CardTitle>
                    <CardDescription>
                    Recent transactions from the last 7 days
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Chart data={result} />
                </CardContent>
                </Card>
                <RecentSales />
      </div>

        </>
    )
}