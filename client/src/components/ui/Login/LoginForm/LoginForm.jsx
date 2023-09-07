import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { login_with_email, login_with_username } from "../../../../slices/auth";
import { clearMessage, setMessage } from "../../../../slices/message";
import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function LoginForm() {
  const [show, setShow] = useState(false);
  const [isEmail, setIsEmail] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (isEmail) {
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
            values.email
          )
        ) {
          errors.email = "Invalid email address";
        }
      } else {
        if (!values.username) {
          errors.username = "Required";
        } else if (values.username.length < 6) {
          errors.username = "Username must be at least 6 characters";
        }
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }

      return errors;
    },
    onSubmit: (values) => {
      setMessage("");
      const { username, email, password } = values;
      setLoading(true);
      if (isEmail) {
        dispatch(login_with_email({ email, password }))
          .unwrap()
          .then(() => {
            if (location.state && location.state.prevRoute) {
              navigate(location.state.prevRoute);
            } else {
              navigate("/");
            }
            window.location.reload();
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        dispatch(login_with_username({ username, password }))
          .unwrap()
          .then(() => {
            if (location.state && location.state.prevRoute) {
              navigate(location.state.prevRoute);
            } else {
              navigate("/");
            }
            window.location.reload();
          })
          .catch(() => {
            setLoading(false);
          });
      }
    },
  });

  return (
    <form className="flex flex-col gap-y-3.5" onSubmit={formik.handleSubmit}>
      <div>
        <input
          type={isEmail ? "email" : "text"}
          placeholder={isEmail ? "Email" : "Username"}
          name={isEmail ? "email" : "username"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={isEmail ? formik.values.email : formik.values.username}
          className={
            "w-full border-2 rounded-md p-4 focus:outline-none " +
            (isEmail
              ? formik.touched.email && formik.errors.email
                ? "border-red-600"
                : "border-slate-200"
              : formik.touched.username && formik.errors.username
              ? "border-red-600"
              : "border-slate-200")
          }
        />
        <div className="h-4 pt-1 w-fit text-sm">
          {isEmail
            ? formik.touched.email && formik.errors.email
              ? "* " + formik.errors.email
              : null
            : formik.touched.username && formik.errors.username
            ? "* " + formik.errors.username
            : null}
        </div>
      </div>
      <div>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            placeholder="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={
              "w-full border-2 rounded-md p-4 focus:outline-none " +
              (formik.touched.password && formik.errors.password
                ? "border-red-600"
                : "border-slate-200")
            }
          />
          <button
            type="button"
            className="absolute top-0 right-0 w-[60px] h-full cursor-pointer flex justify-center items-center text-slate-700"
            onClick={() => setShow(!show)}
          >
            <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
          </button>
        </div>
        <div className="h-4 pt-1 w-fit text-sm text-red-600">
          {formik.touched.password && formik.errors.password
            ? "* " + formik.errors.password
            : null}
        </div>
      </div>
      <button
        type="submit"
        disabled={loading ? true : false}
        className="h-14 rounded-lg flex justify-center items-center text-white font-bold text-xl bg-blue-500 font-['Roboto']"
      >
        {loading ? (
          <div role="status">
            <svg
              aria-hidden="true"
              class="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          "Login"
        )}
      </button>
      <button
        type="button"
        className="text-blue-500"
        onClick={() => {
          formik.handleReset();
          setIsEmail(!isEmail);
        }}
      >
        {`Login with ${isEmail ? "Username" : "Email"} Instead ?`}
      </button>
      {message && (
        <div
          class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          {message}
        </div>
      )}
    </form>
  );
}
