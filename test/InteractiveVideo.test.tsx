import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { InteractiveVideo } from '../src/index';
import { IVLabsPlayer } from '@interactive-video-labs/core';

// Mock the @interactive-video-labs/core module
const mockLoadCues = vi.fn();
const mockLoadTranslations = vi.fn();
const mockOn = vi.fn();
const mockDestroy = vi.fn();

vi.mock('@interactive-video-labs/core', () => ({
  IVLabsPlayer: vi.fn(() => ({
    loadCues: mockLoadCues,
    loadTranslations: mockLoadTranslations,
    on: mockOn,
    destroy: mockDestroy,
  })),
}));

describe('InteractiveVideo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a div element', () => {
    render(<InteractiveVideo videoUrl="test.mp4" />);
    const divElement = screen.getByTestId('interactive-video-container');
    expect(divElement).toBeInTheDocument();
  });

  it('initializes IVLabsPlayer with correct parameters and calls loadCues/loadTranslations', () => {
    const videoSrc = 'test-video.mp4';
    const options = { autoplay: true };
    const cues = [{ id: 'cue1', time: 5 }];
    const translations = { en: { hello: 'Hello' } };
    const onAnalyticsEvent = vi.fn();

    render(<InteractiveVideo videoUrl={videoSrc} {...options} cues={cues} translations={translations} onAnalyticsEvent={onAnalyticsEvent} />);

    expect(vi.mocked(IVLabsPlayer)).toHaveBeenCalled();

    const calls = vi.mocked(IVLabsPlayer).mock.calls;
    const playerCall = calls.find(call => {
      const config = call[1];
      return config.videoUrl === videoSrc && config.autoplay === options.autoplay;
    });

    expect(playerCall).toBeDefined();
    if (playerCall) {
      expect(playerCall[0]).toMatch(/^#ivlabs-player-/);
      expect(playerCall[1]).toEqual({ videoUrl: videoSrc, ...options });
    }

    expect(mockLoadCues).toHaveBeenCalledTimes(1);
    expect(mockLoadCues).toHaveBeenCalledWith(cues);

    expect(mockLoadTranslations).toHaveBeenCalledTimes(1);
    expect(mockLoadTranslations).toHaveBeenCalledWith('en', translations);

    expect(mockOn).toHaveBeenCalledWith('PLAYER_LOADED', expect.any(Function));
    expect(mockOn).toHaveBeenCalledWith('VIDEO_STARTED', expect.any(Function));
    expect(mockOn).toHaveBeenCalledWith('VIDEO_PAUSED', expect.any(Function));
    expect(mockOn).toHaveBeenCalledWith('VIDEO_ENDED', expect.any(Function));
    expect(mockOn).toHaveBeenCalledWith('CUE_TRIGGERED', expect.any(Function));
    expect(mockOn).toHaveBeenCalledWith('INTERACTION_COMPLETED', expect.any(Function));
    expect(mockOn).toHaveBeenCalledWith('ERROR', expect.any(Function));
  });

  it('calls destroy on unmount', () => {
    const { unmount } = render(<InteractiveVideo videoUrl="test.mp4" />);
    unmount();
    expect(mockDestroy).toHaveBeenCalledTimes(1);
  });
});