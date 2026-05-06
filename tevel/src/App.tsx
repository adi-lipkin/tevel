import { useState } from "react";
import { heroes, type Hero } from "./data/heroes";
import "./index.css";

const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
const asset = (path: string) => `${baseUrl}/${path.replace(/^\//, "")}`;

const LOGOS = {
  mana:        asset("images/mana1.png"),
  standwithus: asset("images/standwithus.jpg"),
  tevel:       asset("images/tevellogo.jpg"),
};

// ── HeroCard ──────────────────────────────────────────────────────────────────
function HeroCard({ hero, onClick }: { hero: Hero; onClick: () => void }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <article className="card" onClick={onClick}>
      {!imgErr ? (
        <img
          className="card__img"
          src={asset(hero.image)}
          alt={hero.name}
          onError={() => setImgErr(true)}
        />
      ) : (
        <div className="card__img-fallback">✦</div>
      )}
      <div className="card__body">
        <p className="card__years">{hero.years}</p>
        <h2 className="card__name">{hero.name}</h2>
        <p className="card__unit">{hero.unit}</p>
        <p className="card__bio">{hero.shortBio}</p>
        <span className="card__food-tag">🍽 {hero.favoriteFood}</span>
      </div>
    </article>
  );
}

// ── HeroDetail ────────────────────────────────────────────────────────────────
function HeroDetail({ hero, onBack }: { hero: Hero; onBack: () => void }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <div className="topbar">
        <img src={LOGOS.tevel} alt="תבל" className="topbar__logo" />
        <span className="topbar__title">מנה לזכרם</span>
      </div>
      <div className="gold-line" />

      <div className="detail">
        <button className="back-btn" onClick={onBack}>
          → חזרה לכל הגיבורים
        </button>

        <div className="detail__hero">
          {!imgErr ? (
            <img
              className="detail__img"
              src={asset(hero.image)}
              alt={hero.name}
              onError={() => setImgErr(true)}
            />
          ) : (
            <div className="detail__img-fallback">✦</div>
          )}
          <div className="detail__info">
            <p className="detail__years">{hero.years}</p>
            <h1 className="detail__name">{hero.name}</h1>
            <p className="detail__rank">
              {hero.rank} · {hero.unit} · בן {hero.age} בנופלו
            </p>
            <blockquote className="detail__quote">"{hero.quote}"</blockquote>
          </div>
        </div>

        <h2 className="section-title">סיפורו</h2>
        {hero.fullStory.map((para, i) => (
          <p key={i} className="story-para">{para}</p>
        ))}

        <div className="food-box">
          <p className="food-box__title">🍽 {hero.favoriteFood} — המנה האהובה</p>
          <p className="food-box__text">{hero.favoriteFoodStory}</p>
        </div>
      </div>

      <footer className="footer">
        יהי זכרם ברוך
        {/* <div className="footer__logos">
          <img src={LOGOS.standwithus} alt="StandWithUs" className="footer__logo--standwithus" />
          <img src={LOGOS.tevel}       alt="תבל"          className="footer__logo--tevel" />
          <img src={LOGOS.mana}        alt="מנה לזכרם"   className="footer__logo--mana" />
        </div> */}
      </footer>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [selected, setSelected] = useState<Hero | null>(null);

  const handleSelect = (hero: Hero) => { setSelected(hero); window.scrollTo(0, 0); };
  const handleBack   = ()           => { setSelected(null);  window.scrollTo(0, 0); };

  if (selected) return <HeroDetail hero={selected} onBack={handleBack} />;

  return (
    <div>
      <header className="header">
        <div className="header__logos">
          <div className="header__logo-left">
            <img src={LOGOS.standwithus} alt="StandWithUs" className="header__logo--standwithus" />
          </div>
          <div className="header__logo-center">
            <img src={LOGOS.mana} alt="מנה לזכרם" className="header__logo--mana" />
          </div>
          <div className="header__logo-right">
            <img src={LOGOS.tevel} alt="תבל" className="header__logo--tevel" />
          </div>
        </div>
        <h1 className="header__title">מנה לזכרם</h1>
        <p className="header__sub">לזכר גיבורינו שנפלו</p>
      </header>
      <div className="gold-line" />

      <main className="grid">
        {heroes.map((hero) => (
          <HeroCard key={hero.id} hero={hero} onClick={() => handleSelect(hero)} />
        ))}
      </main>

      <footer className="footer">
        יהי זכרם ברוך
        {/* <div className="footer__logos">
          <img src={LOGOS.standwithus} alt="StandWithUs" className="footer__logo--standwithus" />
          <img src={LOGOS.tevel}       alt="תבל"          className="footer__logo--tevel" />
          <img src={LOGOS.mana}        alt="מנה לזכרם"   className="footer__logo--mana" />
        </div> */}
      </footer>
    </div>
  );
}