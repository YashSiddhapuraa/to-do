import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import loginImage1 from "../../assets/Images/loginImage1.png";
import loginImage2 from "../../assets/Images/loginImage2.png";
import axiosInstance from "../../Utils/axiosInstance";
import toast from "react-hot-toast";
import { useEffect } from "react";

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleClickSignin = () => {
    navigate("/login");
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        name: "",
        password: "",
      },
      validationSchema: Yup.object().shape({
        email: Yup.string().required("email is required"),
        name: Yup.string().required("name is required"),
        password: Yup.string().required("password is required"),
      }),
      onSubmit: async (values) => {
        try {
          const response = await axiosInstance.post("/signup", {
            data: values,
          });
          if (response.status === 200) {
            toast.success(
              "Thanks for signing up. Your account has been created."
            );
            navigate("/login");
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
            <div className="text-gray-500">Have an Account ?</div>
            <div
              className="text-[#B87514] cursor-pointer"
              onClick={handleClickSignin}
            >
              Sign in
            </div>
          </div>
        </div>

        <div className="text-4xl mb-9 max-[426px]:mb-14 font-semibold">
          Sign up
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

          <div className="flex my-2 gap-4">
            <div className="flex-1">
              <div className="mb-2 text-sm">User name</div>
              <input
                type="text"
                name="name"
                placeholder="User name"
                className="py-2 px-3 w-full outline-none border-2 rounded-lg border-gray-400 placeholder:text-xs"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <div className="h-4 text-xs text-red-500">
                {touched.name ? errors.name : ""}
              </div>
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

          <button
            type="submit"
            className="text-sm mt-8 min-[426px]:mb-9 py-3 w-full rounded-lg bg-[#E48700] text-white cursor-pointer"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
