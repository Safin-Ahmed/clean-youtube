import React from "react";
import Navbar from "./Navbar";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
