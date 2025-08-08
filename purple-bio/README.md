# Purple Bio — pagină "link in bio" cu temă mov

Un mini-site static, modern, similar ca stil cu guns.lol: gradient mov, card cu efect de sticlă, butoane pentru linkuri, share/copy.

## Cum îl folosești

1. Deschide fișierul `config.js` și personalizează:
   - `name`, `username`, `bio`, `avatarUrl`
   - `primaryLink` (linkul principal pe care vrei să-l copieze butonul)
   - `links` (lista de linkuri afișate)
   - opțional `theme.primary` pentru altă nuanță mov
2. Deschide `index.html` în browser (dublu-click sau servește cu un server static).

## Deploy rapid

- GitHub Pages: pune conținutul acestui folder într-un repo și activează Pages (branch `main`, root).
- Netlify/Vercel: importă repo-ul și deploy ca site static.

## Customizare rapidă

- Culorile principale sunt variabile CSS în `styles.css` (`--primary-500` etc.).
- Poți schimba iconițele selectând `icon` în `config.js` pentru fiecare link: `instagram`, `tiktok`, `youtube`, `twitter`, `github`, `mail`, `globe`, `link`.

## Fără dependențe

Totul e HTML/CSS/JS pur, fără build sau framework.