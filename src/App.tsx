import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import CookieBanner from "@/components/CookieBanner";
import Index from "./pages/Index";
import Kontakt from "./pages/Kontakt";
import Oferta from "./pages/Oferta";
import Realizacje from "./pages/Realizacje";
import OMnie from "./pages/OMnie";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ProjectPage from "./pages/ProjectPage";
import PolitykaPrywatnosci from "./pages/PolitykaPrywatnosci";
import Regulamin from "./pages/Regulamin";
import Ebook from "./pages/Ebook";
import EbookPreview from "./pages/EbookPreview";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminPostEditor from "./pages/admin/AdminPostEditor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollRestoration = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const isAdmin = (pathname: string) => pathname.startsWith('/admin');

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const admin = isAdmin(pathname);
  return (
    <>
      {!admin && <AnnouncementBanner />}
      <ScrollRestoration />
      {!admin && <Navbar />}
      {children}
      {!admin && <Footer />}
      {!admin && <Chatbot />}
      {!admin && <CookieBanner />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/oferta" element={<Oferta />} />
          <Route path="/realizacje" element={<Realizacje />} />
          <Route path="/o-mnie" element={<OMnie />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/polityka-prywatnosci" element={<PolitykaPrywatnosci />} />
          <Route path="/regulamin" element={<Regulamin />} />
          <Route path="/ebook" element={<Ebook />} />
          <Route path="/ebook/przewodnik" element={<EbookPreview />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/wpisy" element={<AdminPosts />} />
          <Route path="/admin/wpisy/:id" element={<AdminPostEditor />} />
          <Route path="/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
