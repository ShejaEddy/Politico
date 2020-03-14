const el = (query) => document.querySelector(query);
el(".close-profile").addEventListener("click", () => {
  el(".candidate-profile").style.display = "none";
});
(()=>{
	el('#politicians').classList.add('active-link');
	elAll(".card").forEach(el=>el.addEventListener('click',()=>window.location.href = "candidates.html"))
	if(el('.create-new-party')) el('.create-new-party').addEventListener('submit',(e)=>{
		e.preventDefault();
	})
	if(el('#upload')) el('#upload').addEventListener('click',(e)=>{
		el('#logo-input').click();
	})

	const div = el('#politicians-list');
	let id;
	const politicians = [
		{ name: 'Sheja Eddy', office: 'President of the nation', party: 'FPR INKOTANYI', logo: `../img/avatar.png`, phoneNumber:'07843456543', nId: '2345678998766'},
		{ name: 'Nshuti Aimable', office: 'Minister of health', party: 'GREEN PARTY', logo: `../img/avatar.png`, phoneNumber:'07843456543', nId: '2345678998766'},
		{ name: 'Karasira Blaise', office: 'Federal Judge', party: 'FPR INKOTANYI', logo: `../img/avatar.png`, phoneNumber:'07843456543', nId: '2345678998766'},
		{ name: 'Nkurunziza Jean Batiste', office: 'Minister of defense', party: 'GREEN PARTY', logo: `../img/avatar.png`, phoneNumber:'07843456543', nId: '2345678998766'},
		{ name: 'Kimiti Hero', office: 'Refer of wealth', party: 'FPR INKOTANYI', logo: `../img/avatar.png`, phoneNumber:'07843456543', nId: '2345678998766'}
	];
	const setDOM = (data) => {
		let html = '';
		for(let i=0; i<data.length; i++){
		html += ` <div class="list" id="list-${i}">
                  <div class="user-data">
                    <div class="profile" style="background-image: url(${data[i].logo})"></div>
                  <div class="details">
                    <p class="name">${data[i].name}</p>
                    <p class="bio">${data[i].party} | ${data[i].office}</p>
                  </div>
                  </div>
                  <div class="options">
                    <i class="fas fa-pen update" id="update-${i}" onclick="event.cancelBubble=true"></i>
                    <i class="fas fa-trash delete ml-1" id="delete-${i}" onclick="event.cancelBubble=true"></i>
                  </div>
                </div>`
		}
		div.innerHTML = html;
		elAll('.update').forEach(r=>{
		r.addEventListener('click', (e)=>{
			id = e.target.getAttribute('id').replace('update-','');
			el('.update-profile').style.backgroundImage = `url(${politicians[id].logo})`;
			el('.update-name').value = politicians[id].name;
			el('.update-party').value = politicians[id].party;
			el('.update-office').value = politicians[id].office;
			el('.update-phoneNumber').value = politicians[id].phoneNumber;
			el('.update-nId').value = politicians[id].nId;
			openModal('update-modal');
			})
		})
		  elAll(".list").forEach(r => {
        r.addEventListener("click", e => {
          el(".candidate-profile").style.display = "block";
          if (el("#body")) el("#body").style.display = "flex";
        });
      });
		elAll('.delete').forEach(r=>{
			r.addEventListener('click', (e)=>{
				id = e.target.getAttribute('id').replace('delete-','');
				openModal('delete-modal')
			})
		})
	}
	setDOM(politicians);
	let image;
	el('.update-upload').addEventListener('click', ()=>{
		el('#logo-input').click();
		el('#logo-input').addEventListener('change', (e)=>{
		  const target = e.target.files[0];
	      if (!target.type.includes("image/")) {
	        alert("Please select an image file");
	        return;
	      };
	      image = URL.createObjectURL(target);
	      el('.create').disabled = false;
        el('.update-profile').style.backgroundImage = `url(${image})`;
      })
	});
	el('.update-name').addEventListener('input',(e)=>{
		if(e.value != politicians[id].name) el('.create').disabled = false;
	})
	el('.update-party').addEventListener('change',(e)=>{
		if(e.value != politicians[id].party) el('.create').disabled = false;
	})
	el('.update-office').addEventListener('change',(e)=>{
		if(e.value != politicians[id].office) el('.create').disabled = false;
	})
	el('.update-phoneNumber').addEventListener('change',(e)=>{
		if(e.value != politicians[id].phoneNumber) el('.create').disabled = false;
	})
	el('.update-nId').addEventListener('change',(e)=>{
		if(e.value != politicians[id].nId) el('.create').disabled = false;
	})
	el('.create').addEventListener('click', ()=>{
		if(image) politicians[id].logo = image ;
		politicians[id].name = el('.update-name').value;
		politicians[id].party = el('.update-party').value;
		politicians[id].office = el('.update-office').value;
		politicians[id].phoneNumber = el('.update-phoneNumber').value;
		politicians[id].nId = el('.update-nId').value;
		setDOM(politicians);
		image = null;
		el('.create').disabled = true;
		const taoster = el("#toaster");
		toaster.className = "show";
		toaster.innerText = "Politician updated successfully";
		toaster.style.backgroundColor = "#10a567";
		setTimeout(function(){ taoster.className = taoster.className.replace("show", ""); }, 3000);
	})

	el('.delete-approved').addEventListener('click', ()=>{
		politicians.splice(id, 1);
		setDOM(politicians);
		closeModal('delete-modal');
		const taoster = el("#toaster");
		toaster.className = "show";
		toaster.innerText = "Politician deleted successfully";
		toaster.style.backgroundColor = "red";
		setTimeout(function(){ taoster.className = taoster.className.replace("show", ""); }, 3000);
	})
})();