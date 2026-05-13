# 3D Web App - Pepsi Products

This is my 3D Web App for the Web 3D Applications module at Sussex (2026).

The site shows three soft drinks (Pepsi bottle, 7Up can, Mirinda can) as 3D models you can rotate in the browser. Each product page has buttons to play an animation, toggle wireframe mode, and switch the lighting. I also added an About page where I wrote about the build process and testing.

## What I used

- HTML5 and CSS3
- Bootstrap 5.3.3 (loaded from a CDN)
- Vanilla JavaScript
- Three.js r128, with OrbitControls and GLTFLoader
- Blender for the 3D models, exported as glTF binary (.glb)
- Git and GitHub for version control

## Folder structure

- `index.html` is the home page
- `pepsi.html`, `7up.html`, `mirinda.html` are the product pages
- `about.html` is the about page
- `submission.html` has the URLs for marking
- `css/`, `js/`, `shaders/`, `assets/` hold the supporting files

## Running it locally

I open the folder in VS Code and run `python3 -m http.server 8000`, then visit http://localhost:8000 in my browser.

Hamza Ibrahim
