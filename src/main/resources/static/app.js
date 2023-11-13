getUsersTable();

async function findAllUsers() {
    let allUsers = await fetch('/api/users' );
    return allUsers;
}

function createRow(user) {
    let row = `<tr> <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.surname}</td>
                        <td>${user.age}</td>
                        <td>${user.username}</td>
                        <td>${user.roleSet.map((role)=>role.name)}</td>
                        <td>
                            <button type="button" data-userid="${user.id}" data-action="edit" class="btn btn-info text-white btn-sm edit-btn"
                            data-toggle="modal" data-target="#editmodal">Edit</button></td>
                        <td>
                            <button type="button" data-userid="${user.id}" data-action="delete" class="btn btn-danger btn-sm del-btn"
                            data-toggle="modal" data-target="#deletemodal">Delete</button></td>
                   </tr>`
    return row;
}

async function getUsersTable() {
    const usersList = document.querySelector('.usershow');
    let output = '';
    findAllUsers()
        .then(res => res.json())
        .then(data => {
            data.forEach(user => {
                output += createRow(user);
            })
            usersList.innerHTML = output;
        })
}

function getUserRolesForEdit() {
    let allRoles = [];
    $.each($("select[name='roles'] option:selected"), function() {
        let role = {};
        role.id = $(this).attr('id');
        role.name = $(this).attr('name');
        allRoles.push(role);
    });
    return allRoles;
}

$(document).on('click', '.edit-btn', async function() {
    const userId = $(this).attr('data-userid');
    await fetch('api/users/' + userId)
        .then(res => res.json())
        .then(user => {
            $('#id1').val(user.id);
            $('#name1').val(user.name);
            $('#surname1').val(user.surname);
            $('#age1').val(user.age);
            $('#username1').val(user.username);
            $('#password1').val(user.password);
            $('#role1').val(document.getElementById('role1').value = user.roleSet.map(role => role.id));
        })
})



$('#editbutton').on('click', (e) => {
    e.preventDefault();

    let userEditId = $('#id1').val();

    var editUser = {
        id: $("input[name='id1']").val(),
        name: $("input[name='name1']").val(),
        surname: $("input[name='surname1']").val(),
        age: $("input[name='age1']").val(),
        username: $("input[name='username1']").val(),
        password: $("input[name='password1']").val(),
        roles: getUserRolesForEdit()
    }
    console.log(editUser);


    fetch('/api/users', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editUser)
    }).then(async function (response) {
        let newRow = createRow(editUser);
        $('#mainTableWithUsers').find('#' + userEditId).replaceWith(newRow);
        $('#editmodal').modal('hide');
        getUsersTable();
        $('#userTable-tab').tab('show');
    })
});

$(document).on('click', '.del-btn', async function () {
    let userId = $(this).attr('data-userid');
    await fetch('api/users/' + userId)
        .then(res => res.json())
        .then(user => {
            $('#userid2').val(user.id);
            $('#name2').val(user.name);
            $('#surname2').val(user.surname);
            $('#age2').val(user.age);
            $('#username2').val(user.username);
            $('#password2').val(user.password);
            $('#role2').val(getUserRolesForEdit());
        })
});

$('#deletebutton').on('click', (e) => {
    e.preventDefault();
    let userId = $('#userid2').val();
    fetch('/api/users/' + userId, {
        method: 'DELETE',
    }).then(async function (response) {
        $('#mainTableWithUsers').find('#' + userId).replaceWith('');
        getUsersTable();
        $('#deletemodal').modal('hide');
        $('#userTable-tab').tab('show');
    })
});

function getUserRolesForAdd() {
    let allRoles = [];
    $.each($("select[name='newroles'] option:selected"), function() {
        let role = {};
        role.id = $(this).attr('value');
        role.role = $(this).attr('id');
        allRoles.push(role);
    });
    return allRoles;
}


$(".addnewuser").on('click', async function (e) {
    e.preventDefault();
    let newUser = {
        name: $("input[name='newname']").val(),
        surname: $("input[name='newsurname']").val(),
        age: $("input[name='newage']").val(),
        username: $("input[name='newusername']").val(),
        password: $("input[name='newpassword']").val(),
        roles: getUserRolesForAdd()
    }

    console.log(newUser.name + ' ' + newUser.username);


    await fetch('api/users', {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }).then(async function () {
        getUsersTable();
        $('#userTable-tab').tab('show');
    }).then(function () {
        $('#newname').empty().val('')
        $('#newsurname').empty().val('')
        $('#newage').empty().val('')
        $('#newusername').empty().val('')
        $('#newpassword').empty().val('')
        console.log("helloworld")
    })
})