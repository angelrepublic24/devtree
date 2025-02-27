import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  const token = localStorage.getItem("AUTH_TOKEN");
  return (
    <>
      {token ? (
        <Link to={"/admin"}>
          <img src="/logo.svg" className="w-full block" />
        </Link>
      ) : (
        <Link to={"/"}><img src="/logo.svg" className="w-full block" /></Link>
      )}
    </>
  );
}
