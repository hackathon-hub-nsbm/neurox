import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Eligibility from "./components/Eligibility";
import DeliverablesCriteria from "./components/DeliverablesCriteria";
import Outcomes from "./components/Outcomes";
import RegistrationForm from "./components/RegistrationForm";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Eligibility />
        <DeliverablesCriteria />
        <Outcomes />
        <RegistrationForm />
      </main>
      <Footer />
    </>
  );
}
