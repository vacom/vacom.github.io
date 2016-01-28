Parse.initialize("dnUsGbEua5DBpso6GBOne46156OZYEtvcy8U8MbW", "fzpnrC6JYSbCCSQN6PvgcXimhsGz7bMEeBwmtMxq");
   
   
//funcão para recolher o ID do utilizador com sessão iniciada
function getcurrentUserID(){

    var currentUserID = Parse.User.current();
        if(currentUserID){
            return currentUserID.id;
        }
}



// verifica se o user esta com sessão iniciada
function verificarLogin(){
    var currentUserName = Parse.User.current();
        if (!currentUserName) {
            userLogout();
        }
}

function sessaoiniciada(){

    var currentUserName = Parse.User.current();
    if (currentUserName) {
        return true;
    }else{
        return false;
    }
}


//O utilizaddor faz logout
function userLogout(){
    Parse.User.logOut();
    console.log("logout");
}


//função para recolher a lista de classificação
function getRank(){

    var quadratic = Parse.Object.extend("ranks");
    var getRank = new Parse.Query(quadratic);
    
    getRank.descending("pontos");
    getRank.find({
        success: function(results) {

            if(results.length !== 0){

                    var list = "";
                    var cont = 1;

                    for (var i = 0; i < results.length; i++) {
                            var objectSearch = results[i];
                            list +='<tr>'+
                                '<th scope="row">'+cont+'</th>'+
                                '<td>'+objectSearch.get('nome')+'</td>'+
                                '<td>'+objectSearch.get('pontos')+'</td></tr>';
                                
                                cont = cont + 1;
                        }

                    $('#tbody').html(list);
            }else{
                console.log('Erro: Não foi encontrado nenhuma classificação');
            }
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });

}





//função para adicionar um novo ou existente rank
function addRank(value){
    var quadratic = Parse.Object.extend("ranks");
    var addRank = new Parse.Query(quadratic);
    var pontos = value;
    
    addRank.equalTo("userId", getcurrentUserID());
        addRank.first({
            success: function(object) {
                if(object == undefined){
                   newRank(pontos);
                }else{
                    if(object.length !== 0){
                        object.set("pontos", pontos);
                        object.save();
                    }
                }
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });

}


function newRank(value){
    var quadratic = Parse.Object.extend("ranks");
    var addRank = new quadratic();
    var pontos = value;
    
    addRank.set("userId", getcurrentUserID());
    addRank.set("nome", nomePerfilSrc);
    addRank.set("pontos", pontos);

    addRank.save(null, {
        success: function(sucess) {
            console.log("guardado com sucesso")
        },
        error: function(res, error) {
            console.log("erro em guardar")
        }
    });
}


//Para dev

$("#estado").html(sessaoiniciada());
$("#userid").html(getcurrentUserID());





   
 
   

   
   
   
