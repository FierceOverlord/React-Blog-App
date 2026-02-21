const PASSWORD_POLICY = {
    minLength: 12,
    requireLowercase: true,
    requireUppercase: true,
    requireNumber: true,
    requireSpecial: true,
    expireInDays: 90
}

const isRequirementMet = (password, regex) => regex.test(password);

export const validatePasswordPolicy = (password) => {
    const errors = [];

    if(!password || password.length < PASSWORD_POLICY.minLength) {
        errors.push(`Password must be at least ${PASSWORD_POLICY.minLength} characters long.`);
    }

    if(PASSWORD_POLICY.requireLowercase && !isRequirementMet(password, /[a-z]/)) {
        errors.push(`Password must include at leat one lower case character.`)
    }

    if(PASSWORD_POLICY.requireUppercase && !isRequirementMet(password, /[A-Z]/)) {
        errors.push(`Password must include at least one upper case character.`)
    }

    if(PASSWORD_POLICY.requireNumber && !isRequirementMet(password, /\d/)) {
        errors.push(`Password must contain at leat one number.`);
    }

    if(PASSWORD_POLICY.requireSpecial && !isRequirementMet(password, /[^A-Za-z0-9]/)) {
        errors.push(`Password must contain at leat one special character.`);
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

export const getPasswordPolicyDescription = () => 
    `At least ${PASSWORD_POLICY.minLength} characters, including uppercase, lowercase, number, and special character.`;

export const isPasswordExpired = (passwordLastChangedAt) => {
    if(!passwordLastChangedAt) {
        return true;
    }

    const changedAt = new Date(passwordLastChangedAt).getTime();

    if(Number.isNaN(changedAt)) {
        return true;
    }

    const expiresAt = changedAt + PASSWORD_POLICY.expireInDays * 24 * 60 * 60 * 1000;

    return Date.now() >= expiresAt;
}

export { PASSWORD_POLICY };