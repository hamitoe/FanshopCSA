const app = {
    cookies: {
        getCookie: function(name) {
            var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return v ? v[2] : null;
        },          
        setCookie: function(name, value, days) {
            var d = new Date;
            d.setTime(d.getTime() + 24*60*60*1000*days);
            document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
        },
        deleteCookie: function(name) { setCookie(name, '', -1); }
    },
    navigation: {
        forwardToLoginOrProfile: function() {
            const cookie = app.cookies.getCookie('jwt');
            if (cookie != undefined && cookie != null) {                
                window.location.replace("profile.html");
            } else {
                window.location.replace("login.html");
            }
        }
    },
    profile: {
        loadProfile: async function() {
			const response = await fetch('http://localhost:7000/profile', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				credentials: 'include',
			});
			console.log('status: ', response.status);
			if (response.ok) {
                const profile = await response.json();
                return profile;
			}
			else if (response.status === 401) {
				throw Error('Sie sind noch nicht angemeldet.');
			} 
        },
        updateProfile: async function() {

            const profile = {
                vorname: $("#vorname").val(profile.vorname),
                nachname: $("#nachname").val(profile.nachname),
                email: $("#email").val(profile.email),
                strasse: $("#strasse").val(profile.strasse),
                hausnummer: $("#hausnummer").val(profile.hausnummer),
                plz: $("#plz").val(profile.plz),
                ort: $("#ort").val(profile.ort),
            };

			const response = await fetch('http://localhost:7000/profile', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
                credentials: 'include',
                body: profile,
			});
			console.log('status: ', response.status);
			if (response.ok) {
                const profile = await response.json();
                return profile;
			}
			else if (response.status === 401) {
				throw Error('Sie sind noch nicht angemeldet.');
			} 
		}
    }
}