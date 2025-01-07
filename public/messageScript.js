// F U N C T I O N S

function usrChoice(array,a,startPosition){ //Funkcja wprowadzająca do tablicy zmiane wybrana przez uzytkownika i przypisujaca ja do
  array.splice(startPosition, 1, a)        //konkretnego dnia tygodnia
}

function generateMessage(day,date,dys){ //Funkcja generująca zredagowaną wiadomość zawierającą dane wprowadzone przez użytkownika
 let arrayLenght = dyspo.length

 if(arrayLenght<7){
   alert("Uzupełnij wszystkie dni!")
   return null;
 }
 else{
  var messageToSend = "";

  messageToSend+="Przesyłam moją dyspozycję na okres "+date[0]+" - "+date[6]+"</br>"
  for(i=0;i<7;i++){messageToSend+=day[i]+" "+date[i]+" - "+dys[i]+"<br>"}

  return messageToSend;
 }
}

function showSelectedDates() { //Funkcja wyświetlająca w tabeli dni wybrane przez użytkownika oraz zmiany, które będzie chciał wprowadzić
  // Tworzymy nowe obiekty dat z podanych dat początkowej i końcowej
    const start = new Date(document.getElementById('startDate').value);
    const end = new Date(document.getElementById('endDate').value);
    const tableContent = document.getElementById('table-content')
    let startDay = start.getDay()
    let endDay = end.getDay()
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    // Sprawdzamy, czy daty są poprawne
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      alert("Podaj poprawny zakres!");
      return;
    }
    else if(diffDays !== 6){
      alert("Zakres musi obejmować 7 dni!");
      return;
    }
    else if(startDay !== 5 && endDay !== 4){
      alert("Zakres dni musi mieścić się pomiędzy piątkiem a czwartkiem!")
      return;
    }
  
    // Tworzymy tablicę, do której będą dodawane wszystkie daty z podanego okresu

  
    // Pętla, która dodaje wszystkie daty między datą początkową a końcową do tablicy
    if (dates.length>0){    //Warunek sprawdzający czy istnieją już w tablicy dane, jeśli tak czyści tablice, by ją nadpisać
      dates = []
    }
    else{
    while (start <= end) {
      dates.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    // Wyświetlamy wszystkie daty z tablicy w tabeli

    // Kontener tabeli
    const tableContainer = document.createElement('table');

    // Wiersz dat
    const datesTr = document.createElement('tr');
    for (let i = 0; i<dates.length;i++) {
      const date = dates[i].getDate().toString().padStart(2, '0') + "." + (dates[i].getMonth()+1).toString().padStart(2, '0');
      const td = document.createElement('td');
      td.innerHTML = date;
      datesToMessage.push(date)
      console.log(datesToMessage);
      datesTr.appendChild(td);
    }
    tableContainer.appendChild(datesTr);

    // Wiersz dni tygodnia
    const daysTr = document.createElement('tr');
    for (dayName=0; dayName<7; dayName++)
    {
      const td = document.createElement('td');
      td.innerHTML = week[dayName];
      daysTr.appendChild(td);
    }
    tableContainer.appendChild(daysTr);
      
    
    for(i=0;i<zmiany.length;i++){
      const shitfsTr = document.createElement('tr');

      for(dayName=0; dayName<7; dayName++) {
        const dayShiftTr = document.createElement('td');
      
        const button = document.createElement('button');
        button.classList.add('button-87');
        button.classList.add('zmiana');
        button.setAttribute('data-dayname', dayName);
        button.setAttribute('data-zmiana', zmiany[i]);
        button.type = 'button';
        button.id = week[dayName];
        button.value = zmiany[i];
        button.innerHTML = zmiany[i];

        dayShiftTr.appendChild(button);
        shitfsTr.appendChild(dayShiftTr);
      }

      tableContainer.appendChild(shitfsTr);
    }
    const generateButtonTr = document.createElement('tr');
    const generateButtonTd = document.createElement('td');
    const generateButton = document.createElement('button');
    generateButton.classList.add('button-87');
    generateButton.type = 'button';
    generateButton.innerHTML = 'Generuj';

    generateButton.addEventListener('click', () => {
      const message = generateMessage(week, datesToMessage, dyspo);

      const messageContainer = document.querySelector('#message');

      messageContainer.innerHTML = "<h1>Twoja wiadomość:</h1>" + message;

      const sendButton = document.createElement('button')
      sendButton.classList.add('btn');
      sendButton.type = 'button';
      sendButton.innerHTML = 'Wyślij'

      messageContainer.appendChild(sendButton)

      sendButton.addEventListener('click', () => {
        fetch('/wyslij-maila', {
          method: 'POST',
          body: message,
          // body: { from: 'Michał Kowalski <email>', message: message },
          headers: {
            'Content-type': 'text/plain'
            // 'Content-type': 'application/json'
          }
        })
        .then(res => res.text())
        // .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err))
      })
    })

    generateButtonTd.appendChild(generateButton);
    generateButtonTr.appendChild(generateButtonTd);
    tableContainer.appendChild(generateButtonTr);
      
    if (tableContent) {
      tableContent.appendChild(tableContainer);

      document.querySelectorAll('.zmiana').forEach(bttn => {
        const zmiana = bttn.getAttribute('data-zmiana');
        const dayName = bttn.getAttribute('data-dayname');

        bttn.addEventListener('click', () => {
          document.querySelectorAll(`.zmiana[data-dayname="${dayName}"]`).forEach(bttns => {
            bttns.classList.remove('selected')
          })
          bttn.classList.add('selected');
          console.log(dyspo, zmiana, dayName);
          usrChoice(dyspo, zmiana, dayName)
        });
      })
    }
  }   
}

// A R R A Y S

var week= ['Piątek', 'Sobota', 'Niedziela', 'Poniedziałek', 'Wtorek', 'Środa','Czwartek']
var zmiany = ['1 zmiana','2 zmiana','Off','C','MZ']
var datesToMessage=[]
var dyspo=[]
var dates = [];

const showShiftsTableBttn = document.querySelector('#showShiftsTable');
if (showShiftsTableBttn) {
  showShiftsTableBttn.addEventListener('click', () => {
    showSelectedDates();
  });
}
