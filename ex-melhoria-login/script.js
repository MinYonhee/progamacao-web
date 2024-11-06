const inputUsername = document.getElementById("inputUsername");
const inputPassword = document.getElementById("inputPassword");
const inputEmail = document.getElementById("inputEmail");
const btSignUp = document.getElementById("btSignUp");
const btLogin = document.getElementById("btLogin");
const btLogout = document.getElementById("btLogout");
const h1IndexTitle = document.getElementById("h1IndexTitle");

const baseURL = "https://parseapi.back4app.com";
const usersURL = `${baseURL}/users`;
const loginURL = `${baseURL}/login`;
const logoutURL = `${baseURL}/logout`;
const headers = {
  "X-Parse-Application-Id": "IjMQNnxBbsuYKEsnvNuQhwiEw9pkLJkwWfhB9aG1",
  "X-Parse-REST-API-Key": "ip0a7zYuKwJNXicmLC5TkLN6DGWVbLhRtIYDjU6R",
};
const headersRevSession = {
  ...headers,
  "X-Parse-Revocable-Session": "1",
};
const headersJson = {
  ...headersRevSession,
  "Content-Type": "application/json",
};

// Função para validar se a sessão do usuário é válida
const validateSession = async () => {
  const userJson = localStorage.user;
  if (userJson) {
    const user = JSON.parse(userJson);

    const response = await fetch(`${baseURL}/users/me`, {
      method: "GET",
      headers: {
        ...headers,
        "X-Parse-Session-Token": user.sessionToken,
      },
    });

    if (!response.ok) {
      // Token inválido ou expirado, redireciona para a página de login
      delete localStorage.user;
      location.assign("./login.html");
    }
  } else {
    // Se não há usuário salvo, redireciona para a página de login
    location.assign("./login.html");
  }
};

// Função para registrar um novo usuário
const handleBtSignUpClick = async () => {
  const username = inputUsername.value.trim();
  if (!username) {
    alert("Preencha o nome do usuário!");
    inputUsername.focus();
    return;
  }

  const password = inputPassword.value.trim();
  if (!password) {
    alert("Preencha a senha!");
    inputPassword.focus();
    return;
  }

  const email = inputEmail.value.trim();
  if (!email) {
    alert("Preencha o e-mail!");
    inputEmail.focus();
    return;
  }

  const response = await fetch(usersURL, {
    method: "POST",
    headers: headersJson,
    body: JSON.stringify({ username, password, email }),
  });
  const data = await response.json();
  console.log("user:", data);
};

// Função para realizar o login
const handleBtLoginClick = async () => {
  const username = inputUsername.value.trim();
  if (!username) {
    alert("Preencha o nome do usuário!");
    inputUsername.focus();
    return;
  }

  const password = inputPassword.value.trim();
  if (!password) {
    alert("Preencha a senha!");
    inputPassword.focus();
    return;
  }

  const response = await fetch(loginURL, {
    method: "POST",
    headers: headersRevSession,
    body: new URLSearchParams({
      username,
      password,
    }),
  });
  console.log("response", response);
  const data = await response.json();
  if (!response.ok) {
    alert(`Code: ${data.code} - error: ${data.error}`);
    return;
  }
  console.log("data:", data);
  localStorage.user = JSON.stringify(data);
  const searchParams = new URLSearchParams(location.search);
  if (searchParams.has("url")) {
    location.replace(searchParams.get("url"));
  } else {
    history.back();
  }
};

// Função para realizar o logout
const handleBtLogoutClick = async () => {
  const userJson = localStorage.user;
  if (userJson) {
    const user = JSON.parse(userJson);
    const response = await fetch(logoutURL, {
      method: "POST",
      headers: {
        ...headers,
        "X-Parse-Session-Token": user.sessionToken,
      },
    });
    console.log("response", response);
    const data = await response.json();
    if (!response.ok) {
      alert(`Code: ${data.code} - error: ${data.error}`);
      return;
    }
    console.log("data:", data);
    delete localStorage.user;
    history.back();
  }
};

// ================= Events ==========================

if (btSignUp) {
  btSignUp.onclick = handleBtSignUpClick;
}

if (btLogin) {
  btLogin.onclick = handleBtLoginClick;
}

if (btLogout) {
  btLogout.onclick = handleBtLogoutClick;
}

// Verifica a sessão ao carregar a página inicial
if (h1IndexTitle) {
  window.onload = async () => {
    await validateSession(); // Valida o token de sessão

    const userJson = localStorage.user;
    if (userJson) {
      const user = JSON.parse(userJson);
      h1IndexTitle.innerHTML = `Back4App User (${user.username})`;
      if (btLogout) {
        btLogout.disabled = false;
      }
    }
  };
}