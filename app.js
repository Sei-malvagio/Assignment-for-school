document.addEventListener('DOMContentLoaded', () => {

  const agree = document.querySelectorAll('#agree');
agree.forEach(agree => {
  agree.addEventListener('change', () => {
    if (agree.checked) {
      agree.classList.add('accent-emerald-800')
      agree.style.border = '1px solid #0A3348'
    }
  })
  
})
  const radios = document.querySelectorAll('#genre1')
  
  radios.forEach(r => {
    r.addEventListener('click', () => {
      r.style.backgroundColor ="#fff"
    })
  })
})