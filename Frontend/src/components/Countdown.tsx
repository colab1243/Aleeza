import { useState, useEffect } from 'react';
import { calculateTimeLeft } from '../utils/dateUtils';
import './Countdown.css';

interface CountdownProps {
  targetDate: Date;
  title: string;
}

const Countdown = ({ targetDate, title }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    // Show the love message after a delay
    const messageTimer = setTimeout(() => setShowMessage(true), 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(messageTimer);
    };
  }, [targetDate]);

  return (
    <div className="countdown-container">
      {/* Folded paper background */}
      <div className="paper-fold">
        <div className="paper-texture"></div>
        <div className="paper-shadow"></div>
      </div>

      <div className="countdown-content">
        {/* Handwritten title */}
        <div className="title-section">
          <h1 className="countdown-title">{title}</h1>
          <div className="title-decoration">
            <span className="decoration-line">✦ ✦ ✦</span>
          </div>
        </div>

        {/* Polaroid-style countdown */}
        <div className="countdown-polaroid">
          <div className="polaroid-border">
            <div className="countdown-grid">
              <div className="time-box">
                <div className="time-value">{timeLeft.days}</div>
                <div className="time-label">Days</div>
                <div className="time-doodle">✨</div>
              </div>
              <div className="time-box">
                <div className="time-value">{timeLeft.hours}</div>
                <div className="time-label">Hours</div>
                <div className="time-doodle">💕</div>
              </div>
              <div className="time-box">
                <div className="time-value">{timeLeft.minutes}</div>
                <div className="time-label">Minutes</div>
                <div className="time-doodle">🌸</div>
              </div>
              <div className="time-box">
                <div className="time-value">{timeLeft.seconds}</div>
                <div className="time-label">Seconds</div>
                <div className="time-doodle">💫</div>
              </div>
            </div>
          </div>
          <div className="polaroid-stub"></div>
        </div>

        {/* Love message that appears */}
        {showMessage && (
          <div className="love-message">
            <p className="message-text">
              Until I can hold you in my arms again... 💕
            </p>
            <div className="message-heart">❤️</div>
          </div>
        )}

        {/* Floating elements */}
        <div className="floating-elements">
          <div className="floating-element heart-1">💖</div>
          <div className="floating-element heart-2">🌹</div>
          <div className="floating-element heart-3">✨</div>
          <div className="floating-element heart-4">💕</div>
        </div>

        {/* Corner doodles */}
        <div className="corner-doodle top-left">❀</div>
        <div className="corner-doodle top-right">✿</div>
        <div className="corner-doodle bottom-left">❀</div>
        <div className="corner-doodle bottom-right">✿</div>
      </div>
    </div>
  );
};

export default Countdown;

