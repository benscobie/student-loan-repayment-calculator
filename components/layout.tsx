import { ReactNode } from "react";
import Footer from "./ui/organisms/footer";
import Header from "./ui/organisms/header";

interface LayoutProps {
  children?: ReactNode | undefined;
  className?: string;
}

function Layout({ children, className }: LayoutProps) {
  return (
    <div className={className}>
      <Header />
      <main className="flex justify-center">
        <div className="p-8 m-8 max-w-7xl w-full bg-white shadow-lg">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
