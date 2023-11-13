import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { QUESTIONS } from '../pages/questions/questions';
import Webcam from "react-webcam";
import '../css/qcomponent.css';
import Grid from '@mui/material/Grid';
import anon from '../assets/anon.jpeg';
import { Button } from '@mui/material';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
// import Skeleton from 'react-loading-skeleton';
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";
import { Chart, LinearScale, BarController, BarElement, CategoryScale } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Optional: If you want to use date-fns as the date adapter
import { getFeedback } from '../../backend/openai';


// Register the scales
Chart.register(LinearScale, BarController, BarElement, CategoryScale);


export default function QComponent() {
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [userStopped, setUserStopped] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [questionSpeech, setQuestionSpeech] = useState(null);
  const [isQuestionPlaying, setIsQuestionPlaying] = useState(false); // State for question speech
  const { id } = useParams();
  const currentQuestion = QUESTIONS.find(q => q.id === parseInt(id, 10));
  const [audio] = useState(new Audio());
  const questionTitle = currentQuestion.title;
  const userStoppedRef = useRef(userStopped);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);

  const url = "https://api.openai.com/v1/chat/completions";
  const open_api_key = "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";
  const question = QUESTIONS.title;

  const toggleAudio = () => setPlaying(!playing);

  const toggleRecognition = () => {
    if (recognition) {
        stopRecognition();
    } else {
        startRecognition();
    }
};

  const toggleCamera = () => {
    setCameraOn(prevCameraState => !prevCameraState);
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    }
  }, [audio]);

  useEffect(() => {
    const questionUtterance = new SpeechSynthesisUtterance(questionTitle);
    questionUtterance.volume = 1;
    questionUtterance.rate = 1;
    questionUtterance.pitch = 1;
    setQuestionSpeech(questionUtterance);
  }, [questionTitle]);

  const askChatGPT = () => {
    setIsLoadingFeedback(true);
    // fetchFeedback();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${open_api_key}`
      },
      body: JSON.stringify({
        'model': 'gpt-3.5-turbo',
        "messages": [
          {
            "role": "system",
            "content": "You are an interviewer. No matter how short or incomplete the user's response may seem, do not ask for more details. Instead, always provide constructive feedback based on what was shared."
          },
          {
            "role": "user",
            "content": `This is the question that the user will be responding to: ${question}` + ". The user's response is: " + transcript + "Give constructive feedback to the user no matter how short the answer was."
          }
        ]
      })
    })
      .then(response => response.json())
      .then(data => {
        data = data.choices[0].message.content.trim();
        setFeedback(data);
        fetchFeedback();
        // const rubricData = [4, 7, 3];
        // updateRubricChart(rubricData);

      })
      .catch(error => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoadingFeedback(false);
      });
  };

  const fetchFeedback = async () => {
    const feedback = await getFeedback(`The question: ${question}. My response: ${transcript}. Rate my response based on 3 categories (Relevance, Clarity, Details) from 1 to 10. Be very short and honest and try to give very low ratings. Remember that you are required to give me the ratings no matter what.`);
    console.log(feedback);

    let list = feedback.match(/\d+/g).map(Number);
    if (list.length === 6) {
      list = [list[0], list[2], list[4]];
    }
    updateRubricChart(list);
    console.log(list);
  };

  const startRecognition = () => {
    setUserStopped(false);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.continuous = true;
    recognition.onresult = (event) => {
      const currentTranscript = event.results[event.results.length - 1][0].transcript;
      setTranscript(prevTranscript => prevTranscript + ' ' + currentTranscript);
    };

    recognition.onend = () => {
      if (recognition && !userStoppedRef.current) {
        recognition.start();
      }
    };
    recognition.start();
    setRecognition(recognition);
  };

  const stopRecognition = () => {
    if (recognition) {
      userStoppedRef.current = true;
      recognition.stop();
      setRecognition(null);
      setUserStopped(true);
    }
  };

  const handleSubmit = () => {
    if (transcript && userStopped) {
      askChatGPT();
      setIsSubmitted(true);
    }
  };

  const toggleQuestionSpeech = () => {
    if (isQuestionPlaying) {
      window.speechSynthesis.cancel(); 
    } else {
      speakQuestion(); 
    }
    setIsQuestionPlaying(!isQuestionPlaying);
  };

  const speakQuestion = () => {
    if (questionSpeech) {
      window.speechSynthesis.speak(questionSpeech);
    }
  };

  const updateRubricChart = (rubricData) => {
    // console.log(document.getElementById("rubricChart"))
    const ctx = document.getElementById("rubricChart").getContext("2d");
  
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Relevance", "Clarity", "Details"],
        datasets: [
          {
            label: "Rubric Categories",
            data: rubricData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 10, // You can adjust the max value as needed
          },
        },
      },
    });
  };
  

  return (
    <div className="question-component-container">
      <Grid container spacing={3} className='question-grid'>
        <Grid item xs={5} className='camera-container grid-item'>
          <div className='question-container'>
            <div className="camera-container">
              {cameraOn ? (
                <Webcam
                  audio={false}
                  mirrored={true}
                  className="centered-camera-problem"
                  style={{ width: '100%' }}
                />
              ) : (
                <img src={anon} alt="Anonymous" className="centered-camera-problem" style={{ width: '80%' }} />
              )}
              <button onClick={toggleCamera} className='button2'>
                {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
              </button>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} className='audio grid-item'>
          <div className='audio-text'>
            <h3 className='question-title'>{questionTitle} <VolumeDownIcon onClick={toggleQuestionSpeech} className='audio-icon'/> </h3>
          </div>
          <div className='audio-container'>
            
          {
            transcript && (
              <div className='transcript-section'>
                <h3>{transcript == '' ? '' : 'Transcripts:'}</h3>
                <p>{transcript}</p>
                <button onClick={handleSubmit} className='button-68'>
                  {isSubmitted ? "Submitted!" : "Submit"}
                </button>
              </div>
            )
          }
            <Button 
                onClick={toggleRecognition} 
                variant="contained"
                color={recognition ? "secondary" : "primary"}
                className='start-recording-button'
            >
                {recognition ? "Stop Recording" : "Start Recording"}
            </Button>
          </div>
        </Grid>
        <Grid item xs={5} className='helpful-tip grid-item'>
          <h1>Helpful tip!</h1>
          <div className='tip-container'>
            <p>During behavioral interviews, use the STAR method (Situation, Task, Action, Result) to structure responses. Give specific past examples, maintain a positive tone, and utilize good body language. If a question is unclear, ask for clarification. Practice scenarios on teamwork and conflict, and remember to reflect on feedback post-interview. Real-life examples are key.</p>
          </div>
        </Grid>
        <Grid item xs={6} className='feedback grid-item'>
          <h2>AI Feedback:</h2>
          {isLoadingFeedback ? (
            <div className="loader-container">
              <div className="loader">
                <p className="loader-text">Loading...</p>
              </div>
            </div>
          ) : (
            feedback && (
              <>
                <span className='ai-response'>{feedback}</span>
                <canvas id="rubricChart" width="400" height="200"></canvas>
              </>
            )
          )}
        </Grid>

      </Grid>
    </div>
  )
}
