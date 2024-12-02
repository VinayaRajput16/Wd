/* wd/static/react/WebinarPage.js */
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

const WebinarPage = () => {
  const [timeLeft, setTimeLeft] = useState(10);  // Countdown time
  const [isWebinarActive, setIsWebinarActive] = useState(false);  // Webinar active state
  const [isJoined, setIsJoined] = useState(false);  // Track user joining
  const [isBuffering, setIsBuffering] = useState(false); // Buffering state
  const [videoStarted, setVideoStarted] = useState(false);  // Video start state
  const [attendeesCount, setAttendeesCount] = useState(0);  // Simulate attendee count
  
  // Countdown logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1); // Decrease time by 1 second
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setIsWebinarActive(true); // Enable "Join Webinar" button once timer ends
    }
  }, [timeLeft]);

  // Simulate buffering delay before starting video
  useEffect(() => {
    if (isJoined && isWebinarActive && !videoStarted) {
      setIsBuffering(true);
      setTimeout(() => {
        setIsBuffering(false);
        setVideoStarted(true);  // Start the video after 5 seconds delay
      }, 5000); // 5 seconds delay to simulate buffering
    }
  }, [isJoined, isWebinarActive, videoStarted]);

  // Handle user clicking "Join" to start the webinar
  const handleJoinClick = () => {
    setIsJoined(true);
    setAttendeesCount((prevCount) => prevCount + 1); // Simulate attendee joining
  };

  // Handle user clicking "Leave" to exit webinar
  const handleLeaveClick = () => {
    setIsJoined(false);
    setAttendeesCount((prevCount) => prevCount - 1); // Simulate attendee leaving
    setVideoStarted(false);  // Stop the video
    setIsBuffering(false);  // Reset buffering
    setTimeLeft(10);  // Reset the countdown if they rejoin later
  };

  return (
    <div className="webinar-container">
      <h1 className="title">Live Webinar: Future of Technology</h1>

      {/* Countdown Timer */}
      <div className="countdown">
        <p>{timeLeft} seconds until webinar starts!</p>
      </div>

      {/* Show Attendees Count */}
      {isJoined && (
        <div className="attendees-info">
          <p>Currently {attendeesCount} attendee{attendeesCount > 1 ? 's' : ''} watching</p>
        </div>
      )}

      {/* Start Webinar Button */}
      {isWebinarActive && !isJoined && (
        <div className="join-button-container">
          <button
            className="join-button"
            onClick={handleJoinClick}
            disabled={!isWebinarActive} // Button is disabled until timer ends
          >
            Join Webinar
          </button>
        </div>
      )}


      {/* Buffering State */}
      {isBuffering && (
        <div className="buffering-overlay">
          <div className="buffering-content">
            <p>Buffering...</p>
            <div className="loading-spinner"></div>
          </div>
        </div>
      )}

      {/* Show Webinar Video */}
      {videoStarted && (
        <div className="video-container">
          <ReactPlayer
            url="https://videos.pexels.com/video-files/9130156/9130156-uhd_2560_1440_30fps.mp4" // Replace with actual video URL
            playing={true}
            controls={false}  // Hide controls for "live" feel
            width="100%"
            height="100%"
          />
        </div>
      )} 
      {/* Waiting Room - Pre-stream Screen */}
      {!videoStarted && !isBuffering && (
        <div className="waiting-room">
          <p>The webinar will start shortly. Please stand by...</p>
        </div>
      )}

       {/* Leave Webinar Button */}
       {isJoined && (
        <div className="leave-button-container">
          <button
            className="leave-button"
            onClick={handleLeaveClick}
          >
            Leave Webinar
          </button>
        </div>
      )}
    </div>
  );
};

export default WebinarPage;
