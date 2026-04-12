import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/LoginPage";
import UserDashboard from "./pages/user/UserDashboard";
import UploadProject from "./pages/user/UploadProject";
import TestMonitor from "./pages/user/TestMonitor";
import TestResults from "./pages/user/TestResults";
import ResultsSummary from "./pages/user/ResultsSummary";
import Reports from "./pages/user/Reports";
import UserSettings from "./pages/user/UserSettings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersManagement from "./pages/admin/UsersManagement";
import UserDetail from "./pages/admin/UserDetail";
import ToolsManagement from "./pages/admin/ToolsManagement";
import AdminSettings from "./pages/admin/AdminSettings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/user",
    children: [
      { index: true, Component: UserDashboard },
      { path: "upload", Component: UploadProject },
      { path: "monitor/:projectId", Component: TestMonitor },
      { path: "results/:projectId", Component: TestResults },
      { path: "results-summary", Component: ResultsSummary },
      { path: "reports", Component: Reports },
      { path: "settings", Component: UserSettings },
    ],
  },
  {
    path: "/admin",
    children: [
      { index: true, Component: AdminDashboard },
      { path: "users", Component: UsersManagement },
      { path: "users/:userId", Component: UserDetail },
      { path: "tools", Component: ToolsManagement },
      { path: "settings", Component: AdminSettings },
    ],
  },
]);