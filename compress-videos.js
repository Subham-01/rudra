const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const videoMap = [
  { source: 'videos/212 bedroom (1).mp4', target: 'public/videos/rooms.mp4' },
  { source: 'videos/Meeting room.mp4', target: 'public/videos/conference.mp4' },
  { source: 'videos/Open terrace .mp4', target: 'public/videos/dining-terrace.mp4' },
  { source: 'videos/Restaurants 4k @25fps  (2).mp4', target: 'public/videos/dining-indoor.mp4' },
];

// Ensure public/videos exists
const targetDir = path.join(__dirname, 'public', 'videos');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function processVideo({ source, target }) {
  const sourcePath = path.join(__dirname, source);
  const targetPath = path.join(__dirname, target);

  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Source video not found: ${sourcePath}`);
    return;
  }

  console.log(`\n⏳ Starting compression for: ${path.basename(source)}`);
  
  return new Promise((resolve, reject) => {
    ffmpeg(sourcePath)
      // Compress using x264 (H.264)
      .videoCodec('libx264')
      // CRF 28 is highly compressed but visually acceptable for web
      .outputOptions(['-crf 28', '-preset veryfast', '-movflags +faststart'])
      // Scale to 1080p max to save massive space from 4k files
      .size('?x1080')
      // Remove audio track (since these are background videos)
      .noAudio()
      .on('end', () => {
        const stats = fs.statSync(targetPath);
        console.log(`✅ Success: ${path.basename(target)} (Size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`❌ Error processing ${source}:`, err.message);
        reject(err);
      })
      .save(targetPath);
  });
}

async function run() {
  console.log('🎬 Starting video compression pipeline...\n');
  
  for (const video of videoMap) {
    try {
      await processVideo(video);
    } catch (e) {
      console.log('Skipping due to error...');
    }
  }

  console.log('\n🎉 All compression jobs completed!');
}

run();
