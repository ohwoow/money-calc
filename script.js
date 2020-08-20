// Доделать локалсторэдж и пофиксить баг с удалением!


const btnSubtract = document.querySelector('.operation__btn-subtract')
const btnAdd = document.querySelector('.operation__btn-add')
const inputAmount = document.querySelector('.operation__amount')
const inputName = document.querySelector('.operation__name')
const historyList = document.querySelector('.history__list')
const totalIncome = document.querySelector('.total__money-income')
const totalExpenses = document.querySelector('.total__money-expenses')
const totalBalance = document.querySelector('.total__balance')


let dbOperation = /*JSON.parse(localStorage.getItem('operations')) ||*/ []


// Очищаем значение в инпутах
function clearInputs() {
  inputAmount.value = ''
  inputName.value = ''
}

// генерируем id
function generateId() {
  return `id${Math.round(Math.random() * 1e8).toString(16)}`
}


// Удаление элементов истории
function deleteElement(evt) {
  const target = evt.target

  if (evt.target.classList.contains('history__delete')) {
    dbOperation = dbOperation.filter(operation => operation.id !== target.dataset.id)
    target.parentElement.remove()
  }
  updateBalance()
}


// Обновление баланса
function updateBalance() {
  const resIncome = dbOperation.filter(item => item.amount > 0)
    .reduce((result, item) => result + item.amount, 0)
  const resExpenses = dbOperation.filter(item => item.amount < 0)
    .reduce((result, item) => result + item.amount, 0)

  totalIncome.textContent = '+' + resIncome + ' ₽'
  totalExpenses.textContent = resExpenses + ' ₽'
  totalBalance.textContent = resIncome + resExpenses + ' ₽'
}


//добавление операции в историю
function addElemHistory(evt) {

  const target = evt.target
  let valueName = inputName.value
  let valueAmount = +inputAmount.value

  const operation = {
    id: generateId(),
    name: valueName,
    amount: valueAmount
  }



  const liItem = document.createElement('li')
  const className = target.classList.contains('operation__btn-subtract') ? 'history__item-minus' : 'history__item-plus'
  liItem.classList.add('history__item', className)

  liItem.innerHTML = `
    ${operation.name}
    <span class="history__money">
      ${target.classList.contains('operation__btn-subtract') ?
      operation.amount *= -1 :
      operation.amount} ₽
    </span>
    <button class="history__delete" data-id="${operation.id}">x</button>
  `

  historyList.append(liItem)
  dbOperation.push(operation)
  updateBalance()

  // localStorage.setItem('operations', JSON.stringify(dbOperation))
  dbOperation.forEach(item => {
    console.log(item)
  })

  // чистим поля ввода
  clearInputs()
}



historyList.addEventListener('click', deleteElement)
btnAdd.addEventListener('click', addElemHistory)
btnSubtract.addEventListener('click', addElemHistory)
