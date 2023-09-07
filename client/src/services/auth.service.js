import api from "./api";
import TokenService from "./token.service";

const API_URL = "http://localhost:5000/api/auth/";

const register = async (
  username,
  email,
  password,
  first_name,
  last_name,
  gender,
  birthday,
  roles
) => {
  return await api
    .post(API_URL + "signup", {
      username,
      email,
      password,
      first_name,
      last_name,
      gender,
      birthday,
      roles,
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
        console.log("User updated");
      }
      return response.data;
    });
};

const login_with_username = async (username, password) => {
  return await api
    .post(API_URL + "login/username", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
  };
  
  
  const login_with_email = async (email, password) => {
    console.log(email, password);
    return await api
    .post(API_URL + "login/email", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
          console.log("this is your data ", response.data.accessToken, response.data.refreshToken);
          console.log(response.data);
          TokenService.setUser(response.data);
        }
        return response.data;
      });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
    register,
    login_with_username,
    login_with_email,
    logout,
    getCurrentUser,
};

export default authService;