const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const videoMap = [
  { source: 'videos/Reception .mp4', target: 'public/videos/home.mp4' },
  { source: 'videos/Banquest Hall Instagram Reel For ad   (2).mp4', target: 'public/videos/banquet.mp4' },
];

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
      .videoCodec('libx264')
      .outputOptions(['-crf 28', '-preset veryfast', '-movflags +faststart'])
      .size('?x1080')
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
  console.log('🎬 Starting Part 2 video compression pipeline...\n');
  
  for (const video of videoMap) {
    try {
      await processVideo(video);
    } catch (e) {
      console.log('Skipping due to error...');
    }
  }

  console.log('\n🎉 All Part 2 compression jobs completed!');
}

run();
