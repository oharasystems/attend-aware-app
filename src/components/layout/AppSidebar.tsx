import { useState } from "react";
import { 
  Users, 
  Calendar, 
  User, 
  ChartBar,
  Settings,
  Home,
  BookOpen,
  UserCheck
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
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
import { UserRole } from "@/types";

interface AppSidebarProps {
  userRole: UserRole;
}

const navigationItems = {
  admin: [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "Students", url: "/students", icon: Users },
    { title: "Classes", url: "/classes", icon: BookOpen },
    { title: "Attendance", url: "/attendance", icon: UserCheck },
    { title: "Analytics", url: "/analytics", icon: ChartBar },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
  teacher: [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "My Classes", url: "/classes", icon: BookOpen },
    { title: "Attendance", url: "/attendance", icon: UserCheck },
    { title: "Students", url: "/students", icon: Users },
    { title: "Schedule", url: "/schedule", icon: Calendar },
  ],
  student: [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "My Classes", url: "/classes", icon: BookOpen },
    { title: "Attendance", url: "/attendance", icon: UserCheck },
    { title: "Schedule", url: "/schedule", icon: Calendar },
  ],
  parent: [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "My Children", url: "/children", icon: Users },
    { title: "Attendance", url: "/attendance", icon: UserCheck },
    { title: "Schedule", url: "/schedule", icon: Calendar },
  ],
};

export function AppSidebar({ userRole }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const items = navigationItems[userRole] || navigationItems.student;
  
  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };
  
  const getNavClass = (path: string) => {
    return isActive(path) 
      ? "bg-nav-active text-primary-foreground font-medium" 
      : "hover:bg-nav-hover transition-colors";
  };

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-64"} transition-all duration-300 border-r border-border`}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar">
        <div className="p-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-sidebar-foreground">EduCRM</h2>
                <p className="text-xs text-sidebar-foreground/60 capitalize">{userRole} Portal</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
          )}
        </div>

        <SidebarGroup className="px-2 py-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`${getNavClass(item.url)} flex items-center gap-3 px-3 py-2 rounded-lg text-sm`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}