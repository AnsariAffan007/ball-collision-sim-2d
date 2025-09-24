const backgroundColors: Record<number, string> = {
  0: "blue",
  1: "red",
  2: "green",
  3: "orange",
  4: "purple",
  5: "yellow",
  6: "pink",
  7: "cyan",
  8: "magenta",
  9: "lime"
};

class Ball {
  public element;

  constructor(arenaRadius: number, arenaCenterX: number, arenaCenterY: number) {
    // Generating random x position
    const newBall_X = Math.floor(Math.random() * arenaRadius)
    const newBall_Y = this.getXYpoint("Y", newBall_X, arenaRadius, arenaCenterX, arenaCenterY)
    // Creating a circle
    const newBall = document.createElement("div")
    newBall.className = "inner-circle"
    // Generating 2 random numbers to generate either positive direction or negative direction for both points
    const randomDirection_X = Math.random() > 0.5 ? 1 : -1
    const randomDirection_Y = Math.random() > 0.5 ? 1 : -1
    // Radius needs to be added to points, to start from center
    newBall.style.top = `${arenaRadius + (randomDirection_Y * newBall_Y)}px`
    newBall.style.left = `${arenaRadius + (randomDirection_X * newBall_X)}px`
    // Assigning random background color
    newBall.style.backgroundColor = backgroundColors[Math.floor(Math.random() * 10)] || ""

    this.element = newBall
  }

  private getXYpoint(point: "X" | "Y", pointValue: number, radius: number, arenaCenterX: number, arenaCenterY: number) {
    // Use x^2 + y^2 = r^2 equation
    const pointToUse = point === "X" ? arenaCenterY : arenaCenterX;
    return Math.sqrt((radius * radius) - ((pointValue - pointToUse) * (pointValue - pointToUse)))
  }
}

export default Ball;