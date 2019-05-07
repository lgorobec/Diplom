export class User {
  constructor (
    public email: string,
    public password: string,
    public date: Date,
    public name: string,
    public id?: number
  ) { }
}
