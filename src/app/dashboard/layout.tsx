import AppSidebar from "@/components/shared/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // TODO: Here should be implemented the user authentication
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col w-full">{children}</main>
        </SidebarProvider>
    );
}
