export const paths = {
  home: "/",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    callbackGithub: "/auth/callback/github",
  },
  dashboard: {
    root: "/dashboard",
    challenges: "/dashboard/challenges",
    challengeDetail: (id: string) => `/dashboard/challenges/${id}`,
    profile: "/dashboard/profile",
    profileEdit: "/dashboard/profile/edit",
    support: "/dashboard/support",
    teacher: {
      root: "/dashboard/teacher",
      newChallenge: "/dashboard/teacher/challenges/new",
      challengeManage: (id: string) => `/dashboard/teacher/challenges/${id}`,
    },
  },
} as const;
