let elementsIds = [] 
let elementsIdsCounter = -1;
let pickedElementId; 

//generate id for each element
function createElementId(tagName){
	++elementsIdsCounter;
	return tagName + '-' + elementsIdsCounter;
}

//save element inside pickedElementId when user click on it
function getElementToStyle(e){
    pickedElementId = e.target.id;
    showStylesBox();
}

//change the text input to textarea and oppisit when needed it >> after picking element
function appendTextArea(tag){
    $('#txt-input-place').html('');
    if(tag === 'p'){
        $('#txt-input-place').append('<label for= "crt-txt">Text</label>');
        $('#txt-input-place').append('<textarea id= "crt-txtinput"></textarea>');
    } else {
        $('#txt-input-place').append('<label for= "crt-txt">Text</label>');
        $('#txt-input-place').append('<input type= "text" id= "crt-txtinput" class= "input">'); 
    }
}

$('#crt-select').on('change', function(){
    appendTextArea($('#crt-select').val());
});

//create the element using form data
function createElement(e){
	e.preventDefault();
	let tag = $('#crt-select').val();
    let id= createElementId(tag);
    
    let txt = $('#crt-txtinput').val();
    console.log(txt)
	$('#ws-container').append(`<${tag} id= ${id} class= 'all'> ${txt} </${tag}>`);
	elementsIds.push(id); //push the element in elementsIds so user will be able to remove it later
	$(`.all`).on('click', getElementToStyle);
}

//call createElement on submit
$('#crt-form').on('submit', createElement);

function showStylesBox(){
    let pickedElement = $(`#${pickedElementId}`);
    console.log(pickedElement.css('text-align'));
    let elements = 
    `<div class= 'styl-form-elment'>
        <label>font color</label>
        <input type= 'color' id= 'styl-color' value='#000000'>
    </div>
    <div class= 'styl-form-elment'>
        <label>background color</label>
        <input type= 'color' id= 'styl-backgroun-color' value='#FFFFFF'>
    </div>
    <div class= 'styl-form-elment'>
        <label>font size</label>
        <input type= 'number' id= 'styl-fontSize' step= '1' class= 'inp-num' value= '${parseInt(pickedElement.css('fontSize'))}'>
    </div>
    <div class= 'styl-form-elment'>
        <label>margin</label>
        <input type= 'number' id= 'margin-top' step= '1' class= 'inp-num' value= '${parseInt(pickedElement.css('margin-top'))}'>
        <input type= 'number' id= 'margin-right' step= '1' class= 'inp-num' value= '${parseInt(pickedElement.css('margin-right'))}'>
        <input type= 'number' id= 'margin-bottom' step= '1' class= 'inp-num' value= '${parseInt(pickedElement.css('margin-bottom'))}'>
        <input type= 'number' id= 'margin-left' step= '1' class= 'inp-num' value= '${parseInt(pickedElement.css('margin-left'))}'>
    </div>
    <div class= 'styl-form-elment'>
        <label>padding</label>
        <input type= 'number' id= 'padding-top' step= '1' class= 'inp-num' value= '${parseInt(pickedElement.css('padding-top'))}'>
        <input type= 'number' id= 'padding-right' step= '1' class= 'inp-num' value= '${parseInt(pickedElement.css('padding-right'))}'>
        <input type= 'number' id= 'padding-bottom' step= '1' class= 'inp-num' value= '${parseInt(pickedElement.css('padding-bottom'))}'>
        <input type= 'number' id= 'padding-left' step= '1' class= 'inp-num' value= '${parseInt(pickedElement.css('padding-left'))}'>
    </div>
    <div class= 'styl-form-elment'>
        <label>align</label>
        <select class= 'input' id= 'crt-align-select'>
            <option value= 'center' ${pickedElement.css('text-align') == 'center' ? 'selected' : ''} >center</option>
            <option value= 'start' ${pickedElement.css('text-align') == 'start' ? 'selected' : ''}  >start</option>
            <option value= 'end'  ${pickedElement.css('text-align') == 'end' ? 'selected' : ''} >end</option>
        </select>
    </div>
    <button class= 'btn btn-styl'>implement</button>`;
    let elementsDom = $(elements);
    $('#styl-form').html('');
    $('#styl-form').append(elementsDom);
}
//style the picked element in pickedElementId variable
function styleElement(e){
	e.preventDefault();
	let fontSize = $('#styl-fontSize').val();	
    let color = $('#styl-color').val();
    let align = $('#crt-align-select').val();
    let background_color = $('#styl-backgroun-color').val();
	let margin_top = $('#margin-top').val();
	let margin_right = $('#margin-right').val();
	let margin_bottom = $('#margin-bottom').val();
    let margin_left = $('#margin-left').val();
    
	$(`#${pickedElementId}`).css({
        'fontSize': fontSize + 'px',
        'background-color': background_color,
        'text-align': align,
        'color': color,
        'margin-top': margin_top + 'px',
        'margin-right': margin_right + 'px',
        'margin-bottom': margin_bottom + 'px',
        'margin-left': margin_left + 'px'
	});
}

//call styleElement when form style submit
$('#styl-form').on('submit', styleElement);

//remove last added element >> 
//todo: add listner for command + z
$('#btn').on('click', function(){
	$(`#${elementsIds[elementsIds.length-1]}`).remove();
	elementsIds.pop();
});



