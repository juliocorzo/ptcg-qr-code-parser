# ptcg-qr-code-parser

![Screenshot of the application](/readme/demonstration.png)

Simple web application that allows users to generate QR codes from code cards obtained from Pokemon TCG Live code cards. 

This is useful for users who purchase these cards online, obtain codes and then want an easy way to submit the codes in the application's redemption site.

This was created because I purchased a few cards and decided that spending an hour creating this was probably going to be faster than inputting 100 16-character codes manually.

Hope this helps someone else!

#### Privacy

No codes or user information is saved. This website has no trackers.

#### Solutions used

- Next.js and Vercel for fast development and free hosting
- [qr-code-react](https://www.npmjs.com/package/react-qr-code) to generate and visualize QR codes
- [Material UI](https://mui.com/) for fast, simple components

#### Implementation notes

QR codes are generated using a high level of error correction. This makes the codes easier to be scanned. I experimented and realized that this is important. Low level error correction would lead to issues when attempting to scan the codes.

Scanning should be extremely easy now.