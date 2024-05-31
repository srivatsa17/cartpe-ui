export const splitFullName = (fullName: string) => {
    const pattern: RegExp = /^([A-Za-z]+)\s+([A-Za-z\s]+?) *$/;
    const match = pattern.exec(fullName);
    if (match) {
        return {
            firstName: match[1],
            lastName: match[2]
        };
    }
    return {
        firstName: "",
        lastName: ""
    };
};
