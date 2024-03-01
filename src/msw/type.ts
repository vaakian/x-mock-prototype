export const logger = console.info;
export const nativeFetch = window.fetch;

export type Awaitable<T> = T | Promise<T>;
export type Matcher = (request: Request) => boolean;
export type Rule =
  | {
      matcher: Matcher;
      enabled: boolean;
      delay?: number;
      response: string;
    }
  | {
      matcher: Matcher;
      enabled: boolean;
      delay?: number;
      handler: (response: string) => Awaitable<string>;
    };

export type InterceptionDescriptor = {
  url: string;
  rules: Rule[];
};
