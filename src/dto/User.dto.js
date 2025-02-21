export default class UserDTO {
  static getUserTokenFrom = (user) => {
    return {
      name: `${user.first_name} ${user.last_name}`,
      role: user.role,
      email: user.email,
    };
  };
  static getUserInputFrom = async (user) => {
    return {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.hashPass,
      role: user.role || "user",
      pets: [],
    };
  };
}
