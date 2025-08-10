import React from 'react';
import ReactDOM from 'react-dom/client';
import { InteractiveVideo } from '@interactive-video-labs/react';

const App = () => {
  return (
    <div>
      <h1>Interactive Video React Wrapper Example</h1>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <InteractiveVideo
          videoUrl="https://interactive-video-labs.github.io/assets/sample-interaction-1.mp4"
          autoplay={true}
          onAnalyticsEvent={(event, payload) => {
            console.log('Analytics Event:', event, payload);
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
            {
              id: 'question2',
              time: 2,
              label: 'Question 2',
              payload: {
                interaction: {
                  type: 'text',
                  title: 'Your Information',
                  description: 'Please enter your name below.',
                  question: 'Your name?',
                },
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
