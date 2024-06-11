document.addEventListener("DOMContentLoaded", (event) => {
  // Load saved checkbox states
  const slots = ["slot1", "slot2", "slot3", "slot4"];
  slots.forEach((slot) => {
    const checked = localStorage.getItem(slot) === "true";
    document.getElementById(slot).checked = checked;
  });

  // Save checkbox states
  document.getElementById("save").addEventListener("click", () => {
    slots.forEach((slot) => {
      const checked = document.getElementById(slot).checked;
      localStorage.setItem(slot, checked);
    });
    alert("Saved successfully!");
  });
});
