import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageTransition from "../../components/PageTransition";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}
