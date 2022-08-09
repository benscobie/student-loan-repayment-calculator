import Footer from "./ui/organisms/footer";
import Header from "./ui/organisms/header";

function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div>
      <Header />
      <main className="px-5 pt-4">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
