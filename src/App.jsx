import React from "react";
import { useTranslation } from "react-i18next";
import Fireworks from "./Fireworks";
import CelebrationIcon from '@mui/icons-material/Celebration';

const App = () => {
  const { t, i18n } = useTranslation();
  const events = t("events", { returnObjects: true });

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="text-center position-relative text-white">
      <Fireworks />


      {/* Language Selector */}
      <div className="position-absolute top-0 end-0 m-3 z-3">
        <div className="dropdown">
          <button
            className="btn btn-dark dropdown-toggle"
            type="button"
            id="langDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            🌐 {i18n.language === 'hi' ? 'Hi' : 'En'}
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end dropdown-menu-dark shadow"
            aria-labelledby="langDropdown"
          >
            <li>
              <button className="dropdown-item" onClick={() => changeLanguage('en')}>
                En
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => changeLanguage('hi')}>
                Hi
              </button>
            </li>
          </ul>
        </div>
      </div>


      <div
        className="container py-5 px-3"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderRadius: "20px",
          marginTop: "50px",
          zIndex: 1,
          position: "relative",
          color: "white"
        }}
      >
        <h1 className="display-3 fw-bold mb-4">{t("invitationTitle")}</h1>

        <div className="d-flex justify-content-center align-items-center gap-4 mb-4">
          <CelebrationIcon className="tilt-icon" fontSize="large" />
          <h2 className="fw-semibold">{t("brideGroom")}</h2>
          <CelebrationIcon className="tilt-icon" fontSize="large" />
        </div>

        <p className="lead fs-4 mb-4">{t("intro")}</p>
      </div>

      <section className="container py-5 section-animated">
        <h2 className="mb-5 display-5 fw-bold text-decoration-underline">{t("weddingEvents")}</h2>
        <div className="row justify-content-center g-4">
          {events.map((event, idx) => (
            <div className="col-md-6" key={idx}>
              <div className="p-4 h-100 event-card">
                <h4 className="fw-bold">{event.title}</h4>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p>{event.description}</p>
                {event.mapLink && (
                  <a href={event.mapLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary mt-2">
                    {t("viewLocation")}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-white py-3 mt-2" style={{
        backgroundColor: "#000", color: "#fff",
        position: "relative",
        zIndex: 2
      }}>
        &copy; {new Date().getFullYear()} Gurunand Mourya. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
