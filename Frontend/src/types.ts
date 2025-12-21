export interface Memory {
  id: string;
  title: string;
  description: string;
  date: Date;
  imageUrl: string;
  category?: string;
}

export interface Dream {
  id: string;
  title: string;
  description: string;
  category: 'travel' | 'life' | 'small';
  icon: string;
}

export interface GuestbookEntry {
  id: string;
  message: string;
  timestamp: Date;
  emoji?: string;
}

export interface CountdownSettings {
  date: Date;
  title: string;
}

