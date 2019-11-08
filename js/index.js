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
    unselect();
    pickedElementId = e.target.id;
    showStylesBox();
    $('#'+pickedElementId).css({'border': '1px solid blue'});
}

function appendFontsIn(id, pickedElement){
    fonts.map(function(element){
        $('#'+id).append(`<option value= ${element}  ${pickedElement.css('font-family') == element ? 'selected' : ''} >${element}</option>`)
    });
}

appendFontsIn('crt-bdy-font-family-select', $(`#${pickedElementId}`));


//change the text input to textarea and oppisit when needed it >> after picking element
//now it works with images too
function appendTextArea(tag){
    $('#txt-input-place').html('');
    if(tag === 'p'){
        $('#txt-input-place').append('<label for= "crt-txtinput">Text</label>');
        $('#txt-input-place').append('<textarea id= "crt-txtinput"></textarea>');
    } else if (tag === 'img'){
        $('#txt-input-place').append('<label for= "crt-txtinput">image link</label>');
        $('#txt-input-place').append('<input id= "crt-txtinput" type= "text">');
    } else {
        $('#txt-input-place').append('<label for= "crt-txtinput">Text</label>');
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
    if(tag === 'img'){
        $('#ws-container').append(`<${tag} id= ${id} src= ${txt} class= 'all'>`)
    } else {
        $('#ws-container').append(`<${tag} id= ${id} class= 'all'> ${txt} </${tag}>`);
    }
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
        <div>
            <input type= 'number' id= 'margin-top' step= '1' class= 'inp-num' value= '${parseInt(pickedElement.css('margin-top'))}'>
            <input type= 'number' id= 'margin-right' step= '1' class= 'inp-num' value= '${parseInt(pickedElement.css('margin-right'))}'>
            <input type= 'number' id= 'margin-bottom' step= '1' class= 'inp-num' value= '${parseInt(pickedElement.css('margin-bottom'))}'>
            <input type= 'number' id= 'margin-left' step= '1' class= 'inp-num' value= '${parseInt(pickedElement.css('margin-left'))}'>
        </div>
    </div>
    <div class= 'styl-form-elment'>
        <label>padding</label>
        <div>
            <input type= 'number' id= 'padding-top' step= '1' class= 'inp-num' value= '${parseInt(pickedElement.css('padding-top'))}'>
            <input type= 'number' id= 'padding-right' step= '1' class= 'inp-num' value= '${parseInt(pickedElement.css('padding-right'))}'>
            <input type= 'number' id= 'padding-bottom' step= '1' class= 'inp-num' value= '${parseInt(pickedElement.css('padding-bottom'))}'>
            <input type= 'number' id= 'padding-left' step= '1' class= 'inp-num' value= '${parseInt(pickedElement.css('padding-left'))}'>
        </div>
    </div>
    <div class= 'styl-form-elment'>
        <label>width</label>
        <input type= 'number' id= 'width' step= '1' class= 'inp-num' value= '${parseInt(pickedElement.css('width'))}'>
    </div>
    <div class= 'styl-form-elment'>
        <label>height</label>
        <input type= 'number' id= 'height' step= '1' class= 'inp-num' value= '${parseInt(pickedElement.css('height'))}'>
    </div>
    <div class= 'styl-form-elment'>
        <label>align</label>
        <select class= 'input' id= 'crt-align-select'>
            <option value= 'center' ${pickedElement.css('text-align') == 'center' ? 'selected' : ''} >center</option>
            <option value= 'start' ${pickedElement.css('text-align') == 'start' ? 'selected' : ''}  >start</option>
            <option value= 'end'  ${pickedElement.css('text-align') == 'end' ? 'selected' : ''} >end</option>
        </select>
    </div>
    <div class= 'styl-form-elment'>
        <label>font family</label>
        <select id= 'crt-font-family-select'></select>
    </div>
    <div class= 'styl-form-elment'>
        <label>display</label>
        <select id= 'crt-display-select'>
            <option value= 'inline' ${pickedElement.css('display') == 'inline' ? 'selected' : ''} >inline</option>
            <option value= 'block' ${pickedElement.css('display') == 'block' ? 'selected' : ''} >block</option>
            <option value= 'inline-block' ${pickedElement.css('display') == 'inline-block' ? 'selected' : ''} >inline-block</option>
        </select>
    </div>`;

    let elementsDom = $(elements);
    $('#styl-form').html('');
    $('#styl-form').append(elementsDom);
    appendFontsIn('crt-font-family-select', pickedElement);

    $('#styl-color').on('change', function(){
        let color = $('#styl-color').val();
        $(`#${pickedElementId}`).css({
            'color': color
        });
    });

    $('#styl-backgroun-color').on('change', function(){
        let background_color = $('#styl-backgroun-color').val();
        $(`#${pickedElementId}`).css({
            'background-color': background_color,
        });
    });

    $('#styl-fontSize').on('change', function(){
        let fontSize = $('#styl-fontSize').val();	
        $(`#${pickedElementId}`).css('fontSize', fontSize + 'px');
    });

    $('#crt-align-select').on('change', function(){
        let align = $('#crt-align-select').val();
        $(`#${pickedElementId}`).css('text-align', align);
    });

    $('#margin-top').on('change', function(){
        let margin_top = $('#margin-top').val();
        $(`#${pickedElementId}`).css('margin-top', margin_top + 'px');
    });

    $('#margin-right').on('change', function(){
        let margin_right = $('#margin-right').val();
        $(`#${pickedElementId}`).css('margin-right', margin_right + 'px');
    });

    $('#margin-bottom').on('change', function(){
        let margin_bottom = $('#margin-bottom').val();
        $(`#${pickedElementId}`).css('margin-bottom', margin_bottom + 'px');
    });

    $('#margin-left').on('change', function(){
        let margin_left = $('#margin-left').val();
        $(`#${pickedElementId}`).css('margin-left', margin_left + 'px');
    });

    $('#padding-top').on('change', function(){
        let padding_top = $('#padding-top').val();
        $(`#${pickedElementId}`).css('padding-top', padding_top + 'px');
    });

    $('#padding-right').on('change', function(){
        let padding_right = $('#padding-right').val();
        $(`#${pickedElementId}`).css('padding-right', padding_right + 'px');
    });

    $('#padding-bottom').on('change', function(){
        let padding_bottom = $('#padding-bottom').val();
        $(`#${pickedElementId}`).css('padding-bottom', padding_bottom + 'px');
    });

    $('#padding-left').on('change', function(){
        let padding_left = $('#padding-left').val();
        $(`#${pickedElementId}`).css('padding-left', padding_left + 'px');
    });

    $('#crt-font-family-select').on('change', function(){
        let fontFamily = $('#crt-font-family-select').val();
        $(`#${pickedElementId}`).css('font-family', fontFamily)
    });

    $('#crt-display-select').on('change', function(){
        let display = $('#crt-display-select').val();
        $(`#${pickedElementId}`).css('display', display)
    });

    $('#width').on('change', function(){
        let width = $('#width').val();
        $(`#${pickedElementId}`).css('width', width + 'px',)
    });
    
    $('#height').on('change', function(){
        let height = $('#height').val();
        $(`#${pickedElementId}`).css('height', height + 'px',)
    });
}

function hideStyleBox(){
    $('#styl-form').html('');
}

//remove last added element >> 
//todo: add listner for command + z
$('#btn-removeLastElement').on('click', function(){
	$(`#${elementsIds[elementsIds.length-1]}`).remove();
	elementsIds.pop();
});

$('#crt-bdy-form').on('submit', function(e){
    e.preventDefault();
});

//change backgroun color
$('#crt-bdy-backgroun-color').on('change', function(){
    let color = $('#crt-bdy-backgroun-color').val();
    $('#ws-container').css('background-color', color);
});

$('#crt-bdy-font-family-select').on('change', function(){
    let font = $('#crt-bdy-font-family-select').val();
    $('#ws-container').css('font-family', font)
});

$('#crt-bdy-font-color').on('change', function(){
    let color = $('#crt-bdy-font-color').val();
    $('#ws-container').css('color', color);
});

$('#btn-crt-bdy-bg-img').on('click', function(){
    let src = $('#crt-bdy-bg-img-src').val();
    $('#ws-container').css({
        'background-image': `url("${src}")`,
        'background-size': 'cover'
    });
});

function unselect(){
    $('#'+pickedElementId).css({'border': 'none'});
    pickedElementId = undefined;
    hideStyleBox();
}

$('#btn-unselect').on('click', unselect);

function toggleCrtContainer(){
    if($('#crt-container').css('display') === 'none'){
        $('#crt-container').show();
        $('#toggle-crt-container').html('-');
    } else {
        $('#crt-container').hide();
        $('#toggle-crt-container').html('+');
    }
}

$('#toggle-crt-container').on('click', toggleCrtContainer);

