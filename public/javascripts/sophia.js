$(function () {

	//Capitalize
	String.prototype.capitalize = function() {
		return this[0].toUpperCase() + this.slice(1);
	};


	$('#search').submit(function (e) {

		var input = e.target.firstChild,
			inputValue = input.value,
			inputProcessed = inputValue.capitalize();

		e.preventDefault();


		$('html, body').animate({scrollTop: document.height}, 'fast');

		$('<div class="myBubble"><q>' + inputProcessed + '</q></div>')
			.appendTo('#bubbles')
			.queue(function(){
				input.value = '';
				$(this).dequeue();
			})
			.slideDown('fast', function () {

				this.style.overflow = '';

				$.get('/api/' + inputValue)
					.done(function (data) {
						var answer;

						if (data.answer === null) {
							answer = "I'm sorry, but I'm not yet able to answer this question.";
						} else if (data.answer === false) {
							answer = "Sorry, but I wasn't able to process your question.";
						} else {
							answer = data.answer;
						}

						if (data.type == 'string') {

							$('html, body').animate({scrollTop: document.height}, 'fast');
							$('<div class="sophiasBubble"><q>' + answer + '</q></div>')
								.appendTo($('#bubbles'))
								.slideDown('fast', function () {
									this.style.overflow = '';
								});
						}

					});

			});
	});

});