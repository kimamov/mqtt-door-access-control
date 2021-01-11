const serverAdress=process.env.REACT_APP_SERVER || "http://locaholst:5000";


const authProvider = {
    // authentication
    login: ({ username, password })=>{
        const request = new Request(`${serverAdress}/login`, {
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
                const {user}=json;
                if(!user) throw Error('no user data found in response')
                localStorage.setItem('auth', JSON.stringify({
                    id: user.id,
                    avatar: null,
                    fullName: user.username
                }));
                localStorage.setItem('permissions', user.type? "admin" : "user")
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
        const auth=localStorage.getItem('auth')
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
            const { id, fullName, avatar } = JSON.parse(localStorage.getItem('auth'));
            return Promise.resolve({ id, fullName, avatar });
        } catch (error) {
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