try {
  const response = await fetch("https://youtube-v31.p.rapidapi.com/search?part=snippet&order=date&q=reactjs", {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4ca328895emsh4efdb4a59a223dfp19cdb7jsnb1a96f779eb9',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  });

  if (response.ok) {
    const result = await response.json();
    console.log(result);
  }
} catch (err) {
  console.error(err);
}

export { };
