const uri = "https://jafar-login-api.vercel.app"

let valid = false

document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('login')?.addEventListener('submit', async (e) => {
      e.preventDefault()

      const log_text = document.getElementById('login_text')

      const email = document.getElementById('email').value
      const password = document.getElementById('password').value

      invalid(
        email,
        password
      )

      console.log(valid)
      if (valid) {
        try {
          const res = await axios.post(`${uri}/login`, {
            email,
            password,
          })

          if (res.status == 400) {
            throw new Error(res.data.message)
          }

          log_text.classList.remove('hidden')
          log_text.classList.add('text-green-800', 'bg-green-100')
          log_text.innerHTML = res.data.message

          localStorage.setItem('token', res.data.token)

          //if (token)
            //gotoMain()
            
            window.location.reload()

        } catch (err) {
          setInterval(() => {
            log_text.classList.remove('hidden')
            log_text.classList.add('text-red-800', 'bg-red-100')
            log_text.innerHTML = 'Email atau password salah!'
          }, 3000)
        }
      }
    })

  const invalid = (email, pw) => {
    const bidang = [
      { value: email, fill: 'email' },
      { value: pw, fill: 'pw' },
    ]

    const notValid = document.querySelectorAll('.validate')

    notValid.forEach(v => v.classList.add('hidden'))

    bidang.forEach(({ value, fill }) => {
      const val_element = document.querySelector(`[data-fill="${fill}"]`);
      if (!val_element) {
        console.error(`Null untuk: ${fill}`);
        return;
      }

      if (value.length <= 0) {
        const validEl = document.querySelector(`.validate[data-fill="${fill}"]`)
        if (validEl) {
          validEl.classList.remove('hidden')
          valid = false
        }
      } else {
        valid = true
      }
    })

    return valid
  }

  const token = localStorage.getItem('token');

  if (token) {
    await axios.get(`${uri}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        document.body.innerHTML = res.data;
      })
      .catch(err => {
        console.error('Error mendapatkan profile:', err);
        gotoLogin()
      });
  }
  
  const input_value = [
    { q: 'input[name="email"]', fill: 'email' },
    { q: 'input[name="password"]', fill: 'pw' },
    ]

  input_value.forEach(({ q, fill }) => {
    const valueInp = document.querySelectorAll(q)

    if (valueInp) {
      valueInp.forEach(vi => {
        vi.addEventListener('input', () => {
          if (vi.value.length > 0) {
            document.querySelector(`.validate[data-fill="${fill}"]`).classList.add('hidden')
          }
        })
      })
    } else {
      console.log('Error null')
    }
  })
  
})

function gotoLogin() {
  return window.location.href = '/login.html'
}