/**
 * @description: Default React imports
 */
import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * @description: import ffmpeg libraries
 */
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

/**
 * @description: log initialization to console
 */
const ffmpeg = createFFmpeg({ log: true });

/**
 * @function: main app function
 */
function App() {

  /**
   * @description: prepare flags for ready state
   */
  const [ready, setReady] = useState(false);

  /**
   * @description: prepare to ingest video
   */
  const [video, setVideo] = useState();

  /**
   * @description: GIF state
   */
  const [gif, setGif] = useState();

  /**
   * @function: load : async load ffmpeg when needed over CDN
   */
  const load = async () => {
    await ffmpeg.load();
    /**
     * @description: set flag true for ready once loaded
     */
    setReady(true);
  }

  /**
   * @function: loads ffmpeg
   */
  useEffect(() => {
    load();
  }, []
   /**
   * @description: empty array at end, so function only runs once.
   */)

  /**
   * @function: converts video to gif
   */
  const convertToGif = async () => {

    // Writes file to memory
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

    // run Ffmpeg cmd (filename, timeslice, speed, format, outFile name)
    await ffmpeg.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif');

    // Read result 
    const data = ffmpeg.FS('readFile', 'out.gif');

    // Create URL
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif'}));
   
    // update component state
    setGif(url)

  }

  /**
   * @description: show page once ready, else show Loading
   */
  return ready ? (
    <div className="App">
      
      {/* Get Video from user and present */}
      { video && <video
                    controls
                    width="250"
                    src={URL.createObjectURL(video)}>
        </video>}

      {/* Ingest Video */}
      <input type="file" onChange={(e) => setVideo(e.target.files?.item(0))}></input>

      {/* Title */}
      <h3>GIF</h3>

      {/* Convert to GIF button */}
      <button onClick={convertToGif}>Convert Video to Gif</button>

      {/* Show GIF once available */}
      { gif && <img src={gif} width="250" />}

    </div>
  ) : (<p>🤔 Loading ... 🤔</p>);
}

export default App;