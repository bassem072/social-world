import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import UserService from "../../services/user.service";

export default function AdminBoard() {
  const { user: currentUser } = useSelector(state => state.auth);
  const [content, setContent] = useState("");
  console.log(currentUser);
  useEffect(() => {
    UserService.getAdminBoard()
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      });
  }, []);
  return (
    <div className="container mx-auto mt-5">
      <header class="rounded-lg bg-neutral-100 p-6 text-neutral-700 shadow-lg">
        <h3 class="mb-5 text-3xl font-semibold">{content}</h3>
      </header>
    </div>
  );
}
