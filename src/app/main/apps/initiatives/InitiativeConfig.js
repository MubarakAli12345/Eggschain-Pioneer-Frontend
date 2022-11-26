import React from "react";
import { authRoles } from "app/auth";
export const InitiativeConfig = {
  settings: {
    layout: {
      config: {
        footer: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: "/apps/clinic/logs",
      component: React.lazy(() => import("./InitiativesClinicLog")),
    },
    {
      path: "/apps/logs",
      component: React.lazy(() => import("./Initiatives")),
    },
    {
      path: "/apps/clinic/files",
      component: React.lazy(() => import("./InitiativeClinicFiles")),
    },
    //,
    // {
    //     path     : '/apps/calendar',
    //     component: React.lazy(() => import('./CalendarApp'))
    // }
  ],
};
