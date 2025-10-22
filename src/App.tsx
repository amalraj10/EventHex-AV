
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Sessions from "./pages/Sessions";
import LiveSession from "./pages/LiveSession";
import NotFound from "./pages/NotFound";
import { ROUTE_PATHS } from "./constants/routes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE_PATHS.HOME} element={<Login />} />
          <Route path={ROUTE_PATHS.SESSIONS} element={<Sessions />} />
          <Route path={ROUTE_PATHS.LIVE_SESSION_TEMPLATE} element={<LiveSession />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  </QueryClientProvider>
);

export default App;