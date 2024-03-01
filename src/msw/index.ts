import { BatchInterceptor } from "@mswjs/interceptors";

import { XMLHttpRequestInterceptor } from "@mswjs/interceptors/XMLHttpRequest";
import { FetchInterceptor } from "@mswjs/interceptors/fetch";
import { requestHandler } from "./requestHandler";

const interceptor = new BatchInterceptor({
  name: "x-interceptor",
  interceptors: [new FetchInterceptor(), new XMLHttpRequestInterceptor()],
});

export default function init() {
  interceptor.apply();
  interceptor.on("request", requestHandler);
}
