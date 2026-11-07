export interface LoveReason {
  id: number;
  title: string;
  desc: string;
  iconName: string;
}

export interface Milestone {
  date: string;
  title: string;
  description: string;
  photo?: string;
}

export interface AnniversaryData {
  coupleName: string;
  girlfriendName: string;
  startDate: string; // '2024-11-08'
  anniversaryDate: string; // '2026-11-08'
  yearsTogether: number;
  heroGreeting: string;
  heroSubtitle: string;
  musicTitle: string;
  musicArtist: string;
  musicUrl: string;
  cakeWishTitle: string;
  cakeWishMessage: string;
  shortLetterTitle: string;
  shortLetterContent: string;
  longLetterTitle: string;
  longLetterContent: string[];
  closingQuote: string;
  mirrorPhoto: string;
  scrapbookPhoto: string;
  polaroidPhotos: Array<{
    src: string;
    caption: string;
    rotation: number;
  }>;
  galleryPhotos: Array<{
    src: string;
    caption: string;
  }>;
  loveReasons: LoveReason[];
}
