"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Users,
  FileText,
  CheckSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Bell,
  BookOpen,
  Palette,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { Badge } from "@/components/ui/badge"

interface SidebarProps {
  children: React.ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const themeSettings = useSelector((state: RootState) => state.ui.themeSettings)
  const notifications = useSelector((state: RootState) => state.ui.notifications)

  // Check for saved sidebar state
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed")
    if (savedState) {
      setCollapsed(savedState === "true")
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !collapsed
    setCollapsed(newState)
    localStorage.setItem("sidebarCollapsed", String(newState))
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
    },
    {
      title: "Customers",
      href: "/customers",
      icon: Users,
    },
    {
      title: "Leads",
      href: "/leads",
      icon: FileText,
    },
    {
      title: "Tasks",
      href: "/tasks",
      icon: CheckSquare,
    },
    {
      title: "Components",
      href: "/components",
      icon: Palette,
    },
    {
      title: "Documentation",
      href: "/documentation",
      icon: BookOpen,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-card text-card-foreground border-r transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-64",
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b flex items-center justify-between">
          {!collapsed && (
            <Link href="/dashboard" className="font-bold text-xl">
              ExoCRM
            </Link>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md transition-colors",
                    pathname === item.href || pathname?.startsWith(item.href + "/")
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted",
                    collapsed && "justify-center",
                  )}
                >
                  <item.icon size={20} />
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <Button variant="ghost" className={cn("w-full flex items-center py-2", collapsed && "justify-center")}>
            <LogOut size={20} />
            {!collapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-card text-card-foreground border-b h-16 flex items-center px-4">
          <div className="flex-1 flex items-center">
            <div className="relative w-64">
              <input type="text" placeholder="Search..." className="w-full h-9 px-3 py-2 bg-muted rounded-md text-sm" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="relative">
              <Button variant="ghost" size="icon">
                <Bell size={20} />
                {notifications.length > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                    variant="destructive"
                  >
                    {notifications.length}
                  </Badge>
                )}
              </Button>
            </div>
            <Button variant="ghost" size="icon">
              <UserCircle size={20} />
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground py-4 border-t">
          Developed by <strong>Exo Code Lab</strong>
        </footer>
      </div>
    </div>
  )
}

