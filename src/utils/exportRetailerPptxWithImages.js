import pptxgen from "pptxgenjs";
import html2canvas from "html2canvas";

export async function exportRetailerPptxWithImages() {
  try {
    const pptx = new pptxgen();

    // Get all slide sections from the page
    const slideElements = document.querySelectorAll("section");
    
    if (slideElements.length === 0) {
      alert("No slides found on the page");
      return;
    }

    console.log(`Found ${slideElements.length} slides to capture`);

    // Capture each slide as an image and add to PPTX
    for (let i = 0; i < slideElements.length; i++) {
      const slideElement = slideElements[i];
      
      try {
        // Scroll slide into view
        slideElement.scrollIntoView({ behavior: "instant" });
        await new Promise(resolve => setTimeout(resolve, 500));

        // Get the slide's actual dimensions
        const rect = slideElement.getBoundingClientRect();
        const slideHeight = Math.max(rect.height, 700); // Minimum height to avoid distortion
        
        // Capture with proper viewport
        const canvas = await html2canvas(slideElement, {
          scale: 2,
          width: slideElement.offsetWidth,
          height: slideElement.offsetHeight,
          allowTaint: true,
          useCORS: true,
          logging: false,
          backgroundColor: "#0F172A",
        });

        // Calculate aspect ratio and resize to fit PPTX (16:9)
        const aspectRatio = canvas.width / canvas.height;
        let pptxWidth = 13.333;
        let pptxHeight = 7.5;
        
        // Adjust if image aspect ratio is significantly different
        if (aspectRatio < 1.77) { // Narrower than 16:9
          pptxWidth = (canvas.width / canvas.height) * pptxHeight;
        } else if (aspectRatio > 1.77) { // Wider than 16:9
          pptxHeight = pptxWidth / (canvas.width / canvas.height);
        }

        // Center the image
        const xOffset = (13.333 - pptxWidth) / 2;
        const yOffset = (7.5 - pptxHeight) / 2;

        // Add new slide
        const slide = pptx.addSlide();
        slide.background = { color: "0F172A" };
        
        // Add image to slide
        slide.addImage({
          data: canvas.toDataURL("image/png"),
          x: xOffset,
          y: yOffset,
          w: pptxWidth,
          h: pptxHeight,
          rsize: { type: "cover" },
        });

        console.log(`Captured slide ${i + 1}`);
      } catch (error) {
        console.error(`Failed to capture slide ${i + 1}:`, error);
      }
    }

    // Write the file
    console.log("Writing PPTX file...");
    await pptx.writeFile({ fileName: "DutyBoost-AirportRetailer-Presentation.pptx" });
    console.log("Download complete");
  } catch (error) {
    console.error("Export failed:", error);
    alert("Export failed: " + error.message);
  }
}