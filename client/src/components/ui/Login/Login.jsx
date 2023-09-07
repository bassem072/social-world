import React from 'react'
import { useDispatch } from 'react-redux';
import LoginForm from './LoginForm/LoginForm';
import { change } from "../../../slices/auth";
import './styles.css';

export default function Login() {
  const dispatch = useDispatch();

  return (
    <div className='w-[400px] rounded-lg bg-white text-center p-3 box flex flex-col gap-3.5'>
      <LoginForm/>
      {/* <Link to="/forget" className="text-sky-600 text-sm">
        Forgotten password?
      </Link> */}
      <div className="w-full h-px bg-slate-300"></div>
      <div className="flex justify-center gap-x-3.5">
        <div className="w-12 h-12 rounded-full border-[1px] border-slate-300 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            fill="#0572E6"
            width="30px"
            height="30px"
          >
            <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
          </svg>
        </div>
        <div className="w-12 h-12 rounded-full border-[1px] border-slate-300 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
            fill="#0572E6"
            width="30px"
            height="30px"
          >
            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
          </svg>
        </div>
      </div>
      <div className="w-full h-px bg-slate-300"></div>
      <button
        type="button"
        className="h-14 rounded-lg text-white font-bold text-xl create-button w-3/5 mx-auto p"
        onClick={() => {
          dispatch(change(true));
        }}
      >
        Create new account
      </button>
    </div>
  )
}
