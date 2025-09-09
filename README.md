# Mini Instagram Clone (Next.js + Tailwind)

A minimal social media feed built with **Next.js** and **Tailwind CSS**.  
Includes login, onboarding, profile editing, posting text/images, and reactions (like, comment, share).  

---

## 🚀 Features
- **Login (cookies stored)**  
  - Enter any username & password to log in.  
  - Saved in cookies for session persistence.  

- **Onboarding (first login only)**  
  - Choose avatar (emoji picker or upload image).  
  - Set username & bio.  
  - Saved in LocalStorage.  

- **Feed**  
  - View/edit profile (from feed header).  
  - Create **text posts** and **image posts** (saved in LocalStorage).  
  - Reaction bar: **Like ❤️, Comment 💬, Share 🔗** (saved in LocalStorage).  

- **Responsive design** (desktop + mobile).  

---

## 🛠️ Tech Stack
- [Next.js](https://nextjs.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [emoji-mart](https://github.com/missive/emoji-mart) for emoji picker  
- LocalStorage + Cookies for persistence  

---

## 🖥️ Getting Started

Clone the repo:
```bash
git clone https://github.com/your-username/mini-ig.git
cd mini-ig
