abstract class Builder {
  public abstract makeTitle(title: String): void;
  public abstract makeString(str: String): void;
  public abstract makeItems(items: String[]): void;
  public abstract close(): void;
}

class Director {
  private builder: Builder;

  public constructor(builder: Builder) {
    this.builder = builder;
  }

  // 문서 구축
  public construct = (): void => {
    this.builder.makeTitle('안녕하세요'); // 타이틀
    this.builder.makeString('아침과 낮에'); // 문자열
    this.builder.makeItems(['좋은 아침입니다', '안녕하세요']); // 개별 항목
    this.builder.close(); // 문서 완성
  };
}

class TextBuilder extends Builder {
  private buffer: string[] = [];
  public makeTitle = (title: String): void => {
    this.buffer.push('=================\n');
    this.buffer.push(title + '\n');
  };

  public makeString = (str: String): void => {
    this.buffer.push(str + '\n');
  };

  public makeItems = (items: String[]): void => {
    for (let i = 0; i < items.length; i++) {
      this.buffer.push(items[i] + '\n');
    }
  };

  public close = (): void => {
    this.buffer.push('=================\n');
  };

  public getResult = (): String => {
    return this.buffer.join('');
  };
}
