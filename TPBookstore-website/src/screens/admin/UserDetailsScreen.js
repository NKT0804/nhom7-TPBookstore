import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import UserDetail from "../../components/admin/users/UserDetail";

const UserDetailsScreenAdmin = ({ match }) => {
  const userId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserDetail userId={userId} />
      </main>
    </>
  );
};

export default UserDetailsScreenAdmin;
