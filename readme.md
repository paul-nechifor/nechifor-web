# Nechifor Web

## Usage

You need to have Docker installed and `7za` (you can install it on Ubuntu with
`sudo apt install p7zip-full`).

To build everything run:

    ./build

Afterwards you can run it for testing purposes with:

    ./build run

## TODO

- Add `<meta name='description' ...> to all pages.

- Configure Content-Security-Policy for Nginx. See
  https://content-security-policy.com/ . Possible just this:

      add_header Content-Security-Policy "default-src 'self';";

- Configure X-Frame-Options to prevent clickjacking.

- ```
  Configure an "X-XSS-Protection" HTTP header. Add the "X-XSS-Protection" HTTP
  header with "1; mode=block" as value (1 to indicate the activation, and
  mode=block to indicate that the entire page must be blocked if a problem
  occurs).
  ```

- Hide Nginx server version. Same for PHP.

- Add a sitemap.

- Make sure to mark things that are generated as non-indexable by Google.

- Make sites accessible on Phones.

- Add Open Graph data: http://ogp.me/

- Add web monitoring.

- Should I use schema.org?

- Add more links between repos and sites and between sites and used packages.

- See if you can avoid installing so many packages related to nginx.

- Add a blog page about movie histograms with the small package I created. Show
  it for some popular films.

- Each site should have a link to the github page easily visible.

- Add script that creates a map of every link in the docker container. Use it to
  detect broken links.

- Use supervisord to keep both PHP and Nginx alive. See
  https://hub.docker.com/r/amontaigu/nginx-php/ for an example.

- Most of the sites are missing titles.

- Review **ALL** the files to make sure everything was converted okay.

- Add instructions for robots.

- Add favicons to all.

- Use HTTPS.

- Configure Nginx better, including file expiration times.
## License

ISC
