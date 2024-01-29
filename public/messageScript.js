// F U N C T I O N S

function usrChoice(array,a,startPosition){ //Funkcja wprowadzająca do tablicy zmiane wybrana przez uzytkownika i przypisujaca ja do
  array.splice(startPosition, 1, a)        //konkretnego dnia tygodnia
}

function generateMessage(day,date,dys){ //Funkcja generująca zredagowaną wiadomość zawierającą dane wprowadzone przez użytkownika
 let arrayLenght = dyspo.length

 if(arrayLenght<7){
   alert("Uzupełnij wszystkie dni!")
 }
 else{

  const message = document.getElementById('message')
  var messageToSend = "<h1>Twoja wiadomość:</h1>"

  messageToSend+="Przesyłam moją dyspozycję na okres "+date[0]+" - "+date[6]+"</br>"
  for(i=0;i<7;i++){messageToSend+=day[i]+" "+date[i]+" - "+dys[i]+"<br>"}
  messageToSend+="Michał Kowalski</br>"

  message.innerHTML = messageToSend
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
    var table = "<table><tr>"
    for(let i = 0; i<dates.length;i++){
          if(dates[i].getDate()<10&&dates[i].getMonth()<10){
            table+="<td>0"+dates[i].getDate()+"."+"0"+(dates[i].getMonth()+1)+"</td>"
            datesToMessage.push("0"+dates[i].getDate()+".0"+(dates[i].getMonth()+1))
          }
          else if(dates[i].getMonth()<10){
            table+="<td>"+dates[i].getDate()+".0"+(dates[i].getMonth()+1)+"</td>"
            datesToMessage.push(dates[i].getDate()+".0"+(dates[i].getMonth()+1))
          }
          else{
            table+="<td>"+dates[i].getDate()+"."+(dates[i].getMonth()+1)+"</td>"
            datesToMessage.push(dates[i].getDate()+"."+(dates[i].getMonth()+1))
          }
        }
        table+="<tr>"
      for(dayName=0; dayName<7; dayName++){table+="<td>"+week[dayName]+"</td>"}
      table+="</tr>"

      table+=("<tr class='shifts'>")
      for(dayName=0; dayName<7; dayName++){
      table+=("<td>")
      for(i=0;i<zmiany.length;i++){table+="<button class='button-87' onclick='usrChoice(dyspo,zmiany["+i+"],"+dayName+")' type='button' id='"+week[dayName]+"' value='"+zmiany[i]+"'>"+zmiany[i]+"</button><br>"}
      table+=("</td>")
      }
            
      table+="<td><button class='button-87' type='button' onclick='generateMessage(week, datesToMessage, dyspo)'>Generuj</button></td></tr></table>"
      
      if (tableContent) {
        tableContent.innerHTML = table
      } 
    }   
}

// A R R A Y S

var week= ['Piątek', 'Sobota', 'Niedziela', 'Poniedziałek', 'Wtorek', 'Środa','Czwartek']
var zmiany = ['1 zmiana','2 zmiana','Off','C','MZ']
var datesToMessage=[]
var dyspo=[]
var dates = [];
