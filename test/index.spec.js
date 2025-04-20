import assert from 'assert';
globalThis.assert = assert;

import { webcrypto } from 'crypto';
globalThis.crypto = webcrypto;

import { describe, it, expect } from "vitest";
import { Miniflare } from "miniflare";

describe("Worker Proxy", () => {
  it("should return 400 for missing parameters", async () => {
    const mf = new Miniflare({
      scriptPath: "src/index.js",
      compatibilityDate: "2024-04-20",
    });

    const res = await mf.dispatchFetch("http://localhost");
    expect(res.status).toBe(400);
    const text = await res.text();
    expect(text).toMatch(/Missing parameters/);
  });

  it("should return success from proxy call (mocked)", async () => {
    const mf = new Miniflare({
      scriptPath: "src/index.js",
      compatibilityDate: "2024-04-20",
      bindings: {},
      modules: true,
      globals: {
        fetch: async (url, options) => {
          return new Response(JSON.stringify({ mock: true, url }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        },
      },
    });

    const url = `http://localhost?Date=1404-01-31&Destination=esfahan&Origin=tehran`;
    const res = await mf.dispatchFetch(url);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.mock).toBe(true);
  });
});
