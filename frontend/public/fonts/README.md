# Local Fonts Folder

Place your local font files here (e.g., .ttf, .otf, .woff, .woff2).

Then update `src/index.css` to include the `@font-face` definitions if you want to use local fonts instead of Google Fonts.

Example:
```css
@font-face {
  font-family: 'Poppins';
  src: url('/fonts/Poppins-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}
```
