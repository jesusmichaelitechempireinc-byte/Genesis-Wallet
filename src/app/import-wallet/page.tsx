
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Fingerprint, Loader2, Eye, EyeOff, Delete } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';

const PIN_LENGTH = 6;

const ImportWalletPage = () => {
  const router = useRouter();
  const [secretPhrase, setSecretPhrase] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [showPin, setShowPin] = useState(false);

  // New state for the security check page
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [activePinField, setActivePinField] = useState<'pin' | 'confirm'>('pin');
  const [isPinVisible, setIsPinVisible] = useState(false);
  const [useBiometrics, setUseBiometrics] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pinError, setPinError] = useState('');
  
  const [, setWalletExists] = useLocalStorage('wallet-exists', false);
  const [, setWalletImported] = useLocalStorage('wallet-imported', 'none');


  const correctPhrase = 'fine steak ozone congress large love hood floor spring riot clown mind';

  const handlePhraseChange = (value: string) => {
    setSecretPhrase(value);
    if (isIncorrect) {
      setIsIncorrect(false);
    }
  };

  const words = useMemo(() => secretPhrase.trim().toLowerCase().split(/\s+/).filter(Boolean), [secretPhrase]);
  const wordCount = words.length;

  const handleImport = () => {
    setIsChecking(true);
    setPinError('');
    setTimeout(() => {
      const isCorrect = secretPhrase.trim().toLowerCase() === correctPhrase;
      if (wordCount >= 12) {
        setWalletImported(isCorrect ? 'funded' : 'empty');
        setShowPin(true);
      } else {
        setIsIncorrect(true);
      }
      setIsChecking(false);
    }, 2000);
  };
  
  const handlePinInput = (value: string) => {
    if (isProcessing) return;
    setPinError('');
    if (activePinField === 'pin') {
      if (pin.length < PIN_LENGTH) setPin(pin + value);
    } else {
      if (confirmPin.length < PIN_LENGTH) setConfirmPin(confirmPin + value);
    }
  };

  const handleDelete = () => {
    if (isProcessing) return;
    setPinError('');
    if (activePinField === 'pin') {
      setPin(pin.slice(0, -1));
    } else {
      setConfirmPin(confirmPin.slice(0, -1));
    }
  };

  const handlePinSubmit = () => {
    if (pin.length !== PIN_LENGTH || confirmPin.length !== PIN_LENGTH) {
      setPinError('PIN must be 6 digits.');
      return;
    }
    if (pin !== confirmPin) {
      setPinError("PINs do not match. Please try again.");
      setPin('');
      setConfirmPin('');
      setActivePinField('pin');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setWalletExists(true);
      router.push('/dashboard');
    }, 2500);
  };

  useEffect(() => {
    if(pin.length === PIN_LENGTH) {
        setActivePinField('confirm');
    }
  }, [pin]);

  const PinDisplay = ({ value }: { value: string }) => (
    <div className="flex justify-center gap-3">
        {Array.from({ length: PIN_LENGTH }).map((_, index) => (
            <div key={index} className={`h-4 w-4 rounded-full transition-all duration-300 ${index < value.length ? 'bg-primary primary-glow' : 'bg-input shadow-heavy-in-sm'}`}>
                {isPinVisible && index < value.length && <span className="flex items-center justify-center h-full text-xs font-bold text-primary-foreground">{value[index]}</span>}
            </div>
        ))}
    </div>
  );

  const numpadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'];

  return (
    <div className="min-h-screen w-full bg-background font-body text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="p-8 rounded-2xl shadow-heavy-out-lg bg-background">
          {!showPin ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold font-headline">Import Wallet</h1>
                <p className="text-muted-foreground mt-2">Enter your 12-word secret recovery phrase.</p>
              </div>
              <div className="relative mb-4">
                <Textarea
                  value={secretPhrase}
                  onChange={(e) => handlePhraseChange(e.target.value)}
                  className={`text-left shadow-heavy-in-sm rounded-md border-transparent focus:shadow-heavy-out-sm transition-shadow resize-none ${isIncorrect ? 'border-destructive ring-2 ring-destructive' : ''}`}
                  placeholder="Paste your secret phrase here..."
                  rows={4}
                />
                <div className="absolute bottom-2 right-3 text-xs text-muted-foreground font-mono">
                  {wordCount} {wordCount === 1 ? 'word' : 'words'}
                </div>
              </div>
              {isIncorrect && <p className="text-destructive text-center mb-4 font-bold text-base opacity-90">Please enter a valid 12-word phrase.</p>}
              <Button onClick={handleImport} disabled={isChecking || wordCount < 12} className="w-full h-14 text-lg rounded-full bg-primary text-primary-foreground btn-glow shadow-heavy-out-lg active:shadow-heavy-in-lg">
                {isChecking ? <Loader2 className="animate-spin" /> : 'Import Wallet'}
              </Button>
            </>
          ) : (
            <div className="text-center">
              <h1 className="text-4xl font-bold font-headline mb-4">Security Check</h1>
              <p className="text-muted-foreground mb-8">Secure your wallet with a PIN and optional biometrics.</p>
              
              <div className="flex items-center justify-between p-4 rounded-lg shadow-heavy-in-sm mb-8">
                <div className='flex items-center gap-3'>
                    <Fingerprint size={24} className="text-primary" />
                    <Label htmlFor="biometrics-switch" className="font-bold">Use Biometrics</Label>
                </div>
                <Switch
                  id="biometrics-switch"
                  checked={useBiometrics}
                  onCheckedChange={setUseBiometrics}
                  disabled={isProcessing}
                />
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="pin-input" className={`font-bold transition-colors ${activePinField === 'pin' ? 'text-primary' : 'text-muted-foreground'}`}>Set PIN</Label>
                    <button onClick={() => setIsPinVisible(!isPinVisible)} className="text-muted-foreground hover:text-primary">
                        {isPinVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <div onClick={() => setActivePinField('pin')} className={`p-4 rounded-lg cursor-text transition-all ${activePinField === 'pin' ? 'shadow-heavy-out-sm' : 'shadow-heavy-in-sm'}`}>
                      <PinDisplay value={pin} />
                  </div>
                </div>

                <div>
                   <Label htmlFor="confirm-pin-input" className={`font-bold transition-colors ${activePinField === 'confirm' ? 'text-primary' : 'text-muted-foreground'}`}>Confirm PIN</Label>
                   <div onClick={() => setActivePinField('confirm')} className={`p-4 mt-2 rounded-lg cursor-text transition-all ${activePinField === 'confirm' ? 'shadow-heavy-out-sm' : 'shadow-heavy-in-sm'}`}>
                      <PinDisplay value={confirmPin} />
                  </div>
                </div>
              </div>

              {pinError && <p className="text-destructive text-center my-4 font-bold text-base opacity-90">{pinError}</p>}

              <div className="grid grid-cols-3 gap-4 my-8">
                {numpadKeys.map((key) => (
                  key ? (
                    <Button 
                      key={key} 
                      variant="ghost" 
                      onClick={() => key === 'delete' ? handleDelete() : handlePinInput(key)}
                      className="h-16 text-2xl font-bold rounded-2xl shadow-heavy-out-sm active:shadow-heavy-in-sm"
                      disabled={isProcessing}
                    >
                      {key === 'delete' ? <Delete /> : key}
                    </Button>
                  ) : <div key="empty"></div>
                ))}
              </div>

              <Button onClick={handlePinSubmit} disabled={isProcessing} className={`w-full h-14 text-lg rounded-full bg-primary text-primary-foreground shadow-heavy-out-lg active:shadow-heavy-in-lg transition-all duration-300 ${isProcessing ? 'processing-glow animate-pulse' : 'btn-glow'}`}>
                {isProcessing ? <Loader2 className="animate-spin" /> : 'Create PIN'}
              </Button>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .processing-glow {
          box-shadow: 0 0 25px hsl(var(--primary) / 0.8), 0 0 45px hsl(240 100% 80% / 0.7);
        }
      `}</style>
    </div>
  );
};

export default ImportWalletPage;
