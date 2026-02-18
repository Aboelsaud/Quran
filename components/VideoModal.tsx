import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, AlertCircle, RefreshCw } from 'lucide-react';
import { DEMO_VIDEO_URL } from '../constants';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      document.body.style.overflow = 'hidden';
      // Auto-play when opened
      if(videoRef.current) {
        // Force reload to check for file existence
        videoRef.current.load();
        
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((e) => {
              // Log only safe message, not the full object if it causes issues
              console.log("Autoplay blocked or failed", e.message || e);
              setIsPlaying(false);
            });
        }
      }
    } else {
      document.body.style.overflow = 'unset';
      // Pause when closed
      if(videoRef.current) {
        videoRef.current.pause();
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    // Prevent logging the full event object which contains circular references to DOM nodes
    const target = e.currentTarget;
    const err = target.error;
    
    // Log specific properties instead of the whole object
    if (err) {
        console.error(`Video Error: Code ${err.code}, Message: ${err.message}`);
    } else {
        console.error("Video Error: Unknown error occurred");
    }
    
    let message = "Unknown playback error";
    if (err) {
        switch (err.code) {
            case 1: message = "Loading aborted by user"; break;
            case 2: message = "Network Error: File not found or connection failed"; break;
            case 3: message = "Decode Error: Video format not supported"; break;
            case 4: message = "Source Not Supported: Codec issue or invalid path"; break;
            default: message = `Error Code: ${err.code}`;
        }
    } else {
        // If err is null but onError fired, it's often a source not found (404) 
        // when using src attribute directly
        message = "File not found or cannot be loaded";
    }
    setError(message);
    setIsPlaying(false);
  };

  const handleRetry = () => {
    setError(null);
    if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => setIsPlaying(false));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full sm:max-w-2xl bg-slate-900 border-t sm:border border-slate-700 sm:rounded-2xl shadow-2xl transform transition-transform duration-300 ease-out animate-in slide-in-from-bottom-10 fade-in-0 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50">
          <h3 className="text-amber-400 font-['Amiri'] text-xl">قصة يوسف</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video bg-black group flex items-center justify-center">
          {error ? (
            <div className="flex flex-col items-center justify-center text-slate-400 p-6 text-center h-full w-full bg-slate-950">
              <AlertCircle size={48} className="mb-4 text-red-500 opacity-80" />
              <p className="text-lg font-semibold text-slate-200 mb-2">Video Unavailable</p>
              <p className="text-sm font-mono bg-red-950/30 text-red-200/80 px-4 py-2 rounded mb-6 border border-red-900/50">
                {error}
              </p>
              <div className="flex flex-col gap-3 items-center">
                <button 
                    onClick={handleRetry}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors border border-slate-700"
                >
                    <RefreshCw size={16} /> Retry
                </button>
                <p className="text-xs text-slate-600 mt-2">
                    Looking for: <span className="font-mono text-slate-500">{DEMO_VIDEO_URL}</span>
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* IMPORTANT: Using src directly on video tag ensures better error handling than source tags in React */}
              <video
                ref={videoRef}
                src={DEMO_VIDEO_URL}
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                onError={handleError}
                loop
                playsInline
              />
              
              {/* Custom Controls Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/30 rounded-full mb-4 overflow-hidden">
                    <div 
                        className="h-full bg-amber-500" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className="flex items-center justify-between">
                    <button 
                        onClick={togglePlay}
                        className="text-white hover:text-amber-400 transition-colors"
                    >
                        {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
                    </button>

                    <button 
                        onClick={toggleMute}
                        className="text-white hover:text-amber-400 transition-colors"
                    >
                        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Description / Caption */}
        <div className="p-6 bg-slate-900 text-center">
            <p className="text-slate-300 text-sm leading-relaxed font-sans">
                Watch the visualized story of Prophet Yusuf (AS) as described in the verses.
                <br/>
                <span className="text-xs text-slate-500 mt-2 block">
                    {error ? "Check file placement" : "Playing: story_animation.mp4"}
                </span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;