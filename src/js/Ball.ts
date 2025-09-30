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
  // Speed is in pixel/second
  public speed: number;

  constructor(arenaRadius: number, arenaCenterX: number, arenaCenterY: number, ballSpeed: number) {
    // Generating random x position
    const randomX = Math.floor(Math.random() * arenaRadius)
    const randomY = this.getXYpoint("Y", randomX, arenaRadius, arenaCenterX, arenaCenterY)
    // Creating a circle
    const newBall = document.createElement("div")
    newBall.className = "inner-circle"
    // Generating 2 random numbers to generate either positive direction or negative direction for both points
    const randomDirection_X = Math.random() > 0.5 ? 1 : -1
    const randomDirection_Y = Math.random() > 0.5 ? 1 : -1
    // Radius needs to be added to points, to start from center
    const newBall_X = arenaRadius + (randomDirection_X * randomX)
    const newBall_Y = arenaRadius + (randomDirection_Y * randomY)
    // Moving the ball to its randomly generated point using css
    newBall.style.top = `${newBall_Y}px`
    newBall.style.left = `${newBall_X}px`
    // Assigning random background color
    newBall.style.backgroundColor = backgroundColors[Math.floor(Math.random() * 10)] || ""

    this.element = newBall
    this.speed = ballSpeed

    // Getting ball to move. It has to move along some line
    // To get line equation, we will get a random line, and for that, a random slope, 'm'
    // To prevent line from going outside circle, slope must be chosen carefully
    // Generating two slopes, min and max (which are boundaries above which line will go outside circle)
    // We will get one random slope using min and max bounds.
    // Method of getting slope:
    // 1. get one x point, x1, such that x1 = newBall_X + 1
    // 2. get y1, by putting x1 on circle equation
    // 3. get slope m1, by doing ((y1 - newBall_Y) / (x1 - newBall_X))
    // Repeat for x2 point, such that x2 = newBallX - 1. Get new slope m2
    // Get m by picking random number between m1 and m2

    // Getting m1
    const x1 = newBall_X + 1
    const y1 = this.getXYpoint("Y", x1, arenaRadius, arenaCenterX, arenaCenterY)
    const m1 = ((y1 - newBall_Y) / (x1 - newBall_X))

    // Getting m2
    const x2 = newBall_X - 1
    const y2 = this.getXYpoint("Y", x2, arenaRadius, arenaCenterX, arenaCenterY)
    const m2 = ((y2 - newBall_Y) / (x2 - newBall_X))

    // Choosing "m" randomly from between m1 and m2
    const min = Math.min(m1, m2)
    const max = Math.max(m1, m2)
    const m = min + Math.random() * (max - min)

    console.log(m)
  }

  private getXYpoint(point: "X" | "Y", pointValue: number, radius: number, arenaCenterX: number, arenaCenterY: number) {
    // Use (x-h)^2 + (y-k)^2 = r^2 equation
    const pointToUse = point === "X" ? arenaCenterY : arenaCenterX;
    return Math.sqrt((radius * radius) - ((pointValue - pointToUse) * (pointValue - pointToUse)))
  }
}

export default Ball;