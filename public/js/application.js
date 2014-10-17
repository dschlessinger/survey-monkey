$('#create-survey').on("click", function(e) {
	e.preventDefault();
	$.ajax({
		url: '/survey/new',
		type: 'GET'
	}).done(function(){
		$('.survey').css("display","block")
		$('#display-table').css("display","none")
	});
});

$('#create-survey-button').on("click", function(e) {
	console.log("test")
	e.preventDefault();
	$.ajax({
		url: '/survey/new',
		type: 'POST',
		data: $('#new-survey').serialize(),
		dataType: 'json'
	}).done(function(data){
		var titleHtml = "<h1>" + data.title + "</h1><h2>By <a>@" + data.author + "</a></h2>"
		var questionHtml = "<div class='question'><form class='form-class' id='survey" + data.survey_id + "' action='/question/new' method='POST'><input type='hidden' name='survey_id' value='" + data.survey_id + "'><label for='text'>Question: </label><input type='text' name='text'><input type='submit' class='add-question' value='+ Add choices'></form></div>"
		$('#create-survey').css("display","none")
		$('.survey').css("display","none")
		$('.edit-container').prepend(titleHtml)
		$('.edit-container').append(questionHtml)
	}).fail(function(){
		console.log("fail")
	}).always(function() {
		console.log("always")
	});
});

$('.add-question').on("click", function(e) {
	console.log("test test")
	e.preventDefault();
	$.ajax({
		url: '/question/new',
		type: 'POST',
		data: $('.form-class').last().serialize(),
		dataType: 'json'
	}).done(function(){
		console.log("somehow got here")
		// var titleHtml = "<h1>" + data.title + "</h1><h2>By <a href=''>@" + data.author + "</a></h2>"
		// var questionHtml = "<div class='question'><form action='/question/new' method='POST'><label for='name'>Question: </label><input type='hidden' name='survey_id' value='" + data.survey_id + "'><input type='text' name='name'></form><button class='add-question'>+ Add choices</button></div>"
		// $('#create-survey').css("display","none")
		// $('.survey').css("display","none")
		// $('.edit-container').prepend(titleHtml)
		// $('.edit-container').append(questionHtml)
	}).fail(function(){
		console.log("fail")
	}).always(function() {
		console.log("always")
	});
});