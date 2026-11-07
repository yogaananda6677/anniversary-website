export interface BoardingPassData {
  flightNumber: string;
  passengerName: string;
  relationshipStartDate: string;
  anniversaryDate: string;
  fromDestination: string;
  toDestination: string;
  seat: string;
  classType: string;
  gate: string;
}

export interface PhotoboothPhoto {
  src: string;
  caption: string;
}

export interface OpenWhenLetter {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  badge: string;
  color: string;
  content: string;
}

export interface PolaroidDeskItem {
  id: string;
  src: string;
  caption: string;
  defaultX: number;
  defaultY: number;
  rotation: number;
}

export interface AnniversaryOverhaulData {
  coupleName: string;
  girlfriendName: string;
  startDate: string; // '2024-11-08'
  anniversaryDate: string; // '2026-11-08'
  musicTitle: string;
  musicArtist: string;
  musicUrl: string;
  boardingPass: BoardingPassData;
  photoboothPhotos: PhotoboothPhoto[];
  openWhenLetters: OpenWhenLetter[];
  polaroidDeskPhotos: PolaroidDeskItem[];
  typewriterLetter: {
    title: string;
    dateText: string;
    paragraphs: string[];
    signoff: string;
    author: string;
  };
  lanternWishes: string[];
}
