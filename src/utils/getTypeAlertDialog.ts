const getTypeAlertDialog = (title: string, text:string="Отменить данное действие будет не возможно"):
    {title: string, text: string} => {
    return {
        title,
        text
    }
}

export default getTypeAlertDialog
