export class User{

  public $key: string;

  constructor(
    public name: string,
    public username: string,
    public telephone: string,
    public cpf: string,
    public email: string,
    public password: string
  ){}

}