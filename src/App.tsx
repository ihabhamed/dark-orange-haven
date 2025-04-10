
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "@/components/auth/AuthContext";
import { AuthProvider } from "@/AuthProvider";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Consulting from "./pages/Consulting";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin pages
import Login from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ServicesAdmin from "./pages/admin/Services";
import ServiceEdit from "./pages/admin/ServiceEdit";
import BlogAdmin from "./pages/admin/Blog";
import BlogEdit from "./pages/admin/BlogEdit";
import Requests from "./pages/admin/Requests";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <div dir="rtl" lang="ar" className="font-arabic">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/consulting" element={<Consulting />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/services" element={<ServicesAdmin />} />
              <Route path="/admin/services/new" element={<ServiceEdit />} />
              <Route path="/admin/services/edit/:id" element={<ServiceEdit />} />
              <Route path="/admin/blog" element={<BlogAdmin />} />
              <Route path="/admin/blog/new" element={<BlogEdit />} />
              <Route path="/admin/blog/edit/:id" element={<BlogEdit />} />
              <Route path="/admin/requests" element={<Requests />} />
              <Route path="/admin/settings" element={<Settings />} />
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </div>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
