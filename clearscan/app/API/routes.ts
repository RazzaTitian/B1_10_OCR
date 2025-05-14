const mainRoute = process.env.NEXT_PUBLIC_API_URL;

//users
const usersRoute = `${mainRoute}/api/users`;


export const apiRoutes = {
  main: mainRoute,
  users: {
    main: usersRoute,
    register: `${usersRoute}/register`,
    login: `${usersRoute}/login`,
  },
};