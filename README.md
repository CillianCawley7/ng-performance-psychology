# NG Performance Psychology Website

A professional website for Neil Greaney - Sports & Performance Psychologist.

## Quick Start

Simply open `index.html` in your web browser to view the website.

```bash
# On macOS
open index.html

# Or use a local server for best results
npx serve .
```

## Project Structure

```
NG_Sports_Pshycology/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript for interactions
├── assets/             # Images and media
│   └── neil-greaney.jpg    # Add Neil's photo here
└── README.md           # This file
```

## Adding Neil's Photo

1. Place Neil's photo in the `assets/` folder
2. Name it `neil-greaney.jpg`
3. Recommended size: 600x800 pixels (3:4 aspect ratio)

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Testimonial Carousel**: Auto-rotating client testimonials
- **Smooth Animations**: Scroll reveal and hover effects
- **Chat Widget**: Ready to integrate with any chat service
- **SEO Friendly**: Proper meta tags and semantic HTML

## Customization

### Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --color-bg: #000000;           /* Background */
    --color-text: #ffffff;          /* Text color */
    --color-accent: #e8d4e8;        /* Lavender accent */
    --color-card-bg: #4a4a4a;       /* Card background */
}
```

### Content
Edit the text directly in `index.html`:
- Update services and pricing
- Add/remove testimonials
- Change contact information
- Update the footer address

### Chat Integration
The chat widget currently scrolls to contact. To integrate a real chat service:

1. **Tawk.to** (Free): Add their script before `</body>`
2. **Crisp**: Replace the chat widget with their widget
3. **WhatsApp**: Link to `https://wa.me/353852832623`

## Deployment

### Option 1: Static Hosting (Recommended)
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect to Git repository
- **GitHub Pages**: Push to a repo and enable Pages

### Option 2: Traditional Hosting
Upload all files to your web hosting via FTP/SFTP.

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contact

For the live site, contact: neil@ngperformancepsychology.com
