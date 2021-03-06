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
	e.preventDefault();
	$.ajax({
		url: '/survey/new',
		type: 'POST',
		data: $('#new-survey').serialize(),
		dataType: 'json'
	}).done(function(data){
		var titleHtml = "<h1>" + data.title + "</h1><h2>By <a>@" + data.author + "</a></h2>"
		var questionHtml = "<div class='question'><form class='form-class' id='survey" + data.survey_id + "' action='/question/new' method='POST'><input type='hidden' name='survey_id' value='" + data.survey_id + "'><label for='text'>Question: </label><input type='text' name='text'><input type='submit' class='add-question' value='+ Add choices'></form></div>"
		var finishQuestionHtml = "<div id='submit-survey'><input id='finish-survey-button' type='submit' value='Finish Survey' data-survey_id='" + data.survey_id +"'></div>"
		$('#create-survey').css("display","none")
		$('.survey').css("display","none")
		$('.edit-container').prepend(titleHtml)
		$('.edit-container').append(questionHtml)
		$('.edit-container').after(finishQuestionHtml)
		$('#submit-survey').css("display","block")
	}).fail(function(){
		console.log("fail")
	}).always(function() {
		console.log("always")
	});
});

$('.edit-container').delegate(".add-question", "click", function(e) {
	e.preventDefault();
	$.ajax({
		url: '/question/new',
		type: 'POST',
		data: $('.form-class').last().serialize(),
		dataType: 'json'
	}).done(function(data){
		var anotherQuestionHtml = "<input type='submit' class='add-another-question' value='+ Add another question'>"
		$('.add-question').last().css("display","none")
		var choiceHtml = "<div class='choice'><form class='choice-form-class' action='/choice/new' method='POST'><input type='hidden' name='question_id' value='" + data.question_id + "'><label for='content'>Option: </label><input type='text' name='content'><input type='submit' class='add-choice' value='+ Add another choice'></form></div>"
		$('.question').append(choiceHtml)
		$('.question').after(anotherQuestionHtml)
	}).fail(function(){
		console.log("fail")
	}).always(function() {
		console.log("always")
	});
});

$('.edit-container').delegate(".add-another-question", "click", function(e) {
	e.preventDefault();
	$.ajax({
		url: '/anotherquestion',
		type: 'POST',
		data: $('.choice-form-class').last().serialize(),
		dataType: 'json'
	}).done(function(data){
		$('.add-another-question').last().css("display","none")
		var anotherQuestionHtml = "<input type='submit' class='add-another-question' value='+ Add another question'>"
		$('.add-question').last().css("display","none")
		var choiceHtml = "<div class='choice'><form class='choice-form-class' action='/choice/new' method='POST'><input type='hidden' name='question_id' value='" + data.question_id + "'><label for='content'>Option: </label><input type='text' name='content'><input type='submit' class='add-choice' value='+ Add another choice'></form></div>"
		$('.question').append(choiceHtml)
		$('.question').after(anotherQuestionHtml)
	}).fail(function(){
		console.log("fail")
	}).always(function() {
		console.log("always")
	});
});

$('.edit-container').delegate(".add-choice", "click", function(e) {
	e.preventDefault();
	$.ajax({
		url: '/choice/new',
		type: 'POST',
		data: $('.choice-form-class').last().serialize(),
		dataType: 'json'
	}).done(function(data){
		$('.add-choice').last().css("display","none")
		var choiceHtml = "<div class='choice'><form class='choice-form-class' action='/choice/new' method='POST'><input type='hidden' name='question_id' value='" + data.question_id + "'><label for='content'>Option: </label><input type='text' name='content'><input type='submit' class='add-choice' value='+ Add another choice'></form></div>"
		$('.question').append(choiceHtml)
	}).fail(function(){
		console.log("fail")
	}).always(function() {
		console.log("always")
	});
});

$(document).delegate("#finish-survey-button", "click", function(e) {
	window.location.href='/view/survey/' + this.attr('data-survey_id')
});