
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Fingerprint, Loader2, Eye, EyeOff, Delete, Copy, AlertTriangle, ShieldCheck, Shuffle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const PIN_LENGTH = 6;
const generatedPhrase = 'orbit scatter marry cause vessel summer obvious basket cannon pattern stereo shield';

const CreateWalletPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<'generate' | 'confirm' | 'secure'>('generate');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Phrase generation & confirmation state
  const words = useMemo(() => generatedPhrase.split(' '), []);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmError, setConfirmError] = useState(false);

  // Security check state
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [activePinField, setActivePinField] = useState<'pin' | 'confirm'>('pin');
  const [isPinVisible, setIsPinVisible] = useState(false);
  const [useBiometrics, setUseBiometrics] = useState(true);
  const [pinError, setPinError] = useState('');
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedPhrase);
    toast({
      title: "Phrase Copied!",
      description: "Your secret recovery phrase has been copied to the clipboard.",
    });
  };

  useEffect(() => {
    if (step === 'confirm') {
      const shuffled = [...words].sort(() => Math.random() - 0.5);
      setShuffledWords(shuffled);
      setSelectedWords([]);
      setConfirmError(false);
    }
  }, [step, words]);


  const handleWordSelect = (word: string) => {
    if (selectedWords.length < words.length) {
      setSelectedWords([...selectedWords, word]);
      setConfirmError(false);
    }
  };

  const handleWordDeselect = (index: number) => {
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
    setConfirmError(false);
  };
  
  const handleConfirmPhrase = () => {
    setIsConfirming(true);
    setTimeout(() => {
      const isCorrect = selectedWords.join(' ') === generatedPhrase;
      if (isCorrect) {
        setStep('secure');
      } else {
        setConfirmError(true);
        toast({
          variant: "destructive",
          title: "Incorrect Phrase",
          description: "The phrase you entered does not match. Please try again.",
        });
      }
      setIsConfirming(false);
    }, 1500);
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
            <div key={index} className={`h-4 w-4 rounded-full transition-all duration-300 ${index < value.length ? 'bg-primary primary-glow' : 'bg-input shadow-neo-in-sm'}`}>
                {isPinVisible && index < value.length && <span className="flex items-center justify-center h-full text-xs font-bold text-primary-foreground">{value[index]}</span>}
            </div>
        ))}
    </div>
  );

  const numpadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'];

  const renderStep = () => {
    switch (step) {
      case 'generate':
        return (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold font-headline">Recovery Phrase</h1>
              <p className="text-muted-foreground mt-2">Write down and store this phrase in a secure, offline location. This is the only way to recover your wallet.</p>
            </div>
            <div className="relative p-6 rounded-2xl shadow-neo-in-lg bg-background/50 mb-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
                {words.map((word, index) => (
                  <div key={index} className="flex items-center gap-2 font-mono text-lg">
                    <span className="text-muted-foreground w-6 text-right">{index + 1}.</span>
                    <span className="font-bold text-foreground">{word}</span>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="icon" className="absolute top-4 right-4 rounded-full shadow-neo-out-sm" onClick={handleCopyToClipboard}>
                <Copy size={18} />
              </Button>
            </div>
            <div className='bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 p-4 rounded-lg flex gap-4 items-center mb-8 shadow-neo-out-sm'>
              <AlertTriangle className="h-10 w-10 shrink-0" />
              <div>
                <h3 className='font-bold'>Never share this phrase.</h3>
                <p className='text-sm text-yellow-400/80'>Anyone with this phrase can take your assets. Store it securely.</p>
              </div>
            </div>
            <Button onClick={() => setStep('confirm')} className="w-full h-14 text-lg rounded-full bg-primary text-primary-foreground btn-glow shadow-neo-out-lg active:shadow-neo-in-lg">
              I've Backed It Up
            </Button>
          </>
        );
      case 'confirm':
        return (
            <>
              <div className="text-center mb-8">
                <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-4 primary-glow" />
                <h1 className="text-4xl font-bold font-headline">Confirm Phrase</h1>
                <p className="text-muted-foreground mt-2">Tap the words in the correct order to confirm your backup.</p>
              </div>

              <div className={cn("min-h-[144px] p-4 rounded-2xl shadow-neo-in-lg bg-background/50 mb-6 flex flex-wrap gap-2 items-center justify-center transition-all", confirmError && "ring-2 ring-destructive")}>
                  {selectedWords.map((word, index) => (
                      <Button key={index} variant="secondary" onClick={() => handleWordDeselect(index)} className="font-mono shadow-neo-out-sm rounded-full">
                          {word}
                      </Button>
                  ))}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {shuffledWords.map((word, index) => {
                  const isSelected = selectedWords.includes(word);
                  return (
                    <Button 
                      key={index} 
                      variant="outline" 
                      onClick={() => handleWordSelect(word)} 
                      disabled={isSelected}
                      className={cn("font-mono shadow-neo-out-sm rounded-full bg-background/50 hover:bg-muted/50", isSelected && "opacity-20 shadow-neo-in-sm")}
                    >
                      {word}
                    </Button>
                  )
                })}
              </div>
              
              <Button onClick={handleConfirmPhrase} disabled={isConfirming || selectedWords.length !== words.length} className={`w-full h-14 text-lg rounded-full bg-primary text-primary-foreground shadow-neo-out-lg active:shadow-neo-in-lg transition-all duration-300 ${isConfirming ? 'processing-glow animate-pulse' : 'btn-glow'}`}>
                {isConfirming ? <Loader2 className="animate-spin" /> : 'Confirm & Finish'}
              </Button>
            </>
        )
      case 'secure':
        return (
            <div className="text-center">
              <h1 className="text-4xl font-bold font-headline mb-4">Security Check</h1>
              <p className="text-muted-foreground mb-8">Secure your new wallet with a PIN and optional biometrics.</p>
              
              <div className="flex items-center justify-between p-4 rounded-lg shadow-neo-in-sm mb-8">
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
                  <div onClick={() => setActivePinField('pin')} className={`p-4 rounded-lg cursor-text transition-all ${activePinField === 'pin' ? 'shadow-neo-out-sm' : 'shadow-neo-in-sm'}`}>
                      <PinDisplay value={pin} />
                  </div>
                </div>

                <div>
                   <Label htmlFor="confirm-pin-input" className={`font-bold transition-colors ${activePinField === 'confirm' ? 'text-primary' : 'text-muted-foreground'}`}>Confirm PIN</Label>
                   <div onClick={() => setActivePinField('confirm')} className={`p-4 mt-2 rounded-lg cursor-text transition-all ${activePinField === 'confirm' ? 'shadow-neo-out-sm' : 'shadow-neo-in-sm'}`}>
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
                      className="h-16 text-2xl font-bold rounded-2xl shadow-neo-out-sm active:shadow-neo-in-sm"
                      disabled={isProcessing}
                    >
                      {key === 'delete' ? <Delete /> : key}
                    </Button>
                  ) : <div key="empty"></div>
                ))}
              </div>

              <Button onClick={handlePinSubmit} disabled={isProcessing} className={`w-full h-14 text-lg rounded-full bg-primary text-primary-foreground shadow-neo-out-lg active:shadow-neo-in-lg transition-all duration-300 ${isProcessing ? 'processing-glow animate-pulse' : 'btn-glow'}`}>
                {isProcessing ? <Loader2 className="animate-spin" /> : 'Create PIN & Finish'}
              </Button>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-background font-body text-foreground flex items-center justify-center p-4">
       <div className="w-full max-w-md">
        <div className="p-8 rounded-2xl shadow-neo-out-lg bg-background">
          {renderStep()}
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

export default CreateWalletPage;
