

const authProvider = {
    // authentication
    login: ({ username, password })=>{
        const request = new Request('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(json => {
                console.log(json);
                const {user}=json;
                if(!user) throw Error('no user data found in response')
                localStorage.setItem('auth', JSON.stringify({
                    id: user.id,
                    avatar: null,
                    fullName: user.username
                }));
            })
            .catch((error) => {
                throw new Error(error)
            });
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject({ message: false });
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    checkAuth: ()=>{
        console.log("was called")
        const auth=localStorage.getItem('auth')
        console.log(auth);
        return auth
        ? Promise.resolve()
        : Promise.reject()
    },
    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    getIdentity: () => {
        try {
            console.log("getting identity");
            const { id, fullName, avatar } = JSON.parse(localStorage.getItem('auth'));
            console.log(fullName)
            return Promise.resolve({ id, fullName, avatar });
        } catch (error) {
            console.log("failed to get identity")
            return Promise.reject(error);
        }
    },
    // authorization
    getPermissions: ()=> {
        const role = localStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.reject();
    },
  };


export default authProvider