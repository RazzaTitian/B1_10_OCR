const mainRoute = process.env.API_URL;

//users
const usersRoute = `${mainRoute}/api/users`;
const historyRoute = `${mainRoute}/api/history`;


export const apiRoutes = {
  main: mainRoute,
  users: {
    main: usersRoute,
    register: `${usersRoute}/register`,
    login: `${usersRoute}/login`,
  },
  history: {
    main: historyRoute,
    getbyid: (id: string) => `${historyRoute}/${id}`,
    add: `${historyRoute}/add`
  }
};