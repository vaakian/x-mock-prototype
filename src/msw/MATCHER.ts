import { Matcher, InterceptionDescriptor, nativeFetch } from "./type";

export const BUILT_IN_MATCHER = {
  METHOD_GET: ((request) => request.method === "GET") as Matcher,
  METHOD_POST: ((request) => request.method === "POST") as Matcher,
} as const;

export const jsonPlaceholderDescriptor: InterceptionDescriptor = {
  url: "https://jsonplaceholder.typicode.com/todos",
  rules: [
    {
      matcher: (request) => request.url.includes("todos/1"),
      enabled: true,
      handler: async (request, response) => {
        // provide a context
        // todo: XMLHttpRequest, fetch, etc.
        const fn = new Function(
          // the params
          "request",
          "response",
          "fetch",
          // the script
          // todo: can be written in a separate file
          `
          const asyncWrapper = async () => {
            const data = JSON.parse(response);
            const res = await fetch("https://jsonplaceholder.typicode.com/todos/3").then((res) => res.json())
            return JSON.stringify({ ...res, title: 'modified title with original server response' });
          }
          return asyncWrapper();`
        );
        return await fn(request, response, nativeFetch);
      },
    },
    {
      matcher: (request) => {
        const url = new URL(request.url);
        return url.searchParams.get("foo") === "bar";
      },
      enabled: true,
      response: JSON.stringify({
        message: "fake response from searchParams foo=bar match",
      }),
      delay: 1000,
    },
    // {
    //   matcher: BUILT_IN_MATCHER.METHOD_GET,
    //   enabled: true,
    //   delay: 1200,
    //   response: JSON.stringify({
    //     userId: 1,
    //     id: 1,
    //     title: "plain text response without requesting the original server",
    //     completed: false,
    //     aaa: 456,
    //   }),
    // },
  ],
};

export const descriptors = [jsonPlaceholderDescriptor];
