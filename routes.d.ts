export interface RouteItem {
  path: string;
  type: 'core' | 'branch' | 'legal' | 'local-seo';
}

export declare const BASE_URL: string;
export declare const CORE_PUBLIC_ROUTES: RouteItem[];
export declare function getLocalSeoRoutes(): RouteItem[];
export declare function getAllPublicRoutes(): RouteItem[];
export declare function getPrerenderRoutes(): string[];
export declare function getSitemapUrls(): string[];
export declare function generateSitemapXml(): string;
