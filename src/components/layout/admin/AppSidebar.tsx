"use client";

import {
    Home,
    Inbox,
    Search,
    Settings,
    Plus,
    Shirt,
    User,
    ShoppingBasket,
    LayoutDashboard,
    LogOut,
    Bell,
    CreditCard,
    BadgeCheck,
    ChevronsUpDown,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import AddOrder from "./AddOrder";
import AddUser from "./AddUser";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";
import AddCollection from "./AddCollection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Inbox",
        url: "inbox",
        icon: Inbox,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "settings",
        icon: Settings,
    },
];

const admin = {
    name: "Monicx",
    email: "admin@monicxed.com",
    avatar: "https://avatars.githubusercontent.com/u/1486366",
};

export default function AppSidebar() {
    const { setOpenMobile, isMobile } = useSidebar();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="h-[calc(32px+16px+16px)] py-4">
                <SidebarMenu className="py-0!">
                    <SidebarMenuItem className="py-0!">
                        <SidebarMenuButton asChild className="py-0!">
                            <Link
                                href="/admin"
                                className="flex h-8! items-center overflow-clip py-0!"
                            >
                                <Image
                                    src="/logo.svg"
                                    alt="logo"
                                    width={20}
                                    height={20}
                                    className="h-5! overflow-clip"
                                />
                                <span>Lama Dev</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarSeparator className="bg-border! mx-0!" />
            <SidebarContent className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden">
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            onClick={() => setOpenMobile(false)}
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    {item.title === "Inbox" && (
                                        <SidebarMenuBadge>24</SidebarMenuBadge>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {/* PRODUCTS */}
                <SidebarGroup>
                    <SidebarGroupLabel>Products</SidebarGroupLabel>
                    <SidebarGroupAction>
                        <Plus /> <span className="sr-only">Add Products</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link
                                        href="/admin/products"
                                        onClick={() => setOpenMobile(false)}
                                    >
                                        <Shirt />
                                        See All Products
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {/* Add Product */}
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <SidebarMenuButton>
                                                <Plus />
                                                Add Product
                                            </SidebarMenuButton>
                                        </SheetTrigger>
                                        <AddProduct />
                                    </Sheet>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {/* Categories */}
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link
                                        href="/admin/categories"
                                        onClick={() => setOpenMobile(false)}
                                    >
                                        <Shirt />
                                        See All Categories
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <SidebarMenuButton>
                                                <Plus />
                                                Add Category
                                            </SidebarMenuButton>
                                        </SheetTrigger>
                                        <AddCategory />
                                    </Sheet>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {/* Collections */}
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link
                                        href="/admin/collections"
                                        onClick={() => setOpenMobile(false)}
                                    >
                                        <Shirt />
                                        See All Collections
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <SidebarMenuButton>
                                                <Plus />
                                                Add Collection
                                            </SidebarMenuButton>
                                        </SheetTrigger>
                                        <AddCollection />
                                    </Sheet>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {/* USERS */}
                <SidebarGroup>
                    <SidebarGroupLabel>Users</SidebarGroupLabel>
                    <SidebarGroupAction>
                        <Plus /> <span className="sr-only">Add Users</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link
                                        href="/admin/users"
                                        onClick={() => setOpenMobile(false)}
                                    >
                                        <User />
                                        See All Users
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {/* Add User */}
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <SidebarMenuButton>
                                                <Plus />
                                                Add User
                                            </SidebarMenuButton>
                                        </SheetTrigger>
                                        <AddUser />
                                    </Sheet>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {/* PAYMENT*/}
                <SidebarGroup>
                    <SidebarGroupLabel>Orders</SidebarGroupLabel>
                    <SidebarGroupAction>
                        <Plus /> <span className="sr-only">Add Order</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link
                                        href="/admin/payments"
                                        onClick={() => setOpenMobile(false)}
                                    >
                                        <ShoppingBasket />
                                        See All Transactions
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {/* Add User */}
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <SidebarMenuButton>
                                                <Plus />
                                                Add Order
                                            </SidebarMenuButton>
                                        </SheetTrigger>
                                        <AddOrder />
                                    </Sheet>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="h-16! overflow-clip">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            src={admin.avatar}
                                            alt={admin.name}
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            CN
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">
                                            {admin.name}
                                        </span>
                                        <span className="truncate text-xs">
                                            {admin.email}
                                        </span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage
                                                src={admin.avatar}
                                                alt={admin.name}
                                            />
                                            <AvatarFallback className="rounded-lg">
                                                CN
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">
                                                {admin.name}
                                            </span>
                                            <span className="truncate text-xs">
                                                {admin.email}
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck />
                                        Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard />
                                        Billing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell />
                                        Notifications
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem variant="destructive">
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
