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
      <main className="flex justify-center">
        <div className="m-0 p-8 sm:m-8 max-w-7xl w-full bg-white shadow-lg">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
