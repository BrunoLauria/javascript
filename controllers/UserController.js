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

            let btn = this.formEl.querySelector("[type=submit]");

            //Desabilita o borão submit 
            btn.disabled = true;

            let values = this.getValues();

            this.getPhoto().then(
                (content)=> {

                    values.photo = content;

                     this.addLine(values);

                    //Limpa os campos do Formulario
                     this.formEl.reset();

                     //Habilita o botao submit
                     btn.disabled = false;


                }, 
                (e)=> {

                    console.error(e);

                }
            );

                                            
         });
          
    }

    getPhoto(){


        return new Promise((resolve, reject)=>{

            let fileReader = new FileReader();

        let elements = [...this.formEl.elements].filter(item=> {

            if (item.name === 'photo'){
                return item;
            }
        });

        let file = elements[0].files[0];

        fileReader.onload = () =>{

            resolve(fileReader.result);

        };

        fileReader.onerror = (e)=> {

            reject(e);

        };

        if(file){
            fileReader.readAsDataURL(file);
        }else {
            resolve('dist/img/boxed-bg.jpg');
        }    

        });

        
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

            } else if (field.name == 'admin'){

                user[field.name] = field.checked;

            }else {

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
        
            tr.innerHTML = 
            `
                <td>
                    <img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm" />
                </td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
                <td>${Utils.dateFormat(dataUser.register)}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat">
                    Editar
                    </button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">
                    Excluir
                    </button>
                </td>
            `;
        

            // Vai colocar um texto, ele é comando HTML que precisa ser interpretado
            this.tableEl.appendChild(tr); 
            
        }
  
}