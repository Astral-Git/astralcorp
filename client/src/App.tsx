import { lazy, Suspense, memo } from "react";
import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Lazy load components to reduce initial bundle size
const Home = lazy(() => import("@/pages/home"));
const Gallery = lazy(() => import("@/pages/gallery"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Create QueryClient instance with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Cache queries for 5 minutes
      gcTime: 10 * 60 * 1000, // Garbage collect after 10 minutes
      retry: 1, // Reduce retry attempts for failed queries
    },
  },
});

// Memoize Router to prevent unnecessary re-renders
const Router = memo(() => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/gallery" component={Gallery} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;