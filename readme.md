<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Avocado E-Commerce Project README</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 20px auto;
      padding: 0 15px;
      background-color: #f9f9f9;
      color: #333;
    }
    h1, h2, h3 {
      color: #2c3e50;
    }
    a {
      color: #2980b9;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    hr {
      border: 0;
      height: 1px;
      background: #ddd;
      margin: 30px 0;
    }
    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 10px auto;
    }
    code, pre {
      background: #eee;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: monospace;
    }
    pre {
      padding: 10px;
      overflow-x: auto;
    }
    ul {
      margin-left: 20px;
    }
  </style>
</head>
<body>

  <div style="text-align:center;">
    <a href="https://www.meraki-academy.org" target="_blank" rel="noopener noreferrer">
      <img width="400" height="100" src="https://www.meraki-academy.org/assets/img/logov02.svg" alt="MERAKI Academy Logo" />
    </a>
  </div>

  <h1 align="center">Avocado E-Commerce Project</h1>

  <hr />

  <p align="center">
    A modern, scalable e-commerce platform built with the latest technologies.<br />
    <a href="">Demo (Coming Soon)</a>
  </p>

  <h2>📝 Table of Contents</h2>
  <ul>
    <li><a href="#about">About</a></li>
    <li><a href="#getting_started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#built_using">Built Using</a></li>
    <li><a href="#user_story">User Story</a></li>
    <li><a href="#data_flow">Data Flow</a></li>
    <li><a href="#guided_by">Guided By</a></li>
  </ul>

  <h2 id="about">🧐 About</h2>
  <p>
    <strong>Why Avocado?</strong><br />
    Avocado is designed to deliver a seamless shopping experience using modern web technologies. Built with Next.js and TypeScript on the frontend, and powered by a robust Node.js and Express backend with PostgreSQL (Neon) as the database, it offers scalability, security, and performance. Features like real-time chat support, detailed analytics, and an intuitive admin panel make Avocado a complete solution for online stores.
  </p>
  <p>
    <strong>Benefits:</strong>
    <ul>
      <li><strong>Performance & Scalability:</strong> Leveraging Next.js with server-side rendering and PostgreSQL (Neon) for efficient data management.</li>
      <li><strong>Type Safety:</strong> Full TypeScript integration across frontend and backend for more reliable code.</li>
      <li><strong>User Engagement:</strong> Real-time chat and personalized product recommendations.</li>
      <li><strong>Admin Dashboard:</strong> Manage products, categories, orders, and users with ease.</li>
    </ul>
  </p>

  <hr />

  <h2 id="getting_started">🏁 Getting Started</h2>
  <p>Follow these instructions to set up the project locally for development and testing.</p>

  <h3>Prerequisites</h3>
  <ul>
    <li>Visual Studio Code - <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">Download here</a></li>
    <li>Git - <a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer">Download here</a></li>
    <li>PostgreSQL (Neon) - <a href="https://neon.tech/" target="_blank" rel="noopener noreferrer">Setup Neon DB</a></li>
    <li>Node.js (Latest LTS) - <a href="https://nodejs.org/en/download/" target="_blank" rel="noopener noreferrer">Download here</a></li>
  </ul>

  <h3>Installation Steps</h3>
  <ol>
    <li>Clone the repo to your machine:
      <pre><code>git clone https://github.com/your_username/avocado-project.git</code></pre>
    </li>
    <li>Install dependencies in both <code>backend</code> and <code>frontend</code> folders:
      <pre><code>npm install</code></pre>
    </li>
    <li>Set up your PostgreSQL database (Neon) and update environment variables accordingly.</li>
    <li>Run the backend server:
      <pre><code>npm run dev</code></pre>
    </li>
    <li>Run the frontend Next.js app:
      <pre><code>npm run dev</code></pre>
    </li>
  </ol>

  <p>Your application should now be running locally.</p>

  <hr />

  <h2 id="usage">🎈 Usage</h2>
  <ul>
    <li>Browse products without registering.</li>
    <li>Register or login to add products to your cart and place orders.</li>
    <li>Admin users can manage categories, products, users, and view KPIs through the admin panel.</li>
    <li>Use the real-time chat feature for support.</li>
  </ul>

  <hr />

  <h2 id="built_using">⛏️ Built Using</h2>
  <ul>
    <li><a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer">PostgreSQL (Neon)</a> - Cloud Database</li>
    <li><a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer">Express.js</a> - Backend Framework</li>
    <li><a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</a> - React Framework for SSR and SSG</li>
    <li><a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">TypeScript</a> - Typed JavaScript</li>
    <li><a href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer">Node.js</a> - Runtime Environment</li>
  </ul>

  <hr />

  <h2 id="user_story">User Story</h2>
  <p>Access the Trello board tracking this project:<br />
    <a href="#">Trello Board</a>
  </p>

  <hr />

  <h2 id="data_flow">Data Flow</h2>
  <p>
    <img width="300" height="300" src="https://cacoo.com/assets/site/img/templates/screenshots/er-database-diagram.png" alt="Database Schema Diagram" />
  </p>

  <hr />

  <h2 id="guided_by">⚠️ Guided By</h2>
  <p>This project is guided by ©️ <a href="https://www.meraki-academy.org" target="_blank" rel="noopener noreferrer">MERAKI Academy</a></p>

</body>
</html>
