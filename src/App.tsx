import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Public Pages
import Index from "./pages/Index";
import PackagesIndex from "./pages/packages/index";
import PackageDetail from "./pages/packages/[id]";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DestinationsPage from "./pages/destinations";
import NotFound from "./pages/NotFound";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmail from "@/pages/auth/VerifyEmail";
import ConfirmEmail from "@/pages/auth/ConfirmEmail";

// User Dashboard Pages
import DashboardIndex from "./pages/dashboard/Index";
import ProfileEdit from "./pages/dashboard/ProfileEdit";
import UserReservationDetail from "./pages/reservations/[id]";
import AddReview from "./pages/reviews/add/[id]";

// Admin Pages
import AdminIndex from "./pages/admin/Index";
import UsersAdmin from "./pages/admin/users/index";
import ReservationsAdmin from "./pages/admin/reservations/index";
import AdminReservationDetail from "./pages/admin/reservations/[id]";
import PackagesAdmin from "./pages/admin/packages/index";
import CreatePackage from "./pages/admin/packages/create";
import EditPackage from "./pages/admin/packages/edit/[id]";
import HotelsAdmin from "./pages/admin/hotels/index";
import CreateHotel from "./pages/admin/hotels/create";
import EditHotel from "./pages/admin/hotels/edit/[id]";
import AirlinesAdmin from "./pages/admin/airlines/index";
import CreateAirline from "./pages/admin/airlines/create";
import EditAirline from "./pages/admin/airlines/edit/[id]";
import ReviewsAdmin from "./pages/admin/reviews/index";
import ReviewDetail from "./pages/admin/reviews/[id]";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/packages" element={<PackagesIndex />} />
            <Route path="/packages/:id" element={<PackageDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/destinations" element={<DestinationsPage />} />

            {/* Auth Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/verify-email" element={<VerifyEmail />} />
            <Route path="/auth/confirm" element={<ConfirmEmail />} />

            {/* Protected User Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardIndex /></ProtectedRoute>} />
            <Route path="/profile/edit" element={<ProtectedRoute><ProfileEdit /></ProtectedRoute>} />
            <Route path="/reservations/:id" element={<ProtectedRoute><UserReservationDetail /></ProtectedRoute>} />
            <Route path="/reviews/add/:id" element={<ProtectedRoute><AddReview /></ProtectedRoute>} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminIndex /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute adminOnly><UsersAdmin /></ProtectedRoute>} />
            <Route path="/admin/reservations" element={<ProtectedRoute adminOnly><ReservationsAdmin /></ProtectedRoute>} />
            <Route path="/admin/reservations/:id" element={<ProtectedRoute adminOnly><AdminReservationDetail /></ProtectedRoute>} />
            <Route path="/admin/packages" element={<ProtectedRoute adminOnly><PackagesAdmin /></ProtectedRoute>} />
            <Route path="/admin/packages/create" element={<ProtectedRoute adminOnly><CreatePackage /></ProtectedRoute>} />
            <Route path="/admin/packages/edit/:id" element={<ProtectedRoute adminOnly><EditPackage /></ProtectedRoute>} />
            <Route path="/admin/hotels" element={<ProtectedRoute adminOnly><HotelsAdmin /></ProtectedRoute>} />
            <Route path="/admin/hotels/create" element={<ProtectedRoute adminOnly><CreateHotel /></ProtectedRoute>} />
            <Route path="/admin/hotels/edit/:id" element={<ProtectedRoute adminOnly><EditHotel /></ProtectedRoute>} />
            <Route path="/admin/airlines" element={<ProtectedRoute adminOnly><AirlinesAdmin /></ProtectedRoute>} />
            <Route path="/admin/airlines/create" element={<ProtectedRoute adminOnly><CreateAirline /></ProtectedRoute>} />
            <Route path="/admin/airlines/edit/:id" element={<ProtectedRoute adminOnly><EditAirline /></ProtectedRoute>} />
            <Route path="/admin/reviews" element={<ProtectedRoute adminOnly><ReviewsAdmin /></ProtectedRoute>} />
            <Route path="/admin/reviews/:id" element={<ProtectedRoute adminOnly><ReviewDetail /></ProtectedRoute>} />

            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
