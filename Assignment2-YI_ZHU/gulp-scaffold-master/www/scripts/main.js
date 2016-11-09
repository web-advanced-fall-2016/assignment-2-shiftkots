
let modal = document.getElementById('myModal');
let span = document.getElementsByClassName("open")[0];
let infos = document.querySelectorAll('.info');
let names = document.querySelectorAll('.realname');


(function(){
	let URL = "http://148.75.251.185:8888"
	let content = document.querySelector('#name');
	let index = 0;
	let jqueryButton = document.querySelector('.external');
	let mainGrid = document.querySelector('#grid');
	
	mainGrid.addEventListener('click',function(evnt){
		if( evnt.target.classList.contains('realname')){
			
			$.ajax({
				method: "GET",
				url: URL+'/students/'+evnt.target.dataset.id,
			}).done(function(response){
				document.querySelector('#myModal .modalContent .name').innerText =  response.first_name + " " + response.last_name;
                let photo = document.querySelector('.photo');
                let image = document.createElement('img');
			    image.classList.add('image');
			    image.src = URL + response.profile_picture;
			    image.dataset.id = response.id;
                // var len = image.length;
                // alert(len);
                // for (var i = 0; i < len; i++) {
                //     if (image[i].className.toLowerCase() == "image") {
                //     photo.removeChild(image[i-1]);
                //     }
                // }
			    photo.appendChild(image);
                document.querySelector('#myModal .modalContent .exerpt').innerText =  response.excerpt;
				document.querySelector('#myModal .modalContent .email').innerText =  response.email;
				modal.style.display = "block";
			});
		}
		
	});

	$.ajax({ 
		url: URL+'/students',
		method: "GET"
	}).done(function(response){
		for (let i=0; i<response.length; i++){
			$.ajax({
				url: URL+'/students/'+response[i].id,
				method: "GET"
			}).done(function(response){
				
            //   document.querySelector('#grid .external .realname').innerText = response.first_name + " " + response.last_name;  
            let div = document.createElement('div');
			div.classList.add('external');
			let yname = document.createElement('h2');
			yname.classList.add('realname');
			yname.innerText =  response.first_name + " " + response.last_name;
			yname.dataset.id = response.id;
			div.appendChild(yname);

			mainGrid.appendChild(div);
        });
     }
    })
})();


span.addEventListener('click',function(){
 	modal.style.display = "none";
});

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
