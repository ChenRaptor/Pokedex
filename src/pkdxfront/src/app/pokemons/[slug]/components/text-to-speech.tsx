"use client";

import { useState } from 'react';

import { AudioLines } from 'lucide-react';
import { Button } from '@/registry/new-york/ui/button';


type PokedexVoiceSpeakProps = {
    text: string;
}

const PokedexVoiceSpeak = ({ text } : PokedexVoiceSpeakProps) => {
    const [speaking, setSpeaking] = useState<boolean>(false);

    const speakText = () => {
        if (speaking) {
            window.speechSynthesis.cancel();
            return setSpeaking(false);
        };
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.voice= window.speechSynthesis.getVoices()[2];
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = .5;
            utterance.onstart = () => setSpeaking(true);
            utterance.onend = () => setSpeaking(false);
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <Button className={`absolute top-36 right-4 w-12 h-12 cursor-pointer border-2 ${speaking ? "border-indigo-600": ""}`} variant="outline" onClick={() => speakText()}>
            <AudioLines className={`scale-150 ${speaking ? "stroke-indigo-600": ""}`}/>
        </Button>
    );
};



export default PokedexVoiceSpeak;