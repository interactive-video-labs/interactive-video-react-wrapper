import React, { useEffect, useRef } from 'react';
import {
  IVLabsPlayer,
  PlayerConfig,
  CuePoint,
  Translations,
  AnalyticsEvent,
  AnalyticsPayload,
} from '@interactive-video-labs/core';

export interface InteractiveVideoProps
  extends Omit<PlayerConfig, 'videoUrl' | 'cues' | 'translations'> {
  videoUrl: string; // Make videoUrl mandatory
  onAnalyticsEvent?: (
    event: AnalyticsEvent,
    payload?: AnalyticsPayload
  ) => void;
  cues?: CuePoint[]; // Explicitly use CuePoint
  translations?: Translations; // Explicitly use Translations
}

const generateUniqueId = () =>
  `ivlabs-player-${Math.random().toString(36).slice(2, 9)}`;

/**
 * `InteractiveVideo` is a React component that wraps the `@interactive-video-labs/core` IVLabsPlayer.
 * It provides a convenient way to embed and manage interactive video experiences within a React application.
 *
 * The component handles the lifecycle of the IVLabsPlayer, including initialization, updates based on prop changes,
 * and destruction when the component unmounts. It also provides a mechanism for handling analytics events.
 *
 * @param {InteractiveVideoProps} props - The props for the InteractiveVideo component.
 * @param {string} props.videoUrl - The URL of the video to be played. This is a mandatory prop.
 * @param {(event: AnalyticsEvent, payload?: AnalyticsPayload) => void} [props.onAnalyticsEvent] - Optional callback for analytics events.
 * @param {CuePoint[]} [props.cues] - Optional array of cue points to load into the player.
 * @param {Translations} [props.translations] - Optional translations object for player localization.
 * @param {Omit<PlayerConfig, 'videoUrl' | 'cues' | 'translations'>} [props.restOptions] - Any other valid PlayerConfig options
 *   that are not `videoUrl`, `cues`, or `translations`.
 *
 * @example
 * ```tsx
 * <InteractiveVideo
 *   videoUrl="https://example.com/my-video.mp4"
 *   autoplay={true}
 *   onAnalyticsEvent={(event, payload) => console.log(event, payload)}
 *   cues={[{ time: 10, id: 'my-cue', type: 'pause' }]}
 * />
 * ```
 */
export const InteractiveVideo: React.FC<InteractiveVideoProps> = ({
  videoUrl,
  onAnalyticsEvent,
  cues,
  translations,
  ...restOptions
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<IVLabsPlayer | null>(null);
  const uniqueIdRef = useRef<string>(generateUniqueId());

  useEffect(() => {
    if (!containerRef.current) return;

    const playerConfig: PlayerConfig = {
      videoUrl,
      ...restOptions,
    };

    try {
      const player = new IVLabsPlayer(uniqueIdRef.current, playerConfig);
      playerRef.current = player;

      if (onAnalyticsEvent) {
        const events: AnalyticsEvent[] = [
          'PLAYER_LOADED',
          'VIDEO_STARTED',
          'VIDEO_PAUSED',
          'VIDEO_ENDED',
          'CUE_TRIGGERED',
          'INTERACTION_COMPLETED',
          'ERROR',
        ];
        events.forEach((event) => {
          player.on(event, (payload?: AnalyticsPayload) =>
            onAnalyticsEvent(event, payload)
          );
        });
      }
    } catch (error) {
      console.error('Error initializing IVLabsPlayer:', error);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoUrl, onAnalyticsEvent, restOptions]);

  useEffect(() => {
    if (playerRef.current && cues) {
      playerRef.current.loadCues(cues);
    }
  }, [cues]);

  useEffect(() => {
    if (playerRef.current && translations) {
      const locale = restOptions.locale || 'en';
      playerRef.current.loadTranslations(locale, translations);
    }
  }, [translations, restOptions.locale]);

  return (
    <div
      ref={containerRef}
      id={uniqueIdRef.current}
      style={{ width: '100%', height: 'auto' }}
      data-testid="interactive-video-container"
    >
      {/* The IVLabsPlayer will inject the video element here */}
    </div>
  );
};
