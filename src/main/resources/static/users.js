// Заполнение страницы All users

$(async function () {
    await getAllUsers();
    showCurrentUser();
});

const allUsersTable = $('#tableAllUsers');

async function getAllUsers() {
    allUsersTable.empty()
    fetch("http://localhost:8080/rest/")
        .then(res => res.json())
        .then(res => {
            res.forEach(user => {
                let tableWithUsers = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.surName}</td>
                            <td>${user.age}</td>
                            <td>${user.username}</td>
                            <td>${user.roles.map(role => " " + role.role)}</td>
                            <td>
                                <button type="button" class="btn btn-info" data-bs-toggle="modal" id="buttonEdit"
                                data-action="edit" data-bs-id="${user.id}" data-bs-target="#modalEdit">Edit</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" data-bs-toggle="modal" id="buttonDelete"
                                 data-action="delete" data-id="${user.id}" data-bs-target="#modalDelete">Delete</button>
                            </td>
                        </tr>)`;

                allUsersTable.append(tableWithUsers);
            })
        })
}


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
const formForNewUser = document.getElementById("formNewUser")
formForNewUser.addEventListener('submit', getFormValue);

async function getFormValue(event) {
    event.preventDefault();

    //вытаскиваем роли из формы
    const userFormAuthorities = formForNewUser.querySelector('#roles')
    const currentRoles = userFormAuthorities.selectedOptions
    let newUserRoles = [];

    for (let i = 0; i < currentRoles.length; i++) {
        console.log(i)
        newUserRoles.push({
            id: currentRoles.item(i).value,
            name: currentRoles.item(i).text
        })
    }

    // Отправляем запрос
    fetch("http://localhost:8080/rest/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formForNewUser.name.value,
            surName: formForNewUser.surName.value,
            age: formForNewUser.age.value,
            userName: formForNewUser.userName.value,
            password: formForNewUser.password.value,
            active: formForNewUser.isActive.value,
            roles: newUserRoles
        })
    })
        .then(() => {
            formForNewUser.reset();
            getAllUsers();
            $('#allUsers-tab').click();
        })

}

// модали

// Получение пользователя по ID
async function getUser(id) {
    let url = "http://localhost:8080/rest/" + id;
    let response = await fetch(url);
    return await response.json();
}
// ИЗменение пользователя
$('#modalEdit').on('show.bs.modal', function (event) {

    let userEditID = event.relatedTarget.getAttribute('data-bs-id')
    let form = document.querySelector('#formEdit')
    form.reset()
    let selectRole = document.getElementById('editRoles')
        // Заполнение формы
    let user = getUser(userEditID)
        .then(user => {
            form.idEdit.value = user.id
            form.name.value = user.name
            form.surName.value = user.surName
            form.age.value = user.age
            form.password.value = user.password
            form.userName.value = user.userName
            form.isActive.value = user.active

            for (let option of selectRole.options) {
                for (let i = 0; i < user.roles.length; i++) {
                    if (parseInt(option.value) === user.roles[i].id) {
                        option.selected = true
                    }
                }
            }
        })

        // Отправка формы
    form.addEventListener('submit', function (ev) {
        ev.preventDefault()
        // Считывание ролей
        const userFormEditRole = document.querySelector('#editRoles')
        const currentRoles = userFormEditRole.selectedOptions
        let editRoles = [];

        for (let i = 0; i < currentRoles.length; i++) {
            editRoles.push({
                id: currentRoles.item(i).value,
                name: currentRoles.item(i).text
            })
        }
        // Отправка запросса на изменение
        fetch("http://localhost:8080/rest/", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: form.idEdit.value,
                name: form.name.value,
                surName: form.surName.value,
                age: form.age.value,
                userName: form.userName.value,
                password: form.password.value,
                active: form.isActive.value,
                roles: editRoles

            })

        }).then(() => {
            $("#modalEdit").modal("hide")
            getAllUsers()
        })
    })
})


