import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    config.headers.Accept = "application/json";
    config.headers["Api-Version"] = "v1";

    // Only add auth if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;


// import axios from "axios";

// export const BASE_URL = import.meta.env.VITE_BASE_URL;

// const getHeaders = (isMultipart = false) => ({
//   "Api-Version": "v1",
//   "Content-Type": isMultipart
//     ? "multipart/form-data"
//     : "application/x-www-form-urlencoded",
//   Accept: "application/json",
// });

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: getHeaders(),
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (config.data instanceof FormData) {
//       config.headers = getHeaders(true);
//     } else {
//       config.headers = getHeaders();
//     }
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axiosInstance;
