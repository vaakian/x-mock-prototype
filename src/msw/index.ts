import { BatchInterceptor } from "@mswjs/interceptors";

import { XMLHttpRequestInterceptor } from "@mswjs/interceptors/XMLHttpRequest";
import { FetchInterceptor } from "@mswjs/interceptors/fetch";
import { createDescriptorStorage, jsonPlaceholderDescriptor } from "./MATCHER";
import { createRequestHandler } from "./requestHandler";

const interceptor = new BatchInterceptor({
  name: "x-interceptor",
  interceptors: [new FetchInterceptor(), new XMLHttpRequestInterceptor()],
});

export default function init() {
  interceptor.apply();

  const descriptorStorage = createDescriptorStorage();
  descriptorStorage.add(jsonPlaceholderDescriptor);
  const requestHandler = createRequestHandler(descriptorStorage);
  interceptor.on("request", requestHandler);
}
