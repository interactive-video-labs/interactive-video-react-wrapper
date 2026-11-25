import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { IVLabsPlayer } from '@interactive-video-labs/core';
import type {
  AnalyticsEvent,
  AnalyticsPayload,
  CuePoint,
  LiveSyncEvent,
  LiveSyncStatusEvent,
  LiveSyncClientMessage,
  PlayerConfig,
  PlayerState,
  Translations,
} from '@interactive-video-labs/core';

export interface InteractiveVideoProps extends Omit<
  PlayerConfig,
  'videoUrl' | 'cues' | 'translations'
> {
  videoUrl: string;
  onAnalyticsEvent?: (
    event: AnalyticsEvent,
    payload?: AnalyticsPayload
  ) => void;
  onLiveSyncEvent?: (event: LiveSyncEvent) => void;
  onLiveSyncStatus?: (event: LiveSyncStatusEvent) => void;
  cues?: CuePoint[];
  translations?: Record<string, Translations>;
}

export interface InteractiveVideoHandle {
  getPlayer: () => IVLabsPlayer | null;
  play: () => void;
  pause: () => void;
  syncToLive: () => void;
  getState: () => PlayerState | undefined;
  setLocale: (locale: string) => void;
  loadCues: (cues: CuePoint[]) => void;
  loadTranslations: (locale: string, translations: Translations) => void;
  getDecisionHistory: () => ReturnType<IVLabsPlayer['getDecisionHistory']>;
  clearDecisionHistory: () => ReturnType<IVLabsPlayer['clearDecisionHistory']>;
  sendLiveSyncMessage: (message: LiveSyncClientMessage) => Promise<void>;
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
 * @param {Record<string, Translations>} [props.translations] - Optional locale-to-translations map.
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
export const InteractiveVideo = forwardRef<
  InteractiveVideoHandle,
  InteractiveVideoProps
>(
  (
    {
      videoUrl,
      onAnalyticsEvent,
      onLiveSyncEvent,
      onLiveSyncStatus,
      cues,
      translations,
      ...restOptions
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<IVLabsPlayer | null>(null);
    const uniqueIdRef = useRef<string>(generateUniqueId());
    const analyticsCallbackRef = useRef(onAnalyticsEvent);
    const liveSyncEventCallbackRef = useRef(onLiveSyncEvent);
    const liveSyncStatusCallbackRef = useRef(onLiveSyncStatus);

    analyticsCallbackRef.current = onAnalyticsEvent;
    liveSyncEventCallbackRef.current = onLiveSyncEvent;
    liveSyncStatusCallbackRef.current = onLiveSyncStatus;

    useEffect(() => {
      if (!containerRef.current) return;

      const playerConfig: PlayerConfig = {
        videoUrl,
        cues,
        translations,
        ...restOptions,
      };

      try {
        const player = new IVLabsPlayer(uniqueIdRef.current, playerConfig);
        playerRef.current = player;

        const events: AnalyticsEvent[] = [
          'PLAYER_LOADED',
          'VIDEO_STARTED',
          'VIDEO_PAUSED',
          'CUE_LOADED',
          'CUE_TRIGGERED',
          'INTERACTION_SHOWN',
          'INTERACTION_COMPLETED',
          'VIDEO_ENDED',
          'PLAYER_DESTROYED',
          'ERROR',
          'onCueEnter',
          'onPromptShown',
          'onInteractionSelected',
          'onBranchJump',
          'onSessionEnd',
        ];
        events.forEach((event) => {
          player.on(event, (payload?: AnalyticsPayload) =>
            analyticsCallbackRef.current?.(event, payload)
          );
        });

        player.onLiveSyncEvent((event) =>
          liveSyncEventCallbackRef.current?.(event)
        );
        player.onLiveSyncStatus((event) =>
          liveSyncStatusCallbackRef.current?.(event)
        );
      } catch (error) {
        console.error('Error initializing IVLabsPlayer:', error);
      }

      return () => {
        if (playerRef.current) {
          playerRef.current.destroy();
          playerRef.current = null;
        }
      };
    }, [
      videoUrl,
      cues,
      translations,
      restOptions.subtitlesUrl,
      restOptions.locale,
      restOptions.autoplay,
      restOptions.loop,
      restOptions.debugger,
      restOptions.analyticsOptions,
      restOptions.interactions,
      restOptions.initialState,
      restOptions.decisionAdapterType,
      restOptions.decisionAdapter,
      restOptions.liveSync,
    ]);

    useEffect(() => {
      if (playerRef.current && cues) {
        playerRef.current.loadCues(cues);
      }
    }, [cues]);

    useEffect(() => {
      if (playerRef.current && translations) {
        Object.entries(translations).forEach(([locale, localeTranslations]) => {
          playerRef.current?.loadTranslations(locale, localeTranslations);
        });
      }
    }, [translations]);

    useImperativeHandle(ref, () => ({
      getPlayer: () => playerRef.current,
      play: () => playerRef.current?.play(),
      pause: () => playerRef.current?.pause(),
      syncToLive: () => playerRef.current?.syncToLive(),
      getState: () => playerRef.current?.getState(),
      setLocale: (locale: string) => playerRef.current?.setLocale(locale),
      loadCues: (nextCues: CuePoint[]) => playerRef.current?.loadCues(nextCues),
      loadTranslations: (locale: string, localeTranslations: Translations) =>
        playerRef.current?.loadTranslations(locale, localeTranslations),
      getDecisionHistory: () =>
        playerRef.current?.getDecisionHistory() ?? Promise.resolve([]),
      clearDecisionHistory: () =>
        playerRef.current?.clearDecisionHistory() ?? Promise.resolve(),
      sendLiveSyncMessage: (message: LiveSyncClientMessage) =>
        playerRef.current?.sendLiveSyncMessage(message) ??
        Promise.reject(
          new Error('Live sync is not configured for this player.')
        ),
    }));

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
  }
);

InteractiveVideo.displayName = 'InteractiveVideo';
