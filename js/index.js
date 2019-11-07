let elementsIds = []
let elementsIdsCounter = -1;

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
	$(`.all`).on('click', getElementToStyle);
}

$('#crt-form').on('submit', createElement);




