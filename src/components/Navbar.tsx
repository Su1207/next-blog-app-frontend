"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Navbar() {
  const router = useRouter();
  const { user, hasHydrated, logout } = useAuthStore();
  const isLoggedIn = hasHydrated && !!user;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/" className="text-2xl font-bold text-black">
        Blog App
      </Link>

      <NavigationMenu>
        {isLoggedIn && (
          <NavigationMenuList>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="px-4 py-2 text-[16px] rounded-md border border-gray-200 hover:bg-gray-100 transition">
                  <span className="hidden sm:block">{user.name}</span>
                  <span className="text-lg font-bold sm:hidden">
                    {user?.name[0]?.charAt(0)}
                    {user?.name.split(" ")[1]?.charAt(0)}
                  </span>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-40">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="px-4 py-2 text-lg md:text-[16px]"
                  >
                    <Link href="/login">Login</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="sm:block hidden">
                  <NavigationMenuLink asChild className="px-4 py-2 text-[16px]">
                    <Link href="/signup">Signup</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        )}
      </NavigationMenu>
    </nav>
  );
}
