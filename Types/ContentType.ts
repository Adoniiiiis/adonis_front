import { bookType } from './BookType';
import { quoteType } from './QuoteType';
import { videoType } from './VideoType';

export type contentType = {
  content: quoteType | bookType | videoType;
};
