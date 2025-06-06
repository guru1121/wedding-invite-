import React from "react";
import Fireworks from "./Fireworks";
import CelebrationIcon from '@mui/icons-material/Celebration';


const events = [
  {
    title: "💃 Mehndi Ceremony",
    date: "13th July 2025",
    time: "4:00 PM",
    venue: "Bride’s Residence, Jaipur",
    description: "A colorful celebration with music, dance, and beautiful henna designs.",
    bgColor: "#f8d7da"
  },
  {
    title: "🌼 Haldi Ceremony",
    date: "14th July 2025",
    time: "10:00 AM",
    venue: "Groom’s Residence, Jaipur",
    description: "A traditional haldi ritual to bless the couple.",
    bgColor: "#fff3cd"
  },
  {
    title: "🐎 Baarat",
    date: "15th July 2025",
    time: "5:00 PM",
    venue: "From Groom’s Residence to The Royal Palace",
    description: "The groom's grand procession with dancing and fun!",
    bgColor: "#d1ecf1",
    mapLink: "https://www.google.com/maps/dir//The+Royal+Palace,+Jaipur"
  },
  {
    title: "💍 Wedding Ceremony",
    date: "15th July 2025",
    time: "7:00 PM onwards",
    venue: "The Royal Palace, Jaipur",
    description: "Join us as we tie the sacred knot with love and tradition.",
    bgColor: "#d4edda"
  },
  {
    title: "🎊 Reception",
    date: "16th July 2025",
    time: "7:00 PM onwards",
    venue: "The Grand Ballroom, Jaipur Marriott",
    description: "Celebrate our new beginning with music, food, and joy.",
    bgColor: "#e2e3e5",
    mapLink: "https://www.google.com/maps/place/Jaipur+Marriott+Hotel"
  }
];

const App = () => {
  return (
    <div className="text-center position-relative text-white">
      <Fireworks />

      {/* Wedding Intro Section */}
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
        <h1 className="display-3 fw-bold mb-4">💍 You're Invited to Our Wedding 💐</h1>

        <div className="d-flex justify-content-center align-items-center gap-4 mb-4">
          <CelebrationIcon className="tilt-icon" fontSize="large" />
          <h2 className="fw-semibold">👰 Bride ❤️ Groom 🤵</h2>
          <CelebrationIcon className="tilt-icon" fontSize="large" />
        </div>

        <p className="lead fs-4 mb-4">
          Join us in celebrating our Indian wedding filled with beautiful Hindu rituals,
          love, colors, and joy. 🇮🇳🎊
        </p>


      </div>

      {/* Events Section */}
      <section className="container py-5 section-animated">
        <h2 className="mb-5 display-5 fw-bold text-decoration-underline">Wedding Events</h2>
        <div className="row justify-content-center g-4">
          {events.map((event, idx) => (
            <div className="col-md-6" key={idx}>
              <div className="p-4 h-100 event-card">
                <h4 className="fw-bold">{event.title}</h4>
                <p className="mb-1"><strong>Date:</strong> {event.date}</p>
                <p className="mb-1"><strong>Time:</strong> {event.time}</p>
                <p className="mb-1"><strong>Venue:</strong> {event.venue}</p>
                <p className="mt-2">{event.description}</p>
                {event.mapLink && (
                  <a
                    href={event.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary mt-2"
                  >
                    📍 View Location
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer
        className="text-center text-white py-3 mt-2"
        style={{
          backgroundColor: "#000",  // solid black
          color: "#fff",             // white text
          position: "relative",
          zIndex: 2
        }}
      >
        &copy; {new Date().getFullYear()} Gurunand Mourya. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
