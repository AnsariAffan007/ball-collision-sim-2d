import Arena from "./Arena.js";
import Ball from "./Ball.js";

const arena = new Arena()

const addButton = document.getElementById("add-circle-button")
addButton?.addEventListener("click", e => {
  const newBall = new Ball(arena.arenaRadius, arena.arenaCenterX, arena.arenaCenterY)
  // Appending inside the arena
  arena.element.appendChild(newBall.element)
})