export class Word {
  constructor(
    public id_category: number,
    public id_user: number,
    public word_or: string,
    public word_tr: string,
    public is_learned: number,
    public id?: number
  ) { }
}
