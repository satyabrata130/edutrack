import { Link, useRouter } from "@tanstack/react-router";
import {
  BarChart2,
  BookOpen,
  ChevronDown,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  LogOut,
  Menu,
  Search,
  Shield,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCallerProfile, useIsAdmin } from "../hooks/useBackend";
import { cn } from "../lib/utils";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "Students",
    path: "/admin/students",
    icon: <GraduationCap size={18} />,
    adminOnly: true,
  },
  {
    label: "Teachers",
    path: "/admin/teachers",
    icon: <Users size={18} />,
    adminOnly: true,
  },
  {
    label: "Subjects",
    path: "/admin/subjects",
    icon: <BookOpen size={18} />,
    adminOnly: true,
  },
  {
    label: "Exams",
    path: "/admin/exams",
    icon: <ClipboardList size={18} />,
    adminOnly: true,
  },
  { label: "Marks", path: "/marks", icon: <FileText size={18} /> },
  { label: "Search", path: "/search", icon: <Search size={18} /> },
  { label: "Reports", path: "/reports", icon: <BarChart2 size={18} /> },
  { label: "Upload Data", path: "/upload", icon: <Upload size={18} /> },
  { label: "CO Analysis", path: "/co-analysis", icon: <LineChart size={18} /> },
];

function NavLink({
  item,
  currentPath,
  onClick,
}: {
  item: NavItem;
  currentPath: string;
  onClick?: () => void;
}) {
  const isActive =
    currentPath === item.path || currentPath.startsWith(`${item.path}/`);

  return (
    <Link
      to={item.path}
      onClick={onClick}
      data-ocid={`nav.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-smooth",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      )}
    >
      <span className={cn(isActive ? "text-primary" : "text-muted-foreground")}>
        {item.icon}
      </span>
      {item.label}
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminExpanded, setAdminExpanded] = useState(true);
  const { logout, isAuthenticated } = useAuth();
  const { data: profile } = useCallerProfile();
  const { data: isAdmin } = useIsAdmin();
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const teacherItems = NAV_ITEMS.filter((i) => !i.adminOnly);
  const adminItems = NAV_ITEMS.filter((i) => i.adminOnly);

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside
      className={cn(
        "flex flex-col h-full bg-sidebar border-r border-sidebar-border",
        mobile ? "w-64" : "w-60",
      )}
      data-ocid="layout.sidebar"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <GraduationCap size={18} className="text-primary-foreground" />
        </div>
        <span className="font-display font-semibold text-sidebar-foreground tracking-tight">
          EduTrack
        </span>
        {mobile && (
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="ml-auto text-muted-foreground hover:text-foreground"
            data-ocid="layout.close_sidebar_button"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {teacherItems.map((item) => (
          <NavLink
            key={item.path}
            item={item}
            currentPath={currentPath}
            onClick={() => setSidebarOpen(false)}
          />
        ))}

        {/* Admin section */}
        {isAdmin && (
          <div className="pt-3">
            <button
              type="button"
              onClick={() => setAdminExpanded((v) => !v)}
              data-ocid="layout.admin_section_toggle"
              className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              <Shield size={12} />
              Admin
              <ChevronDown
                size={12}
                className={cn(
                  "ml-auto transition-transform",
                  adminExpanded ? "rotate-180" : "",
                )}
              />
            </button>
            {adminExpanded && (
              <div className="mt-1 space-y-1">
                {adminItems.map((item) => (
                  <NavLink
                    key={item.path}
                    item={item}
                    currentPath={currentPath}
                    onClick={() => setSidebarOpen(false)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* User footer */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-md bg-sidebar-accent/50">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <span className="text-primary text-xs font-semibold">
              {(profile?.name ?? "U").charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {profile?.name ?? "Teacher"}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {profile?.role ?? (isAdmin ? "admin" : "teacher")}
            </p>
          </div>
          {isAuthenticated && (
            <button
              type="button"
              onClick={logout}
              data-ocid="layout.logout_button"
              title="Logout"
              className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex shrink-0">
        <Sidebar />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            role="button"
            tabIndex={0}
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
          />
          <div className="relative z-50 h-full">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top header */}
        <header
          className="bg-card border-b border-border shadow-subtle h-14 flex items-center px-4 shrink-0 gap-3"
          data-ocid="layout.header"
        >
          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            data-ocid="layout.mobile_menu_button"
          >
            <Menu size={20} />
          </button>

          {/* Page title derived from path */}
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-foreground truncate">
              {getPageTitle(currentPath)}
            </h1>
          </div>

          {/* Header right */}
          <div className="flex items-center gap-2 shrink-0">
            {isAdmin && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <Shield size={10} />
                Admin
              </span>
            )}
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-xs font-semibold">
                {(profile?.name ?? "U").charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main
          className="flex-1 overflow-y-auto bg-background p-6"
          data-ocid="layout.main_content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

function getPageTitle(path: string): string {
  if (path === "/dashboard") return "Dashboard";
  if (path === "/admin/students") return "Students";
  if (path === "/admin/teachers") return "Teachers";
  if (path === "/admin/subjects") return "Subjects";
  if (path === "/admin/exams") return "Exams";
  if (path === "/marks") return "Marks Entry";
  if (path === "/search") return "Search Students";
  if (path.startsWith("/reports/")) return "Student Report";
  if (path === "/reports") return "Reports";
  if (path === "/upload") return "Upload Data";
  if (path === "/co-analysis") return "CO Analysis";
  return "EduTrack";
}
