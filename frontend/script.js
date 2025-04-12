async function processImage() {
  const file = imageInput.files[0];
  if (!file) return;
  
  generateBtn.disabled = true;
  output.innerHTML = '<div class="loading"><div class="loader"></div><p>Extracting text from image...</p></div>';
  
  try {
    // Extract text using Tesseract
    const { data: { text } } = await Tesseract.recognize(file, 'eng');
    
    output.innerHTML = '<div class="loading"><div class="loader"></div><p>Generating quiz questions...</p></div>';
    
    // Make the actual API call to your backend
    const response = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text })
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    // Use the actual response from the API
    const mcq = await response.json();
    
    // Display the questions from the API response
    output.innerHTML = `
      <div class="mcq-result">
        <h3>Your Sample MCQs</h3>
        <pre>${mcq.questions}</pre>
      </div>
    `;
    
    document.getElementById("cta").style.display = "block";
    output.scrollIntoView({ behavior: 'smooth' });
    
  } catch (error) {
    output.innerHTML = `<p>Error: ${error.message}</p>`;
    console.error("Error processing image:", error);
  } finally {
    generateBtn.disabled = false;
  }
}