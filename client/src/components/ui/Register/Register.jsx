import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change, register } from "../../../slices/auth";
import { clearMessage, setMessage } from "../../../slices/message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Register() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const location = useLocation();

  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const validate = (values) => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = "Required";
    } else if (values.firstName.length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    }

    if (!values.lastName) {
      errors.lastName = "Required";
    } else if (values.lastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    }

    if (!values.username) {
      errors.username = "Required";
    } else if (values.username.length < 6) {
      errors.username = "Username must be at least 6 characters";
    }

    if (!values.email) {
      errors.email = "Required";
      setIsValid(false);
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        values.email
      )
    ) {
      errors.email = "Invalid email address";
      setIsValid(false);
    } else {
      setIsValid(true);
    }

    if (!values.repeatEmail) {
      errors.repeatEmail = "Required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        values.repeatEmail
      )
    ) {
      errors.repeatEmail = "Invalid email address";
    } else if (values.email !== values.repeatEmail) {
      errors.repeatEmail = "Email and repeat email are not the same";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (
      !RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      ).test(values.password)
    ) {
      errors.password =
        "Password must be have lowercase and uppercase and special characters and numbers and > 8 characters";
    }

    const date = new Date(values.year + "-" + values.month + "-" + values.day);

    if (!(date.getDate() === Number(values.day))) {
      errors.date = "Invalid Date";
    }

    if (!values.gender) {
      errors.gender = "Required";
    }

    return errors;
  };

  const current_day = new Date().getDate();
  var days = [];
  for (var i = 1; i < 32; i++) {
    days.push(i);
  }

  const current_month = new Date().getMonth();
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const current_year = new Date().getFullYear();
  var years = [];
  for (i = current_year; i >= current_year - 150; i--) {
    years.push(i);
  }

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      repeatEmail: "",
      password: "",
      day: current_day,
      month: current_month + 1,
      year: current_year,
      gender: 1,
    },
    validate,
    onSubmit: (values) => {
      const g = ["male", "female"];
      let date = new Date(values.year + "-" + values.month + "-" + values.day);
      setMessage("");
      const { username, email, password, firstName, lastName, gender } = values;
      setLoading(true);
      const userData = {
        email,
        password,
        username,
        first_name: firstName,
        last_name: lastName,
        gender: g[gender - 1],
        birthday: date,
        roles: ["user"],
      };
      alert(JSON.stringify(userData, null, 2));
      dispatch(register(userData))
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
    },
  });

  return (
    <div
      className={
        "z-10 absolute top-0 w-screen min-h-screen bg-white/80 flex justify-center py-16" +
        (!auth.isRegister ? " hidden" : "")
      }
    >
      <div className="w-[440px] bg-white pt-2 pb-4 shadow-2xl rounded-xl">
        <div className="flex justify-between px-5">
          <div className="flex flex-col gap-1">
            <p className="text-3xl font-semibold">Sign Up</p>
            <p className="text-slate-500 text-sm">It's quick and easy.</p>
          </div>
          <button
            type="button"
            onClick={() => dispatch(change(false))}
            className="h-fit"
          >
            <FontAwesomeIcon
              icon={faXmark}
              className="text-2xl text-slate-500"
            />
          </button>
        </div>
        <div className="w-full h-px bg-slate-300 my-4"></div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-3  px-5">
            <div className="flex gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  className={
                    "w-full border-2 rounded-md px-4 py-2 focus:outline-none " +
                    (formik.touched.firstName && formik.errors.firstName
                      ? "border-red-600"
                      : "border-slate-200")
                  }
                />
                <div className="h-4 pt-1 w-fit text-sm">
                  {formik.touched.firstName && formik.errors.firstName
                    ? "* " + formik.errors.lastName
                    : null}
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  className={
                    "w-full border-2 rounded-md px-4 py-2 focus:outline-none " +
                    (formik.touched.lastName && formik.errors.lastName
                      ? "border-red-600"
                      : "border-slate-200")
                  }
                />

                <div className="h-4 pt-1 w-fit text-sm">
                  {formik.touched.lastName && formik.errors.lastName
                    ? "* " + formik.errors.lastName
                    : null}
                </div>
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className={
                  "w-full border-2 rounded-md px-4 py-2 focus:outline-none " +
                  (formik.touched.username && formik.errors.username
                    ? "border-red-600"
                    : "border-slate-200")
                }
              />

              <div className="h-4 pt-1 w-fit text-sm">
                {formik.touched.username && formik.errors.username
                  ? "* " + formik.errors.username
                  : null}
              </div>
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={
                  "w-full border-2 rounded-md px-4 py-2 focus:outline-none " +
                  (formik.touched.email && formik.errors.email
                    ? "border-red-600"
                    : "border-slate-200")
                }
              />

              <div className="h-4 pt-1 w-fit text-sm">
                {formik.touched.email && formik.errors.email
                  ? "* " + formik.errors.email
                  : null}
              </div>
            </div>
            {isValid && (
              <div>
                <input
                  type="email"
                  placeholder="Re-enter email address"
                  name="repeatEmail"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.repeatEmail}
                  className={
                    "w-full border-2 rounded-md px-4 py-2 focus:outline-none " +
                    (formik.touched.repeatEmail && formik.errors.repeatEmail
                      ? "border-red-600"
                      : "border-slate-200")
                  }
                />

                <div className="h-4 pt-1 w-fit text-sm">
                  {formik.touched.repeatEmail && formik.errors.repeatEmail
                    ? "* " + formik.errors.repeatEmail
                    : null}
                </div>
              </div>
            )}
            <div>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={
                    "w-full border-2 rounded-md px-4 py-2 focus:outline-none " +
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
              <div
                className={
                  "pt-1 w-fit text-sm " +
                  (formik.touched.password && formik.errors.password
                    ? "h-9"
                    : "h-4")
                }
              >
                {formik.touched.password && formik.errors.password
                  ? "* " + formik.errors.password
                  : null}
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 pb-1">Date of birth</p>
              <div className="flex gap-2">
                <select
                  name="day"
                  placeholder="day"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.day}
                  className={
                    "w-full border-2 rounded-md px-4 py-2 focus:outline-none " +
                    (formik.errors.date ? "border-red-600" : "border-slate-200")
                  }
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <select
                  name="month"
                  placeholder="Month"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.month}
                  className={
                    "w-full border-2 rounded-md px-4 py-2 focus:outline-none " +
                    (formik.errors.date ? "border-red-600" : "border-slate-200")
                  }
                >
                  {months.map((month, key) => (
                    <option key={key} value={key + 1}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  name="year"
                  placeholder="Year"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.year}
                  className={
                    "w-full border-2 rounded-md px-4 py-2 focus:outline-none " +
                    (formik.errors.date ? "border-red-600" : "border-slate-200")
                  }
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="h-4 pt-1 w-fit text-sm">
                {formik.errors.date ? "* " + formik.errors.date : null}
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 pb-1">Gender</p>
              <div className="flex gap-2">
                <div
                  className={
                    "flex justify-between w-full border-2 rounded-md p-2 " +
                    (formik.errors.gender
                      ? "border-red-600"
                      : "border-slate-200")
                  }
                >
                  <p>Male</p>
                  <input
                    type="radio"
                    name="gender"
                    value={1}
                    onChange={formik.handleChange}
                    defaultChecked={formik.values.gender === 1}
                  />
                </div>
                <div
                  className={
                    "flex justify-between w-full border-2 rounded-md p-2 " +
                    (formik.touched.gender && formik.errors.gender
                      ? "border-red-600"
                      : "border-slate-200")
                  }
                >
                  <p>Female</p>
                  <input
                    type="radio"
                    name="gender"
                    value={2}
                    onChange={formik.handleChange}
                    defaultChecked={formik.values.gender === 2}
                  />
                </div>
              </div>
              <div className="h-4 pt-1 w-fit text-sm">
                {formik.touched.gender && formik.errors.gender
                  ? "* " + formik.errors.gender
                  : null}
              </div>
            </div>
            <p className="text-xs text-slate-500 pb-1">
              People who use our service may have uploaded your contact
              information to Facebook.
            </p>
            <p className="text-xs text-slate-500 pb-1">
              By clicking Sign Up, you agree to our Terms, Privacy Policy and
              Cookies Policy. You may receive SMS notifications from us and can
              opt out at any time.
            </p>
            <button
              type="submit"
              disabled={loading ? true : false}
              className="h-14 flex justify-center items-center rounded-lg text-white font-bold text-xl create-button1 w-3/5 mx-auto font-['Roboto']"
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
                "Sign Up"
              )}
            </button>
            {message && (
              <div
                class="p-4 mb-4 text-center text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {message}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
