# Master Angler

A checklist for the **Master Angler** achievement in Stardew Valley — catch every fish, get a Stardrop in the mail from Willy.

All 72 entries from the Fish tab of the Collections menu, grouped by where you'd actually go to catch them, with season, time window, weather and Community Center bundle for each. Tick fish off as you land them; progress saves in your browser.

**Live:** https://USERNAME.github.io/REPO/

---

## Why 72

Master Angler checks the Fish tab of your Collections menu. That includes Seaweed, Green Algae, White Algae and the three 1.6 jellies, which aren't fish in any normal sense but count anyway. The five Extended Family fish from Mr. Qi's quest **are not required**.

Fish only register when you catch them yourself. Buying from Krobus or the Traveling Cart, foraging a Clam off the beach, or picking up a Ghostfish dropped by a Ghost will not tick the box in-game.

## Deploying

Pages is already configured by the workflow in `.github/workflows/deploy.yml`. After pushing:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions**
2. Push to `main`. The workflow builds nothing and publishes the repo root.

If you'd rather skip Actions entirely, delete the workflow and set **Source: Deploy from a branch → `main` / `(root)`**. It's a static site with no build step, so either works.

## Running locally

No toolchain, no dependencies:

```sh
open index.html          # macOS
python3 -m http.server   # or serve it, http://localhost:8000
```

Both work — the scripts are plain `<script src>` tags, not ES modules, so `file://` is fine.

## Layout

```
index.html          markup, meta tags, inline favicon
assets/style.css    all styling; palette lives in :root
assets/data.js      the 72 fish and the bundle definitions
assets/app.js       render, filter, persist
```

### Editing the fish data

Everything you'd want to change is in `assets/data.js`. A fish looks like this:

```js
{ n:'Walleye', s:[FA], t:'12pm – 2am', w:'rain', b:'Night',
  where:'Rivers, forest pond, mountain lake · Winter with a Rain Totem' }
```

| Field   | Meaning |
| ------- | ------- |
| `n`     | Name. Also generates the storage id, so renaming resets that fish. |
| `s`     | Seasons — any of `SP`, `SU`, `FA`, `WI`, or `ALL`. |
| `t`     | Time window, shown as written. |
| `w`     | `'sun'`, `'rain'` or `'any'`. Drives the colour of the weather label. |
| `b`     | Bundle key, matching a `key` in `BUNDLES`. Omit if it isn't wanted. |
| `lv`    | Legendary only — the minimum fishing level badge. |
| `where` | The detail line under the name. |

Zone counts, the progress bar and the bundle cards are all derived, so adding or removing a fish needs no other edits.

## Saving

Progress is kept in `localStorage`, which is per-browser and per-device. **Copy backup** puts an `angler:…` code on your clipboard; **Restore backup** takes one back. That's how you move progress from desktop to phone.

## Credits

Fish data from the [Stardew Valley Wiki](https://stardewvalleywiki.com/Fish), available under [CC BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/). Accurate as of game version 1.6.

Stardew Valley is by ConcernedApe. This is an unofficial fan project with no affiliation.

Code is MIT licensed — see [LICENSE](LICENSE).
