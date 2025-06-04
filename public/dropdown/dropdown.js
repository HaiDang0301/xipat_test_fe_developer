document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".dropdown-button");
  const dropdown = document.querySelector(".dropdown-menu");
  const items = dropdown.querySelectorAll(".dropdown-item");
  const label = document.getElementById("selectedLabel");

  const toggleDropdown = () => {
    dropdown.classList.toggle("show");
    button.setAttribute("aria-expanded", dropdown.classList.contains("show") ? "true" : "false");
    if (dropdown.classList.contains("show")) items[0].focus();
  };

  const closeDropdown = (event) => {
    if (!dropdown.contains(event.target) && !button.contains(event.target)) {
      dropdown.classList.remove("show");
      button.setAttribute("aria-expanded", "false");
    }
  };

  const selectItem = (item) => {
    const value = item.textContent;
    button.textContent = value;
    label.innerHTML = "Bạn đã chọn: <i>" + value + "</i>";
    dropdown.classList.remove("show");
    button.setAttribute("aria-expanded", "false");
    button.focus();
  };

  const handleKeyDown = (event) => {
    if (!dropdown.classList.contains("show")) return;
    const currentIndex = Array.from(items).indexOf(document.activeElement);
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        items[currentIndex + 1].focus();
        break;
      case "ArrowUp":
        event.preventDefault();
        items[currentIndex - 1].focus();
        break;
      case "Enter":
        event.preventDefault();
        if (document.activeElement.classList.contains("dropdown-item")) {
          selectItem(document.activeElement);
        }
        break;
      case "Escape":
        dropdown.classList.remove("show");
        button.setAttribute("aria-expanded", "false");
        button.focus();
        break;
    }
  };

  button.addEventListener("click", toggleDropdown);
  document.addEventListener("click", closeDropdown);
  document.addEventListener("keydown", handleKeyDown);

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      selectItem(item);
    });
  });
});
