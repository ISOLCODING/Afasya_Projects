import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';

// Lazy load pages
const Home = lazy(() => import('@/pages/Home'));
const Services = lazy(() => import('@/pages/Services'));
const ServiceDetail = lazy(() => import('@/pages/Services/ServiceDetail'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const PortfolioDetail = lazy(() => import('@/pages/Portfolio/PortfolioDetail'));
const About = lazy(() => import('@/pages/About'));
const Blog = lazy(() => import('@/pages/blog'));
const BlogDetail = lazy(() => import('@/pages/blog/BlogDetail'));
const Team = lazy(() => import('@/pages/team'));
const Contact = lazy(() => import('@/pages/Contact'));
const DynamicPage = lazy(() => import('@/pages/DynamicPage'));
const Login = lazy(() => import('@/pages/Auth/Login'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const UserDashboard = lazy(() => import('@/pages/Dashboard'));
const Dashboard = lazy(() => import('@/pages/Admin/Dashboard'));
const NotFound = lazy(() => import('@/pages/404'));

// Simple ProtectedRoute component
const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
   const token = localStorage.getItem('auth_token');
   if (!token) return <Navigate to="/auth/login" replace />;
   return children ? <>{children}</> : <Outlet />;
};

const Loading = () => (
   <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
   </div>
);

const AppRoutes = () => {
   const location = useLocation();

   return (
      <Suspense fallback={<Loading />}>
         <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
               {/* Public Routes */}
               <Route path="/" element={<Home />} />
               <Route path="/about" element={<About />} />
               <Route path="/services" element={<Services />} />
               <Route path="/services/:slug" element={<ServiceDetail />} />
               <Route path="/portfolio" element={<Portfolio />} />
               <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
               <Route path="/blog" element={<Blog />} />
               <Route path="/blog/:slug" element={<BlogDetail />} />
               <Route path="/team" element={<Team />} />
               <Route path="/contact" element={<Contact />} />

               {/* Dynamic Pages - support multiple aliases */}
               <Route path="/about-us" element={<Navigate to="/about" replace />} />
               <Route path="/tentang-kami" element={<Navigate to="/about" replace />} />
               <Route path="/layanan" element={<Navigate to="/services" replace />} />
               <Route path="/portofolio" element={<Navigate to="/portfolio" replace />} />
               <Route path="/posts" element={<Navigate to="/blog" replace />} />
               <Route path="/artikel" element={<Navigate to="/blog" replace />} />
               <Route path="/tim" element={<Navigate to="/team" replace />} />
               <Route path="/kontak" element={<Navigate to="/contact" replace />} />

               {/* Custom Dynamic Pages (CMS Pages) */}
               <Route path="/pages/:slug" element={<DynamicPage />} />

               {/* Auth Routes */}
               <Route path="/auth/login" element={<Login />} />

               {/* Protected User Routes */}
               <Route element={<ProtectedRoute />}>
                  <Route path="/checkout/:packageId" element={<Checkout />} />
                  <Route path="/dashboard" element={<UserDashboard />} />
               </Route>

               {/* Protected Admin Routes */}
               <Route path="/admin" element={<ProtectedRoute />}>
                  <Route path="dashboard" element={<Dashboard />} />
               </Route>

               {/* 404 & Catch-all */}
               <Route path="/404" element={<NotFound />} />
               <Route path="/:slug" element={<DynamicPage />} />
               <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
         </AnimatePresence>
      </Suspense>
   );
};

export default AppRoutes;
