
export type Classification = 'copyrighted' | 'public_domain' | 'web_available' | 'uncertain';

export interface AnalysisSignals {
  mentions_known_titles: boolean;
  has_citation_patterns: boolean;
  looks_like_code: boolean;
  looks_like_news_article: boolean;
  looks_like_academic_paper: boolean;
  looks_like_lyrics_or_book: boolean;
}

export interface AnalysisResult {
  classification: Classification;
  confidence: number;
  reasons: string[];
  signals: AnalysisSignals;
  safety_notes: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  textPreview: string;
  fullText: string;
  analysis: AnalysisResult;
}

export interface AnalysisResponse {
  ok: boolean;
  analysis?: AnalysisResult;
  error?: string;
  meta?: {
    model: string;
    tokens_used?: number;
    request_id: string;
  };
}
