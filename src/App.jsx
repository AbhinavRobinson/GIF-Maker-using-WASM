import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * @description import ffmpeg libraries
 */
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

/**
 * @description log initialization to console
 */
const ffmpeg = createFFmpeg({ log: true });

function App() {

  /**
   * @description prepare flags for ready state
   */
  const [ready, setReady] = useState(false);

  /**
   * @description load : async load ffmpeg when needed over CDN
   */
  const load = async () => {
    await ffmpeg.load();
    /**
     * @description set flag true for ready once loaded
     */
    setReady(true);
  }

  /**
   * @description loads ffmpeg
   */
  useEffect(() => {
    load();
  }, []
   /**
   * @description empty array at end, so function only runs once.
   */)

  /**
   * @description show page once ready, else show Loading
   */
  return ready ? (
    <div className="App">
      
    </div>
  ) : (<p>🤔 Loading ... 🤔</p>)
}

export default App;