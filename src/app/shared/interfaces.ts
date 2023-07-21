import { FormControl } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';

// GENERAL

export interface SearchResponsePartial {
  count: number;
  next?: string;
  previous?: string;
}

// SEARCH

export interface SearchCriteria {
  ordering?: string;
  page?: number;
  page_size?: number;
  search?: string;
  search_type: string;
}

export interface SearchForm {
  search?: FormControl<string | null>;
  search_type: FormControl<string>;
}

export interface SearchResponse extends SearchResponsePartial {
  results: SearchResult[];
}

export interface SearchResult {
  designer_name?: string;
  designer_url?: string;
  id: number | string;
  imgUrl?: string | SafeUrl;
  moc_url?: string;
  name: string;
  quantity?: number;
  routerUrl?: string;
}

// SETS

export interface Set {
  last_modified_dt: string;
  name: string;
  num_parts: number;
  set_img_url?: string | SafeUrl;
  set_num: string;
  set_url: string;
  theme_id: number;
  theme_name: string;
  year: number;
}

export interface SetResponse extends SearchResponsePartial {
  results: Set[];
}
