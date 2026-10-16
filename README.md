# ourpurpose.life

Website for **Our Purpose: The Seven Stages of Life — A Journey from Survival to Service** by Sunil Ishairzay.

Hosted as a static site on Cloudflare Workers.

## What's here

| Path | What it is |
| --- | --- |
| `public/index.html` | The whole home page |
| `public/404.html` | Page shown for links that don't exist |
| `public/favicon.svg` | Browser tab icon |
| `public/robots.txt`, `public/sitemap.xml` | Help search engines find the site |
| `wrangler.jsonc` | Tells Cloudflare to serve the `public` folder |

## Making changes

Edit the files in `public/` and commit to the `main` branch. Cloudflare redeploys automatically within a minute or two.

## Email signups

Both signup forms send emails to `/api/subscribe` (code in `src/index.js`), which saves them in the Cloudflare D1 database **ourpurpose-signups**, table `subscribers` (email, source, signed_up_at). Duplicate emails are ignored, and a hidden field filters out most spam bots.

To see your list: Cloudflare dashboard → **Storage & databases** → **D1 SQL database** → **ourpurpose-signups** → **Console**, then run:

```sql
SELECT email, source, signed_up_at FROM subscribers ORDER BY signed_up_at DESC;
```

When you choose an email service (Kit, MailerLite, Mailchimp), export this list and import it there.

## Still to fill in

Search `index.html` for `[` to find the placeholders: launch date, author photo, coaching prices and session count.
