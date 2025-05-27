import { useEffect, useState } from 'react';

const VoiceAssistant = ({ onCommand }: { onCommand: (command: string) => void }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

    useEffect(() => {
        // Check if the browser supports the Web Speech API
        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (SpeechRecognition) {
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = false;
            recognitionInstance.lang = 'en-US';

            recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
                const lastResult = event.results[event.results.length - 1];
                if (lastResult.isFinal) {
                    const command = lastResult[0].transcript.trim();
                    setTranscript(command);
                    onCommand(command); // Pass the command to the parent component
                }
            };

            recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error('Speech recognition error:', event.error);
            };

            setRecognition(recognitionInstance);
        } else {
            console.error('Web Speech API is not supported in this browser.');
        }
    }, [onCommand]);

    const handleStartListening = () => {
        if (recognition) {
            setIsListening(true);
            recognition.start();
        }
    };

    const handleStopListening = () => {
        if (recognition) {
            setIsListening(false);
            recognition.stop();
        }
    };

    const handleSpeak = (text: string) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        synth.speak(utterance);
    };

    return (
        <div className="voice-assistant bg-gray-800 text-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">AI Voice Assistant</h2>
            <div className="flex items-center gap-4">
                <button
                    onClick={isListening ? handleStopListening : handleStartListening}
                    className={`px-4 py-2 rounded-lg ${isListening ? 'bg-red-500' : 'bg-green-500'} hover:opacity-80`}
                >
                    {isListening ? 'Stop Listening' : 'Start Listening'}
                </button>
                <button
                    onClick={() => handleSpeak('How can I assist you today?')}
                    className="px-4 py-2 bg-blue-500 rounded-lg hover:opacity-80"
                >
                    Speak
                </button>
            </div>
            <p className="mt-4 text-sm text-gray-300">
                <strong>Transcript:</strong> {transcript || 'Say something...'}
            </p>
        </div>
    );
};

export default VoiceAssistant;