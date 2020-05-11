let counter = 1;

let patterns = {
    enterpName: /^[\w ]{1,15}$/,
    price: /^\d{1,3}$/
}

const inputs = document.querySelectorAll('input');

let diagrams = document.getElementById('diagrams');
let items = document.getElementById('items');
let form = document.getElementById('addForm');
let diagramContainer = document.getElementById('diagrams');

// Validation function 
const validate = (field, regex) => {
    if(regex.test(field.value)) {
        console.log(true);
        field.style.borderColor = '#36cc36';
    }
    else {
        field.style.borderColor = '#CC0000';
        console.log(false);
    }
}
// Attach validation
inputs.forEach(inp => {
    inp.addEventListener('keyup', e => {
        validate(e.target, patterns[e.target.attributes.name.value]);
    });
});

form.addEventListener('submit', e => {
    e.preventDefault();

    let nameColor = document.getElementById('enterpr').style.borderColor;
    let priceColor = document.getElementById('price').style.borderColor;
    console.log(nameColor);
    if(nameColor === 'rgb(204, 0, 0)' || priceColor === 'rgb(204, 0, 0)') {
        alert('Invalid name or price.');
        return;
    }
    let newEnterprText = document.getElementById('enterpr').value;
    let newPriceText = document.getElementById('price').value;

    let newLi = document.createElement('li');
    let newDiv = document.createElement('div');
    let newEnterprSpan = document.createElement('span');
    let newPriceSpan = document.createElement('span');

    newEnterprSpan.appendChild(document.createTextNode(newEnterprText));
    newPriceSpan.appendChild(document.createTextNode(newPriceText));

    newEnterprSpan.classList = 'name-span';
    newPriceSpan.classList = 'price-span';

    newEnterprSpan.setAttribute('contenteditable', 'true');
    newPriceSpan.setAttribute('contenteditable', 'true');

    newLi.className = 'list-group-item';
    newLi.appendChild(newEnterprSpan);
    newLi.appendChild(newPriceSpan);
    newLi.setAttribute('data-counter', counter);
    
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.appendChild(document.createTextNode('Видалити'));

    newLi.appendChild(deleteBtn);

    items.appendChild(newLi);
    
    //Add diagram
    newDiv.appendChild(document.createTextNode(newEnterprText));
    newDiv.classList = 'diagram';
    newDiv.setAttribute('data-counter', counter);
    newDiv.setAttribute('data-price', newPriceText);
    newDiv.setAttribute('data-name', newEnterprText);
    newDiv.style.height = `${newPriceText * 5}px`;
    let toolTipSpan = document.createElement('span');
    toolTipSpan.classList = 'tooltip';
    newDiv.setAttribute('onmouseover', 'show(this)');
    newDiv.setAttribute('onmouseout', 'hide(this)');

    diagramContainer.appendChild(newDiv);
    counter++;

    document.getElementById('enterpr').value = null;
    document.getElementById('price').value = null;

});

function show(e){
    e.textContent = e.getAttribute('data-price');
}

function hide(e){
    e.textContent = e.getAttribute('data-name');
}

items.addEventListener('click', e => {
    let localCounter = e.target.parentNode.getAttribute('data-counter');
    if(e.target.classList.contains('delete-btn')){
        if(confirm('Are you sure?')){
            let li = e.target.parentElement;
            items.removeChild(li);
        }
        let diagramArr = Array.from(document.getElementsByClassName('diagram'));
        let diagrToDelete;
        diagramArr.forEach(elem => {
            if(elem.getAttribute('data-counter') === localCounter) {
                diagrToDelete = elem;
            }
        });
        diagrToDelete.parentElement.removeChild(diagrToDelete);
    }
    if(e.target.tagName === 'LI') return;
    
    let childn = Array.from(e.target.parentElement.childNodes);
    // childn.forEach(e => console.log(e.tagName));
    let filtered = childn.filter(element => {
        return element.tagName == 'SPAN';
    });
    console.log(filtered);
    filtered.forEach(element => {
        element.addEventListener('keyup', ev => {
            let editibleDiagrArr = Array.from(document.getElementsByClassName('diagram'));
            console.log(filtered[0].textContent);
            console.log('keyup');
            editibleDiagrArr[localCounter - 1].setAttribute('data-name', filtered[0].textContent);
            editibleDiagrArr[localCounter - 1].setAttribute('data-price', filtered[1].textContent);
            editibleDiagrArr[localCounter - 1].style.height = `${filtered[1].textContent * 5}px`;
        });
    });
});

