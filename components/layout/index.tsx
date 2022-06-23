import React, { ReactNode } from "react";
import Footer from "components/Footer";
import Navbar from "components/Navbar";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
