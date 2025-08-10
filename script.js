function hideMessageInImage(imageData, message) {
    let imgData = imageData.data;
    let msg = message + '\0'; 
    let msgLen = msg.length;
    let msgIndex = 0;

    console.log("Hiding message:", msg);

    for (let i = 0; i < imgData.length; i += 8) {
        if (msgIndex < msgLen) {
            let charCode = msg.charCodeAt(msgIndex);
            imgData[i] = (imgData[i] & 0xFE) | ((charCode >> 7) & 0x01);
            imgData[i + 1] = (imgData[i + 1] & 0xFE) | ((charCode >> 6) & 0x01);
            imgData[i + 2] = (imgData[i + 2] & 0xFE) | ((charCode >> 5) & 0x01);
            imgData[i + 3] = (imgData[i + 3] & 0xFE) | ((charCode >> 4) & 0x01);
            imgData[i + 4] = (imgData[i + 4] & 0xFE) | ((charCode >> 3) & 0x01);
            imgData[i + 5] = (imgData[i + 5] & 0xFE) | ((charCode >> 2) & 0x01);
            imgData[i + 6] = (imgData[i + 6] & 0xFE) | ((charCode >> 1) & 0x01);
            imgData[i + 7] = (imgData[i + 7] & 0xFE) | ((charCode) & 0x01);

            msgIndex++;
        } else {
            break;
        }
    }

    console.log("Message hidden successfully.");

    return imageData;
}

function extractMessageFromImage(imageData) {
    let imgData = imageData.data;
    let extractedMessage = '';
    let charCode = 0;

    console.log("Starting extraction...");

    for (let i = 0; i < imgData.length; i += 8) {
        charCode = ((imgData[i] & 0x01) << 7) |
                   ((imgData[i + 1] & 0x01) << 6) |
                   ((imgData[i + 2] & 0x01) << 5) |
                   ((imgData[i + 3] & 0x01) << 4) |
                   ((imgData[i + 4] & 0x01) << 3) |
                   ((imgData[i + 5] & 0x01) << 2) |
                   ((imgData[i + 6] & 0x01) << 1) |
                   (imgData[i + 7] & 0x01);

        if (charCode === 0) {
            break;
        }

        extractedMessage += String.fromCharCode(charCode);
    }

    console.log("Extraction completed:", extractedMessage);

    return extractedMessage;
}

function handleFileSelect(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function(event) {
        let img = new Image();
        img.onload = function() {
            let canvas = document.getElementById('myCanvas');
            let ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            let canvas1 = document.getElementById('myCanvas1');
            let ctx1 = canvas1.getContext('2d');
            canvas1.width = img.width;
            canvas1.height = img.height;
            ctx1.drawImage(img, 0, 0, img.width, img.height);
        };
        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
}

document.getElementById('imageInput').addEventListener('change', handleFileSelect, false);

function hideMessage() {
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');
    
    // Check if image is loaded
    if (canvas.width === 0 || canvas.height === 0) {
        showModal('Please select an image first.');
        return;
    }

    let canvas1 = document.getElementById('myCanvas1');
    let ctx1 = canvas1.getContext('2d');

    let message = document.getElementById('messageInput').value;

    // Check if message is provided
    if (message.trim() === '') {
        showModal('Please enter a message to hide.');
        return;
    }
    

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    imageData = hideMessageInImage(imageData, message);

    ctx.putImageData(imageData, 0, 0);
    ctx1.putImageData(imageData, 0, 0);
    showModal('Encoding successful!');

    document.getElementById('myCanvas1').style.display='block';
}

function extractMessage() {
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');

    // Check if image is loaded
    if (canvas.width === 400 || canvas.height === 300) {
        showModal('Please select an image first.');
        return;
    }

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let extractedMessage = extractMessageFromImage(imageData);
    showModal('Decoding successful!');

    document.getElementById('extractedMessage').innerText = "Extracted Hidden Text: " + extractedMessage;
}

function downloadImage() {
    const canvas = document.getElementById('myCanvas1');

    // Check if output canvas has an image
    if (canvas.width === 0 || canvas.height === 0) {
        showModal('No image to download. Please encode an image first.');
        return;
    }

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'output-image.png';
    link.click();
}

function showModal(message) {
    document.getElementById('modalMessage').innerText = message;
    document.getElementById('successModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}

function resetPage() {
    // Clear the canvas
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let canvas1 = document.getElementById('myCanvas1');
    let ctx1 = canvas1.getContext('2d');
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

    // Clear the image input and message textarea
        document.getElementById('imageInput').value = '';
        document.getElementById('messageInput').value = '';

        // Clear the extracted message
        document.getElementById('extractedMessage').innerText = '';

        // Hide the output canvas
        document.getElementById('myCanvas1').style.display = 'none';

        // Reload the page
        location.reload();
    }