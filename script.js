async function mostrar() {
    const dados = await fetch("https://garcom.onrender.com/users").then(response => response.json());
    console.log(dados);
    const userList = document.getElementById("userList");
    userList.innerHTML = ""; 

    for (let i = 0; i < dados.length; i++) {
        const user = dados[i];
        const userDetails = document.createElement("p");
        userDetails.innerHTML = `NOME: ${user.name} - IDADE: ${user.age} ANOS - ID: ${user._id}`;
        userList.appendChild(userDetails);
    }
}

document.getElementById("userForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;

    try {
        const response = await fetch('https://garcom.onrender.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, age })
        });

        if (response.ok) {
            const user = await response.json();
            document.getElementById("result").innerHTML = `Usuário cadastrado com sucesso`;
            mostrar(); 
        } else {
            const errorData = await response.json();
            document.getElementById("result").innerHTML = `Erro: ${errorData.message}`;
        }
    } catch (error) {
        document.getElementById("result").innerHTML = `Erro ao enviar a solicitação: ${error.message}`;
    }
});

document.getElementById("deluser").addEventListener("submit", async function (event) {
    event.preventDefault();

    const id = document.getElementById("_id").value;

    try {
        const response = await fetch(`https://garcom.onrender.com/users/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });

        if (response.ok) {
            document.getElementById("result").innerHTML = `Usuário deletado com sucesso`;
            mostrar(); 
        } else {
            const errorData = await response.json();
            document.getElementById("result").innerHTML = `Erro: ${errorData.message}`;
        }
    } catch (error) {
        document.getElementById("result").innerHTML = `Erro ao enviar a solicitação: ${error.message}`;
    }
});

mostrar()