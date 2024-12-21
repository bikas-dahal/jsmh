import { deleteBanner } from "@/actions/delete-banner";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type Params = Promise<{ id: string }>;


export default async function DeleteBannerRoute({
  params,
}: {
  params: Params;
}) {

  const { id } = (await params);

  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are you absolutely sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete this
            banner and remove all data from our servers.
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" asChild>
            <Link href="/dashboard/banner">Cancel</Link>
          </Button>
          <form action={deleteBanner}>
            <input type="hidden" name="bannerId" value={id} />
            <SubmitButton variants="destructive" text="Delete Product" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}