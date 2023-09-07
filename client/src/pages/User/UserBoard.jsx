import React, { useEffect, useState } from 'react'
import UserService from "../../services/user.service";

export default function UserBoard() {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getUserBoard().then((response) => {
            setContent(response.data);
        }).catch((error) => {
            const _content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setContent(_content);
        });
    }, [])
  return (
    <div className="container mx-auto mt-5">
      <header class="rounded-lg bg-neutral-100 p-6 text-neutral-700 shadow-lg">
        <h3 class="mb-5 text-3xl font-semibold">{content}</h3>
      </header>
    </div>
  );
}
