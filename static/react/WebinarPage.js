import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

// Hardcoded video URL (for easy future management)
const VIDEO_URL = "https://videos.pexels.com/video-files/9130156/9130156-uhd_2560_1440_30fps.mp4";

const WebinarPage = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isWebinarActive, setIsWebinarActive] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [attendeesCount, setAttendeesCount] = useState(0);

  // Function to calculate the next webinar time (11 AM or 6 PM)
  const getNextWebinarTime = () => {
    const now = new Date();
    let nextWebinarTime;

    const webinarTimes = [11, 18]; // 11 AM and 6 PM in 24-hour format

    // Check if current time is before the first webinar (11 AM)
    if (now.getHours() < webinarTimes[0]) {
      nextWebinarTime = new Date(now.setHours(webinarTimes[0], 0, 0, 0)); // Set to 11 AM today
    } 
    // Check if current time is between 11 AM and 6 PM
    else if (now.getHours() < webinarTimes[1]) {
      nextWebinarTime = new Date(now.setHours(webinarTimes[1], 0, 0, 0)); // Set to 6 PM today
    } 
    // If it's after 6 PM, set it for 11 AM the next day
    else {
      now.setDate(now.getDate() + 1); // Move to the next day
      nextWebinarTime = new Date(now.setHours(webinarTimes[0], 0, 0, 0)); // Set to 11 AM tomorrow
    }

    return nextWebinarTime;
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600); // Calculate hours
    const minutes = Math.floor((seconds % 3600) / 60); // Calculate minutes
    const remainingSeconds = seconds % 60; // Remaining seconds

    return `${hours}h ${minutes}m ${remainingSeconds}s`; // Format as "Xh Xm Xs"
  };

  useEffect(() => {
    const nextWebinarTime = getNextWebinarTime();
    const timeDifference = nextWebinarTime - new Date();
  
    // Set the initial timeLeft
    setTimeLeft(Math.floor(timeDifference / 1000)); // Convert to seconds
  
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdownInterval); // Stop the countdown
          setIsWebinarActive(true); // Activate the webinar
          return 0; // Ensure timeLeft doesn't go negative
        }
        return prevTime - 1;
      });
    }, 1000);
  
    return () => clearInterval(countdownInterval); // Cleanup on unmount
  }, []);
  

  const handleJoinClick = () => {
    setIsJoined(true);
    setAttendeesCount((prevCount) => prevCount + 1); // Increment attendee count
  };

  const handleLeaveClick = () => {
    setIsJoined(false);
    setAttendeesCount((prevCount) => prevCount - 1); // Decrement attendee count
    setVideoStarted(false);
    setIsBuffering(false);
  };

  useEffect(() => {
    if (isJoined && isWebinarActive && !videoStarted) {
      setIsBuffering(true);
      const bufferTimeout = setTimeout(() => {
        setIsBuffering(false);
        setVideoStarted(true);
      }, 5000);
      return () => clearTimeout(bufferTimeout);
    }
  }, [isJoined, isWebinarActive, videoStarted]);

  return (
    <div className="webinar-container">
      <h1 className="title">Live Webinar: Future of Technology</h1>

      {/* Countdown until the webinar starts */}
      {!isJoined && (
        <div className="countdown">
          <p>{formatTime(timeLeft)} until webinar starts!</p> {/* Format time */}
        </div>
      )}

      {/* Attendee count, displayed after user joins */}
      {isJoined && (
        <div className="attendees-info">
          <p>Currently {attendeesCount} attendee{attendeesCount > 1 ? 's' : ''} watching</p>
        </div>
      )}

      {/* Join Button */}
      {isWebinarActive && !isJoined && (
        <div className="join-button-container">
          <button
            className="join-button"
            onClick={handleJoinClick}
            disabled={!isWebinarActive}
          >
            Join Webinar
          </button>
        </div>
      )}

      {/* Buffering state */}
      {isBuffering && (
        <div className="buffering-overlay">
          <div className="buffering-content">
            <p>Buffering...</p>
            <div className="loading-spinner"></div>
          </div>
        </div>
      )}

      {/* Video Container */}
      {videoStarted && (
        <div className="video-container">
          <ReactPlayer
            url={VIDEO_URL}
            playing={true}
            controls={false}
            width="100%"
            height="100%"
          />
        </div>
      )}

      {/* Waiting Room Message */}
      {!videoStarted && !isBuffering && !isJoined && (
        <div className="waiting-room">
          <p>The webinar will start shortly. Please stand by...</p>
        </div>
      )}

      {/* Leave Button */}
      {isJoined && (
        <div className="leave-button-container">
          <button className="leave-button" onClick={handleLeaveClick}>
            Leave Webinar
          </button>
        </div>
      )}
    </div>
  );
};

export default WebinarPage;