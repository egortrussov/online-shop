export const getProxy = () => {
    if (process.env.NODE_ENV === 'development')
        return 'http://localhost:5000';
    return ''
}