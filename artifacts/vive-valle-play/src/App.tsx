import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TenantProvider } from "./context/TenantContext";
import { AppProvider } from "./context/AppContext";
import HomePage from "./pages/HomePage";
import GroupPage from "./pages/GroupPage";
import MomentPage from "./pages/MomentPage";
import LibraryPage from "./pages/LibraryPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";
import MemoryPage from "./pages/MemoryPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/grupo" component={GroupPage} />
      <Route path="/momento" component={MomentPage} />
      <Route path="/juegos" component={LibraryPage} />
      <Route path="/juego/:id" component={GamePage} />
      <Route path="/resultado/:id" component={ResultPage} />
      <Route path="/recuerdos" component={MemoryPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TenantProvider>
        <AppProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </AppProvider>
      </TenantProvider>
    </QueryClientProvider>
  );
}

export default App;
