import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="wrap">
        <header className="head">
          
          <h1>Page not found</h1>
          <div className="btns"><Link href="/" className="btn solid">Back home</Link></div>
        </header>
      </main>
      <Footer />
    </>
  );
}
