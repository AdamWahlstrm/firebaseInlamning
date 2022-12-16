
  const movieList = document.querySelector('#movie-list');
  const form = document.querySelector('#add-movie-form');
  
  // create element & render movie
  function rendermovie(doc){
      let li = document.createElement('li');
      let name = document.createElement('span');
      let genre = document.createElement('span');
      let cross = document.createElement('div');
  
      li.setAttribute('data-id', doc.id);
      name.textContent = doc.data().name;
      genre.textContent = doc.data().genre;
      cross.textContent = 'x';
  
      li.appendChild(name);
      li.appendChild(genre);
      li.appendChild(cross);
  
      movieList.appendChild(li);
  
      // deleting data
      cross.addEventListener('click', (e) => {
          e.stopPropagation();
          let id = e.target.parentElement.getAttribute('data-id');
          db.collection('movies').doc(id).delete();
      });
  }
  
  // getting data
  db.collection('movies').orderBy('genre').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
          rendermovie(doc);
      });
  });
  
  // saving data
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      db.collection('movies').add({
          name: form.name.value,
          genre: form.genre.value
      });
      form.name.value = '';
      form.genre.value = '';
  });