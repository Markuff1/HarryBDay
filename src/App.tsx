import React, { useEffect, useState, type FormEvent, useRef } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import "./App.scss";
import { QUESTIONS} from "./questions";
import Countdown from "./Countdown";
import ben from "../src/Ben.png";
import gordon from "../src/gordon-ramsayV2.wav";

const GIFT_CARDS = ["Amazon", "Xbox", "Spotify", "One for all (If you're gay)", "Other", "I JUST WANT CASH"];
const BIRTHDAY_DATE = new Date("2025-06-14T00:00:00");

const App: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [giftCard, setGiftCard] = useState("");
  const [customGiftCard, setCustomGiftCard] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const today = new Date();
  const isBirthday = today >= BIRTHDAY_DATE;

  useEffect(() => {
    if (isBirthday) {
      confetti({
        particleCount: 1500,
        spread: 90,
        origin: { y: 0.6 },
        gravity: 0.5,
        ticks: 500,
        scalar: 1.5,
        shapes: ["circle", "circle", "square"],
      });
    }
  }, [isBirthday]);

  useEffect(() => {
    if (QUESTIONS[currentQ]?.type === "audio" && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked, user can interact to start sound
      });
    }
  }, [currentQ]);

  const handleAnswer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWrongAnswer(false);
    const formData = new FormData(e.currentTarget);
    const answerRaw = formData.get("answer");
    if (!answerRaw) return;

    const answer = answerRaw.toString().toLowerCase().trim();
    const question = QUESTIONS[currentQ];
    const correctAnswers = question.correctAnswers?.map(a => a.toLowerCase().trim()) || [];

    const isConfirmationQ =
      question.text.includes("Are you sure") || question.text.includes("1000000%");

    if (isConfirmationQ) {
      setIsWaiting(true);
      setCountdown(5);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev === 1) {
            clearInterval(timer);
            setIsWaiting(false);
            setAnswers(prev => [...prev, answerRaw.toString()]);
            setCurrentQ(prev => prev + 1);
            const form = document.querySelector("form") as HTMLFormElement;
            form?.reset();
          }
          return prev - 1;
        });
      }, 1000);
      return;
    }

    if (correctAnswers.includes(answer)) {
      setAnswers(prev => [...prev, answerRaw.toString()]);
      setCurrentQ(prev => prev + 1);
      e.currentTarget.reset();

      if (currentQ + 1 === QUESTIONS.length) {
        setTimeout(() => {
          confetti({ particleCount: 250, spread: 120, origin: { y: 0.5 } });
        }, 300);
      }
    } else {
      setWrongAnswer(true);
      setCurrentQ(0);
      setAnswers([]);
      e.currentTarget.reset();
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
      <motion.div className="app-container" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <h1>🎁 Almost Time!</h1>
        <p>This surprise unlocks on June 14!</p>
        <Countdown targetDate={BIRTHDAY_DATE} />
      </motion.div>
    );
  }

  if (submitted) {
    return (
      <motion.div className="app-container" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <h1>🎉 Thanks!</h1>
        <p>I'll send it across now. Happy Birthday and enjoy the rest of your day!</p>
      </motion.div>
    );
  }

  const question = QUESTIONS[currentQ];

  return (
    <motion.div className="app-container" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
      <h1>🎂 Happy 22nd Birthday Harry 🎈</h1>

      {currentQ < QUESTIONS.length ? (
        isWaiting ? (
          <div>
            <p><strong>Just to prove your sure...</strong></p>
            <p>Please wait <strong>{countdown}</strong> more seconds to prove you're 1000000% sure 😏</p>
          </div>
        ) : (
          <form onSubmit={handleAnswer}>
            <p><strong>{question.text}</strong></p>

            {question.image && <img src={ben} alt="Question visual" className="question-image" />}

            {question.type === "audio" && (
              <audio ref={audioRef} controls preload="auto">
                <source src={gordon} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            )}

            {question.type === "multiple-choice" ? (
              <div className="choices">
                {question.choices?.map(choice => (
                  <label key={choice}>
                    <input type="radio" name="answer" value={choice} required />
                    {choice}
                  </label>
                ))}
              </div>
            ) : (
              <input name="answer" type="text" required placeholder="Your answer..." autoComplete="off" />
            )}

            {wrongAnswer && <p style={{ color: "red" }}>Wrong answer you idiot! Start again.</p>}
            <button type="submit">Next</button>
          </form>
        )
      ) : (
        <form onSubmit={handleFinalSubmit}>
          <p><strong>Well here you go, Hope you've had a great day so far and got some good gifts!</strong></p>
          <p><strong>I was going to get you a present but since you're moving I won't be able to give it to you so gift card/Money it is</strong></p>

          <p><strong>Your Email (actual email I can send a card to):</strong></p>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />

          <p><strong>Pick a gift card:</strong></p>
          <select required value={giftCard} onChange={e => setGiftCard(e.target.value)}>
            <option value="">Select one</option>
            {GIFT_CARDS.map(card => (
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
                onChange={e => setCustomGiftCard(e.target.value)}
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
