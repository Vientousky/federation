import Welcome from "./home/Welcome";
import Sponsort from "./sponsort/Sponsort";
import About from "./about/About";

export default function Home() {
  return (
    <main>
      <Welcome />
      <Sponsort />
      <About/>
    </main>
  );
}
