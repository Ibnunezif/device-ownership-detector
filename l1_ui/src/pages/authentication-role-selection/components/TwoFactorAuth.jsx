import React, { useState, useRef, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TwoFactorAuth = ({ onVerify, onResend, isLoading, method = 'email' }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(300);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (index, value) => {
    if (value?.length > 1) {
      value = value?.slice(-1);
    }

    if (!/^\d*$/?.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs?.current?.[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e?.key === 'Backspace' && !code?.[index] && index > 0) {
      inputRefs?.current?.[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e?.preventDefault();
    const pastedData = e?.clipboardData?.getData('text')?.slice(0, 6);
    if (!/^\d+$/?.test(pastedData)) return;

    const newCode = pastedData?.split('');
    setCode([...newCode, ...Array(6 - newCode?.length)?.fill('')]);
    inputRefs?.current?.[Math.min(pastedData?.length, 5)]?.focus();
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const fullCode = code?.join('');
    if (fullCode?.length === 6) {
      onVerify(fullCode);
    }
  };

  const handleResend = () => {
    setTimeLeft(300);
    setCode(['', '', '', '', '', '']);
    onResend();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-accent/10">
          <Icon name="ShieldCheck" size={32} className="text-accent" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Two-Factor Authentication</h3>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to your {method === 'email' ? 'email' : 'phone'}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-2">
          {code?.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e?.target?.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={isLoading}
              className="w-12 h-14 text-center text-lg font-semibold rounded-md border-2 border-input bg-background text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-200 disabled:opacity-50"
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center space-y-2">
          <div className="text-sm text-muted-foreground">
            Code expires in <span className="font-semibold text-foreground">{formatTime(timeLeft)}</span>
          </div>
          {timeLeft === 0 ? (
            <button
              type="button"
              onClick={handleResend}
              className="text-sm text-accent hover:text-accent/80 transition-colors duration-200"
            >
              Resend code
            </button>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={timeLeft > 240}
              className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Didn't receive code? Resend
            </button>
          )}
        </div>

        <Button
          type="submit"
          variant="default"
          fullWidth
          disabled={code?.join('')?.length !== 6 || isLoading}
          loading={isLoading}
          iconName="CheckCircle"
          iconPosition="right"
        >
          Verify Code
        </Button>
      </form>
      <div className="flex items-start gap-2 p-3 rounded-md bg-muted/50 text-xs text-muted-foreground">
        <Icon name="Info" size={14} className="flex-shrink-0 mt-0.5" />
        <p>For security purposes, this code can only be used once and expires after 5 minutes.</p>
      </div>
    </div>
  );
};

export default TwoFactorAuth;