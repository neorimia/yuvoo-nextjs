'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// ✅ Moved outside the component
const calculateTimeLeft = (targetDate: string): TimeLeft => {
  const difference = +new Date(targetDate) - +new Date();

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const CountdownSection = ({ targetDate }: { targetDate: string }) => {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(targetDate)
  );

  useEffect(() => {
    setMounted(true);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return null; // Prevents hydration mismatch

  const timeBox = (value: number, label: string) => (
    <div className='countdown-item'>
      <div className="countdown-item-count">{String(value).padStart(2, '0')}</div>
      <div className="countdown-item-label">{label}</div>
    </div>
  );

  return (
    <div className="bd-countdown mb-30">
      {timeBox(timeLeft.days, 'Days')}
      {timeBox(timeLeft.hours, 'Hours')}
      {timeBox(timeLeft.minutes, 'Minutes')}
      {timeBox(timeLeft.seconds, 'Seconds')}
    </div>
  );
};

export default CountdownSection;
