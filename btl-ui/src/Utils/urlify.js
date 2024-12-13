var urlRegex = /(https?:\/\/[^\s]+)/g;
export function replaceUrl(string){
    return string.split(urlRegex).filter(e => e !== '')
                    .reduce((acc, x) => acc === null ? [_renderLinkElement(x)] : [_renderLinkElement(acc), _renderLinkElement(x)], null)
}

const _renderLinkElement = (string) => {
    if(URL.canParse(string)){
        return (
            <a href={string} target="_blank" rel="noreferrer">{string}</a>
        )
    } else {
        return string;
    }
}