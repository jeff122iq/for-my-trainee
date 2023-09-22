const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.getElementById('addButton');
const mainUrl = 'http://localhost:7000'

const createListItem = (text, id) => {
    const li = document.createElement("li");
    li.innerHTML = text;

    const closeButton = createCloseButton(id);
    li.appendChild(closeButton);

    return li;
}

const createCloseButton = (id) => {
    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.className = "close";
    span.addEventListener("click", () => {
        deleteTask(id);
        const listItem = document.querySelector(`[data-id="${id}"]`);
        if (listItem) {
            listItem.remove();
        }
    });
    return span;
}

const createTask = async (text) => {
    try {
        const res = await fetch(`${mainUrl}/addCard`, {
            method: 'POST',
            body: JSON.stringify({ title: text }),
            headers: {
                'content-type': 'application/json'
            }
        })
        return await res.json();
    } catch (e) {
        console.log(e)
    }
}

const addTask = async () => {
    const taskText = inputBox.value.trim();

    if (taskText === "") {
        alert("You must write something!");
        return;
    }

    const data = await createTask(taskText);

    const listItem = createListItem(data.title);
    const closeButton = createCloseButton(data.id);

    closeButton.addEventListener("click", () => {
        listItem.remove();
    });

    listItem.appendChild(closeButton);
    listContainer.appendChild(listItem);
    inputBox.value = "";
}


const getAllTodo = async () => {
    try {
        const res = await fetch(`${mainUrl}/getCards`, {
            headers: {
                'content-type': 'application/json'
            }
        })

        const data = await res.json();

        data.forEach(item => {
            const listItem = createListItem(item.title);
            listContainer.appendChild(listItem);
            const closeButton = createCloseButton(data.id);

            closeButton.addEventListener("click", () => {
                listItem.remove();
            });

            listItem.appendChild(closeButton);
        });
    } catch (e) {
        console.log(e);
    }
}

const deleteTask = async (id) => {
    try {
        const res = await fetch(`${mainUrl}/deleteCard`, {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: {
                'content-type': 'application/json'
            }
        });
        return await res.json();
    } catch (e) {
        console.log(e);
    }
};

getAllTodo();

addButton.addEventListener('click', addTask);
