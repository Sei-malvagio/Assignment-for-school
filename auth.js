const uri = "https://jafar-login-api.vercel.app"

let valid = false

document.getElementById('signup')
  .addEventListener('submit', async (e) => {
    e.preventDefault()

    const sign_text = document.getElementById('signup_text')
    const nama_lengkap = document.getElementById('nama').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const pekerjaan = document.getElementById('pekerjaan').value
    const genders = document.querySelectorAll('input[name="gender"]')

    let gender;

    genders.forEach(g => {
      if (g.checked)
        gender = g.value
    })

    invalid(
      nama_lengkap,
      email,
      password,
      pekerjaan,
      gender
    )

    if (valid) {
      try {
        const res = await axios.post(`${uri}/signup`, {
          nama_lengkap,
          email,
          password,
          pekerjaan,
          gender,
          path: 'main.html'
        })

        if (res.status == 400) {
          throw new Error('err')
        }

        sign_text.classList.remove('hidden')
        sign_text.classList.add('text-green-800', 'bg-green-100')
        sign_text.innerHTML = res.data.message

        window.location.href = '/login.html'
      } catch (err) {
        setInterval(() => {
          sign_text.classList.remove('hidden')
          sign_text.classList.add('text-red-800', 'bg-red-100')
          sign_text.innerHTML = 'Email sudah terpakai!'
        }, 3000)
        console.log(err)
      }
    }
  })

const invalid = (nama, email, pw, job, gender) => {
  const terms = document.getElementById('agree')

  const bidang = [
    { value: nama, fill: 'nama' },
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
      if (!terms.checked) {
        document.querySelector(`.validates[data-fill="terms"]`).classList.remove('hidden')
        valid = false
      } else {
        valid = true
      }
    }
  })

  return valid
}

document.addEventListener('DOMContentLoaded', () => {
  const input_value = [
    { q: 'input[name="nama"]', fill: 'nama' },
    { q: 'input[name="email"]', fill: 'email' },
    { q: 'input[name="password"]', fill: 'pw' },
    { q: 'select[name="pekerjaan"]', fill: 'job' },
    { q: 'input[name="gender"]', fill: 'gender' },
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

        if (vi.tagName === 'SELECT' || vi.type === 'radio') {
          vi.addEventListener('change', () => {
            if (vi.value.length > 0)
              document.querySelector(`.validate[data-fill="${fill}"]`).classList.add('hidden')
          })
        }
      })
    } else {
      console.log('Error null')
    }
  })
})