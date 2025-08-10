# @interactive-video-labs/react

<p align="center">
  <img src="https://raw.githubusercontent.com/interactive-video-labs/docs/main/logo.svg" width="200px" alt="Interactive Video Labs Logo" />
</p>
<p align="center">
  <img src="https://img.shields.io/npm/v/@interactive-video-labs/react" alt="NPM Version" />
  <img src="https://img.shields.io/npm/l/@interactive-video-labs/react" alt="NPM License" />
  <img src="https://img.shields.io/npm/d18m/@interactive-video-labs/react?style=flat-square" alt="NPM Downloads" />
  <a href="https://github.com/interactive-video-labs/interactive-video-react-wrapper/actions">
    <img src="https://github.com/interactive-video-labs/interactive-video-react-wrapper/actions/workflows/release.yml/badge.svg" alt="Build Status" />
  </a>
</p>

Welcome to `@interactive-video-labs/react` — a lightweight React wrapper around the `@interactive-video-labs/core` engine for cue-driven interactive video experiences.

This wrapper makes it easy to embed interactive video players in React apps using familiar props and event handlers, while keeping close to the core API.

---

## Introduction

`@interactive-video-labs/react` is a thin React component that provides a convenient way to integrate interactive video experiences into your React applications. It leverages the powerful `@interactive-video-labs/core` engine, allowing you to easily manage video playback, cue points, and analytics within a familiar React paradigm.

## Features

- **Easy Integration**: Seamlessly embed interactive videos into your React components.
- **Cue Point Management**: Load and manage cue points for dynamic video interactions.
- **Analytics Events**: Receive detailed analytics events from the video player to track user engagement.
- **Localization**: Support for player localization through translations.
- **Direct Core API Access**: Provides a React-friendly interface while maintaining close alignment with the core IVLabsPlayer API.

## Installation

You can install the package using npm or pnpm:

```bash
pnpm add @interactive-video-labs/react @interactive-video-labs/core react react-dom
# or
npm install @interactive-video-labs/react @interactive-video-labs/core react react-dom
```

## Usage

To use the `InteractiveVideo` component, simply import it and pass the necessary props. The `videoUrl` prop is mandatory.

```tsx
import React from 'react';
import { InteractiveVideo } from '@interactive-video-labs/react';

const MyVideoPlayer = () => {
  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <InteractiveVideo
        videoUrl="https://interactive-video-labs.github.io/interactive-video-demos/videos/big_buck_bunny.mp4"
        autoplay={true}
        loop={false}
        controls={true}
        onAnalyticsEvent={(event, payload) => {
          console.log('Analytics Event:', event, payload);
          // Handle analytics events, e.g., send to a tracking service
        }}
        cues={[
          {
            id: 'segmentChange',
            time: 10,
            label: 'Segment Change',
            payload: {
              interaction: {
                type: 'choice-video-segment-change',
                title: 'Choose your path',
                description: 'Select a video segment to jump to.',
                question: 'Where would you like to go?',
                options: [
                  {
                    level: 'Segment A',
                    video:
                      'https://interactive-video-labs.github.io/assets/sample-interaction-1.mp4',
                  },
                  {
                    level: 'Segment B',
                    video:
                      'https://interactive-video-labs.github.io/assets/sample-interaction-2.mp4',
                  },
                ],
              },
            },
          },
        ]}
        translations={{
          en: {
            play: 'Play Video',
            pause: 'Pause Video',
          },
        }}
      />
    </div>
  );
};

export default MyVideoPlayer;
```

## Props

The `InteractiveVideo` component accepts the following props:

- `videoUrl` (string, **required**): The URL of the video to be played.
- `onAnalyticsEvent` (function, optional): A callback function that is triggered when an analytics event occurs. It receives the `event` name and an optional `payload`.
  - `event`: `PLAYER_LOADED`, `VIDEO_STARTED`, `VIDEO_PAUSED`, `VIDEO_ENDED`, `CUE_TRIGGERED`, `INTERACTION_COMPLETED`, `ERROR`.
  - `payload`: An object containing event-specific data.
- `cues` (CuePoint[], optional): An array of cue points to load into the player. Each `CuePoint` object should conform to the `@interactive-video-labs/core` `CuePoint` interface.
- `translations` (Translations, optional): An object containing translations for player localization. This should conform to the `@interactive-video-labs/core` `Translations` interface.
- `...restOptions` (PlayerConfig, optional): Any other valid `PlayerConfig` options from `@interactive-video-labs/core` (excluding `videoUrl`, `cues`, and `translations`). This allows for direct pass-through of core player configurations like `autoplay`, `loop`, `controls`, `locale`, etc.

## Development

To set up the development environment:

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Build the project:
    ```bash
    pnpm build
    ```
4.  Run tests:
    ```bash
    pnpm test
    ```
5.  Run examples:
    ```bash
    pnpm serve-examples
    ```

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
