'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Fingerprint, Loader2 } from 'lucide-react';

const ImportWalletPage = () => {
  const router = useRouter();
  const [secretPhrase, setSecretPhrase] = useState(Array(12).fill(''));
  const [isChecking, setIsChecking] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const correctPhrase = 'fine steak ozone congress large love hood floor spring riot clown mind'.split(' ');

  const handlePhraseChange = (index: number, value: string) => {
    const newPhrase = [...secretPhrase];
    newPhrase[index] = value.trim().toLowerCase();
    setSecretPhrase(newPhrase);
    if (isIncorrect) {
        setIsIncorrect(false);
    }
  };

  const handleImport = () => {
    setIsChecking(true);
    setTimeout(() => {
      const isCorrect = secretPhrase.every((word, index) => word === correctPhrase[index]);
      if (isCorrect) {
        setShowPin(true);
      } else {
        setIsIncorrect(true);
      }
      setIsChecking(false);
    }, 2000);
  };

  const handlePinSubmit = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen w-full bg-background font-body text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="p-8 rounded-2xl shadow-neo-out-lg bg-background">
          {!showPin ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold font-headline">Import Wallet</h1>
                <p className="text-muted-foreground mt-2">Enter your secret recovery phrase.</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {secretPhrase.map((word, index) => (
                  <Input
                    key={index}
                    type="text"
                    value={word}
                    onChange={(e) => handlePhraseChange(index, e.target.value)}
                    className={`text-center shadow-neo-in-sm rounded-md border-transparent focus:shadow-neo-out-sm transition-shadow ${isIncorrect ? 'border-destructive ring-2 ring-destructive' : ''}`}
                    placeholder=""
                  />
                ))}
              </div>
              {isIncorrect && <p className="text-destructive text-center mb-4">Incorrect secret phrase. Please try again.</p>}
              <Button onClick={handleImport} disabled={isChecking} className="w-full h-14 text-lg rounded-full bg-primary text-primary-foreground btn-glow shadow-neo-out-lg active:shadow-neo-in-lg">
                {isChecking ? <Loader2 className="animate-spin" /> : 'Import Wallet'}
              </Button>
            </>
          ) : (
            <div className="text-center">
              <h1 className="text-4xl font-bold font-headline mb-4">Security Check</h1>
              <p className="text-muted-foreground mb-8">Set up your PIN or use biometrics to secure your wallet.</p>
              <div className="flex flex-col items-center gap-6">
                <Fingerprint size={64} className="text-primary primary-glow" />
                <p className="text-muted-foreground">Use Biometrics or Enter PIN</p>
                <div className="w-full max-w-xs">
                  <Input type="password" placeholder="Enter your 6-digit PIN" className="text-center shadow-neo-in-sm rounded-md border-transparent focus:shadow-neo-out-sm transition-shadow" maxLength={6} />
                  <Button onClick={handlePinSubmit} className="w-full h-14 text-lg rounded-full bg-primary text-primary-foreground btn-glow shadow-neo-out-lg active:shadow-neo-in-lg mt-4">
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportWalletPage;
