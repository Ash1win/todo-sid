
async function getTodos() {
    
    const todos = await axios.get('http://localhost:3000/listtodos')
    const htmlList = document.getElementById('list');

    const elements = [];

    todos.data.map(todo => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.innerHTML = todo.description;
        const button = document.createElement('button');
        button.innerText = 'delete';
        button.addEventListener('click', () => {
            deleteTodo(todo._id);
        })
        // li.innerText = todo.description;
        li.appendChild(span);
        li.appendChild(button);
        htmlList.appendChild(li);
        console.log(todo)
    })
}

getTodos()

function clearList() {
    const htmlList = document.getElementById('list');
    htmlList.innerHTML = ''
}

async function addTodo() {
    const inputText = document.getElementById('inpt').value;
    const result = await axios.post('http://localhost:3000/addtodo', { description: inputText });
    console.log(result);
    clearList()
    getTodos()
}

async function deleteTodo(id) {
    const result = await axios.delete(`http://localhost:3000/deletetodos/${id}`)
    clearList()
    getTodos()
    console.log(result);
}