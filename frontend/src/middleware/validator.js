const validate = (data, isCompany) => {
    let errors = [];
    let hasErrors = false;
    data.forEach(field => {
        if (field.name === 'email') {
            if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(field.value)) ) {
                hasErrors = true;
                errors['email'] = 'Invalid email'
            } 
        } 
        if (field.name === 'password') {
            if (field.value.length < 6) {
                hasErrors = true;
                errors['password'] = 'Password must be at least 6 characters'
            }
        }
        if (!isCompany) {
            if (field.name === 'username') {
                if (field.value.trim().length <= 5) {
                    hasErrors = true;
                    errors['username'] = 'Please enter a real full name'
                }
            }
            if (field.name === 'telephone') {
                if (field.value.trim().length < 11) {
                    hasErrors = true;
                    errors['telephone'] = 'Please enter a real telephone'
                }
            }
        }
        if (field.name === 'adress') {
            if (field.value.trim().length < 5) {
                hasErrors = true;
                errors['adress'] = 'Please enter a real adress'
            }
        }
        if (isCompany) {
            if (field.name === 'companyName') {
                if (field.value.trim().length <= 3) {
                    hasErrors = true;
                    errors['companyName'] = 'Please enter a real coompany name'
                }
            }
            if (field.name === 'bin') {
                if (field.value.trim().length < 11) {
                    hasErrors = true;
                    errors['bin'] = 'Please enter a BIN'
                }
            }
            if (field.name === 'bin') {
                if (field.value.trim().length < 11) {
                    hasErrors = true;
                    errors['bin'] = 'Please enter a BIN'
                }
            }
        }
    })

    return {
        errors,
        hasErrors
    };
}

export {
    validate
}