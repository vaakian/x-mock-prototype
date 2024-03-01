export const logger = console.info;
export const nativeFetch = window.fetch;

export type Awaitable<T> = T | Promise<T>;
export type Matcher = (request: Request) => boolean;
export type BaseRule<T> = {
  matcher: Matcher;
  enabled: boolean;
  delay?: number;
} & T;

export type Rule =
  | BaseRule<{
      response: string;
    }>
  | BaseRule<{
      handler: (response: string) => Awaitable<string>;
    }>;

export type InterceptionDescriptor = {
  url: string;
  rules: Rule[];
};
