const fs = require('fs');
const path = require('path');

const imageMapping = {
  "Home Page slider 2.JPG": "hotel-rudra-regency-motihari-open-terrace-night.jpg",
  "Homepage slider 3.JPG": "hotel-rudra-regency-motihari-conference-meeting-room.jpg",
  "Homepage slider 4.JPG": "hotel-rudra-regency-motihari-grand-banquet-hall.jpg",
  "Hotels-in-motihari.JPG": "hotel-rudra-regency-motihari-premium-deluxe-room.jpg",
  "Hotels-in-motihari1.JPG": "hotel-rudra-regency-motihari-royal-suite.jpg",
  "Meeting hall for home page .JPG": "hotel-rudra-regency-motihari-business-conference.jpg",
  "Premium dining card .JPG": "hotel-rudra-regency-motihari-premium-dining-restaurant.jpg",
  "banquet hall for  homepage .JPG": "hotel-rudra-regency-motihari-wedding-banquet-venue.jpg",
  "banquet hall hero section.JPG": "hotel-rudra-regency-motihari-luxury-banquet-setup.jpg",
  "conference Hero  section.JPG": "hotel-rudra-regency-motihari-corporate-conference-hall.jpg",
  "conference professional ambience.JPG": "hotel-rudra-regency-motihari-professional-meeting-space.jpg",
  "flavoresca main dining  section.png": "hotel-rudra-regency-motihari-flavoresca-indoor-dining.png",
  "homepage slider 1.JPG": "hotel-rudra-regency-motihari-luxury-suite-lounge.jpg",
  "homepage slider 5.JPG": "hotel-rudra-regency-motihari-terrace-restaurant-lounge.jpg",
  "indoor fine dining .JPG": "hotel-rudra-regency-motihari-indoor-fine-dining.jpg",
  "open terrace -motihari top hotel.JPG": "hotel-rudra-regency-motihari-top-terrace-view.jpg",
  "open terrace evening  section.JPG": "hotel-rudra-regency-motihari-evening-terrace-ambience.jpg",
  "open terrace motihari.JPG": "hotel-rudra-regency-motihari-open-air-terrace.jpg",
  "open terrace- hotel in motihari.JPG": "hotel-rudra-regency-motihari-rooftop-terrace.jpg",
  "open-terrace-motihari.JPG": "hotel-rudra-regency-motihari-breezy-open-terrace.jpg",
  "private dining comfort section.JPG": "hotel-rudra-regency-motihari-private-dining-comfort.jpg",
  "restaurant (2).JPG": "hotel-rudra-regency-motihari-restaurant-seating.jpg",
  "restaurant.JPG": "hotel-rudra-regency-motihari-restaurant-interior.jpg",
  "venue atmosphere .JPG": "hotel-rudra-regency-motihari-elegant-venue-atmosphere.jpg"
};

const publicImagesDir = path.join(__dirname, 'public', 'images');
const srcDir = path.join(__dirname, 'src');

// 1. Rename files on disk
console.log('Renaming files in /public/images...');
let renamesCount = 0;
for (const [oldName, newName] of Object.entries(imageMapping)) {
  const oldPath = path.join(publicImagesDir, oldName);
  const newPath = path.join(publicImagesDir, newName);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: "${oldName}" -> "${newName}"`);
    renamesCount++;
  } else {
    // Check if new path already exists (script might have run already)
    if (!fs.existsSync(newPath)) {
        console.warn(`File not found: ${oldName}`);
    }
  }
}
console.log(`Finished renaming ${renamesCount} files.`);

// 2. Walk through src/ and replace references
function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walkSync(filepath, filelist);
    } else {
      if (filepath.endsWith('.tsx') || filepath.endsWith('.ts') || filepath.endsWith('.json')) {
        filelist.push(filepath);
      }
    }
  }
  return filelist;
}

const targetFiles = walkSync(srcDir);
// Also include data/hotel.json if exists
const hotelJsonPath = path.join(__dirname, 'data', 'hotel.json');
if (fs.existsSync(hotelJsonPath)) targetFiles.push(hotelJsonPath);

console.log(`Scanning ${targetFiles.length} files for references...`);

let updatedFilesCount = 0;

for (const filepath of targetFiles) {
  let content = fs.readFileSync(filepath, 'utf8');
  let changed = false;

  for (const [oldName, newName] of Object.entries(imageMapping)) {
    // Use string matching, but also need to account for URL encoding in JSON-LD sometimes (spaces as %20)
    const oldNameURI = encodeURIComponent(oldName).replace(/%20/g, ' '); // sometimes hardcoded with spaces
    const oldNameURI2 = encodeURIComponent(oldName); // strict URI
    
    if (content.includes(oldName)) {
      content = content.split(oldName).join(newName);
      changed = true;
    }
    if (content.includes(oldNameURI2)) {
      content = content.split(oldNameURI2).join(newName);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Updated references in: ${filepath}`);
    updatedFilesCount++;
  }
}

console.log(`Finished updating references in ${updatedFilesCount} files.`);
