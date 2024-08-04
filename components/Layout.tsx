import { ReactNode } from "react";
import Footer from "./ui/organisms/Footer";
import Header from "./ui/organisms/Header";

interface LayoutProps {
  children?: ReactNode | undefined;
  className?: string;
}

function Layout({ children, className }: LayoutProps) {
  return (
    <div className={className}>
      <Header />
      <main className="container mx-auto my-8">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
