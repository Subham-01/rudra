const fs = require('fs');
const path = require('path');

function normalize(str) {
  return str.toLowerCase().replace(/[^\w\s]/g, '').trim();
}

function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function scoreMatch(query, keywords) {
  const normalizedQuery = normalize(query);
  const queryWords = normalizedQuery.split(/\s+/);
  let totalScore = 0;
  for (const qWord of queryWords) {
    if (qWord.length < 3) continue;
    let bestWordScore = 0;
    for (const kw of keywords) {
      const normalizedKw = normalize(kw);
      const kwWords = normalizedKw.split(/\s+/);
      for (const kWord of kwWords) {
        if (kWord.length < 3) continue;
        if (qWord === kWord) {
          bestWordScore = Math.max(bestWordScore, 1.0);
        } else if (kWord.includes(qWord) || qWord.includes(kWord)) {
          bestWordScore = Math.max(bestWordScore, 0.7);
        } else {
          const dist = levenshteinDistance(qWord, kWord);
          const maxLen = Math.max(qWord.length, kWord.length);
          const similarity = 1 - dist / maxLen;
          if (similarity > 0.7) bestWordScore = Math.max(bestWordScore, similarity);
        }
      }
    }
    totalScore += bestWordScore;
  }
  return totalScore;
}

const faqs = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'faqs.json'), 'utf8'));

let bestMatch = null;
let highestScore = 0.8;
const query = "check in";
for (const faq of faqs) {
  if (faq.disabled) continue;
  const score = scoreMatch(query, [...faq.keywords, faq.question]);
  console.log('FAQ:', faq.id, 'Score:', score);
  if (score > highestScore) {
    highestScore = score;
    bestMatch = faq;
  }
}
console.log('Best match:', bestMatch);
