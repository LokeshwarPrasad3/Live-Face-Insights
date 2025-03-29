export function getPageTitle(pathname) {
  const map = {
    '/face-emotion-detection': 'Face Emotion Detection',
    '/similarity-face-matcher': 'Similarity Face Matcher',
    '/face-recognition-system': 'Face Recognition System',
  };

  const title = map[pathname] || 'Face AI Dashboard';
  return title;
}
