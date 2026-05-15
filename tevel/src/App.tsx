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
      <div className="card__img-wrap">
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
      </div>
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
  const [imgErr, setImgErr]         = useState(false);
  const [mealImgErr, setMealImgErr] = useState(false);

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

            {hero.instagramLink && (
              <a
                className="detail__instagram"
                href={hero.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                פרופיל אינסטגרם
              </a>
            )}

            <blockquote className="detail__quote">"{hero.quote}"</blockquote>
          </div>
        </div>

        <h2 className="section-title">סיפורו</h2>
        {hero.fullStory.map((para, i) => (
          <p key={i} className="story-para">{para}</p>
        ))}

        <div className="food-box">
          <p className="food-box__title">🍽 {hero.favoriteFood} — המנה האהובה</p>

          {hero.mealImage && !mealImgErr && (
            <img
              className="food-box__meal-img"
              src={asset(hero.mealImage)}
              alt={hero.favoriteFood}
              onError={() => setMealImgErr(true)}
            />
          )}

          <p className="food-box__text">{hero.favoriteFoodStory}</p>

          {hero.restaurants && hero.restaurants.length > 0 && (
            <div className="food-box__restaurants">
              <p className="food-box__restaurants-label">🗺 ניתן למצוא במסעדה:</p>
              <div className="food-box__restaurants-list">
                {hero.restaurants.map((rest) => (
                  <a
                    key={rest.name}
                    className="restaurant-btn"
                    href={rest.wazeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    {rest.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <div style={{ position: 'relative' }}>יהי זכרם ברוך</div>
        <div className="footer__social">
          <a
            href="https://www.instagram.com/tevel_jerusalem?igsh=MnRpMjNuMGhoZWFk"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__instagram"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @tevel_jerusalem
          </a>
        </div>
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
        <div className="header__inner">
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
        </div>
      </header>
      <div className="gold-line" />

      <main className="grid">
        {heroes.map((hero) => (
          <HeroCard key={hero.id} hero={hero} onClick={() => handleSelect(hero)} />
        ))}
      </main>

      <footer className="footer">
        <div style={{ position: 'relative' }}>יהי זכרם ברוך</div>
        <div className="footer__social">
          <a
            href="https://www.instagram.com/tevel_jerusalem?igsh=MnRpMjNuMGhoZWFk"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__instagram"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @tevel_jerusalem
          </a>
        </div>
      </footer>
    </div>
  );
}