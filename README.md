# 🧶 Artistry - The Craft Shop (Hackathon Project)

This is a responsive e-commerce front-end demo for a fictional shop called **Artistry - The Craft Shop**, built for Code Blossom hackathon. It features a product gallery, persistent cart system, dark/light mode toggle, enhanced header layout, testimonial cards, a contact form with validation and toast alerts, about and blog section. This is a project inspired by Colorlib's Cake Shop Theme.

---

## 🛠 Tech Stack
- HTML5  
- CSS3 + Bootstrap 5  
- JavaScript (ES6)  
- FormSubmit (for contact form email submission)  
- LocalStorage (for cart persistence)

---

## 🚀 Features

### 🎨 Theme Toggle
- Light/Dark mode with icon toggle  
- Saves user preference using `localStorage`  
- Smooth toggle animations  

### 🛒 Persistent Shopping Cart
- Click captions to add items  
- Toast notification on add with quantity  
- Cart persists across reloads using `localStorage`  
- Modal displays item names + quantities  
- Dynamic cart count badge  
- "Clear Cart" button with confirmation  

### 🧾 Enhanced Header
- Fixed top contact info section with phone and social links  
- Responsive navbar stacked below the header  
- Adjusted spacing to avoid overlap  

### 📬 Contact Form
- Form validation (name, email, message required)  
- Email format checking via regex  
- Invalid fields animate on error  
- AJAX submission using [FormSubmit](https://formsubmit.co/)  
- Toast-based success & error feedback  

### 📖 About Section
A brief, warm introduction that captures the essence of the shop, highlighting its passion for handmade, artistic, and quality craft supplies. This section helps users connect emotionally with the brand and understand its mission. The layout is clean and centered, accompanied by visual flair and subtle animations.

### 💬 Testimonials Section
Customer feedback carousel featuring real reviews in card format. Built using Bootstrap's carousel component, it includes:
- Responsive cards with customer images, names, and quotes  
- Smooth transitions and auto-play  
- Easily customizable structure for adding more reviews  

This section helps build trust and showcases customer satisfaction visually.

### 📝 Blog Section
A blog preview grid displaying short snippets from recent posts or crafting tips. Features:
- Responsive layout with cards  
- Each card includes an image, title, short excerpt, and "Read More" button  
- Engages users by offering crafting inspiration, tutorials, or product highlights  

This section adds value to visitors while improving SEO and engagement.

---

## 📁 Project Structure 
```bash
cb_hackathon/
├── index.html         # Main page
├── styles.css         # Custom CSS (split by section)
├── script.js          # All logic (theme, cart, contact, toasts)
├── assets/
│   └── images/        # All images used (e.g. product, blog, etc.)
└── README.md

## 📬 Contact Form Email Setup
1. Go to [Formsubmit](https://formsubmit.co/)
2. Replace `your@email.com` in `script.js` with your own
3. First submission will ask to verify your email

---

## 🔧 Installation (Optional for Local Dev)
```bash
# Clone the repository
$ git clone https://github.com/xmaemaumeowx/cb_hackathon.git

# Navigate to the folder
$ cd cb_hackathon

# Open in browser
Open index.html manually or via Live Server (VS Code)
```

---
## 🌐 Live Demo
[Live Preview] https://artistrythecraftshop.netlify.app/

## 🙌 Credits
Created by Maureen T. and Alicia M. for a hackathon project.

## 📄 License
This project is licensed for educational and demonstration purposes only.
Not intended for commercial use.

## 🤖 AI Acknowledgment
Parts of this project were developed with the help of AI tools, to support debugging and content drafting.
Majority of images used were AI generated images through canva.com

---

## 🛡 Shields
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)
![License: Demo](https://img.shields.io/badge/License-Demo-lightgrey)

---
