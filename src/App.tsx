const App = () => (
  <QueryClientProvider client={queryClient}>
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
  </QueryClientProvider>
);
