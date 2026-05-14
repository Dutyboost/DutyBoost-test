import pptxgen from "pptxgenjs";
import html2canvas from "html2canvas";

export async function exportRetailerPptxWithImages() {
  try {
    const pptx = new pptxgen();
    pptx.defineLayout({ name: "LAYOUT_16x9", width: 13.333, height: 7.5 });
    pptx.layout = "LAYOUT_16x9";

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
        // Scroll slide into view before capturing
        slideElement.scrollIntoView({ behavior: "instant", block: "center" });
        await new Promise(resolve => setTimeout(resolve, 300));

        // Capture the slide using html2canvas
        const canvas = await html2canvas(slideElement, {
          scale: 1.5,
          allowTaint: true,
          useCORS: true,
          logging: false,
          backgroundColor: "#0F172A",
        });

        // Add slide and fill with image
        const slide = pptx.addSlide();
        slide.background = { color: "0F172A" };
        
        // Add image that fills entire slide (16:9)
        slide.addImage({
          data: canvas.toDataURL("image/png"),
          x: 0,
          y: 0,
          w: 13.333,
          h: 7.5,
        });

        console.log(`Captured slide ${i + 1} successfully`);
      } catch (error) {
        console.error(`Failed to capture slide ${i + 1}:`, error);
        // Add blank slide on error
        const slide = pptx.addSlide();
        slide.background = { color: "000000" };
      }
    }

    console.log("Writing PPTX file...");
    await pptx.writeFile({ fileName: "DutyBoost-AirportRetailer-Presentation.pptx" });
    console.log("Download complete!");
  } catch (error) {
    console.error("Export failed:", error);
    alert("Export failed: " + error.message);
  }
}