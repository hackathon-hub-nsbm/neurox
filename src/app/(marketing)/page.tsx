import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Eligibility from "./components/Eligibility";
import DeliverablesCriteria from "./components/DeliverablesCriteria";
import Outcomes from "./components/Outcomes";
import Sponsors from "./components/Sponsors";
import RegistrationForm from "./components/RegistrationForm";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <About />
        <Timeline />
        <Eligibility />
        <DeliverablesCriteria />
        <Outcomes />
        <Sponsors />
        <RegistrationForm />
      </main>
      <Footer />
    </>
  );
}
