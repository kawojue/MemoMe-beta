import { saveAs } from 'file-saver'

const downloadImage = (url: string): void => {
    const splitName: string[] = url.split('/')
    saveAs(url, splitName[splitName.length - 1])
}

export default downloadImage