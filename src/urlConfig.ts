let dev = process.env.NODE_ENV !== "production";
let {DEV_URL,PROD_URL} = process.env;
export const api = dev ? DEV_URL : PROD_URL;
export const generateImgUrl = (image : any) => {
   return `https://mernbackend-server.herokuapp.com/public/${image}`;
}
