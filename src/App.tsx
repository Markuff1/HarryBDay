import React, { useEffect, useState, type FormEvent } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import "./App.scss";
import { QUESTIONS } from "./questions";
import Countdown from "./Countdown";

const GIFT_CARDS = ["Amazon", "Xbox", "Spotify","One for all (If you're gay)", "Other","I JUST WANT CASH"];
const BIRTHDAY_DATE = new Date("2025-06-14T00:00:00");

const App: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [giftCard, setGiftCard] = useState("");
  const [customGiftCard, setCustomGiftCard] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const today = new Date();
  const isBirthday = today >= BIRTHDAY_DATE;

  useEffect(() => {
    if (isBirthday) {
      confetti({ particleCount: 1100, spread: 70, origin: { y: 0.6 } });
    }
  }, [isBirthday]);

  const handleAnswer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const answer = formData.get("answer")?.toString() || "";
    setAnswers((prev) => [...prev, answer]);
    setCurrentQ((prev) => prev + 1);
    e.currentTarget.reset();

    if (currentQ + 1 === QUESTIONS.length) {
      setTimeout(() => {
        confetti({ particleCount: 250, spread: 120, origin: { y: 0.5 } });
      }, 300);
    }
  };

  const handleFinalSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      email,
      giftCard: giftCard === "Other" ? customGiftCard : giftCard,
      answers,
    };

    await fetch("https://formspree.io/f/mwpbozeq", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });


    confetti({ particleCount: 400, spread: 100, origin: { y: 0.4 } });
    setSubmitted(true);
  };

  if (!isBirthday) {
    return (
      <motion.div
        className="app-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h1>🎁 Almost Time!</h1>
        <p>This surprise unlocks on June 14!</p>
        <Countdown targetDate={BIRTHDAY_DATE} />
      </motion.div>
    );
  }

  if (submitted) {
    return (
      <motion.div
        className="app-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h1>🎉 Thanks!</h1>
        <p>I'll send it across Now but Happy Birthday and Have a great rest of your day you old bastard</p>
      </motion.div>
    );
  }

  const question = QUESTIONS[currentQ];

  return (
    <motion.div
      className="app-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h1>🎂 Happy 22nd Birthday Harry🎈</h1>

      {currentQ < QUESTIONS.length ? (
        <form onSubmit={handleAnswer}>
          <p><strong>{question.text}</strong></p>

          {question.image && (
            <img
              src={question.image}
              alt="Question visual"
              className="question-image"
            />
          )}

          {question.type === "text" ? (
            <input name="answer" type="text" required placeholder="Your answer..." />
          ) : (
            <div className="choices">
              {question.choices?.map((choice) => (
                <label key={choice}>
                  <input
                    type="radio"
                    name="answer"
                    value={choice}
                    required
                  />
                  {choice}
                </label>
              ))}
            </div>
          )}
          <button type="submit">Next</button>
        </form>
      ) : (
        <form onSubmit={handleFinalSubmit}>
          <p><strong>In all seriousness, Hope you've had a great day so far and have got some good gifts</strong></p>
          <p><strong>Your Email (Actual Email that I can send a card to):</strong></p>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p><strong>Pick a gift card:</strong></p>
          <select
            required
            value={giftCard}
            onChange={(e) => setGiftCard(e.target.value)}
          >
            <option value="">Select one</option>
            {GIFT_CARDS.map((card) => (
              <option key={card} value={card}>{card}</option>
            ))}
          </select>

          {giftCard === "Other" && (
            <>
              <p><strong>Enter custom gift card:</strong></p>
              <input
                type="text"
                required
                placeholder="Type the card name"
                value={customGiftCard}
                onChange={(e) => setCustomGiftCard(e.target.value)}
              />
            </>
          )}

          <button type="submit">Submit 🎁</button>
        </form>
      )}
    </motion.div>
  );
};

export default App;
