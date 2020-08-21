import { uuid } from 'uuidv4'

export class User {
    public readonly id: string;
    
    public name: string;
    public email: string;
    public password: string;

    constructor(props: Omit<User, 'id'>, id?: string) {
        // this.name = props.name;
        // this.email = props.email;
        // this.password = props.password;
        // OU
        Object.assign(this, props); //Pega todas as propriedadse que tem dentro de props e passa para o this
        
        if(!id) {
            this.id = uuid(); //Cria o id e não deixa a criação do id para o banco de dados
        }
    }
}