import facebookLogo from "../../assets/Images/facebook-logo.png";
import appleLogo from "../../assets/Images/apple-logo.png";
import googleLogo from "../../assets/Images/google-logo.png";
import loginImage1 from "../../assets/Images/loginImage1.png";
import loginImage2 from "../../assets/Images/loginImage2.png";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axiosInstance from "../../Utils/axiosInstance";
import toast from "react-hot-toast";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleClickSignup = () => {
    navigate("/sign-up");
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object().shape({
        email: Yup.string().required("email/username is required"),
        password: Yup.string().required("password is required"),
      }),
      onSubmit: async (values) => {
        try {
          const response = await axiosInstance.post("/login", {
            data: values,
          });
          // in response we don't have get the token so direct add the token using var in that case
          const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njk5MTA4MjU2ZGE4OGJkYmZjNTY1OWMiLCJpYXQiOjE3MjEzNjk5MDZ9.3sLMRHTwyeM-v63lEVlMm8y0BalZawgR9UB_dt_db9o`;
          if (response.status === 200) {
            localStorage.setItem("token", token);
            toast.success("Login Successfull");
            navigate("/to-do");
          }
        } catch (err) {
          console.log(err);
        }
      },
    });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token?.length) {
      navigate("/to-do");
    }
  }, []);

  return (
    <div className="h-screen flex justify-center items-center overflow-hidden">
      <div className="fixed h-full w-full flex -z-10">
        <div className="flex-1 bg-[#ECBC76]"></div>
        <div className="max-[768px]:hidden flex-1 bg-[#FFFEF9]"></div>
      </div>

      <div className="relative bg-white rounded-3xl p-9 max-[426px]:px-5 max-[426px]:py-10 mx-5 max-w-md w-full shadow-lg">
        <div className="max-[768px]:hidden">
          <div className="absolute top-20 -left-[200px] w-[200px]">
            <img src={loginImage1} alt="loginImage1" />
          </div>
          <div className="absolute top-6 -right-[360px] w-[410px]">
            <img src={loginImage2} alt="loginImage2" />
          </div>
        </div>

        <div className="flex justify-between">
          <div>Welcome to lorem</div>
          <div className="text-sm">
            <div className="text-gray-500">No Account ?</div>
            <div
              className="text-[#B87514] cursor-pointer"
              onClick={handleClickSignup}
            >
              Sign up
            </div>
          </div>
        </div>

        <div className="text-4xl mb-9 max-[426px]:mb-14 font-semibold">
          Sign in
        </div>

        <div className="text-sm flex flex-shrink justify-between items-center gap-2 mb-9 min-[426px]:hidden">
          <div className="flex gap-4 justify-center items-center bg-[#FFF4E3] p-3 max-w-60 w-full rounded-lg cursor-pointer">
            <img src={googleLogo} alt="google-logo" />
            <div className="text-[#B87514]">Sign with google</div>
          </div>
          <div className="flex justify-center items-center bg-[#F6F6F6] p-3 rounded-lg cursor-pointer">
            <img src={facebookLogo} alt="facebook-logo" />
          </div>
          <div className="flex justify-center items-center bg-[#F6F6F6] p-3 rounded-lg cursor-pointer">
            <img src={appleLogo} alt="apple-logo" />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <div className="mb-2 text-sm">
              Enter your username or email address
            </div>
            <input
              type="text"
              name="email"
              placeholder="Username or email address"
              className="py-2 px-3 w-full outline-none border-2 rounded-lg border-gray-400 placeholder:text-xs"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <div className="h-4 text-xs text-red-500">
              {touched.email ? errors.email : ""}
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm">Enter your Password</div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="py-2 px-3 w-full outline-none border-2 rounded-lg border-gray-400 placeholder:text-xs"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <div className="h-4 text-xs text-red-500">
              {touched.password ? errors.password : ""}
            </div>
          </div>

          <div className="text-right text-xs text-[#AD3113] cursor-pointer">
            Forgot Password
          </div>

          <button
            type="submit"
            className="text-sm my-6 py-3 w-full rounded-lg bg-[#E48700] text-white cursor-pointer max-[426px]:mb-0"
          >
            Sign in
          </button>
        </form>

        <div className="text-center text-sm text-gray-400 max-[426px]:hidden">
          OR
        </div>

        <div className="text-sm flex justify-between items-center gap-2 mt-6 max-[426px]:hidden">
          <div className="flex gap-4 justify-center items-center bg-[#FFF4E3] p-3 max-w-60 w-full rounded-lg cursor-pointer">
            <img src={googleLogo} alt="google-logo" />
            <div className="text-[#B87514]">Sign with google</div>
          </div>
          <div className="flex justify-center items-center bg-[#F6F6F6] p-3 rounded-lg cursor-pointer">
            <img src={facebookLogo} alt="facebook-logo" />
          </div>
          <div className="flex justify-center items-center bg-[#F6F6F6] p-3 rounded-lg cursor-pointer">
            <img src={appleLogo} alt="apple-logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
