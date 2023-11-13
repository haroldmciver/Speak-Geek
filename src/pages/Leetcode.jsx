import React, { useEffect, useState, useRef } from 'react';
import Webcam from "react-webcam"; // Import the Webcam component
import { QUESTIONS } from './questions/questions'
import '../css/leetcode.css'; // Import the feedback CSS
import { Link } from 'react-router-dom'
import { getFeedback } from '../../backend/openai';
import 'react-circular-progressbar/dist/styles.css'; // Import circular progress bar styles
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import anon from '../assets/anon.jpeg'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';


function getColors(score) {
    if (score >= 0 && score <= 3) {
        return { pathColor: 'red', textColor: 'red' };  
    } else if (score >= 4 && score <= 6) {
        return { pathColor: 'rgb(255 192 30)', textColor: 'rgb(255 192 30)' };  
    } else if (score >= 7 && score <= 10) {
        return { pathColor: 'green', textColor: 'green' };  
    } else {        
        return { pathColor: '#a8d5a0', textColor: '#a8d5a0' };  
    }
}

export default function Problems() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermFinal, setSearchTermFinal] = useState('');
    const [transcript, setTranscript] = useState('');
    const [recognition, setRecognition] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [userStopped, setUserStopped] = useState(false);
    const [prompt, setPrompt] = useState("Hello ChatGPT!");
    const [cameraOn, setCameraOn] = useState(false); 
    const [feedbackScore, setFeedbackScore] = useState(0);
    const [loading, setLoading] = useState(false); 
    const [isRecording, setIsRecording] = useState(false); 
    const [hasRecorded, setHasRecorded] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false)

    const userStoppedRef = useRef(userStopped);

    useEffect(() => {
        userStoppedRef.current = userStopped;
    }, [userStopped]);

    const toggleRecognition = () => {
        if(isRecording) {
            stopRecognition();
        } else {
            startRecognition();
        }
    };

    const startRecognition = () => {
        setIsRecording(true);
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const newRecognition = new SpeechRecognition();
        newRecognition.interimResults = false;
        newRecognition.continuous = true;
        newRecognition.onresult = (event) => {
            const currentTranscript = event.results[event.results.length - 1][0].transcript;
            setTranscript(prevTranscript => prevTranscript + ' ' + currentTranscript);
        };
    
        newRecognition.onend = () => {
            if (newRecognition && !userStoppedRef.current) {
                newRecognition.start();
            }
        };
        newRecognition.start();
        setRecognition(newRecognition);
    };
    

    const stopRecognition = () => {
        setIsRecording(false);
        if (recognition) {
            recognition.stop();
            setRecognition(null);
            setPrompt(transcript);
            setUserStopped(true);
            setHasRecorded(true); 
        }
    };

    const toggleCamera = () => {
        setCameraOn(prevCameraState => !prevCameraState);
    };

    const handleSubmit = () => {
        window.scrollTo(0, document.body.scrollHeight);
        if (transcript == "") {
            return;
        }
        setLoading(true);
        console.log("transcript: " + transcript)
        const feedbackPrompt = `Rate my technical interview for the Leetcode problem "${searchTermFinal}": ${transcript}\nBe honest with your rating and do not assume or consider anything that i didn't say. And at the very beginning of your response you ARE REQUIRED TO rate my answer on a scale from 1 to 10. If the user gets the solution right be`;

        const fetchFeedback = async () => {
            const feedback = await getFeedback(feedbackPrompt);
            console.log(feedbackPrompt);
            setFeedback(feedback);
            setLoading(false); 
            const rating = feedback.match(/^\d+|\d+\b|\d+(?=\w)/g);
            if (rating && rating.length > 0 && !isNaN(rating[0]) && rating[0] >= 1 && rating[0] <= 10) {
                setFeedbackScore(rating[0]);
            } else {
                setFeedbackScore(0);
            }
        };

        fetchFeedback();
        setIsSubmitted(true)
    }

    return (
        <div className="leet-container">
            <div className='first-section'>            
                <div className='header-section'>
                    <h2>Practice Technical Interviews</h2>
                    <p>With our AI tool, you can practice your technical interview skills and get better at your soft skills.</p>
                </div>
                <div className='search-section'>
                <Tooltip title="Search for a LeetCode problem and record your solution approach" arrow>
                    <TipsAndUpdatesIcon className='lightbulb'/>
                </Tooltip>

                    <TextField
                        style={ {width: '30rem'} }
                        variant="outlined"
                        placeholder="Search for a LeetCode problem, e.g. 'Two Sum' "
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                <Tooltip title="Click to set final search term">
                                    <IconButton onClick={() => setSearchTermFinal(searchTerm)}>
                                        <SendIcon className='submit-icon'/>
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className='hint-section'>
                    {searchTermFinal && (
                        <>
                            <h2 style={{ textAlign: 'center' }}>Explain the Leetcode problem "{searchTermFinal}"</h2>
                        </>
                    )}
                </div>
            </div>

            <div className="tts-container">
                <Tooltip title="Optional camera feature to replicate real interview enviroment" arrow>
                    <HelpOutlineIcon className='questionmark-icon'/>
                </Tooltip>
                <div className="camera-container">
                    <div className="camera-wrapper">
                        {cameraOn ? (
                            <Webcam
                                audio={false}
                                mirrored={true}
                                className="centered-cam"
                            />
                        ) : (
                            <img src={anon} alt="Anonymous" className="anon-img" />  // Apply the new class
                        )}
                        <button onClick={toggleCamera} className='button10'>
                            {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
                        </button>
                    </div>
                </div>
                <div className='audio-container'>
                    {
                        transcript != '' ?
                        <div className='transcript-section'>
                            <h2>{transcript}</h2>
                        </div> :
                        ''
                    }
                   
                    <Button 
                        onClick={toggleRecognition} 
                        variant="contained"
                        color={recognition ? "secondary" : "primary"}
                        className='record-button'
                    >
                        {recognition ? "Stop Recording" : "Start Recording"}
                    </Button>

                </div>

                {hasRecorded && 
                    <div className="center-button">
                        <button onClick={handleSubmit} className="button-37">{isSubmitted ? 'Submitted!' : 'Submit '}</button>
                    </div>
                }
            </div>

            {(!loading && feedback) && (  
                <div className="feedback-container">
                    <div className="ai-feedback-section">
                        <h2 className="section-header">AI Feedback:</h2>  
                        <span className='ai-response'>{feedback}</span>
                    </div>
                    <div className="feedback-section">
                        <h2 className="section-header"> Feedback Score</h2>  
                        <div className="feedback-score">
                            <CircularProgressbar
                                value={feedbackScore * 10}
                                text={feedbackScore.toString()}
                                className="circular-progressbar" 
                                styles={buildStyles({
                                    textSize: '1rem', 
                                    ...getColors(feedbackScore),  
                                })}
                            />
                        </div>
                    </div>
                </div>
            )}
            </div>
    )
}
