// Smooth scroll
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Project Data (Easily Add More)
const projects = [
    {
        title: "City Builder Framework",
        description: "A modular city-building engine with placement, UI, and data systems.",
        image: "images/citybuilder.png",
        link: "https://example.com"
    },
    {
        title: "Survival Game Engine",
        description: "Crafting, hunger, inventory, and world generation systems.",
        image: "images/survival.png",
        link: "https://example.com"
    }
];

// Render Projects
const container = document.getElementById("project-container");

projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
        <img src="${p.image}">
        <div class="project-info">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <button class="project-btn" onclick="window.open('${p.link}', '_blank')">View Project</button>
        </div>
    `;

    container.appendChild(card);
});
