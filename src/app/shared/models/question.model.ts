export class Question {
  constructor (
    public words: Array<string>,
    public id_methodic: number,
    public src: string,
    public question: string,
    public id?: number
  ) { }
}
