
// Заполнение страницы All users

$(async function () {
    await getAllUsers()
});

const allUsersTable = $('#tableAllUsers');

async function getAllUsers() {
    allUsersTable.empty()
    fetch("http://localhost:8080/rest/")
        .then(res => res.json())
        .then(data => {
            data.forEach(user => {
                let tableWithUsers = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.surName}</td>
                            <td>${user.age}</td>
                            <td>${user.username}</td>
                            <td>${user.roles.map(role => " " + role.role)}</td>
                            <td>
                                <button type="button" class="btn btn-info" data-toggle="modal" id="buttonEdit"
                                data-action="edit" data-id="${user.id}" data-target="#edit">Edit</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" data-toggle="modal" id="buttonDelete"
                                data-action="delete" data-id="${user.id}" data-target="#delete">Delete</button>
                            </td>
                        </tr>)`;
                allUsersTable.append(tableWithUsers);
            })
        })
}

// Заполнение страницы User
$(async function () {
    await showCurrentUser()
});

const currentUserTable = $('#currentUserTable');

async function showCurrentUser() {
    currentUserTable.empty()
    fetch("http://localhost:8080/rest/user")
        .then(res => res.json())
        .then(user => {
                let data = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.surName}</td>
                            <td>${user.age}</td>
                            <td>${user.username}</td>
                            <td>${user.roles.map(role => " " + role.role)}</td>
                        </tr>)`;
                $('#currentUserTable').append(data)
            })
}

// Создание нового пользователя
// const url = 'http://localhost:8080/rest/';
// const data = { username: 'example' };
//
// try {
//     const response = await fetch(url, {
//         method: 'POST', // или 'PUT'
//         body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     const json = await response.json();
//     console.log('Успех:', JSON.stringify(json));
// } catch (error) {
//     console.error('Ошибка:', error);
// }



