import { DashboardNavigation } from "@/components/dashboard/navigation";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getKindeServerSession, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { CircleUser, LogOutIcon, MenuIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardLayout(
    { children }: { children: React.ReactNode }
){

    const {getUser} = getKindeServerSession()

    const user = await getUser()

    const adminEmail = ['bikkyofficial@gmail.com', 'bikkydahal@gmail.com']

    if (!user || !adminEmail.includes(user.email!)){ 
        return redirect('/')
    }



     return (
        <div className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white">
        <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <DashboardNavigation />
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="shrink-0 md:hidden"
              variant="outline"
              size="icon"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
                {/* <NavigationIcon className="h-5 w-5" /> */}
            </SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-6 text-lg font-medium mt-5">
              <DashboardNavigation />
            </nav>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="grid place-items-center">Name</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Button variant="ghost" size="sm" asChild>
                    <LogoutLink>
                        <LogOutIcon className="mr-2 h-4 w-4" /> Logout
                    </LogoutLink>
                </Button>  
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </header>
        <main className="mt-6">
            {children}
        </main>
    </div>
     )
}