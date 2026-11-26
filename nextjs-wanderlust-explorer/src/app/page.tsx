import Link from "next/link";

export default function Home() {
  return (
    <main className="home-page">
      <section aria-labelledby="home-title" className="home-hero">
        <div className="hero-copy">
          <p className="hero-eyebrow">Viajes que se viven</p>
          <h1 id="home-title">EXPERIENCIAS ARNAU</h1>
          <p className="hero-description">
            Explora aventuras, cultura, sabores y bienestar en destinos de todo
            el mundo.
          </p>
          <Link className="primary-button" href="/experiences">
            Explorar experiencias
          </Link>
        </div>
      </section>
      <section aria-labelledby="home-next-title" className="home-next">
        <p className="section-eyebrow">Ideas para tu proximo viaje</p>
        <h2 id="home-next-title">Encuentra una experiencia que recordar</h2>
        <p>
          Descubre actividades locales de aventura, cultura, gastronomia,
          bienestar y naturaleza.
        </p>
      </section>
    </main>
  );
}
