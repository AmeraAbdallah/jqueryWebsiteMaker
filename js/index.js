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
}

//create the element using form data
function createElement(e){
	e.preventDefault();
	let tag = $('#crt-select').val();
	let id= createElementId(tag);
	let txt = $('#crt-txt').val();
	$('body').append(`<${tag} id= ${id} class= 'all'> ${txt} </${tag}>`);
	elementsIds.push(id); //push the element in elementsIds so user will be able to remove it later
	$(`.all`).on('click', getElementToStyle);
}

//call createElement on submit
$('#crt-form').on('submit', createElement);

//style the picked element in pickedElementId variable
function styleElement(e){
	e.preventDefault();
	let fontSize = $('#styl-fontSize').val();	
	let color = $('#styl-color').val();
	let margin_top = $('#margin-top').val();
	let margin_right = $('#margin-right').val();
	let margin_bottom = $('#margin-bottom').val();
    let margin_left = $('#margin-left').val();
    
	$(`#${pickedElementId}`).css({
		'fontSize': fontSize + 'px',
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


