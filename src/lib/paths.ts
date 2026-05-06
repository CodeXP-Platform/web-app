export const paths = {
  home: "/",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },
  dashboard: {
    root: "/dashboard",
    challenges: "/dashboard/challenges",
    profile: "/dashboard/profile",
    profileEdit: "/dashboard/profile/edit",
    support: "/dashboard/support",
  },
} as const;
