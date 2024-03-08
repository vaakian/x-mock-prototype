import { HttpRequestEventMap } from "@mswjs/interceptors";
import { logger, nativeFetch } from "./type";
import { waitFor } from "./utils";
import { DescriptorStorage } from "./MATCHER";

export function createRequestHandler(descriptorStorage: DescriptorStorage) {
  return async function ({ request }: HttpRequestEventMap["request"][0]) {
    // step 1: find the descriptor that matches the url
    const currentDescriptor = descriptorStorage.get(request);
    if (!currentDescriptor) return;

    // step 2: find the first rule that matches the request
    const rule = currentDescriptor.rules.find(
      (rule) => rule.enabled && rule.matcher(request)
    );

    // url is match but no available rule is found
    if (!rule) {
      return;
    }

    if (rule.matcher(request)) {
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
  };
}
