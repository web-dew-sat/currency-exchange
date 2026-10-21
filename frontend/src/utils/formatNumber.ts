export const formatNumber = (value: string): string  => {

    const formatter = new Intl.NumberFormat('ru-RU', {
        maximumFractionDigits: 3,
    })

    if(value){
        return formatter.format(Number(value))
    }

    return ''

}