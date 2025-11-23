# 🎨 Branding Files

Replace these placeholder files with your own brand assets:

## 📌 favicon.ico
- **Current**: Default placeholder
- **Size**: 32x32 or 64x64 pixels  
- **Format**: .ico, .png, or .svg
- **Location**: `public/favicon.ico`
- **Instructions**: 
  1. Create your favicon using a tool like [favicon.io](https://favicon.io/)
  2. Replace the placeholder file
  3. The browser will automatically use it

## 🏢 logo.png
- **Current**: Default placeholder
- **Size**: 200x200 pixels (or higher for retina)
- **Format**: .png or .svg
- **Location**: `public/logo.png`
- **Instructions**:
  1. Export your company logo as PNG/SVG
  2. Replace the placeholder file
  3. It will be used across the application

## 📲 How to Use

### In HTML (index.html)
```html
<link rel="icon" type="image/svg+xml" href="/favicon.ico" />
```

### In Components
```typescript
import logo from "@/public/logo.png";

export function Logo() {
  return <img src={logo} alt="YEF Bloom Funds" />;
}
```

---

**Ready to brand?** Replace the placeholder files and reload your browser! 🚀
