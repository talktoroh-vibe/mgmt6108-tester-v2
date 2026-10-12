export type Category =
  | 'International'
  | 'France'
  | 'Economy'
  | 'Environment'
  | 'Culture'
  | 'Opinion'
  | 'Society'
  | 'Sports'
  | 'Podcasts'
  | 'Games';

export interface Comment {
  id: string;
  author: string;
  location: string;
  date: string;
  content: string;
  likes: number;
}

export interface LiveDispatch {
  time: string;
  title: string;
  category: string;
  readTime?: string;
  isImportant?: boolean;
}

export interface Article {
  id: string;
  title: string;
  deck: string;
  kicker?: string;
  kickerHighlight?: boolean;
  readTime: string;
  byline: string;
  authorRole?: string;
  authorAvatar?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCredit?: string;
  category: Category;
  subCategory?: string;
  commentsCount?: number;
  comments?: Comment[];
  publishDate: string;
  paragraphs: string[];
  pullQuote?: string;
  pullQuoteAuthor?: string;
  relatedLinks?: { title: string; url?: string }[];
  isLive?: boolean;
  isSubscriberOnly?: boolean;
  city?: string;
  frenchExcerpt?: string;
  audioDuration?: string;
  rating?: string;
  ratingCount?: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  show: string;
  host: string;
  duration: string;
  description: string;
  date: string;
  accentColor: string;
}
