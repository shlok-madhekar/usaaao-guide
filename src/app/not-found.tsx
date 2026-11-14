import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="wrap page">
        
          
          <h1 className="title">Page not found</h1>
          <div className="cta"><Link href="/" className="go">Back home</Link></div>
        
      </main>
      <Footer />
    </>
  );
}
