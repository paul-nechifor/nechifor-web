# Nechifor Web

## Usage

You need to have Docker installed and `7za` (you can install it on Ubuntu with
`sudo apt install p7zip-full`).

To build everything run:

    ./build

Afterwards you can run it for testing purposes with:

    ./build run

## Sites left to add.

- multilatex
- negura-server
- kant-generator-pro (in js)
- thunder tactics
- cv
- 1930
- spheres image
- tinutok
- rpgadvance
- space-hoarder os package
- phonetic-english

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

- Every page should have a link to the git repository, the the homepage and to
  the list of projects.

- The list of projects should mention where they can see all my repositories on
  github.

- Make sure each page specifies the language it's in.

- Eliminate all CDNs. I just witnesed a Bootstrap CDN take 6.72 s to load.
  That's absurd. Include Bootstrap and jQuery for now.

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

- Add the 500 error.

- Add print stylesheets?

- Add links to my Twitter page.

- The scanner should spell check every page.

## License

ISC
