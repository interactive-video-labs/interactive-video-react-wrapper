import React from 'react';
import ReactDOM from 'react-dom/client';
import { InteractiveVideo } from '../dist/index';

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
