import { HttpRequestEventMap } from "@mswjs/interceptors";

export const logger = console.info;
export const nativeFetch = window.fetch;

export type Awaitable<T> = T | Promise<T>;
export type Matcher = (request: Request) => boolean;
export type BaseRule<T> = {
  matcher: Matcher;
  enabled: boolean;
  delay?: number;
  status?: number;
} & T;

export type Rule =
  | BaseRule<{
      response: string;
    }>
  | BaseRule<{
      handler: (
        request: HttpRequestEventMap["request"][0]["request"],
        response: string
      ) => Awaitable<string>;
    }>;

export type InterceptionDescriptor = {
  url: string;
  rules: Rule[];
};
