import { RouterProvider, createRouter } from "@tanstack/react-router";
import { createRootRoute, createRoute } from "@tanstack/react-router";
import Layout from "./components/Layout";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";

// Lazy page imports are done inline for bundle splitting
import { Suspense, lazy } from "react";
import LoadingSpinner from "./components/ui/LoadingSpinner";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const StudentsPage = lazy(() => import("./pages/StudentsPage"));
const TeachersPage = lazy(() => import("./pages/TeachersPage"));
const SubjectsPage = lazy(() => import("./pages/SubjectsPage"));
const ExamsPage = lazy(() => import("./pages/ExamsPage"));
const MarksPage = lazy(() => import("./pages/MarksPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const StudentReportPage = lazy(() => import("./pages/StudentReportPage"));
const UploadPage = lazy(() => import("./pages/UploadPage"));
const CoAnalysisPage = lazy(() => import("./pages/CoAnalysisPage"));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <>{children}</>;
}

const rootRoute = createRootRoute();

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <LoginPage />,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute>
      <Layout>
        <Suspense
          fallback={<LoadingSpinner size="lg" className="m-auto mt-20" />}
        >
          <DashboardPage />
        </Suspense>
      </Layout>
    </ProtectedRoute>
  ),
});

const studentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/students",
  component: () => (
    <ProtectedRoute>
      <Layout>
        <Suspense
          fallback={<LoadingSpinner size="lg" className="m-auto mt-20" />}
        >
          <StudentsPage />
        </Suspense>
      </Layout>
    </ProtectedRoute>
  ),
});

const teachersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/teachers",
  component: () => (
    <ProtectedRoute>
      <Layout>
        <Suspense
          fallback={<LoadingSpinner size="lg" className="m-auto mt-20" />}
        >
          <TeachersPage />
        </Suspense>
      </Layout>
    </ProtectedRoute>
  ),
});

const subjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/subjects",
  component: () => (
    <ProtectedRoute>
      <Layout>
        <Suspense
          fallback={<LoadingSpinner size="lg" className="m-auto mt-20" />}
        >
          <SubjectsPage />
        </Suspense>
      </Layout>
    </ProtectedRoute>
  ),
});

const examsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/exams",
  component: () => (
    <ProtectedRoute>
      <Layout>
        <Suspense
          fallback={<LoadingSpinner size="lg" className="m-auto mt-20" />}
        >
          <ExamsPage />
        </Suspense>
      </Layout>
    </ProtectedRoute>
  ),
});

const marksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/marks",
  component: () => (
    <ProtectedRoute>
      <Layout>
        <Suspense
          fallback={<LoadingSpinner size="lg" className="m-auto mt-20" />}
        >
          <MarksPage />
        </Suspense>
      </Layout>
    </ProtectedRoute>
  ),
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: () => (
    <ProtectedRoute>
      <Layout>
        <Suspense
          fallback={<LoadingSpinner size="lg" className="m-auto mt-20" />}
        >
          <SearchPage />
        </Suspense>
      </Layout>
    </ProtectedRoute>
  ),
});

const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports",
  component: () => (
    <ProtectedRoute>
      <Layout>
        <Suspense
          fallback={<LoadingSpinner size="lg" className="m-auto mt-20" />}
        >
          <ReportsPage />
        </Suspense>
      </Layout>
    </ProtectedRoute>
  ),
});

const studentReportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports/$studentId",
  component: () => (
    <ProtectedRoute>
      <Layout>
        <Suspense
          fallback={<LoadingSpinner size="lg" className="m-auto mt-20" />}
        >
          <StudentReportPage />
        </Suspense>
      </Layout>
    </ProtectedRoute>
  ),
});

const uploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/upload",
  component: () => (
    <ProtectedRoute>
      <Layout>
        <Suspense
          fallback={<LoadingSpinner size="lg" className="m-auto mt-20" />}
        >
          <UploadPage />
        </Suspense>
      </Layout>
    </ProtectedRoute>
  ),
});

const coAnalysisRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/co-analysis",
  component: () => (
    <ProtectedRoute>
      <Layout>
        <Suspense
          fallback={<LoadingSpinner size="lg" className="m-auto mt-20" />}
        >
          <CoAnalysisPage />
        </Suspense>
      </Layout>
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  dashboardRoute,
  studentsRoute,
  teachersRoute,
  subjectsRoute,
  examsRoute,
  marksRoute,
  searchRoute,
  reportsRoute,
  studentReportRoute,
  uploadRoute,
  coAnalysisRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
