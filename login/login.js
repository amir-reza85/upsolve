function login() {
    window.localStorage.setItem('cf', document.getElementById('Cf_handle').value);
    window.localStorage.setItem('ac', document.getElementById('Ac_handle').value);
    window.location.replace("/");
}