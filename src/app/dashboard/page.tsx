import { RecentSales } from "@/components/dashboard/recent-sale";
import { DashboardStats } from "@/components/dashboard/stats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Dashboard() {
    return (
        <>
            <DashboardStats />
            <div className="grid gap-4 md:gp-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
                <Card className="xl:col-span-2">
                <CardHeader>
                    <CardTitle>Transactions</CardTitle>
                    <CardDescription>
                    Recent transactions from the last 7 days
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* <Chart data={data} /> */}
                </CardContent>
                </Card>
                <RecentSales />
      </div>

        </>
    )
}