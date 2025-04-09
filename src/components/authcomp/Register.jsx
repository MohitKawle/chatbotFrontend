import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ISLOADING, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(register(form));

    if (register.fulfilled.match(result)) {
      navigate("/signin"); // Redirect after success
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Register</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 text-sm text-red-400 text-center">
            {typeof error === "string"
              ? error
              : error?.detail || "Something went wrong"}
          </div>
        )}

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-medium transition duration-200"
          disabled={ISLOADING}
        >
          {ISLOADING ? "Registering..." : "Create Account"}
        </button>

        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;



// // src/components/Register.jsx
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { register } from "../../store/auth/authSlice";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { ISLOADING, error } = useSelector((state) => state.auth);

//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const result = await dispatch(register(form));

//     if (register.fulfilled.match(result)) {
//       // Redirect to login after successful registration
//       navigate("/signin");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-sm text-white"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={form.username}
//           onChange={handleChange}
//           className="w-full p-3 rounded bg-gray-700 mb-3"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full p-3 rounded bg-gray-700 mb-3"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full p-3 rounded bg-gray-700 mb-4"
//           required
//         />

//         {error && (
//           <p className="text-red-400 text-sm mb-3 text-center">
//             {typeof error === "string" ? error : JSON.stringify(error)}
//           </p>
//         )}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg"
//           disabled={ISLOADING}
//         >
//           {ISLOADING ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;


// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { login } from "../../store/auth/authSlice";

// export default function Register() {


//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.auth);
//   const { register, handleSubmit } = useForm();


//     useEffect(() => {
//       if (token) {
//         console.log("calling use effect reg")
//         navigate("/");
//       }
//     }, [token, navigate]);


//   return (
//     <section className="bg-gray-50 dark:bg-gray-900">
//       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//         <a
//           href="#"
//           className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
//         >
//           <img
//             className="w-8 h-8 mr-2"
//             src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
//             alt="logo"
//           />
//           squareAi
//         </a>
//         <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//               Create an account
//             </h1>
//             <form className="space-y-4 md:space-y-6" action="#">
//               <div>
//                 <label
//                   for="email"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Your email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="name@company.com"
//                   required=""
//                 />
//               </div>
//               <div>
//                 <label
//                   for="password"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   placeholder="••••••••"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   required=""
//                 />
//               </div>
//               <div>
//                 <label
//                   for="confirm-password"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Confirm password
//                 </label>
//                 <input
//                   type="confirm-password"
//                   name="confirm-password"
//                   id="confirm-password"
//                   placeholder="••••••••"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   required=""
//                 />
//               </div>
//               <div className="flex items-start">
//                 <div className="flex items-center h-5">
//                   <input
//                     id="terms"
//                     aria-describedby="terms"
//                     type="checkbox"
//                     className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
//                     required=""
//                   />
//                 </div>
//                 <div className="ml-3 text-sm">
//                   <label
//                     for="terms"
//                     className="font-light text-gray-500 dark:text-gray-300"
//                   >
//                     I accept the{" "}
//                     <a
//                       className="font-medium text-primary-600 hover:underline dark:text-primary-500"
//                       href="#"
//                     >
//                       Terms and Conditions
//                     </a>
//                   </label>
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//               >
//                 Create an account
//               </button>
//               <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                 Already have an account?{" "}
//                 <Link
//                   to="/signin"
//                   className="font-medium text-primary-600 hover:underline dark:text-primary-500"
//                 >
//                   Login here
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
