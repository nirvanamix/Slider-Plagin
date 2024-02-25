export const cleanFile = async () => {
    return await app.plugins.deleteAsync([app.path.clean]);
}