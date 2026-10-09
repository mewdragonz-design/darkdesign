import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PostPage from "./pages/PostPage";
import Writing from "./pages/Writing";
import Demos from "./pages/Demos";
import DemoPage from "./pages/DemoPage";
import About from "./pages/About";
import CV from "./pages/CV";
import AdminLogin from "./pages/admin/Login";
import AdminRegister from "./pages/admin/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import PostForm from "./pages/admin/PostForm";
import AdminRoute from "./components/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog/:slug" element={<PostPage />} />
          <Route path="/highlights" element={<Navigate to="/" replace />} />
          <Route path="/topics" element={<Writing />} />
          <Route path="/writing" element={<Navigate to="/topics" replace />} />
          <Route path="/demos" element={<Demos />} />
          <Route path="/demos/:slug" element={<DemoPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Navigate to="/" replace />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/posts/new" element={<AdminRoute><PostForm /></AdminRoute>} />
          <Route path="/admin/posts/:id/edit" element={<AdminRoute><PostForm /></AdminRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
