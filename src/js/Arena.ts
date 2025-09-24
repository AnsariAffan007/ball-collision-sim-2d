class Arena {
  public arenaRadius: number;
  public arenaCenterX: number;
  public arenaCenterY: number;
  public element: HTMLElement

  constructor() {
    // Setting radius
    const bigCircle = document.getElementById("circle")!
    this.element = bigCircle
    this.arenaRadius = bigCircle.clientWidth / 2
    // Setting ball centers
    this.arenaCenterX = 0;
    this.arenaCenterY = 0;
  }
}

export default Arena;