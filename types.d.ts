export interface CryptoNewsArticle {
  article_id: string;
  title: string;
  link: string;
  keywords: string[] | null;
  creator: string[] | null;
  description: string | null;
  content: string | null;
  pubDate: string;
  pubDateTZ: string;
  image_url: string | null;
  video_url: string | null;
  source_id: string;
  source_name: string;
  source_priority: number;
  source_url: string;
  source_icon: string | null;
  language: string;
  country: string[] | null;
  category: string[] | null;
  sentiment: string | null;
  sentiment_stats: string | null;
  ai_tag: string | null;
  ai_region: string | null;
  ai_org: string | null;
  ai_summary: string | null;
  ai_content: string | null;
  duplicate: boolean;
}

export interface PostType {
  _id: string;
  user: {
    _id: string;
    walletAddress: string;
    avatar: string;
  };
  message: string;
  feeling: "bullish" | "bearish" | "neutral";
  returnPercent: string;
  likes: string[]; // array of user IDs
  comments: {
    _id?: string;
    user: {
      _id: string;
      walletAddress: string;
      avatar: string;
    };
    message: string;
    createdAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
