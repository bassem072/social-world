import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export default function Profile() {
  return <div>Profile</div>

  // const { user: currentUser } = useSelector(state => state.auth);
  // console.log("Current user: " + currentUser);
  // if (!currentUser) {
  //   return <Navigate to="/auth" />;
  // }

  // const today = new Date(currentUser.birthday);
  // const yyyy = today.getFullYear();
  // let mm = today.getMonth() + 1; // Months start at 0!
  // let dd = today.getDate();

  // if (dd < 10) dd = "0" + dd;
  // if (mm < 10) mm = "0" + mm;

  // const formattedToday = dd + "/" + mm + "/" + yyyy;
  // console.log("Profile");

  // return (
  //   <div className="container mx-auto mt-5">
  //     <header className="rounded-lg bg-neutral-100 p-6 text-neutral-700 shadow-lg">
  //       <h3 className="mb-5 text-3xl font-semibold">
  //         Hello <strong>{currentUser.first_name}</strong>!
  //       </h3>
  //     </header>
  //     <p>
  //       <strong>Token: </strong>
  //       {currentUser.accessToken.substring(0, 20)} ...{" "}
  //       {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
  //     </p>
  //     <p>
  //       <strong>Full Name: </strong> {currentUser.first_name + " " + currentUser.last_name}
  //     </p>
  //     <p>
  //       <strong>Id: </strong> {currentUser.id}
  //     </p>
  //     <p>
  //       <strong>Birthday: </strong> {formattedToday}
  //     </p>
  //     <p>
  //       <strong>Gender: </strong> {currentUser.gender}
  //     </p>
  //     <p>
  //       <strong>Email: </strong> {currentUser.email}
  //     </p>
  //     <strong>Authorities:</strong>
  //     <ul>
  //       {currentUser.roles &&
  //         currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
  //     </ul>
  //   </div>
  //);
}
