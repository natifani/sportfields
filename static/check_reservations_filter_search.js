// Nagy Tifani - Franciska 523 ntim1937

document.body.onload = () => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  document.getElementById('admin-username-search-btn').onclick = () => {
    const inputText = document.getElementById('admin-username-input').value;
    if (inputText !== '') {
      if (params.get('username')) {
        params.delete('username');
      }
      params.append('username', inputText);
      const newUrl = url.toString();
      window.location = newUrl;
    }
  };
};
