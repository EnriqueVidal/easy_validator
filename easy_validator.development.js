$.fn.easy_validator  = function() {
	// Create labels for textual alerts
  	$('.validatable').append(function() {
    	cssClass = this.id;
    	$(this).after('<label class="' + cssClass + '"></label>');
  	});

  // Let's start validating
	$('.presence_validation').each(function() {
		$(this).focusout(function() {
			if ($(this).val() == ''){
				$( '.' + this.id ).text("You need to fill out this field!");
			} else {
				$( '.' + this.id ).text("");
			}
		});
	});
	
	// Validates emails against a general email regular expression
	$('.email_validation').each(function() {
		$(this).focusout(function() {
			if ( !$(this).val().match(/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) ){
				$( '.' + this.id ).text("This is not a valid email!");
			} else {
				$( '.' + this.id ).text("");
			}
		});
	});
	
	$('.phone_validation').each(function(){
		$(this).keypress(function(e) {
			return validates_numericality(e, this);
		});
	});
	
	$('.numericality_validation').each(function(){
		$(this).keypress(function(e) {
			return validates_numericality(e, this);
		});
	});

	$('.length_validation').each(function(){
		$(this).keypress(function(e){
			return validates_length(e, this);
		});
	});
	
	$('.custom_validation').each(function(){
		$(this).keypress(function(e) {
			return custom_validation(e, this);
		});
	});
}

// Validates the currently typed char in the input agains the expression in data-expression for that element
function custom_validation(e, element)
{
	var key;
	var kerychar;
	var numcheck;
	
	if ( window.event ) key = e.keyCode; //IE
	else if ( e.which ) key = e.which; //Netscape/Firefox/Opera
	
	if (key == 8 || key == 32 || key == undefined) return true;
	
	if ( element.getAttribute("data-expression") != null )
	{
		keychar 	= String.fromCharCode(key);
		numcheck 	= new RegExp(element.getAttribute("data-expression"));
		return numcheck.test(keychar);
	}
	return true;
}

// Validates the size of the length in the current element being typed
function validates_length(e, element)
{
	var key;
	
	if (element.getAttribute("data-min-length") != null && element.value.length < element.getAttribute("data-min-length")) 
		$('.' + element.id).text("You need to to write at least " + element.getAttribute("data-min-length") + " characters.");
	else
		$('.' + element.id).text("");
	
	if ( window.event ) key = e.keyCode; //IE
	else if ( e.which ) key = e.which; //Netscape/Firefox/Opera
	
	if (key == 8 || key == 32 || key == undefined) return true;
	if ( element.getAttribute("data-max-length") != null )
		return ( element.value.length < element.getAttribute("data-max-length") ) ? true : false;
	return true;
}

//It forces the user to only write numbers in the element by suppresing the rest of the keys on every keypress event
function validates_numericality(e, element)
{
	var key;
	var kerychar;
	var numcheck;
	
	if ( window.event ) key = e.keyCode; //IE
	else if ( e.which ) key = e.which; //Netscape/Firefox/Opera
	
	if (key == 8 || key == 32 || key == undefined) return true;
	
	keychar 	= String.fromCharCode(key);
	numcheck 	= /^\d+$/;
	
	if ( element.getAttribute("data-length") != null )
		return ( element.value.length < element.getAttribute("data-length") ) ? numcheck.test(keychar) : false;
	return numcheck.text(keychar);
}
