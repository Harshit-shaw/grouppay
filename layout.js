import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Users, Compass, Sparkles, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Home"),
    icon: Home,
  },
  {
    title: "Groups",
    url: createPageUrl("Groups"),
    icon: Users,
  },
  {
    title: "Explore",
    url: createPageUrl("Explore"),
    icon: Compass,
  },
  {
    title: "AI Insights",
    url: createPageUrl("AIInsights"),
    icon: Sparkles,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --background: #FAFAF9;
          --primary: #0891B2;
          --primary-light: #06B6D4;
          --accent: #F97316;
          --accent-light: #FB923C;
          --success: #10B981;
          --card-bg: #FFFFFF;
        }
      `}</style>
      <div className="min-h-screen flex w-full" style={{ backgroundColor: 'var(--background)' }}>
        {/* Desktop Sidebar */}
        <Sidebar className="border-r border-gray-200 hidden md:flex">
          <SidebarHeader className="border-b border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-900">Grouppay</h2>
                <p className="text-xs text-gray-500">Split smarter, together</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-cyan-50 hover:text-cyan-700 transition-all duration-200 rounded-xl mb-1 ${
                          location.pathname === item.url ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <header className="bg-white border-b border-gray-200 px-4 py-3 md:hidden sticky top-0 z-50 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200">
                  <Menu className="w-5 h-5" />
                </SidebarTrigger>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <h1 className="text-lg font-bold text-gray-900">Grouppay</h1>
                </div>
              </div>
            </div>
          </header>

          {/* Main content area */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>

          {/* Mobile Bottom Navigation */}
          <nav className="md:hidden bg-white border-t border-gray-200 px-2 py-2 sticky bottom-0 shadow-lg">
            <div className="flex justify-around items-center">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                    location.pathname === item.url
                      ? 'text-cyan-600'
                      : 'text-gray-500'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${location.pathname === item.url ? 'scale-110' : ''}`} />
                  <span className="text-xs font-medium">{item.title}</span>
                </Link>
              ))}
            </div>
          </nav>
        </main>
      </div>
    </SidebarProvider>
  );
}
