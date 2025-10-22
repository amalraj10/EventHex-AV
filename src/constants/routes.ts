export const ROUTES = {
  HOME: "/",
  SESSIONS: "/sessions",
  LIVE_SESSION: (id: string) => `/session/${id}`,
  SESSION_VIEW: (id: string) => `/session/${id}/view`,
} as const;

export const ROUTE_PATHS = {
  HOME: "/",
  SESSIONS: "/sessions",
  LIVE_SESSION_TEMPLATE: "/session/:id",
  SESSION_VIEW_TEMPLATE: "/session/:id/view",
} as const;