let MESSAGE_PANEL_TIMEOUT_HANDLE;
const app = {
    message: {
        showError: function(message) {
            app.message.showMessage(message, 'error');
        },
        showSuccess: function(message) {
            app.message.showMessage(message, 'success');
        },
        showMessage: function(message, type = 'success') {            
            if (!$("#message-panel").is(":visible")) {
                $("#message-panel").show(); 
            }             
            $("#message-label").text(message);
            $("#message-panel").removeClass('alert-danger');
            $("#message-panel").removeClass('alert-success');
            if (type === 'success') {
                $("#message-panel").addClass('alert-success');
            } else {
                $("#message-panel").addClass('alert-danger');
            }
            if (MESSAGE_PANEL_TIMEOUT_HANDLE != undefined) {
                clearTimeout(MESSAGE_PANEL_TIMEOUT_HANDLE);
            }
            MESSAGE_PANEL_TIMEOUT_HANDLE = setTimeout(function(){
                $("#message-panel").hide(); 
            }, 5000);
        },
    },
    form: {
        button: {
            enable: function(id) {
                app.form.button.setButtonState(id, false);
            },
            disable: function(id) {
                app.form.button.setButtonState(id, true);
            },
            setButtonState: function(buttonId, isDisabled) {
                $("#" + buttonId).prop("disabled", isDisabled);
            }
        }
    },
    cookies: {
        getCookie: function (name) {
            var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return v ? v[2] : null;
        },
        setCookie: function (name, value, days) {
            var d = new Date();
            d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
            document.cookie =
                name + '=' + value + ';path=/;expires=' + d.toGMTString();
        },
        deleteCookie: function (name) {
            setCookie(name, '', -1);
        },
    },
    navigation: {
        forwardToLoginOrProfile: function () {
            const cookie = app.cookies.getCookie('jwt');
            if (cookie != undefined && cookie != null) {
                window.location.replace('profile.html');
            } else {
                window.location.replace('login.html');
            }
        },
    },
    profile: {
        loadProfileData: async function () {
            const response = await fetch('http://localhost:7000/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                credentials: 'include',
            });
            if (response.ok) {
                const profile = await response.json();
                return profile;
            } else if (response.status === 401) {
                throw Error('Die Daten konnten nicht geladen werden, da Sie noch nicht angemeldet sind.');
            } else if (response.status === 500) {
                throw Error('Ein Fehler ist beim Laden der Profildaten aufgetreten.');
            }
        },
        loadPaymentOptions: async function () {
            const response = await fetch(
                'http://localhost:7000/profile/payments',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    credentials: 'include',
                }
            );
            const paymentOptions = await response.json();
            console.log('status: ', response.status);
            console.log('text: ', paymentOptions);
            if (response.ok) {
                return paymentOptions;
            } else if (response.status === 401) {
                throw Error('Die Daten konnten nicht geladen werden, da Sie noch nicht angemeldet sind.');
            } else if (response.status === 500) {
                throw Error('Ein Fehler ist beim Laden der Zahlungsmethoden aufgetreten.');
            }
        },
        updateUserData: async function () {
            const data = {                
                vorname: $('#vorname').val(),
                nachname: $('#nachname').val(),
                email: $('#email').val(),                
            };
    
            let response;
            try {
                app.form.button.disable("updateUserDataButton");
                response = await fetch('http://localhost:7000/profile/user', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    credentials: 'include',
                    body: JSON.stringify(data),
                });
            } catch (error) {
                console.error(error);
                app.message.showError('Die Anfrage konnte nicht an das Backend geschickt werden.');
            } finally {
                app.form.button.enable("updateUserDataButton");
            }
            if (response === undefined) {
                return;
            }
            console.log('status: ', response.status);
            if (response.ok) {
                app.message.showSuccess('Die Persondaten wurden geändert.');
            } else if (response.status === 401) {
                app.message.showError('Die Persondaten konnten nicht gesetzt werden, da Sie noch nicht angemeldet sind.');
            } else if (response.status === 500) {
                app.message.showError('Ein Fehler ist aufgetreten.');
            }
        },
        updateUserAddress: async function () {
            const data = {
                strasse: $('#strasse').val(),
                hausnummer: $('#hausnummer').val(),
                plz: $('#plz').val(),
                ort: $('#ort').val(),
            };
    
            let response;
            try {
                app.form.button.disable("updateUserAdressButton");
                response = await fetch('http://localhost:7000/profile/user/address', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    credentials: 'include',
                    body: JSON.stringify(data),
                });
            } catch (error) {
                console.error(error);
                app.message.showError('Die Anfrage konnte nicht an das Backend geschickt werden.');
            } finally {
                app.form.button.enable("updateUserAdressButton");
            }
            if (response === undefined) {
                return;
            }
            console.log('status: ', response.status);
            if (response.ok) {
                app.message.showMessage('Die Adressdaten wurden geändert.');
            } else if (response.status === 401) {
                app.message.showError('Die Adressdaten konnte nicht gesetzt werden, da Sie noch nicht angemeldet sind.');
            } else if (response.status === 500) {
                app.message.showError('Ein Fehler ist aufgetreten.');
            }
        },
        updatePassword: async function() {
            const password = $("#password").val().trim();
            const confirmPassword = $("#confirmPassword").val().trim();
            if (password === '') {
                app.message.showError('Kein Passwort angegeben.');
                return;
            }
            if (confirmPassword === '') {
                app.message.showError('Keine Passwortbestätigung angegeben.');
                return;
            }
            if (confirmPassword != password) {
                app.message.showError('Passwort und Passwortbestätigung stimmen nicht überein.');
                return;
            }

            const data = { passwort: password };
            let response;
            try {
                app.form.button.enable("updatePasswordButton");
                response = await fetch('http://localhost:7000/profile/user/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });
            } catch (error) {
                console.error(error);
                app.message.showError('Die Anfrage konnte nicht an das Backend geschickt werden.');
            } finally {
                app.form.button.enable("updatePasswordButton");
            }
            if (response === undefined) {
                return;
            }
            console.log('status: ', response.status);
            if (response.ok) {                
                $("#password").val('');
                $("#confirmPassword").val('');
                app.message.showMessage('Das neue Passwort wurde gesetzt.');
            } else if (response.status === 401) {
                app.message.showError('Das Passwort konnte nicht gesetzt werden, da Sie noch nicht angemeldet sind.');
            } else if (response.status === 500) {
                app.message.showError('Ein Fehler ist aufgetreten.');
            }
        },
        updatePaymentOption: async function() {
            const data = { paymentOption: Number($("#paymentOptionList").val()) };
            let response;
            try {
                app.form.button.disable("updatePaymentButton");
                response = await fetch(
                    'http://localhost:7000/profile/user/payment',
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                        },
                        credentials: 'include',
                        body: JSON.stringify(data),
                    }
                );
            } catch (error) {
                console.error(error);
                app.message.showError('Die Anfrage konnte nicht an das Backend geschickt werden.');
            } finally {
                app.form.button.enable("updatePaymentButton");
            }
            if (response === undefined) {
                return;
            }
            console.log('status: ', response.status);
            if (response.ok) {
                // window.alert('Die Zahlungsmethode wurde geändert.');
                app.message.showSuccess('Die Zahlungsmethode wurde geändert.');
            } else if (response.status === 401) {
                app.message.showError('Die Zahlungsmethode konnte nicht geändert werden, da Sie noch nicht angemeldet sind.');
            } else if (response.status === 500) {
                app.message.showError('Ein Fehler ist aufgetreten.');
            }
        },
        initPage: async function() {
            // Load payment options
            const paymentOptions = await app.profile.loadPaymentOptions();
            console.log(paymentOptions);
            $.each(paymentOptions, function (i, paymentOption) {
                $('#paymentOptionList').append($('<option>', { 
                    value: paymentOption.id,
                    text : paymentOption.name, 
                }));
            });
            // Load profile data
            const profile = await app.profile.loadProfileData();
            $("#vorname").val(profile.vorname);
            $("#nachname").val(profile.nachname);
            $("#email").val(profile.email);
            $("#strasse").val(profile.strasse);
            $("#hausnummer").val(profile.hausnummer);
            $("#plz").val(profile.plz);
            $("#ort").val(profile.ort);
            $('#paymentOptionList').val(profile.zahlungsartID).change();        
            $("#profileUser").text(profile.vorname + ' ' + profile.nachname);
        }
    },        
};
