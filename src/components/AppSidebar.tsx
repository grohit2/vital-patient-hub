
import { Home, Users, Calendar, Settings, Bell, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Patients", url: "/", icon: Users },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home className="h-4 w-4 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-semibold text-lg">VitalCare</h2>
                <p className="text-xs text-gray-500">Patient Hub</p>
              </div>
            )}
          </div>
          <SidebarTrigger className="mt-2" />
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={currentPath === item.url}>
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t">
          <Button className="w-full gap-2" size="sm">
            <Plus className="h-4 w-4" />
            {!isCollapsed && "Add Patient"}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
