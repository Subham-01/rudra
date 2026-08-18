// Basic string normalization for fuzzy matching
function normalize(str: string): string {
  return str.toLowerCase().replace(/[^\w\s]/g, '').trim();
}

// Levenshtein distance for fuzzy matching
function levenshteinDistance(a: string, b: string): number {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          )
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

const STOP_WORDS = new Set(['what', 'is', 'the', 'how', 'can', 'i', 'you', 'for', 'and', 'are', 'do', 'where', 'when', 'why', 'who', 'a', 'an', 'in', 'on', 'at', 'to', 'of', 'your', 'my', 'this', 'that', 'it', 'with', 'about']);

// Score how well a query matches a list of keywords
function scoreMatch(query: string, keywords: string[]): number {
  const normalizedQuery = normalize(query);
  
  // If the query perfectly matches any of the keywords/phrases directly, huge boost
  if (keywords.some(kw => normalize(kw) === normalizedQuery)) {
    return 100;
  }

  const queryWords = normalizedQuery.split(/\s+/).filter(w => !STOP_WORDS.has(w) && w.length > 2);
  
  if (queryWords.length === 0) return 0;
  
  let totalScore = 0;
  
  // Pool all significant words from the target keywords/questions
  const allTargetWords = new Set<string>();
  for (const kw of keywords) {
    normalize(kw).split(/\s+/).forEach(w => {
      if (!STOP_WORDS.has(w) && w.length > 2) allTargetWords.add(w);
    });
  }
  
  for (const qWord of queryWords) {
    let bestWordScore = 0;
    
    for (const tWord of allTargetWords) {
      // Exact match
      if (qWord === tWord) {
        bestWordScore = Math.max(bestWordScore, 1.0);
      } else if (tWord.includes(qWord) || qWord.includes(tWord)) {
        // Partial match
        bestWordScore = Math.max(bestWordScore, 0.7);
      } else {
        // Fuzzy match
        const dist = levenshteinDistance(qWord, tWord);
        const maxLen = Math.max(qWord.length, tWord.length);
        const similarity = 1 - dist / maxLen;
        if (similarity > 0.75) {
          bestWordScore = Math.max(bestWordScore, similarity);
        }
      }
    }
    totalScore += bestWordScore;
  }
  
  // Normalize the score based on the number of significant words in the query
  return totalScore / queryWords.length;
}

export function findBestFAQ(query: string, faqs: any[]): any | null {
  let bestMatch = null;
  let highestScore = 0.8; // Minimum threshold

  for (const faq of faqs) {
    if (faq.disabled) continue;
    
    // Check keywords
    const score = scoreMatch(query, [...faq.keywords, faq.question]);
    if (score > highestScore) {
      highestScore = score;
      bestMatch = faq;
    }
  }

  return bestMatch;
}
