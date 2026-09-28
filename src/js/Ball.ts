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

  // Variables for line equation, to move the ball
  public x: number;
  public y: number;
  public m: number;

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
    this.x = newBall_X;
    this.y = newBall_Y

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
    this.m = isNaN(m) ? 1 : m;
    setInterval(() => {
      const [currentX, currentY] = this.getCurrentPoint()
      const step = 1;
      // We have the line, but we don't know if incrementing the point will move the ball inwards the circle or outwards
      // So we'll do x+1 for now and calculate y, and get the direction vector
      // If direction vector is negative, it means line is moving inwards, but if it is positive, we have to do invert the new points
      let dx = 1;
      let dy = this.getCurrentSlope()

      // Normalize
      const len = Math.hypot(dx, dy);
      dx /= len;
      dy /= len;

      // We have to select 4 quarters of the circle, based on in which quarter the point is, the x and y will accordingly increment, or decrement
      // Numbering top left quarter as 1, and moving clockwise.
      // X will increment in quarter 1 and 3, and decrement in 2 and 4
      // Y will increment in quarter 1 and 2, and decrement in 3 and 4
      if (currentX < arenaCenterX) dx = 1;
      else if (currentX > arenaCenterX) dx = -dx

      if (currentY < arenaCenterY) dy = dy;
      else if (currentY > arenaCenterY) dy = -dy

      // dy can be NaN, bcs slope can be Infinite
      if (isNaN(dy)) {
        dy = currentY < arenaCenterY ? 1 : -1
      }

      const ballElement = this.getElement()
      this.x = currentX + (step * dx)
      this.y = currentY + (step * dy)
      ballElement.style.left = `${this.x}px`
      ballElement.style.top = `${this.y}px`
    }, 100)
  }

  private getXYpoint(point: "X" | "Y", pointValue: number, radius: number, arenaCenterX: number, arenaCenterY: number) {
    // Use (x-h)^2 + (y-k)^2 = r^2 equation
    const pointToUse = point === "X" ? arenaCenterY : arenaCenterX;
    return Math.sqrt((radius * radius) - ((pointValue - pointToUse) * (pointValue - pointToUse)))
  }

  private getCurrentSlope() {
    return this.m
  }

  private getCurrentPoint() {
    return [this.x, this.y] as const
  }

  private getElement() {
    return this.element
  }
}

export default Ball;