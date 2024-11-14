import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const YouTubePlayer = ({ videoId, t }) => {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [isAPIReady, setIsAPIReady] = useState(false);
  const { i18n } = useTranslation();

  const getCacheKey = useCallback(() => {
    return `youtube_player_${videoId}_${i18n.language}`;
  }, [videoId, i18n.language]);

  const getPreferences = useCallback(() => {
    try {
      const preferences = localStorage.getItem(getCacheKey());
      if (preferences) {
        const parsed = JSON.parse(preferences);
        if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
          return parsed;
        }
        localStorage.removeItem(getCacheKey());
      }
    } catch (error) {
      console.error('Error reading preferences:', error);
    }
    return null;
  }, [getCacheKey]);

  const savePreferences = useCallback((preferences) => {
    try {
      localStorage.setItem(getCacheKey(), JSON.stringify({
        ...preferences,
        timestamp: Date.now(),
        videoId,
      }));
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  }, [getCacheKey, videoId]);

  const [isMuted, setIsMuted] = useState(() => {
    const cached = getPreferences();
    if (cached && cached.videoId === videoId) {
      return cached.isMuted;
    }
    return true;
  });

  useEffect(() => {
    if (window.YT) {
      setIsAPIReady(true);
      return;
    }

    const loadYouTubeAPI = new Promise((resolve) => {
      const originalCallback = window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady = () => {
        if (originalCallback) {
          originalCallback();
        }
        resolve();
        setIsAPIReady(true);
      };
    });

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!isAPIReady || !playerRef.current || !videoId) return;

    const cached = getPreferences();
    const initialMuted = true; // Forzamos muted inicial para garantizar autoplay

    const newPlayer = new window.YT.Player(playerRef.current, {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        mute: 1, // Forzamos mute inicial
        controls: 0,
        showinfo: 0,
        rel: 0,
        enablejsapi: 1,
        modestbranding: 1,
        loop: 1,
        playlist: videoId,
        playsinline: 1,
        iv_load_policy: 3,
      },
      events: {
        onReady: (event) => {
          event.target.playVideo(); // Forzamos play
          setPlayer(event.target);
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.ENDED ||
              event.data === window.YT.PlayerState.PAUSED) {
            event.target.playVideo();
          }
        },
      },
    });

    setPlayer(newPlayer);
    setIsMuted(initialMuted);

    savePreferences({
      isMuted: initialMuted,
      videoId,
    });

    return () => {
      newPlayer.destroy();
    };
  }, [isAPIReady, videoId, getPreferences, savePreferences]);

  const handleMuteToggle = useCallback(() => {
    if (player) {
      const newMutedState = !isMuted;
      if (newMutedState) {
        player.mute();
      } else {
        player.unMute();
      }
      setIsMuted(newMutedState);

      savePreferences({
        isMuted: newMutedState,
        videoId,
      });
    }
  }, [player, isMuted, videoId, savePreferences]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <div className="relative w-full h-full">
        <div className="relative w-full h-0 pb-[56.25%] md:pb-0 md:h-full">
          <div
            ref={playerRef}
            className="absolute inset-0 w-full h-full scale-150 translate-y-[-3%] md:scale-[1.33333] md:translate-x-[-1%] md:translate-y-[-10%]"
          />
        </div>
      </div>
      <button
        onClick={handleMuteToggle}
        className="absolute bottom-40 md:bottom-60 right-8 z-30 bg-black/50 p-3 rounded-full hover:bg-black/70 transition-colors"
        aria-label={t(isMuted ? 'activar_sonido' : 'desactivar_sonido')}
      >
        {isMuted ? 
          <VolumeX className="w-6 h-6 text-white" /> : 
          <Volume2 className="w-6 h-6 text-white" />
        }
      </button>
    </div>
  );
};

export default YouTubePlayer;
