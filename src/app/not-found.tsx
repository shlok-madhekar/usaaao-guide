import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="wrap">
        <header className="head">
          <p className="crumbs">404</p>
          <h1 className="display">Nothing at these coordinates.</h1>
          <div className="btns"><Link href="/" className="btn">Back home</Link></div>
        </header>
      </main>
      <Footer />
    </>
  );
}
