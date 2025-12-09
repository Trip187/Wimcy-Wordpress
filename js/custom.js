function landPageFunction() {
  // Ensure the browser supports basic DOM methods
  if (!document.createElement || !document.createTextNode) return;
  if (localStorage.getItem("landPageShown")) {
    return;
  }
  // Create landing overlay
  const landPage = document.createElement("div");
  landPage.style.height = "100%";
  landPage.style.width = "100%";
  landPage.style.opacity = "0.9";
  landPage.style.backgroundColor = "black";
  landPage.style.position = "fixed";
  landPage.style.top = "0";
  landPage.style.left = "0";
  landPage.style.display = "flex";
  landPage.style.justifyContent = "center";
  landPage.style.alignItems = "center";
  landPage.style.zIndex = "9999";

  // Create button
  const btn = document.createElement("button");
  btn.appendChild(document.createTextNode("Proceed"));
  btn.classList.add("proceed-btn");
  btn.style.padding = "1em 2em";
  btn.style.fontSize = "1rem";
  btn.style.cursor = "pointer";

  // Hide overlay when button clicked
  btn.addEventListener("click", function () {
    landPage.remove();
    localStorage.setItem("landPageShown", "true");
  });

  // Add button to overlay, and overlay to document
  landPage.appendChild(btn);
  document.body.appendChild(landPage);
}

// Run after DOM loads
document.addEventListener("DOMContentLoaded", landPageFunction);
