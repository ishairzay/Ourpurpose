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

## Turning on email signups

The two signup forms don't collect emails yet. Create a signup form in your email service (Kit, Mailchimp, MailerLite or Formspree), copy its form action URL, and paste it into `SIGNUP_FORM_URL` near the bottom of `public/index.html`. The form field is named `email`; if your service expects a different name (Mailchimp uses `EMAIL`), change the `name` on both inputs.

## Still to fill in

Search `index.html` for `[` to find the placeholders: launch date, author photo, coaching prices and session count.
