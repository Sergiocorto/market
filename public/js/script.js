document.querySelectorAll('.cost').forEach(card => {
    card.textContent = new Intl.NumberFormat('ua-UA', {
        currency: 'uah',
        style: 'currency'
    }).format(card.textContent)
})

function btnUnblock(obj){
    let btn = obj.parentNode.querySelector('.btnRefresh')
    btn.removeAttribute('disabled')
}