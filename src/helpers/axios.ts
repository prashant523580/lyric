
import store from "redux/store";
import axios from "axios";
// import { authConstants } from "../actions/constant";

import { api } from "../urlConfig";
let token ;
if(typeof window !== "undefined"){

     token = window.localStorage.getItem("token-");
}
const axiosInstance = axios.create({
        baseURL: api,
        headers:{
                "Content-Type": "application/json",
                "Authorization" : token ? token : ""
        },
});


axiosInstance.interceptors.response.use(
        (res) => {
          return res;
        },
        (error) => {
          // console.log(error.response);
          const status = error.response ? error.response.status : 400;
          if (status && status === 400) {
            localStorage.clear();
            // store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
          }
          return Promise.reject(error);
        }
      );
      
export default axiosInstance;

