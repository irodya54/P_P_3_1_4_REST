$(async function () {
    await allUsers();
    await userTable()
});
const tableAllUsers = $('#tbodyAllUserTable');

async function allUsers() {
    tableAllUsers.empty()
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
                table.append(tableWithUsers);
            })
        })
}

let tableCurrentUser = $('#tbodyCurrentUser');
async function userTable() {
    tableCurrentUser.empty()
    fetch("http://localhost:8080/rest/user/")
        .then(res => res.json())
        .then(data => {
            data.valueOf(
                let tableUser =
            )
        })
}