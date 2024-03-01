import { Matcher, InterceptionDescriptor, nativeFetch } from "./type";

export const MATCHER = {
  METHOD_GET: ((request) => request.method === "GET") as Matcher,
  METHOD_POST: ((request) => request.method === "POST") as Matcher,
} as const;

export const jsonPlaceholderInterception: InterceptionDescriptor = {
  url: "https://jsonplaceholder.typicode.com/todos",
  rules: [
    {
      matcher: (request) => request.url.includes("todos/2"),
      enabled: true,
      handler: async (response) => {
        // this script can be written in a separate file
        const script = `
          const asyncWrapper = async () => {
            const data = JSON.parse(response);
            const res = await fetch("https://jsonplaceholder.typicode.com/todos/3").then((res) => res.json())
            return JSON.stringify({ ...res, title: 'modified title with original server response' });
          }
          return asyncWrapper();
        `;

        // provide a context
        // todo: XMLHttpRequest, fetch, etc.
        const fn = new Function("response", "fetch", script);
        return await fn(response, nativeFetch);
      },
    },
    {
      matcher: MATCHER.METHOD_GET,
      enabled: true,
      response: JSON.stringify({
        userId: 1,
        id: 1,
        title: "plain text response without requesting the original server",
        completed: false,
        aaa: 456,
      }),
    },
  ],
};
