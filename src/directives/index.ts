import { Tooltip } from 'bootstrap';

export const BootstrapTooltip = {
    mounted: (el: HTMLElement)=> new Tooltip(el)
}

export const Focus = {
    mounted: (el: HTMLElement)=> el.focus()
}