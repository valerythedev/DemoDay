var editButtons = document.getElementsByClassName("btn-warning btn sm-save");
var trash = document.getElementsByClassName("btn-warning btn sm-delete");

Array.from(editButtons).forEach(function (element) {
  element.addEventListener('click', function () {
    // const tableRow = this.parentNode.parentNode
    const  songName = this.parentNode.parentNode.childNodes[1].textContent
    const artistName = this.parentNode.parentNode.childNodes[3].textContent
    const lyrics = this.parentNode.parentNode.childNodes[5].textContent
    // const id = tableRow.dataset.id;
    const prevSongName = this.parentNode.parentNode.childNodes[1].classList[0]
    const prevArtistName = this.parentNode.parentNode.childNodes[3].classList[0]
    const prevLyrics = this.parentNode.parentNode.childNodes[5].classList[0]
    fetch(`/songs/save`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    songName: songName,
    artistName: artistName,
    lyrics: lyrics,
    prevSongName: prevSongName,
    prevArtistName: prevArtistName,
    prevLyrics: prevLyrics
  })
})

      .then(response => {
        if (response.ok) {
          window.location.reload(true);
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
});

Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const songName = this.parentNode.parentNode.childNodes[1].textContent
    const artistName = this.parentNode.parentNode.childNodes[3].textContent
    const lyrics = this.parentNode.parentNode.childNodes[5].textContent
    fetch('/songs', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        songName: songName,
        artistName: artistName,
        lyrics: lyrics
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

