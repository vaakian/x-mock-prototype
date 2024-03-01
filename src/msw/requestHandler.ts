import { HttpRequestEventMap } from "@mswjs/interceptors";
import { logger, nativeFetch } from "./type";
import { jsonPlaceholderInterception } from "./MATCHER";
import { waitFor } from "./utils";

export async function requestHandler({
  request,
}: HttpRequestEventMap["request"][0]) {
  const urlObject = new URL(request.url);
  const urlWithoutQuery = urlObject.origin + urlObject.pathname;
  // todo: use feather-router to match the url
  if (!urlWithoutQuery.startsWith(jsonPlaceholderInterception.url)) return;

  // find the first rule that matches the request
  const rule = jsonPlaceholderInterception.rules.find(
    (rule) => rule.enabled && rule.matcher(request)
  );

  if (rule?.matcher(request)) {
    logger("MATCHED", request.url, rule);

    // delaying
    if (rule.delay) {
      await waitFor(rule.delay);
    }

    // text response
    if ("response" in rule) {
      request.respondWith(new Response(rule.response));
    }

    // modify response
    if ("handler" in rule) {
      const response = await nativeFetch(request).then((res) => res.text());
      const processedResponse = await rule.handler(request, response);
      request.respondWith(new Response(processedResponse));
    }
  }
}
