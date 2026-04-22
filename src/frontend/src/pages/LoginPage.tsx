import { useNavigate } from "@tanstack/react-router";
import {
  BarChart2,
  FileText,
  GraduationCap,
  Shield,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import { Button } from "../components/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";

const FEATURES = [
  {
    icon: <BarChart2 size={20} />,
    title: "Performance Analytics",
    desc: "Visualize student progress with rich charts",
  },
  {
    icon: <Users size={20} />,
    title: "Multi-Role Access",
    desc: "Admin and teacher role-based permissions",
  },
  {
    icon: <FileText size={20} />,
    title: "Detailed Reports",
    desc: "Individual and class-level performance reports",
  },
  {
    icon: <Shield size={20} />,
    title: "Secure & Private",
    desc: "Powered by Internet Identity authentication",
  },
];

export default function LoginPage() {
  const { login, isAuthenticated, isInitializing, isLoggingIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="min-h-screen bg-background flex flex-col lg:flex-row"
      data-ocid="login.page"
    >
      {/* Left: branding panel */}
      <div className="lg:w-[45%] bg-card border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-between p-8 lg:p-12">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
            <GraduationCap size={22} className="text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-bold text-foreground tracking-tight">
            EduTrack
          </span>
        </div>

        {/* Hero text */}
        <div className="py-10 lg:py-0">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground leading-tight mb-4">
            Student Performance
            <br />
            <span className="text-primary">Analysis System</span>
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
            A unified platform for teachers and admins to track, analyze, and
            report student academic performance with clarity.
          </p>
        </div>

        {/* Feature list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map((feat) => (
            <div
              key={feat.title}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border"
            >
              <span className="text-primary shrink-0 mt-0.5">{feat.icon}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {feat.title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: login panel */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <GraduationCap size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Welcome back
            </h2>
            <p className="text-muted-foreground text-sm">
              Sign in with Internet Identity to access EduTrack
            </p>
          </div>

          <div className="space-y-4">
            {isInitializing ? (
              <div
                className="flex flex-col items-center gap-3 py-6"
                data-ocid="login.loading_state"
              >
                <LoadingSpinner size="lg" />
                <p className="text-sm text-muted-foreground">Initializing…</p>
              </div>
            ) : (
              <Button
                size="lg"
                className="w-full"
                onClick={login}
                loading={isLoggingIn}
                disabled={isInitializing}
                data-ocid="login.primary_button"
              >
                {isLoggingIn
                  ? "Opening Internet Identity…"
                  : "Sign in with Internet Identity"}
              </Button>
            )}

            <p className="text-center text-xs text-muted-foreground leading-relaxed">
              EduTrack uses Internet Identity for secure, passwordless
              authentication. Your first login automatically sets up your
              account.
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground mt-12">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
