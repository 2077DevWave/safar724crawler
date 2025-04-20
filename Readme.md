# 🚌 Safar724 Crawler Worker

This is a Cloudflare Worker that acts as a proxy API for Safar724, a bus ticketing website. It allows you to fetch available bus trips from Safar724 in JSON format based on source, destination, and date parameters.

---

## 📦 Features

- ✅ Serverless Cloudflare Worker
- 🔄 Real-time scraping/proxy of Safar724 results
- 🔍 Query trips by `Origin`, `Destination`, and `Date`
- 🌐 CORS-enabled API for frontend integration
- 🧪 Tested with `vitest` and `miniflare`

---

## 🧑‍💻 Usage

### 🛜 API Endpoint

Send a GET request to your deployed worker URL:

```
https://safar724crawler.sideco.ir/?Date=1404-01-31&Destination=esfahan&Origin=tehran
```

### 🧾 Query Parameters

| Param     | Type   | Description                      | Example        |
|-----------|--------|----------------------------------|----------------|
| `Origin`    | string | Origin city (English)            | `tehran`        |
| `Destination`      | string | Destination city (English)       | `esfahan`       |
| `Date`    | string | Persian date (`yyyy-mm-dd`)      | `1403-02-31`   |

Returns a JSON array of trip options from Safar724.

---

## 🧪 Testing

This project uses [Vitest](https://vitest.dev/) and [Miniflare](https://miniflare.dev/) for Cloudflare Worker testing.

### Run tests:

```bash
npm test
```

If you face issues with `node:crypto` or other modules, make sure you’ve configured `vitest.config.ts` to inline dependencies and resolve Node aliases.

---

## 🚀 Deployment

You can deploy this worker with [Cloudflare Pages](https://workers.cloudflare.com/) or `wrangler`.

### With Wrangler:

```bash
npm install -g wrangler
wrangler login
wrangler publish
```

---

## 🛠 Tech Stack

- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Miniflare](https://github.com/cloudflare/miniflare)
- [Vitest](https://vitest.dev/)
- [Node.js](https://nodejs.org/)
- Persian date handling via Safar724

---

## 📂 Project Structure

```
.
├── src/
│   └── index.js         # Cloudflare Worker code
├── test/
│   └── index.spec.js    # Unit test with Miniflare
├── vitest.config.ts     # Vitest configuration
└── README.md
```

---

## 📄 License

MIT License © 2025 [Arian (2077Devwave) Kermani]