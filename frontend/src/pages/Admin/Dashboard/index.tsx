import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
   Layout,
   Briefcase,
   FileText,
   MessageSquare,
   Layers,
   Users,
   Menu,
   X,
   LogOut,
   ExternalLink,
   Bell,
   ChevronRight,
   Search,
   UserCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getDashboardStats, logout, getMe } from '@/lib/api';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const Dashboard = () => {
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
   const navigate = useNavigate();

   const { data: dashboardData, isLoading } = useQuery({
      queryKey: ['dashboard-stats'],
      queryFn: () => getDashboardStats(),
   });

   const { data: userData } = useQuery({
      queryKey: ['me'],
      queryFn: () => getMe(),
   });

   const handleLogout = async () => {
      try {
         await logout();
         navigate('/admin/login');
      } catch (error) {
         console.error('Logout failed', error);
      }
   };

   const stats = dashboardData?.data?.stats || [];
   const summary = dashboardData?.data?.summary || {};

   const sideItems = [
      { label: 'Dashboard', icon: Layout, active: true },
      { label: 'Services', icon: Layers, path: '/admin/services' },
      { label: 'Portfolio', icon: Briefcase, path: '/admin/portfolio' },
      { label: 'Blog Posts', icon: FileText, path: '/admin/posts' },
      { label: 'Messages', icon: MessageSquare, path: '/admin/messages' },
   ];

   if (isLoading) {
      return (
         <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-4">
               <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
               <p className="text-gray-500 font-medium italic">Memuat data dashboard...</p>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gray-50 flex overflow-hidden">
         {/* Mobile Sidebar Overlay */}
         <AnimatePresence>
            {isMobileSidebarOpen && (
               <>
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     onClick={() => setIsMobileSidebarOpen(false)}
                     className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                  />
                  <motion.aside
                     initial={{ x: '-100%' }}
                     animate={{ x: 0 }}
                     exit={{ x: '-100%' }}
                     transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                     className="fixed inset-y-0 left-0 w-72 bg-secondary-900 text-white z-50 lg:hidden flex flex-col"
                  >
                     <div className="p-6 flex items-center justify-between border-b border-white/10">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center font-bold">A</div>
                           <span className="font-bold tracking-tight">AFASYA ADMIN</span>
                        </div>
                        <button onClick={() => setIsMobileSidebarOpen(false)} className="p-2 hover:bg-white/10 rounded-xl">
                           <X size={20} />
                        </button>
                     </div>
                     <nav className="flex-1 p-4 space-y-2">
                        {sideItems.map((item: any) => (
                           <Link
                              key={item.label}
                              to={item.path || '#'}
                              onClick={() => setIsMobileSidebarOpen(false)}
                              className={cn(
                                 "flex items-center gap-4 px-4 py-3 rounded-xl transition-colors",
                                 item.active ? "bg-primary-600 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                              )}
                           >
                              <item.icon size={22} />
                              <span className="font-medium">{item.label}</span>
                           </Link>
                        ))}
                     </nav>
                     <div className="p-4 border-t border-white/10">
                        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors">
                           <LogOut size={22} />
                           <span className="font-medium">Sign Out</span>
                        </button>
                     </div>
                  </motion.aside>
               </>
            )}
         </AnimatePresence>

         {/* Sidebar Desktop */}
         <aside
            className={cn(
               "hidden lg:flex flex-col bg-secondary-900 text-white transition-all duration-300 z-30",
               isSidebarOpen ? "w-72" : "w-20"
            )}
         >
            <div className="p-6 flex items-center justify-between border-b border-white/10">
               <div className={cn("flex items-center gap-3 overflow-hidden", !isSidebarOpen && "hidden")}>
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center font-bold">A</div>
                  <span className="font-bold tracking-tight whitespace-nowrap">AFASYA ADMIN</span>
               </div>
               <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-white/10 rounded">
                  <Menu size={20} />
               </button>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
               {sideItems.map((item) => (
                  <Link
                     key={item.label}
                     to={item.path || '#'}
                     className={cn(
                        "flex items-center gap-4 px-4 py-3 rounded-xl transition-colors group",
                        item.active ? "bg-primary-600 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                     )}
                  >
                     <item.icon size={22} className={cn(!item.active && "group-hover:scale-110 transition-transform")} />
                     {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                  </Link>
               ))}
            </nav>

            <div className="p-4 border-t border-white/10">
               <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
               >
                  <LogOut size={22} />
                  {isSidebarOpen && <span className="font-medium">Sign Out</span>}
               </button>
            </div>
         </aside>

         {/* Main Content Area */}
         <div className="flex-1 flex flex-col h-screen overflow-hidden">
            {/* Header */}
            <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between z-20 shrink-0">
               <div className="flex items-center gap-4 text-gray-500">
                  <div className="bg-gray-100 p-2 rounded-lg lg:hidden cursor-pointer" onClick={() => setIsMobileSidebarOpen(true)}>
                     <Menu size={20} />
                  </div>
                  <div className="relative hidden md:block">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                     <input
                        type="text"
                        placeholder="Search everything..."
                        className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-primary-500"
                     />
                  </div>
               </div>

               <div className="flex items-center gap-6">
                  <button className="relative text-gray-500 hover:text-primary-600">
                     <Bell size={22} />
                     <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">3</span>
                  </button>
                  <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                     <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-gray-900">{userData?.data?.name || 'Admin User'}</p>
                        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Super Administrator</p>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold border-2 border-primary-50">
                        {userData?.data?.name?.charAt(0) || <UserCircle size={24} />}
                     </div>
                  </div>
               </div>
            </header>

            {/* Dashboard Scrollable Area */}
            <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
               <div className="max-w-[1400px] mx-auto">
                  <div className="mb-10">
                     <h1 className="text-3xl font-bold font-display text-gray-900 mb-2">Selamat Datang 👋</h1>
                     <p className="text-gray-500">Berikut adalah ringkasan perkembangan bisnis Afasya Projects hari ini.</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">
                     {stats.map((stat: any, idx: number) => (
                        <motion.div
                           key={idx}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: idx * 0.1 }}
                           className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all group"
                        >
                           <div className={cn(
                              "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform",
                              stat.color === 'blue' && "bg-blue-50 text-blue-600",
                              stat.color === 'emerald' && "bg-emerald-50 text-emerald-600",
                              stat.color === 'amber' && "bg-amber-50 text-amber-600",
                              stat.color === 'purple' && "bg-purple-50 text-purple-600",
                              stat.color === 'rose' && "bg-rose-50 text-rose-600",
                           )}>
                              <IconMap name={stat.icon} />
                           </div>
                           <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
                           <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </motion.div>
                     ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     {/* Recent Activity Table */}
                     <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm">
                           <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                              <h2 className="font-bold text-gray-900">Pesan Masuk Terbaru</h2>
                              <Link to="/admin/messages" className="text-sm text-primary-600 font-bold hover:underline inline-flex items-center gap-1">
                                 Lihat Semua <ChevronRight size={16} />
                              </Link>
                           </div>
                           <div className="overflow-x-auto">
                              <table className="w-full text-left">
                                 <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                                    <tr>
                                       <th className="px-6 py-4">Sender</th>
                                       <th className="px-6 py-4">Subject</th>
                                       <th className="px-6 py-4">Date</th>
                                       <th className="px-6 py-4">Action</th>
                                    </tr>
                                 </thead>
                                 <tbody className="divide-y divide-gray-50">
                                    {summary.messages?.map((msg: any) => (
                                       <tr key={msg.id} className="hover:bg-gray-50/50 transition-colors">
                                          <td className="px-6 py-4">
                                             <p className="font-bold text-gray-900 text-sm">{msg.name}</p>
                                          </td>
                                          <td className="px-6 py-4 text-sm text-gray-600">{msg.subject}</td>
                                          <td className="px-6 py-4 text-xs text-gray-400">
                                             {format(new Date(msg.created_at), 'dd MMM yyyy')}
                                          </td>
                                          <td className="px-6 py-4">
                                             <button className="p-2 hover:bg-white rounded-lg text-primary-600 shadow-sm transition-all border border-transparent hover:border-primary-100">
                                                <ExternalLink size={16} />
                                             </button>
                                          </td>
                                       </tr>
                                    ))}
                                    {!summary.messages?.length && (
                                       <tr>
                                          <td colSpan={4} className="px-6 py-10 text-center text-gray-400 italic text-sm">Belum ada pesan masuk.</td>
                                       </tr>
                                    )}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>

                     {/* Sidebar Stats / Recent Items */}
                     <div className="space-y-8">
                        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm">
                           <h2 className="font-bold text-gray-900 mb-6">Artikel Terbaru</h2>
                           <div className="space-y-6">
                              {summary.posts?.map((post: any) => (
                                 <div key={post.id} className="flex gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-gray-100 shrink-0 group-hover:bg-primary-50 transition-colors flex items-center justify-center text-gray-400 group-hover:text-primary-600">
                                       <FileText size={20} />
                                    </div>
                                    <div className="min-w-0">
                                       <h4 className="font-bold text-gray-900 text-sm line-clamp-1 group-hover:text-primary-600 transition-colors uppercase tracking-tight">
                                          {post.title}
                                       </h4>
                                       <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">
                                          {format(new Date(post.created_at), 'dd MMMM yyyy', { locale: id })}
                                       </p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                           <Link to="/admin/posts" className="btn bg-gray-50 hover:bg-gray-100 text-gray-900 w-full mt-8 rounded-2xl h-12 text-sm font-bold">
                              Kelola Artikel
                           </Link>
                        </div>

                        <div className="bg-primary-600 rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl shadow-primary-900/20">
                           <div className="relative z-10">
                              <h3 className="text-xl font-bold mb-2">Butuh Bantuan?</h3>
                              <p className="text-primary-100 text-sm mb-6 leading-relaxed">Tim technical support kami siap membantu konfigurasi sistem Anda.</p>
                              <a href="https://wa.me/6281234567890" className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-primary-50 transition-colors">
                                 Chat Support <MessageSquare size={16} />
                              </a>
                           </div>
                           <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                        </div>
                     </div>
                  </div>
               </div>
            </main>
         </div>
      </div>
   );
};

// Helper to map icon names to components
const IconMap = ({ name }: { name: string }) => {
   switch (name) {
      case 'Layout': return <Layout size={24} />;
      case 'Briefcase': return <Briefcase size={24} />;
      case 'FileText': return <FileText size={24} />;
      case 'MessageSquare': return <MessageSquare size={24} />;
      case 'Layers': return <Layers size={24} />;
      case 'Users': return <Users size={24} />;
      default: return <Layout size={24} />;
   }
};

export default Dashboard;
