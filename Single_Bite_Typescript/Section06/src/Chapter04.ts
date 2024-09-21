/**
 * 인터페이스와 클래스
 */

interface CharacterInterface {
  name: string;
  moveSpeed: number;
  move(): void;
}

class Character implements CharacterInterface {
  constructor(
    public name: string,
    public moveSpeed: number,
    private extra: string
  ) {
    this.name = name;
    this.moveSpeed = moveSpeed;
  }

  move() {
    console.log("이동한다.");
  }
}
