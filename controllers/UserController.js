class UserController {
    // Construtor do id do formulario
    constructor (formId, tableId){
        // Nome formEl(EL de elemento) - nao é um ID estatico, pode servir pra qualquer formulario
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();

    }

    // metodo do botao submit enviar os dados do fomulario
    onSubmit (){

        // ArrowFunction , evitar conflito de scopo
        this.formEl.addEventListener("submit", event => {

            event.preventDefault();

            let values = this.getValues();

            values.photo = "";

            this.getPhoto((content)=>{

                values.photo = content;

                this.addLine(values);

            });

                              
         });
          
    }

    getPhoto(callback){

        let fileReader = new FileReader();

        let elements = [...this.formEl.elements].filter(item=> {

            if (item.name === 'photo'){
                return item;
            }
        });

        let file = elements[0].files[0];

        fileReader.onload = () =>{

            callback(fileReader.result);

        };

        fileReader.readAsDataURL(file);

    }
    // metodo para pegar os elementos do formulario
    getValues(){

            let user = {};

            // SPREAD recebe como parametro a variavel campo(field) e a segunda variavel é o indice(index que é 0)
            [...this.formEl.elements].forEach(function (field, index) {

            if (field.name == "gender") {

            // se o campo esta marcado (true automatico)
            if (field.checked) {

                user[field.name] = field.value;
            }

            } else {

                user[field.name] = field.value;

            }

        });

        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );
        
    }

        // nome da metodo addLine , como parametro dataUser
        addLine(dataUser) {

            var tr = document.createElement("tr");
        
            // Vai colocar um texto, ele é comando HTML que precisa ser interpretado
            this.tableEl.innerHTML =
            `<tr>
                <td>
                    <img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm" />
                </td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${dataUser.admin}</td>
                <td>${dataUser.birth}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat">
                    Editar
                    </button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">
                    Excluir
                    </button>
                </td>
            </tr>`;
        
        }
  
}